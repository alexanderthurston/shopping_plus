import { Button } from '../common/button';
import { useState } from 'react';

export const Item = ({ item, addToShoppingList, toggleFavorite, editName, deleteItem }) => {
  const [name, setName] = useState(item.name);
  const [edit, setEdit] = useState(false);

  console.log('rerender');

  return (
    <div
      key={item.id}
      className={
        (item.favorite ? 'bg-yellow-200 ' : ' ') + 'inline-block flex justify-between items-center border-t border-b'
      }
    >
      {!edit && (
        <input
          className="shopping-list-input star"
          type="checkbox"
          onChange={() => toggleFavorite(item)}
          checked={item.favorite}
        />
      )}

      {!edit && <span className="text-xl">{item.name}</span>}
      {edit && (
        <div className="w-1/2 p-2 m-4">
          <input className="border-4 text-xl" type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
      )}
      <div>
        {!edit && (
          <span className="justify-end text-xl">
            {addToShoppingList && <Button onClick={() => addToShoppingList(item)}>+</Button>}
          </span>
        )}
        {!edit && (
          <span className="justify-end text-xl">
            <Button onClick={() => setEdit(true)}>Edit</Button>
          </span>
        )}
        {editName && edit && (
          <div className="w-1/2 p-2 m-2">
            <span className="justify-end text-xl">
              <Button
                onClick={() => {
                  editName(item, name);
                  setEdit(false);
                }}
              >
                Edit
              </Button>
            </span>
          </div>
        )}
        {!edit && (
          <span className="justify-end text-xl">
            {deleteItem && (
              <Button del="true" onClick={() => deleteItem(item)}>
                X
              </Button>
            )}
          </span>
        )}
      </div>
    </div>
  );
};
