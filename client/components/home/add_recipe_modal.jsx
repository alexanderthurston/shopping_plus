import { useState, useContext } from 'react';
import { Button } from '../common/button';
import { AddItemModal } from './add_item_modal';
import { ApiContext } from '../../utils/api_context';
import { Items } from './items';

export const AddRecipeModal = ({ saveRecipe }) => {
  const api = useContext(ApiContext);
  const [recipeName, setRecipeName] = useState('');
  const [recipeItems, setRecipeItems] = useState([]);

  const saveRecipeItem = async (name) => {
    const itemBody = {
      name,
      favorite: false,
      onShoppingList: false,
      checked: false,
    };

    const { item } = await api.post('/items', itemBody);
    setRecipeItems([...recipeItems, item]);
  };

  return (
    <div>
      <label htmlFor="recipe">Recipe Name: </label>
      <input
        className="border-2"
        name="recipe"
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <AddItemModal saveItem={saveRecipeItem} />
      {recipeItems && <Items items={recipeItems} heading="Recipe Items" />}
      <div className='w-full flex justify-end'>
      <Button
        onClick={() => {
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
