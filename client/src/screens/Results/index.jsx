import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { MedicationList } from "../../components/MedicationList";
import { Loader } from "../../components/Loader";

const BASE_CLASS = "search-results";
export const Results = () => {
  let params = useParams();
  const [results, setResults] = useState();

  useEffect(() => {
    fetch(`/related/${params.rxcui}`)
      .then((res) => res.json())
      .then((data) => setResults(data.content));
  }, []);

  return (
    <div className={BASE_CLASS}>
      <nav className={`${BASE_CLASS}__home-button`}>
        <Link to="/">Back</Link>
      </nav>
      <p className={`${BASE_CLASS}__header`}>
        Medications associated with {params.name}
      </p>
      {results ? <MedicationList results={results} /> : <Loader />}
    </div>
  );
};
