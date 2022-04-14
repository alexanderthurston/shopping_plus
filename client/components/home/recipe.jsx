export const Recipe = ({ recipe }) => {
  return <div key={recipe.id}>{recipe.name}</div>;
};
