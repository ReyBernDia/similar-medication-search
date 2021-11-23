export const MedicationList = ({results, onSelect}) =>{
  return(
  <div className="results-container">
    {
    results?.map(
      med => <li key={med} onClick={() => onSelect && onSelect(med)}>{med}</li>)
    }
  </div>
  )
}