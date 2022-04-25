import { useState } from 'react';
import { Button } from '../common/button';

export const AddItemModal = ({ saveItem, forRecipe }) => {
  const [itemName, setItemName] = useState('');

  return (
    <div>
      <label htmlFor="item">Item Name: </label>
      <input
        className="border-2"
        name="item"
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <Button
        type="button"
        onClick={() => {
          saveItem(itemName);
          setItemName('');
        }}
      >
        {forRecipe ? 'Add Item' : 'Save Item'}
      </Button>
    </div>
  );
};
