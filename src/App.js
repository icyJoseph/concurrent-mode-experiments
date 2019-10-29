import React, { Suspense } from "react";
import { fetchProfileData } from "./fakeApi";

// This is not a Promise. It's a special object from our Suspense integration.
const resource = fetchProfileData();

// With Suspense, we don’t wait for the response to come back before we start rendering.
// In fact, we start rendering pretty much immediately after kicking off the network request:
function ProfileDetails() {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

/**
 * @description calling on read, throws a Promise, which is caught by React's Suspense boundary
 */

// Same here!
function ProfileTimeLine() {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}

function ProfilePage() {
  return (
    <Suspense fallback={<h1 className="lead">Loading Profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine />
      </Suspense>
    </Suspense>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <ProfilePage />
    </div>
  );
}

export default App;
