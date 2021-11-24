
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {Loader, MedicationList, MedicationSearch} from "../../components";

export const Home = () => {
  let navigate = useNavigate();
  const [popularMedications, setPopular] = useState([]);

  useEffect(() => {
    //TODO: create popular meds search
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setPopular([data.message]));
  }, []);

  const onMedicationSelection = (rxcui, name) =>{
    navigate(`search/${rxcui}/${name}`);
  }

  return (
    <div className="home">
      <section className="home__popular-section">
        <p className="home__section-title">Popular medication searches</p>
        {!popularMedications ? 
          <Loader/> : 
          <MedicationList 
            results={popularMedications} 
            onSelect={onMedicationSelection}
          />}
      </section>
      <section className="home__medication-search">
        <MedicationSearch onSelect={onMedicationSelection}/>
      </section>
    </div>
  )
}