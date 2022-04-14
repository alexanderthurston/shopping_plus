import { useState } from 'react';
import { Button } from '../common/button';

export const AddItemModal = ({ saveItem, forRecipe }) => {
  const [itemName, setItemName] = useState('');

  return (
    <div>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      <Button type="button" onClick={() => saveItem(itemName)}>
        Save Item {forRecipe && 'to Recipe'}
      </Button>
    </div>
  );
};
