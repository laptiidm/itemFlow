import { useState } from 'react'

function AddItemForm({ onItemCreated }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [createError, setCreateError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return

    const numericQuantity = Number(quantity)
    if (!name.trim() || quantity === '' || !Number.isInteger(numericQuantity) || numericQuantity < 0) {
      setCreateError('Enter a name and a non-negative whole quantity.')
      return
    }

    setSubmitting(true)
    setCreateError('')
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), quantity: numericQuantity }),
      })
      if (!response.ok) {
        throw new Error('Failed to create item. Please check the input and try again.')
      }

      const item = await response.json()
      onItemCreated(item)
      setName('')
      setQuantity('')
    } catch (error) {
      setCreateError(error.message || 'Failed to create item.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add item</h2>
      <label>
        Item name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={submitting}
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          min="0"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
          disabled={submitting}
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add item'}
      </button>
      {createError && <p role="alert">{createError}</p>}
    </form>
  )
}

export default AddItemForm
