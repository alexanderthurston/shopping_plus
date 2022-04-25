import { Item } from './item';

export const Items = ({ heading, items, addToShoppingList, toggleFavorite }) => {
  return (
    <div className="">
      <p className="text-center text-lg">{heading}</p>
      <div className="border-4 border-green-700">
        {items.map((item) => (
          <Item key={item.id} item={item} addToShoppingList={addToShoppingList} toggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
};
