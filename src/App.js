import React, { useState, Suspense, useTransition } from "react";
import { fetchTranslation } from "./fakeApi";

const initialQuery = "Hello, World!";
const initialResource = fetchTranslation(initialQuery);

function App() {
  const [query, setQuery] = useState(initialQuery);
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  function handleChange(e) {
    const value = e.target.value;
    startTransition(() => {
      setQuery(value);
      setResource(fetchTranslation(value));
    });
  }

  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <input value={query} onChange={handleChange} />
      <Suspense fallback={<p className="lead">Loading...</p>}>
        <Translation resource={resource} />
      </Suspense>
    </div>
  );
}

function Translation({ resource }) {
  return (
    <p>
      <b>{resource.read()}</b>
    </p>
  );
}

export default App;
