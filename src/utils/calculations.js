// Realisierte Marge bei verkauften Artikeln, sonst erwartete Marge
// auf Basis des Zielverkaufspreises.
export function getMargin(item) {
  if (item.status === 'Verkauft' && item.salePrice !== '') {
    return { value: Number(item.salePrice) - Number(item.purchasePrice), expected: false }
  }
  return { value: Number(item.targetPrice) - Number(item.purchasePrice), expected: true }
}

export function getDashboardStats(items) {
  const sold = items.filter((item) => item.status === 'Verkauft')
  const unsold = items.filter((item) => item.status !== 'Verkauft')

  const realizedProfit = sold.reduce(
    (sum, item) => sum + (Number(item.salePrice) - Number(item.purchasePrice)),
    0
  )
  const capitalTiedUp = unsold.reduce(
    (sum, item) => sum + Number(item.purchasePrice),
    0
  )

  return {
    totalItems: items.length,
    soldCount: sold.length,
    realizedProfit,
    capitalTiedUp,
  }
}
