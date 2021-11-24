export const MedicationList = ({ results, onSelect }) => {
  const getClassName = () => {
    return onSelect ? "can-select" : "cannot-select";
  };
  const resultsToDisplay = !results.length
    ? "No results to display"
    : results?.map((med) => (
        <li
          className={getClassName()}
          key={med.rxcui}
          onClick={() => onSelect && onSelect(med.name, med.rxcui)}
        >
          {med.name}
        </li>
      ));
  return <div className="results-container">{resultsToDisplay}</div>;
};
