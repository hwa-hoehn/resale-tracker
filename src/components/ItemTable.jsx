import { getMargin } from '../utils/calculations'
import { formatCurrency, formatDate } from '../utils/format'
import StatusBadge from './StatusBadge'

// Renders one <tr>. Each row needs its own onEdit/onDelete callback bound to
// its own item.id — that's why they're passed down instead of attached once
// for the whole table.
function ItemRow({ item, onEdit, onDelete }) {
  const margin = getMargin(item)

  return (
    <tr>
      <td data-label="Artikel">
        <div className="cell-title">{item.name}</div>
        <div className="cell-subtitle">{item.brand}</div>
      </td>
      <td data-label="Kategorie">{item.category}</td>
      <td data-label="Status">
        <StatusBadge status={item.status} />
      </td>
      <td data-label="Einkaufspreis">{formatCurrency(item.purchasePrice)}</td>
      <td data-label={item.status === 'Verkauft' ? 'Verkaufspreis' : 'Zielpreis'}>
        {item.status === 'Verkauft'
          ? formatCurrency(item.salePrice)
          : formatCurrency(item.targetPrice)}
      </td>
      <td data-label="Marge" className={margin.value >= 0 ? 'margin-positive' : 'margin-negative'}>
        {formatCurrency(margin.value)}
        {margin.expected && <span className="margin-note"> (erwartet)</span>}
      </td>
      <td data-label="Einkaufsdatum">{formatDate(item.purchaseDate)}</td>
      <td data-label="Aktionen" className="cell-actions">
        <button type="button" className="btn-link" onClick={() => onEdit(item)}>
          Bearbeiten
        </button>
        <button
          type="button"
          className="btn-link btn-danger"
          onClick={() => onDelete(item.id)}
        >
          Löschen
        </button>
      </td>
    </tr>
  )
}

const COLUMNS = [
  { key: 'name', label: 'Artikel' },
  { key: 'category', label: 'Kategorie' },
  { key: 'status', label: 'Status' },
  { key: 'purchasePrice', label: 'Einkaufspreis' },
  { key: 'targetOrSalePrice', label: 'Ziel-/Verkaufspreis' },
  { key: 'margin', label: 'Marge' },
  { key: 'purchaseDate', label: 'Einkaufsdatum' },
]

export default function ItemTable({ items, sort, onSortChange, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">Keine Artikel gefunden.</p>
  }

  function handleHeaderClick(key) {
    const isSameKey = sort.key === key
    onSortChange({
      key,
      direction: isSameKey && sort.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <table className="item-table">
      <thead>
        <tr>
          {COLUMNS.map((column) => (
            <th key={column.key} onClick={() => handleHeaderClick(column.key)}>
              {column.label}
              {sort.key === column.key && (sort.direction === 'asc' ? ' ↑' : ' ↓')}
            </th>
          ))}
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          // key=item.id: React needs a stable identity per row to correctly
          // reorder/update the list instead of re-rendering everything.
          <ItemRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  )
}
