import { useState } from 'react'
import ItemRow from './ItemRow'

function ItemList({ items, onItemUpdated, onItemDeleted }) {
  const [editingId, setEditingId] = useState(null)

  function handleCancel() {
    setEditingId(null)
  }

  return (
    <ul>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onItemUpdated={onItemUpdated}
          onItemDeleted={onItemDeleted}
          isEditing={editingId === item.id}
          editDisabled={editingId !== null}
          onEdit={setEditingId}
          onCancel={handleCancel}
        />
      ))}
    </ul>
  )
}

export default ItemList
