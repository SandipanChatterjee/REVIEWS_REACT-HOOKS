export const updatedObj = (oldPropertise, newPropertise) => {
  console.log("updatedObj###", oldPropertise, newPropertise);
  return {
    ...oldPropertise,
    ...newPropertise,
  };
};
