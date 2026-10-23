// Account sync for GoalForge when it is served by techiesingh.com (/api/learn/state).
// Served on its own (no API), every call reports 'unavailable' and the app stays local-only.

const ENDPOINT = '/api/learn/state';

async function call(method, body) {
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    return { state: 'offline' };
  }
  if (res.status === 401) return { state: 'signed-out' };
  if (res.status === 404 || res.status === 503) return { state: 'unavailable' };
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try { message = (await res.json()).error || message; } catch { /* not JSON */ }
    return { state: 'error', message };
  }
  const json = await res.json();
  return { state: 'ok', userId: json.userId, data: json.data, updatedAt: json.updatedAt };
}

export const cloudLoad = () => call('GET');
export const cloudSave = data => call('PUT', data);
