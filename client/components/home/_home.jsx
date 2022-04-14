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

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { items, recipes } = await api.get('/all');
    console.log(items);
    recipeItems = items.filter((i) => console.log());
    console.log(recipeItems);

    // setItems(items);
    // setRecipes(recipes);
    setUser(res.user);
    setLoading(false);
  }, []);

  const saveItem = async (name) => {
    const itemBody = {
      name,
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

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <div className="flex flex-col"></div>
        <div className="flex flex-col">
          <AddItemModal saveItem={saveItem} forRecipe={false} />
          <AddRecipeModal saveRecipe={saveRecipe} />
          {items && <Items items={items} />}
          {recipes && <Recipes recipes={recipes} />}
        </div>
      </div>
    </div>
  );
};
