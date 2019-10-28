import React, { useState, useEffect } from "react";
import { fetchUser, fetchPosts } from "./fakeApi";

function ProfileDetails() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  if (user === null) {
    return <h1 className="lead">Loading Profile...</h1>;
  }

  return <h1>{user.name}</h1>;
}

function ProfileTimeLine() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  if (posts === null) {
    return <h1 className="lead">Loading Posts...</h1>;
  }

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
    <>
      <ProfileDetails />
      <ProfileTimeLine />
    </>
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
