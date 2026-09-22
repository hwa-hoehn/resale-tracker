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

// Shared defaults for a new item — used by the form and by JSON import, so
// an imported item that's missing e.g. "notes" doesn't end up undefined.
export const EMPTY_ITEM = {
  name: '',
  brand: '',
  category: CATEGORIES[0],
  source: '',
  purchasePrice: '',
  targetPrice: '',
  status: STATUSES[0],
  platform: PLATFORMS[0],
  salePrice: '',
  purchaseDate: '',
  saleDate: '',
  notes: '',
}
