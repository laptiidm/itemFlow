import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [createError, setCreateError] = useState('')
  const [deletingIds, setDeletingIds] = useState([])
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      try {
        const response = await fetch('/api/items', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load items.')
        }

        const data = await response.json()
        setItems(data)
      } catch {
        if (!controller.signal.aborted) {
          setError('Failed to load items. Please try again later.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [])

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
      setItems((currentItems) => [...currentItems, item])
      setName('')
      setQuantity('')
    } catch (error) {
      setCreateError(error.message || 'Failed to create item.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (deletingIds.includes(id)) return

    setDeletingIds((currentIds) => [...currentIds, id])
    setDeleteError('')
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete item. Please try again.')
      }

      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    } catch (error) {
      setDeleteError(error.message || 'Failed to delete item.')
    } finally {
      setDeletingIds((currentIds) => currentIds.filter((itemId) => itemId !== id))
    }
  }

  return (
    <main className="inventory">
      <h1>ItemFlow</h1>
      {!loading && !error && (
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
      )}
      <h2>Items</h2>
      {loading && <p role="status">Loading items...</p>}
      {error && <p role="alert">{error}</p>}
      {deleteError && <p role="alert">{deleteError}</p>}
      {!loading && !error && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} — Quantity: {item.quantity}
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingIds.includes(item.id)}
                aria-label={`Delete ${item.name}`}
              >
                {deletingIds.includes(item.id) ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
