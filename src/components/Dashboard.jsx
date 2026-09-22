import { getDashboardStats } from '../utils/calculations'
import { formatCurrency } from '../utils/format'

// Presentational component: receives the already-loaded items and derives
// its own numbers from them (no state of its own).
export default function Dashboard({ items }) {
  const stats = getDashboardStats(items)

  return (
    <section className="dashboard">
      <div className="stat-card">
        <span className="stat-label">Artikel gesamt</span>
        <span className="stat-value">{stats.totalItems}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Verkauft</span>
        <span className="stat-value">{stats.soldCount}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Realisierter Gewinn</span>
        <span className="stat-value stat-accent">
          {formatCurrency(stats.realizedProfit)}
        </span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Gebundenes Kapital</span>
        <span className="stat-value">{formatCurrency(stats.capitalTiedUp)}</span>
      </div>
    </section>
  )
}
