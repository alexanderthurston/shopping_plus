import { Item } from './item';

export const Items = ({ items, addToShoppingList }) => {
  return (
    <div className="">
      <h2>Items</h2>
      <div className="border-4 border-green-700">
        {items.map((item) => (
          <Item key={item.id} item={item} addToShoppingList={addToShoppingList} />
        ))}
      </div>
    </div>
  );
};
