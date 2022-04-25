import { Button } from '../common/button';

export const Recipe = ({ recipe, addRecipeItemsToShoppingList }) => {
  return (
    <div key={recipe.id} className="bg-blue-200 inline-block flex justify-between items-center border-t border-b ">
      <span className="text-xl pl-4">{recipe.name}</span>

      <span className="justify-end text-xl">
        <Button onClick={() => addRecipeItemsToShoppingList(recipe)} children="+" />
      </span>
    </div>
  );
};
