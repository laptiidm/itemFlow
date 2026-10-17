import { useEffect, useState } from 'react'
import AddItemForm from './components/AddItemForm'
import ItemList from './components/ItemList'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  function handleItemCreated(item) {
    setItems((currentItems) => [...currentItems, item])
  }

  function handleItemUpdated(updatedItem) {
    setItems((currentItems) => currentItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    ))
  }

  function handleItemDeleted(itemId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }

  return (
    <main className="inventory">
      <h1>ItemFlow</h1>
      {!loading && !error && <AddItemForm onItemCreated={handleItemCreated} />}
      <h2>Items</h2>
      {loading && <p role="status">Loading items...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ItemList
          items={items}
          onItemUpdated={handleItemUpdated}
          onItemDeleted={handleItemDeleted}
        />
      )}
    </main>
  )
}

export default App
