import React, { Suspense } from "react";
import { fetchProfileData } from "./fakeApi";

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

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2>Fun Facts</h2>
      <ul>
        {trivia.map(fact => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense
        fallback={<h1 className="lead">Loading Posts and fun facts...</h1>}
      >
        <ProfileTimeLine resource={resource} />
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <Suspense fallback={<h1 className="lead">Loading Profile.</h1>}>
        <ProfilePage resource={initialResource} />
      </Suspense>
    </div>
  );
}

export default App;
