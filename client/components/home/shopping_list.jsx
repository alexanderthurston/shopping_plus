export const ShoppingList = ({ shoppingItems, checkItem }) => {
  console.log(shoppingItems);
  return (
    <div>
      <h2>Shopping List</h2>
      {shoppingItems &&
        shoppingItems.map((i) => {
            console.log(i.name);
          <div className="bg-green-200">
            {i.name}
            {/* <input type="checkbox" onClick={() => checkItem(i)} /> */}
          </div>;
        })}
    </div>
  );
};
