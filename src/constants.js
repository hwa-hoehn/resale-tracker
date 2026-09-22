export const CATEGORIES = [
  'Tasche',
  'Portemonnaie',
  'Kleidung',
  'Schuhe',
  'Accessoire',
  'Sonstiges',
]

export const STATUSES = [
  'Gesourct',
  'Authentifiziert',
  'Gelistet',
  'Reserviert',
  'Verkauft',
]

export const PLATFORMS = ['Vinted', 'Kleinanzeigen', 'Sonstiges']

// Workflow order, used to sort by status instead of alphabetically.
export const STATUS_ORDER = Object.fromEntries(
  STATUSES.map((status, index) => [status, index])
)

export const STORAGE_KEY = 'resale-tracker-items'
