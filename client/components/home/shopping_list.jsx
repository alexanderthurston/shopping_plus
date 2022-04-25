import { Button } from '../common/button';

export const ShoppingList = ({ shoppingItems, checkItem, removeFromShoppingList, clearAllShoppingItems }) => {
  return (
    <div className="flex flex-col rounded border-4 m-2 align-middle border-4">
      {shoppingItems.map((i) => (
        <div
          key={i.id}
          className={
            (i.checked ? 'bg-green-200 ' : 'bg-red-200 ') +
            'inline-block flex justify-between items-center border-t border-b'
          }
        >
          <input className="shopping-list-input" type="checkbox" onChange={() => checkItem(i)} checked={i.checked} />

          <span className="text-xl">{i.name}</span>

          <span className="justify-end">
            <Button onClick={() => removeFromShoppingList(i)} children="X" />
          </span>
        </div>
      ))}
      <Button onClick={() => clearAllShoppingItems()} children="Clear all Items" />
    </div>
  );
};
