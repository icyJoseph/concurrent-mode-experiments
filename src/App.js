import React, { useState, Suspense, useTransition } from "react";
import { fetchTranslation } from "./fakeApi";

const initialQuery = "Hello, World!";
const initialResource = fetchTranslation(initialQuery);

function App() {
  const [query, setQuery] = useState(initialQuery);
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({ timeoutMs: 5000 });

  // divide user blocking from the rest to provide immediate user feedback
  function handleChange(e) {
    const value = e.target.value;
    // this does not need to Suspense (no Suspense boundary around it)
    setQuery(value);

    startTransition(() => {
      // this has a Suspend Boundary around it
      setResource(fetchTranslation(value));
    });
  }

  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <input value={query} onChange={handleChange} />
      <Suspense fallback={<p className="lead">Loading...</p>}>
        <div className={isPending ? "is-pending" : ""}>
          <Translation resource={resource} />
        </div>
      </Suspense>
    </div>
  );
}

function Translation({ resource }) {
  return (
    <p className="lead">
      <b>{resource.read()}</b>
    </p>
  );
}

export default App;
