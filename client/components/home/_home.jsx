import { filter, update } from 'lodash';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { NavBar } from '../common/nav';
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
  const [shoppingItems, setShoppingItems] = useState([]);
  const [favItems, setFavItems] = useState([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { allItems, allRecipes } = await api.get('/all');
    baseItems = allItems.filter((i) => !i.onShoppingList);
    favoriteItems = baseItems.filter((i) => i.favorite);
    regItems = baseItems.filter((i) => !i.favorite).sort((curr, prev) => prev.recent - curr.recent);
    shopItems = allItems.filter((i) => i.onShoppingList);
    setItems(regItems);
    setRecipes(allRecipes);
    setShoppingItems(shopItems);
    setFavItems(favoriteItems);
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

    setItems(items.filter((i) => i !== item));
    setShoppingItems([...shoppingItems, updatedItem]);
  };

  const removeFromShoppingList = async (item) => {
    const itemBody = {
      name: item.name,
      favorite: item.favorite,
      onShoppingList: false,
      checked: item.checked,
    };

    const { updatedItem } = await api.put(`/items/${item.id}`, itemBody);

    setShoppingItems(shoppingItems.filter((i) => i !== item));
    if (updatedItem.recipe == null) {
      setItems([updatedItem, ...items]);
    }
  };

  const checkItem = async (item) => {
    const itemBody = {
      name: item.name,
      favorite: item.favorite,
      onShoppingList: item.onShoppingList,
      checked: !item.checked,
    };

    const { updatedItem } = await api.put(`/items/${item.id}`, itemBody);

    setShoppingItems(
      shoppingItems.map((i) => {
        if (i === item) {
          return updatedItem;
        } else {
          return i;
        }
      }),
    );
  };

  const toggleFavorite = async (item) => {
    const itemBody = {
      name: item.name,
      favorite: !item.favorite,
      onShoppingList: item.onShoppingList,
      checked: item.checked,
    };

    const { updatedItem } = await api.put(`/items/${item.id}`, itemBody);

    setItems(
      items.map((i) => {
        if (i === item) {
          return updatedItem;
        } else {
          return i;
        }
      }),
    );

    if (!updatedItem.favorite) {
      setFavItems(favItems.filter((f) => f !== item));
    } else {
      setFavItems([...favItems, updatedItem]);
    }
  };

  const addRecipeItemsToShoppingList = async (recipe) => {
    await recipe.items.map((i) => {
      if (i.onShoppingList) {
        return;
      } else {
        addToShoppingList(i);
      }
    });
    window.location.reload();
  };

  const clearAllShoppingItems = async () => {
    await shoppingItems.map((i) => removeFromShoppingList(i));
    window.location.reload();
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
      <NavBar user={user} logout={logout} roles={roles} navigate={navigate} />
      <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
          {shoppingItems && (
            <ShoppingList
              shoppingItems={shoppingItems}
              checkItem={checkItem}
              removeFromShoppingList={removeFromShoppingList}
              clearAllShoppingItems={clearAllShoppingItems}
            />
          )}
        </div>
        <div className="flex flex-col w-2/3">
          <div className="flex flex-row">
            <div className="flex flex-col w-1/2">
              {items && (
                <Items
                  heading="Recent Items"
                  items={items}
                  addToShoppingList={addToShoppingList}
                  toggleFavorite={toggleFavorite}
                />
              )}
              {favItems && <Items heading="Favorite Items" items={favItems} toggleFavorite={toggleFavorite} />}
              {recipes && <Recipes recipes={recipes} addRecipeItemsToShoppingList={addRecipeItemsToShoppingList} />}
            </div>
            <div className="flex flex-col w-1/2">
              <p className="text-center text-lg">Add Item</p>
              <div className="flex rounded border-4 p-4 m-2">
                <AddItemModal saveItem={saveItem} forRecipe={false} />
              </div>
              <p className="text-center text-lg">Add Recipe</p>
              <div className="flex flex-1 rounded border-4 p-4 m-2">
                <AddRecipeModal saveRecipe={saveRecipe} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
