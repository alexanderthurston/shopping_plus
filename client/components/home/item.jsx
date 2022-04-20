export const Item = ({ item, addToShoppingList }) => {
  return (
    <div key={item.id} onClick={() => addToShoppingList(item)}>
      {item.name}
    </div>
  );
};
