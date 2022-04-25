import { useState, useContext } from 'react';
import { Button } from '../common/button';
import { AddItemModal } from './add_item_modal';
import { ApiContext } from '../../utils/api_context';
import { Items } from './items';

export const AddRecipeModal = ({ saveRecipe, setErrorMessage }) => {
  const api = useContext(ApiContext);
  const [recipeName, setRecipeName] = useState('');
  const [recipeItems, setRecipeItems] = useState([]);

  const saveRecipeItem = async (name) => {
    if (!name) {
      setErrorMessage('Recipe item name cannot be empty');
    }
    const itemBody = {
      name,
      favorite: false,
      onShoppingList: false,
      checked: false,
    };

    const { item } = await api.post('/items', itemBody);
    if (item) setErrorMessage('');
    setRecipeItems([...recipeItems, item]);
  };

  return (
    <div>
      <div className="text-xl text-blue-600 text-center p-2 m-4">Please add all items before saving recipe</div>
      <label htmlFor="recipe">Recipe Name: </label>
      <input
        className="border-2"
        name="recipe"
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <AddItemModal saveItem={saveRecipeItem} forRecipe={true} />
      {recipeItems && <Items items={recipeItems} heading="Recipe Items" />}
      <div className="w-full flex">
        <Button
          onClick={() => {
            if (!recipeName) {
              setErrorMessage('Recipe name cannot be empty.');
              return;
            }
            saveRecipe(recipeName, recipeItems);
            setRecipeItems([]);
            setRecipeName('');
          }}
        >
          Save Recipe
        </Button>
      </div>
    </div>
  );
};
