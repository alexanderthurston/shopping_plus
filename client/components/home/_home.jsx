import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { AddItemModal } from './add_item_modal';
import { AddRecipeModal } from './add_recipe_modal';
import { Items } from './items';
import { Recipes } from './recipes';
import { ShoppingList } from './shopping_list';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // const [recipeItems, setRecipeItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const shoppingItemsRef = useRef([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { allItems, allRecipes } = await api.get('/all');
    // recItems = allItems.filter((i) => i.recipe != null);
    regItems = allItems.filter((i) => i.recipe == null);
    shopItems = allItems.filter((i) => i.onShoppingList);
    shoppingItemsRef.current.push(shopItems);

    setItems(regItems);
    setRecipes(allRecipes);
    setShoppingItems(...shoppingItemsRef.current);
    // setRecipeItems(recItems);
    setUser(res.user);
    setLoading(false);
  }, []);

  const saveItem = async (name) => {
    const itemBody = {
      name,
      favorite: false,
      onShoppingList: false,
      checked: false,
    };

    const { item } = await api.post('/items', itemBody);
    setItems([...items, item]);
  };

  const saveRecipe = async (name, items) => {
    const recipeBody = {
      name,
      items,
    };

    const { recipe } = await api.post('/recipes', recipeBody);
    setRecipes([...recipes, recipe]);
  };

  const addToShoppingList = async (item) => {
    const itemBody = {
      name: item.name,
      favorite: item.favorite,
      onShoppingList: true,
      checked: item.checked,
    };

    const { updatedItem } = await api.put(`/items/${item.id}`, itemBody);

    // shoppingItemsRef.current.push(updatedItem);

    // setShoppingItems([...shoppingItemsRef.current]);
  };

  const checkItem = async (item) => {
    item.checked = !item.checked;

    const { updatedItem } = api.put('/items', item);
  };

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(shoppingItems);

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
      <div className="flex flex-row">
        <div className="flex flex-col">
          {shoppingItems && <ShoppingList shoppingItems={shoppingItems} checkItem={checkItem} />}
        </div>
        <div className="flex flex-col">
          <AddItemModal saveItem={saveItem} forRecipe={false} />
          <AddRecipeModal saveRecipe={saveRecipe} />
          {items && <Items items={items} addToShoppingList={addToShoppingList} />}
          {recipes && <Recipes recipes={recipes} />}
        </div>
      </div>
    </div>
  );
};
