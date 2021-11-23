export const getAllConceptProperties = (conceptGroup) =>{
    const allConceptProperties = []
    conceptGroup.forEach(group => {
        if(group.conceptProperties){
            allConceptProperties.push(group.conceptProperties)
        }
    });
   return allConceptProperties.flat()
}