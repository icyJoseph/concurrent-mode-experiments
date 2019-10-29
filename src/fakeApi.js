export function fetchProfileData(userId) {
  let userPromise = fetchUser(userId);
  let postsPromise = fetchPosts(userId);
  return {
    userId,
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
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

export function getNextId(id) {
  return id === 3 ? 0 : id + 1;
}

export function fetchUser(userId) {
  console.log("fetch user " + userId + "...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user " + userId);
      switch (userId) {
        case 0:
          resolve({
            name: "Ringo Starr"
          });
          break;
        case 1:
          resolve({
            name: "George Harrison"
          });
          break;
        case 2:
          resolve({
            name: "John Lennon"
          });
          break;
        case 3:
          resolve({
            name: "Paul McCartney"
          });
          break;
        default:
          throw Error("Unknown user.");
      }
    }, 2500 + 2000 * Math.random());
  });
}

export function fetchPosts(userId) {
  console.log("fetch posts for " + userId + "...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts for " + userId);
      switch (userId) {
        case 0:
          resolve([
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
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text: "Turn off your mind, relax, and float downstream"
            },
            {
              id: 1,
              text: "All things must pass"
            },
            {
              id: 2,
              text: "I look at the world and I notice it's turning"
            }
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text: "Living is easy with eyes closed"
            },
            {
              id: 1,
              text: "Nothing's gonna change my world"
            },
            {
              id: 2,
              text: "I am the walrus"
            }
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: "Woke up, fell out of bed"
            },
            {
              id: 1,
              text: "Here, there, and everywhere"
            },
            {
              id: 2,
              text: "Two of us sending postcards, writing letters"
            }
          ]);
          break;
        default:
          throw Error("Unknown user.");
      }
    }, 2500 + 2000 * Math.random());
  });
}
