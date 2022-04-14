import { Recipe } from './recipe';

export const Recipes = ({ recipes }) => {
  return (
    <div className="">
      <h2>Recipes</h2>
      <div className="border-4 border-blue-700">
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
