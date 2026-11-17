const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function searchPrices({ q, pincode, lat, lon, signal }) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (pincode) params.set('pincode', pincode);
  if (lat != null && lon != null) {
    params.set('lat', String(lat));
    params.set('lon', String(lon));
  }

  const url = `${BASE_URL}/api/search?${params.toString()}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.json();
}
