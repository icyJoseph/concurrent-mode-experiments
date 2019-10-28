import React, { useState, useEffect } from "react";
import { fetchProfileData } from "./fakeApi";

// kicks in ASAP
const promise = fetchProfileData();

function ProfileDetails({ user }) {
  if (user === null) {
    return <h1 className="lead">Loading User...</h1>;
  }
  return <h1>{user.name}</h1>;
}

function ProfileTimeLine({ posts }) {
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
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then(({ user, posts }) => {
      setUser(user);
      setPosts(posts);
    });
  }, []);

  return (
    <>
      <ProfileDetails user={user} />
      <ProfileTimeLine posts={posts} />
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
