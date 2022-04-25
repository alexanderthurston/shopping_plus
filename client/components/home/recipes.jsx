import { Recipe } from './recipe';

export const Recipes = ({ recipes, addRecipeItemsToShoppingList }) => {
  return (
    <div className="">
      <p className="text-center text-lg">Recipes</p>
      <div className="border-4 border-blue-700">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} addRecipeItemsToShoppingList={addRecipeItemsToShoppingList} />
        ))}
      </div>
    </div>
  );
};
