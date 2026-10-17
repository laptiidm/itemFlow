import { useEffect, useState } from 'react'
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

  return (
    <main className="inventory">
      <h1>ItemFlow</h1>
      <h2>Items</h2>
      {loading && <p role="status">Loading items...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} — Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
