import { useState } from 'react'
import { CATEGORIES, PLATFORMS, STATUSES } from '../constants'

const EMPTY_ITEM = {
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

// useState holds the whole form as one object. Every input is "controlled":
// its value always comes from this state, and onChange writes back into it
// via handleChange — React, not the DOM, is the source of truth for the form.
export default function ItemForm({ initialItem, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialItem ?? EMPTY_ITEM)
  const isEditing = Boolean(initialItem)
  const isSold = formData.status === 'Verkauft'

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      ...formData,
      id: formData.id ?? crypto.randomUUID(),
      purchasePrice: Number(formData.purchasePrice) || 0,
      targetPrice: Number(formData.targetPrice) || 0,
      salePrice: formData.salePrice === '' ? '' : Number(formData.salePrice),
    })
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Artikel bearbeiten' : 'Neuer Artikel'}</h2>

      <div className="form-grid">
        <label>
          Artikelname
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Marke
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kategorie
          <select name="category" value={formData.category} onChange={handleChange}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Einkaufsquelle
          <input
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="z.B. Vinted, Flohmarkt Bayreuth"
          />
        </label>

        <label>
          Einkaufspreis (€)
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Zielverkaufspreis (€)
          <input
            type="number"
            name="targetPrice"
            value={formData.targetPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Verkaufsplattform
          <select name="platform" value={formData.platform} onChange={handleChange}>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </label>

        <label>
          Einkaufsdatum
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />
        </label>

        {/* Conditional rendering: Verkaufspreis / Verkaufsdatum nur relevant,
            wenn der Status "Verkauft" ist. */}
        {isSold && (
          <>
            <label>
              Verkaufspreis (€)
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </label>

            <label>
              Verkaufsdatum
              <input
                type="date"
                name="saleDate"
                value={formData.saleDate}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        <label className="form-notes">
          Notizen
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Zustand, Echtheitsmerkmale, ..."
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Abbrechen
        </button>
        <button type="submit" className="btn-primary">
          {isEditing ? 'Speichern' : 'Hinzufügen'}
        </button>
      </div>
    </form>
  )
}
