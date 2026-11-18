const KEY = 'tulna_cart_v1';

// Stable id for a product across searches — name + normalised size.
export function cartItemId(product) {
  const sizePart = product.size && product.unit ? `${product.size}${product.unit}` : (product.quantity || '');
  return `${(product.product || '').toLowerCase().trim()}|${sizePart.toLowerCase()}`;
}

export function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {}
}

// Approx delivery fee defaults — update when apps change.
const DELIVERY = {
  Blinkit:           { freeAbove: 99,  fee: 25 },
  Zepto:             { freeAbove: 99,  fee: 25 },
  Instamart:         { freeAbove: 199, fee: 29 },
  BigBasket:         { freeAbove: 200, fee: 25 },
  DMart:             { freeAbove: 499, fee: 25 },
  JioMart:           { freeAbove: 299, fee: 20 },
  Flipkart:          { freeAbove: 99,  fee: 25 },
};

// Compute per-app totals over the cart's product snapshots.
// Returns { apps: [{ platform, subtotal, delivery, total, items, missing[] }], cheapest }
export function computeTotals(items) {
  if (!items.length) return { apps: [], cheapest: null };

  const platforms = new Set();
  items.forEach((it) => it.prices.forEach((p) => platforms.add(p.platform)));

  const apps = [...platforms].map((platform) => {
    let subtotal = 0;
    const missing = [];
    const line = [];

    items.forEach((it) => {
      const offer = it.prices.find((p) => p.platform === platform);
      if (offer) {
        subtotal += offer.price * it.cartQty;
        line.push({ id: it.id, name: it.product, qty: it.cartQty, price: offer.price });
      } else {
        missing.push(it.product);
      }
    });

    const d = DELIVERY[platform] || { freeAbove: 0, fee: 0 };
    const delivery = subtotal >= d.freeAbove ? 0 : d.fee;

    return { platform, subtotal, delivery, total: subtotal + delivery, items: line, missing };
  }).filter((app) => app.items.length > 0);

  apps.sort((a, b) => {
    if (a.missing.length !== b.missing.length) return a.missing.length - b.missing.length;
    return a.total - b.total;
  });

  return { apps, cheapest: apps[0]?.platform ?? null };
}
