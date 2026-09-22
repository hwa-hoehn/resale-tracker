import { CATEGORIES, STATUSES } from '../constants'

// "Controlled" selects: their value comes from App's state (statusFilter /
// categoryFilter) and every change is reported back up via the on... props.
// This is "lifting state up" — the filter state lives in the parent (App)
// because both FilterBar and ItemTable need to know about it.
export default function FilterBar({
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onAddClick,
}) {
  return (
    <section className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="Alle">Alle</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Kategorie</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(event) => onCategoryFilterChange(event.target.value)}
        >
          <option value="Alle">Alle</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="btn-primary" onClick={onAddClick}>
        + Neuer Artikel
      </button>
    </section>
  )
}
