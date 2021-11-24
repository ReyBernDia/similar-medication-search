import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader, MedicationList, MedicationSearch } from "../../components";

export const Home = () => {
  let navigate = useNavigate();
  const [popularMedications, setPopular] = useState();

  useEffect(() => {
    fetch("/updatePopular")
      .then((res) => res.json())
      .then((data) => {
        const popualrMeds = data.content.map((item) => {
          return { name: item, rxcui: item };
        });
        setPopular(popualrMeds);
      });
  }, []);

  const onMedicationSelection = (name, rxcui) => {
    navigate(`search/${rxcui}/${name}`);
  };

  const onSelectPopular = async (name, _rxcui) => {
    fetch(`/getRxcui/${name}`)
      .then((res) => res.json())
      .then((data) => {
        navigate(`search/${data.content}/${name}`);
      });
  };

  return (
    <div className="home">
      <section className="home__popular-section">
        <p className="home__section-title">Popular medication searches</p>
        {popularMedications ? (
          <MedicationList
            results={popularMedications}
            onSelect={onSelectPopular}
          />
        ) : (
          <Loader />
        )}
      </section>
      <section className="home__medication-search">
        <MedicationSearch onSelect={onMedicationSelection} />
      </section>
    </div>
  );
};
