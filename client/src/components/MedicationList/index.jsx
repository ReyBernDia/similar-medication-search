export const MedicationList = ({ results, onSelect }) => {
  const resultsToDisplay = !results.length
    ? "No results to display"
    : results?.map((med) => (
        <li
          key={med.rxcui}
          onClick={() => onSelect && onSelect(med.name, med.rxcui)}
        >
          {med.name}
        </li>
      ));
  return <div className="results-container">{resultsToDisplay}</div>;
};
