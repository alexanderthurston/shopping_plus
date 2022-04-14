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
    };

    const { item } = await api.post('/items', itemBody);
    console.log(item);
    setRecipeItems([...recipeItems, item]);
  };

  console.log(recipeItems);

  return (
    <div>
      <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
      <AddItemModal saveItem={saveRecipeItem} />
      {recipeItems && <Items items={recipeItems} />}
      <Button type="button" onClick={() => saveRecipe(recipeName, recipeItems)}>
        Save Recipe
      </Button>
    </div>
  );
};
