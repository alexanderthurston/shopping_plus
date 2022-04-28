import { Item } from './item';

export const Items = ({ heading, items, addToShoppingList, toggleFavorite, deleteItem, editName }) => {
  return (
    <div>
      <p className="text-center text-2xl">{heading}</p>
      <div className="border-4">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            addToShoppingList={addToShoppingList}
            toggleFavorite={toggleFavorite}
            deleteItem={deleteItem}
            editName={editName}
          />
        ))}
      </div>
    </div>
  );
};
