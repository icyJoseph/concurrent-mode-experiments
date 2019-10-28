import React, { Suspense } from "react";
import { fetchProfileData } from "./fakeApi";

const resource = fetchProfileData();

function ProfileDetails() {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

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
