// Maps a status string to a CSS class so each status gets a slightly
// different shade, without leaving the black/white/gray + accent palette.
const STATUS_CLASS = {
  Gesourct: 'badge-neutral',
  Authentifiziert: 'badge-neutral',
  Gelistet: 'badge-outline',
  Reserviert: 'badge-outline',
  Verkauft: 'badge-accent',
}

export default function StatusBadge({ status }) {
  const className = STATUS_CLASS[status] ?? 'badge-neutral'
  return <span className={`badge ${className}`}>{status}</span>
}
