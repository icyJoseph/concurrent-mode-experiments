import React, { Suspense, useState } from "react";
import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

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

function ProfilePage({ resource, showProfile }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <div className="fab-bottom">
        <button type="button" className="btn btn-info" onClick={showProfile}>
          Refresh
        </button>
      </div>
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine resource={resource} />
      </Suspense>
    </>
  );
}

function HomePage({ showProfile }) {
  return (
    <>
      <h1 className="display-3">Home Page</h1>
      <div className="fab-bottom">
        <button type="button" className="btn btn-primary" onClick={showProfile}>
          Open Profile
        </button>
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
