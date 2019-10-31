import React, { SuspenseList, Suspense } from "react";
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
  // revealOrder: "forwards", "backwards" or "together"
  // tail="collapsed"
  return (
    <SuspenseList revealOrder="backwards" tail="collapsed">
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1 className="lead">Loading Posts...</h1>}>
        <ProfileTimeLine resource={resource} />
      </Suspense>
      <Suspense fallback={<h1 className="lead">Loadingfun facts...</h1>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <Suspense fallback={<h1 className="lead">Loading Profile...</h1>}>
        <ProfilePage resource={initialResource} />
      </Suspense>
    </div>
  );
}

export default App;
