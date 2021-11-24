export const getAllConceptProperties = (conceptGroup) => {
  const allConceptProperties = [];
  conceptGroup?.forEach((group) => {
    if (group.conceptProperties) {
      allConceptProperties.push(group.conceptProperties);
    }
  });
  return allConceptProperties.flat();
};

export const getMainIngredientRxcui = (relatedData) => {
  return relatedData?.relatedGroup?.conceptGroup[0]?.conceptProperties[0]
    ?.rxcui;
};

export const extractAssociatedMedications = (associatedData) => {
  const allConceptGroups = associatedData?.relatedGroup?.conceptGroup;
  return getAllConceptProperties(allConceptGroups);
};
