import fetch from "node-fetch";
import {
  extractAssociatedMedications,
  getMainIngredientRxcui,
} from "./helpers.js";

export const getMedicationSearch = async (searchTerm) => {
  const searchDrugEnpoint = `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchTerm}`;
  try {
    const response = await fetch(searchDrugEnpoint, { method: "GET" });
    if (response?.status === 200) {
      const drugData = await response.json();
      return drugData?.drugGroup?.conceptGroup;
    }
    return;
  } catch (e) {
    console.error(e);
  }
};

const getRelatedMedications = async (rxcui) => {
  try {
    const relatedMedicationEndpoint = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/related.json?tty=SCD+SBD`;
    const response = await fetch(relatedMedicationEndpoint, { method: "GET" });
    if (response?.status === 200) {
      return extractAssociatedMedications(await response.json());
    }
    return;
  } catch (e) {
    console.error(e);
  }
};

export const getAssociatedMedications = async (selectedRxcui) => {
  const mainIngredientEndpoint = `https://rxnav.nlm.nih.gov/REST/rxcui/${selectedRxcui}/related.json?tty=IN`;
  try {
    const ingredientResponse = await fetch(mainIngredientEndpoint, {
      method: "GET",
    });
    if (ingredientResponse?.status === 200) {
      const rxcui = getMainIngredientRxcui(await ingredientResponse.json());
      if (rxcui) {
        return getRelatedMedications(rxcui);
      }
    }
    return;
  } catch (e) {
    console.error(e);
  }
};

export const getRxcuiByName = async (name) => {
  const rxcuiByNameEndpoint = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${name}`;
  try {
    const response = await fetch(rxcuiByNameEndpoint, {
      method: "GET",
    });
    if (response?.status === 200) {
      const data = await response.json();
      return data?.idGroup?.rxnormId?.[0];
    }
    return;
  } catch (e) {
    console.error(e);
  }
};
