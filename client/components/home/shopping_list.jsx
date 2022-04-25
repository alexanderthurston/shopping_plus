import { Button } from "../common/button";

export const ShoppingList = ({ shoppingItems, checkItem, removeFromShoppingList, clearAllShoppingItems }) => {
  return (
    <div className="flex flex-col align-middle">
      <div className="flex justify-between">
        <span>Shopping List</span>
        <Button onClick={() => clearAllShoppingItems()} children="Clear all Items" />
      </div>
      {shoppingItems.map((i) => (
        <div key={i.id} className="bg-green-200 inline-block">
          <input type="checkbox" onChange={() => checkItem(i)} checked={i.checked} />
          {i.name}
          <span className="justify-end">
            <Button onClick={() => removeFromShoppingList(i)} children="X" />
          </span>
        </div>
      ))}
    </div>
  );
};
