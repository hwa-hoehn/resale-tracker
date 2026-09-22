export function formatCurrency(value) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number.isFinite(value) ? value : 0)
}

export function formatDate(isoDate) {
  if (!isoDate) return '–'
  return new Intl.DateTimeFormat('de-DE').format(new Date(isoDate))
}
