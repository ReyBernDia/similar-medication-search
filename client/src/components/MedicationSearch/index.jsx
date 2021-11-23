import {useState} from "react";

import {MedicationList} from "../MedicationList";
import { Search } from "../Search";

export const MedicationSearch = ({onSelect}) =>{
  const [results, setResults] = useState([])
  const onSubmit = (params) =>{
      //TODO: format params
      //TODO: API call to search from input
    setResults(["testing", "new", "component"])
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log("/API get request", data)
      });
  }
  return(
    <div className="medication-search__container">
      <Search onSubmit={onSubmit}/>
      <MedicationList results={results} onSelect={onSelect}/>
    </div>
  )
}