import { useState } from 'react'

function ItemRow({ item, onItemUpdated, onItemDeleted, isEditing, editDisabled, onEdit, onCancel }) {
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [editName, setEditName] = useState('')
  const [editQuantity, setEditQuantity] = useState('')
  const [saving, setSaving] = useState(false)
  const [editError, setEditError] = useState('')

  async function handleDelete() {
    if (deleting) return

    setDeleting(true)
    setDeleteError('')
    try {
      const response = await fetch(`/api/items/${item.id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete item. Please try again.')
      }

      onItemDeleted(item.id)
    } catch (error) {
      setDeleteError(error.message || 'Failed to delete item.')
    } finally {
      setDeleting(false)
    }
  }

  function handleEdit() {
    onEdit(item.id)
    setEditName(item.name)
    setEditQuantity(String(item.quantity))
    setEditError('')
  }

  async function handleSave(event) {
    event.preventDefault()
    if (saving) return

    const numericQuantity = Number(editQuantity)
    if (!editName.trim() || editQuantity === '' || !Number.isInteger(numericQuantity) || numericQuantity < 0) {
      setEditError('Enter a name and a non-negative whole quantity.')
      return
    }

    setSaving(true)
    setEditError('')
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim(), quantity: numericQuantity }),
      })
      if (!response.ok) {
        throw new Error('Failed to save item. Please try again.')
      }

      const updatedItem = await response.json()
      onItemUpdated(updatedItem)
      onCancel()
    } catch (error) {
      setEditError(error.message || 'Failed to save item.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <label>
            Item name
            <input value={editName} onChange={(event) => setEditName(event.target.value)} required disabled={saving} />
          </label>
          <label>
            Quantity
            <input type="number" min="0" step="1" value={editQuantity} onChange={(event) => setEditQuantity(event.target.value)} required disabled={saving} />
          </label>
          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
          {editError && <p role="alert">{editError}</p>}
        </form>
      ) : (
        <>
          {item.name} — Quantity: {item.quantity}
          <button
            type="button"
            onClick={handleEdit}
            disabled={editDisabled || deleting}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label={`Delete ${item.name}`}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}
      {deleteError && <p role="alert">{deleteError}</p>}
    </li>
  )
}

export default ItemRow
