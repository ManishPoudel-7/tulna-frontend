const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatINR(amount) {
  if (amount == null) return null;
  return inrFormatter.format(amount);
}

export function unitPrice(price, size, unit) {
  if (price == null || size == null || !unit) return null;

  const u = unit.toLowerCase();
  if (u === 'ml' && size > 0) {
    const perLitre = (price / size) * 1000;
    return `${inrFormatter.format(Math.round(perLitre))}/L`;
  }
  if (u === 'g' && size > 0) {
    if (size < 100) {
      const per100g = (price / size) * 100;
      return `${inrFormatter.format(Math.round(per100g))}/100g`;
    }
    const perKg = (price / size) * 1000;
    return `${inrFormatter.format(Math.round(perKg))}/kg`;
  }
  return null;
}

export function discountPct(price, mrp) {
  if (price == null || mrp == null || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}
