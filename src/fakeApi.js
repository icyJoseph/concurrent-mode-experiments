export function fetchProfileData() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  let triviaPromise = fetchTrivia();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
    trivia: wrapPromise(triviaPromise)
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    accepted => {
      status = "success";
      result = accepted;
    },
    rejected => {
      status = "error";
      result = rejected;
    }
  );
  return {
    read() {
      if (status === "pending") {
        console.log("waiting...");
        throw suspender; // throws a promise => catched by Suspense Boundaries
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

function fetchUser() {
  console.log("fetch user...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr"
      });
    }, 500);
  });
}

let ringoPosts = [
  {
    id: 0,
    text: "I get by with a little help from my friends"
  },
  {
    id: 1,
    text: "I'd like to be under the sea in an octupus's garden"
  },
  {
    id: 2,
    text: "You got that sand all over your feet"
  }
];

function fetchPosts() {
  let ringoPostsAtTheTime = ringoPosts;
  console.log("fetch posts...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve(ringoPostsAtTheTime);
    }, 3000 * Math.random());
  });
}

function fetchTrivia() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text:
            'The nickname "Ringo" came from his habit of wearing numerous rings.'
        },
        {
          id: 2,
          text: "Plays the drums left-handed with a right-handed drum set."
        },
        {
          id: 3,
          text: "Nominated for one Daytime Emmy Award, but did not win"
        }
      ]);
    }, 3000 * Math.random());
  });
}
