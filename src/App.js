import React, { Suspense, useState, useTransition } from "react";
import Spinner from "./Spinner";
import { fetchProfileData, getNextId } from "./fakeApi";

const initialResource = fetchProfileData(0);

function ProfileDetails({ resource }) {
  // throws Promise, and lets its fiber know that it is pending data
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeLine({ resource }) {
  // throws Promise, and lets its fiber know that it is pending data
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1 className="lead">Loading Profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine resource={resource} />
      </Suspense>
    </Suspense>
  );
}

/**
 *
 * @const startTransition is a function. We’ll use it to tell React which state update we want to defer.
 * @const isPending is a boolean. It’s React telling us whether that transition is ongoing at the moment.
 *
 */
function App() {
  // Because, we now have the posts and user resources, inside resource
  // move the resource to the top level
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const handleClick = () =>
    // bake this into the Design System!
    startTransition(() => {
      const next = getNextId(resource.userId);
      return setResource(fetchProfileData(next));
    });

  return (
    <>
      <div className="container">
        <h1 className="display-2">Experimental</h1>
        <ProfilePage resource={resource} />
      </div>
      {isPending && <Spinner />}
      <div className="fab-bottom">
        <button
          type="button"
          className="btn btn-primary"
          disabled={isPending}
          onClick={handleClick}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
