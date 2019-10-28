import React, { useState, useEffect } from "react";
import { fetchUser, fetchPosts, getNextId } from "./fakeApi";

function ProfileDetails({ user }) {
  return <h1>{user.name}</h1>;
}

function ProfileTimeLine({ id }) {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetchPosts(id).then(setPosts);
  }, [id]);

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

function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  if (user === null) {
    return <h1 className="lead">Loading Profile...</h1>;
  }

  return (
    <>
      <ProfileDetails user={user} />
      <ProfileTimeLine id={id} />
    </>
  );
}

function App() {
  const [id, setId] = useState(0);

  const handleClick = () => {
    const next = getNextId(id);
    return setId(next);
  };

  return (
    <>
      <div className="container">
        <h1 className="display-2">Experimental</h1>
        <ProfilePage id={id} />
      </div>
      <div className="fab-bottom">
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Next
        </button>
      </div>
    </>
  );
}

export default App;
