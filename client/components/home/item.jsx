import { Button } from '../common/button';

export const Item = ({ item, addToShoppingList, toggleFavorite }) => {
  return (
    <div
      key={item.id}
      className={
        (item.favorite ? 'bg-yellow-200 ' : ' ') + 'inline-block flex justify-between items-center border-t border-b'
      }
    >
      <input
        className="shopping-list-input star"
        type="checkbox"
        onChange={() => toggleFavorite(item)}
        checked={item.favorite}
      />

      <span className="text-xl">{item.name}</span>
      
      <span className="justify-end text-xl">
      {addToShoppingList && 
        <Button onClick={() => addToShoppingList(item)} children="+" />}
      </span>

    </div>
  );
};
