import React, { Suspense, useState, useTransition } from "react";
import Spinner from "./Spinner";
import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

function Button({ children, className, onClick }) {
  const [startTransition, isPending] = useTransition({ timeoutMs: 4000 });

  function handleClick() {
    startTransition(() => onClick());
  }

  return (
    <>
      <button
        type="button"
        className={`${className} btn-large`}
        onClick={handleClick}
      >
        {children}
      </button>
      {isPending && (
        <span className="delayedSpinner">
          <Spinner />
        </span>
      )}
    </>
  );
}

function ProfileDetails({ resource }) {
  // throws Promise, and lets its fiber know that it is pending data
  const user = resource.user.read();
  return <h1 className="display-4">{user.name}</h1>;
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

function ProfilePage({ resource, showProfile }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <div className="fab-bottom">
        {/* Already wrapped in useTransition, and the experience is still bad!*/}
        <Button className="btn btn-info" onClick={showProfile}>
          Refresh
        </Button>
      </div>
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine resource={resource} />
      </Suspense>
      <Suspense fallback={<p className="lead">Loading Trivia...</p>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2 className="display-5">Fun Facts</h2>
      <ul>
        {trivia.map(({ id, text }) => (
          <li key={id}>{text}</li>
        ))}
      </ul>
    </>
  );
}

function HomePage({ showProfile }) {
  return (
    <>
      <h1 className="display-3">Home Page</h1>
      <div className="fab-bottom">
        <Button className="btn btn-primary" onClick={showProfile}>
          Open Profile
        </Button>
      </div>
    </>
  );
}

// Kills the whole app to load more posts
function App() {
  const [tab, setTab] = useState("home");
  // Because, we now have the posts and user resources, inside resource
  // move the resource to the top level
  const [resource, setResource] = useState(initialResource);

  function showProfile() {
    setResource(fetchProfileData());
    setTab("profile");
  }

  return (
    <div className="container">
      <Suspense fallback={<h1 className="lead">Loading the App...</h1>}>
        {tab === "home" ? (
          <HomePage showProfile={showProfile} />
        ) : (
          <ProfilePage resource={resource} showProfile={showProfile} />
        )}
      </Suspense>
    </div>
  );
}

export default App;
