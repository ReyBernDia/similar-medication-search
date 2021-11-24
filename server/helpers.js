export const getAllConceptProperties = (conceptGroup) =>{
    const allConceptProperties = []
    conceptGroup.forEach(group => {
        if(group.conceptProperties){
            allConceptProperties.push(group.conceptProperties)
        }
    });
   return allConceptProperties.flat()
}

export const getMainIngredient = (relatedData) =>{
  return relatedData?.relatedGroup?.conceptGroup[0]?.conceptProperties[0]?.rxcui
}