export const Item = ({ item, addToShoppingList, toggleFavorite }) => {
  return (
    <div key={item.id} className="flex flex-row align-middle justify-space-between">
      <div className="flex flex-col">
        <input type="checkbox" onChange={() => toggleFavorite(item)} checked={item.favorite} />
      </div>
      <div className="flex flex-col" onClick={() => addToShoppingList(item)}>
        {item.name}
      </div>
    </div>
  );
};
