export async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status} al cargar: ${url}`);
    }
    return await res.json();
  } catch (err) {
    console.error('fetchJSON fallo:', err);
    throw err; // volvemos a lanzar el error para manejarlo donde se llame
  }
}
