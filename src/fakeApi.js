import YT from "yandex-translate";

const { translate } = YT(process.env.REACT_APP_YANDEX);

export function fetchTranslation(text) {
  const promise = new Promise((resolve, reject) => {
    translate(
      text,
      {
        to: "fr"
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.text);
        }
      }
    );
  });
  return wrapPromise(promise);
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
