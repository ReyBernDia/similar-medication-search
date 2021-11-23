import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { MedicationList } from "../../components/MedicationList";
import { Loader } from "../../components/Loader";

const BASE_CLASS = "search-results"
export const Results = () => {
  let params = useParams();
  const [results, setResults] = useState()
  
  useEffect(() =>{
      // TODO: API call using params.search to fetch results 
      console.log(params.search)
  }, [])

  return(
    <div className={BASE_CLASS}>
      <nav className={`${BASE_CLASS}__home-button`}>
        <Link to="/">Back</Link>
      </nav>
      <p className={`${BASE_CLASS}__header`}>
        Medications associated with {params.search}
      </p>
      {results ? <MedicationList/> : <Loader/>}
    </div>
  )
}