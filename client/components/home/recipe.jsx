export const Recipe = ({ recipe, addRecipeItemsToShoppingList }) => {
  return (
    <div key={recipe.id} onClick={() => addRecipeItemsToShoppingList(recipe)}>
      {recipe.name}
    </div>
  );
};
