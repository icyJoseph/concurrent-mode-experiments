import React, { Suspense, useState, useTransition } from "react";
import Spinner from "./Spinner";
import { fetchUserAndPosts } from "./fakeApi";

const initialResource = fetchUserAndPosts();

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

const TRANSITION_CONFIG = { timeoutMs: 3000 };

function ProfilePage() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition(TRANSITION_CONFIG);

  function handleRefresh() {
    startTransition(() => {
      setResource(fetchUserAndPosts());
    });
  }

  return (
    <Suspense fallback={<h1 className="lead">Loading Profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine resource={resource} />
      </Suspense>
      <div className="fab-bottom">
        <button
          type="button"
          className="btn btn-primary btn-large"
          disabled={isPending}
          onClick={handleRefresh}
        >
          {isPending ? "Refreshing" : "Refresh"}
        </button>
      </div>
      {isPending && <Spinner />}
    </Suspense>
  );
}

function App() {
  return (
    <>
      <div className="container">
        <h1 className="display-2">Experimental</h1>
        <ProfilePage />
      </div>
    </>
  );
}

export default App;
