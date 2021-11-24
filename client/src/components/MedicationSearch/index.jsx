import { useState } from "react";

import { MedicationList } from "../MedicationList";
import { Search } from "../Search";

export const MedicationSearch = ({ onSelect }) => {
  const [results, setResults] = useState();
  const onSubmit = async (params) => {
    fetch(`/search/${params}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.content);
        console.log(data.content);
      });
  };
  return (
    <div className="medication-search__container">
      <Search onSubmit={onSubmit} />
      {results && <MedicationList results={results} onSelect={onSelect} />}
    </div>
  );
};
