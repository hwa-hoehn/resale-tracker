import { useState } from 'react'
import Dashboard from './components/Dashboard'
import FilterBar from './components/FilterBar'
import ItemForm from './components/ItemForm'
import ItemTable from './components/ItemTable'
import { EMPTY_ITEM, STATUS_ORDER, STORAGE_KEY } from './constants'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getMargin } from './utils/calculations'
import './App.css'

function App() {
  // items ist der "Single Source of Truth": alles andere (Dashboard-Zahlen,
  // gefilterte/sortierte Tabelle) wird bei jedem Render daraus abgeleitet,
  // statt es separat zu speichern.
  const [items, setItems] = useLocalStorage(STORAGE_KEY, [])

  const [statusFilter, setStatusFilter] = useState('Alle')
  const [categoryFilter, setCategoryFilter] = useState('Alle')
  const [sort, setSort] = useState({ key: 'purchaseDate', direction: 'desc' })

  // formMode steuert, ob/wie das Formular angezeigt wird:
  // null = ausgeblendet, 'new' = leeres Formular, ein Item = Bearbeiten.
  const [formMode, setFormMode] = useState(null)

  function handleAddItem(item) {
    setItems((previous) => [...previous, item])
    setFormMode(null)
  }

  function handleUpdateItem(updatedItem) {
    setItems((previous) =>
      previous.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
    setFormMode(null)
  }

  function handleDeleteItem(id) {
    if (!window.confirm('Diesen Artikel wirklich löschen?')) return
    setItems((previous) => previous.filter((item) => item.id !== id))
  }

  // Bulk-Import aus einer JSON-Datei (z.B. exportierte Vinted-Artikel).
  // FileReader liest die Datei asynchron; das Ergebnis kommt im
  // "load"-Event, sobald der Browser fertig ist.
  function handleImportFile(event) {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      let importedItems
      try {
        importedItems = JSON.parse(reader.result)
      } catch {
        window.alert('Die Datei ist kein gültiges JSON.')
        return
      }
      if (!Array.isArray(importedItems)) {
        window.alert('Die JSON-Datei muss ein Array von Artikeln enthalten.')
        return
      }

      const newItems = importedItems.map((item) => ({
        ...EMPTY_ITEM,
        ...item,
        id: crypto.randomUUID(),
      }))
      setItems((previous) => [...previous, ...newItems])
      window.alert(`${newItems.length} Artikel importiert.`)
    }
    reader.readAsText(file)
  }

  const visibleItems = items
    .filter((item) => statusFilter === 'Alle' || item.status === statusFilter)
    .filter((item) => categoryFilter === 'Alle' || item.category === categoryFilter)
    .sort((a, b) => {
      const direction = sort.direction === 'asc' ? 1 : -1

      if (sort.key === 'status') {
        return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * direction
      }
      if (sort.key === 'margin') {
        return (getMargin(a).value - getMargin(b).value) * direction
      }
      if (sort.key === 'purchasePrice') {
        return (a.purchasePrice - b.purchasePrice) * direction
      }
      if (sort.key === 'targetOrSalePrice') {
        const valueA = a.status === 'Verkauft' ? a.salePrice : a.targetPrice
        const valueB = b.status === 'Verkauft' ? b.salePrice : b.targetPrice
        return (Number(valueA) - Number(valueB)) * direction
      }
      if (sort.key === 'purchaseDate') {
        return (new Date(a.purchaseDate) - new Date(b.purchaseDate)) * direction
      }

      return String(a[sort.key]).localeCompare(String(b[sort.key])) * direction
    })

  return (
    <div className="page">
      <header className="page-header">
        <h1>Resale Tracker</h1>
        <p className="page-subtitle">Secondhand-Luxus – Sourcing bis Verkauf</p>
      </header>

      <Dashboard items={items} />

      <FilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onAddClick={() => setFormMode('new')}
        onImportFile={handleImportFile}
      />

      {formMode && (
        <ItemForm
          initialItem={formMode === 'new' ? null : formMode}
          onSubmit={formMode === 'new' ? handleAddItem : handleUpdateItem}
          onCancel={() => setFormMode(null)}
        />
      )}

      <ItemTable
        items={visibleItems}
        sort={sort}
        onSortChange={setSort}
        onEdit={(item) => setFormMode(item)}
        onDelete={handleDeleteItem}
      />
    </div>
  )
}

export default App
