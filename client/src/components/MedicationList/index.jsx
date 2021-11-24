export const MedicationList = ({results, onSelect}) =>{
  return(
  <div className="results-container">
    {
    results?.map(
      med => <li key={med.rxcui} onClick={() => onSelect && onSelect(med.rxcui, med.name)}>{med.name}</li>)
    }
  </div>
  )
}