// Automatic backup to a file on the user's computer (File System Access API — Chrome and Edge).
// The user picks the file once; after that every change is written to it a few seconds later.
// The file handle is remembered in IndexedDB. Browsers ask for permission again after a
// restart, so the app shows a "Reconnect" button when that happens.

const DB = 'goalforge-backup';
const STORE = 'handles';
const KEY = 'backup-file';

export const fileBackupSupported = () => typeof window !== 'undefined' && 'showSaveFilePicker' in window && 'indexedDB' in window;

function db() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idb(mode, fn) {
  const conn = await db();
  return new Promise((resolve, reject) => {
    const tx = conn.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
  });
}
const loadHandle = () => idb('readonly', s => s.get(KEY)).catch(() => null);
const saveHandle = h => idb('readwrite', s => s.put(h, KEY));
const clearHandle = () => idb('readwrite', s => s.delete(KEY));

// 'none' | 'connected' | 'needs-permission' | 'unsupported'
export async function backupFileStatus() {
  if (!fileBackupSupported()) return { state: 'unsupported' };
  const handle = await loadHandle();
  if (!handle) return { state: 'none' };
  const perm = await handle.queryPermission({ mode: 'readwrite' });
  return { state: perm === 'granted' ? 'connected' : 'needs-permission', name: handle.name };
}

export async function linkBackupFile(data) {
  const handle = await window.showSaveFilePicker({
    suggestedName: 'goalforge-autobackup.json',
    types: [{ description: 'GoalForge backup', accept: { 'application/json': ['.json'] } }],
  });
  await saveHandle(handle);
  await writeTo(handle, data);
  return handle.name;
}

// Must be called from a click (browsers only show the permission prompt on a user gesture).
export async function reconnectBackupFile() {
  const handle = await loadHandle();
  if (!handle) return false;
  return (await handle.requestPermission({ mode: 'readwrite' })) === 'granted';
}

export const unlinkBackupFile = () => clearHandle();

async function writeTo(handle, data) {
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(data, null, 2));
  await writable.close();
}

// Returns true if written, false if there is no usable file (not linked / no permission).
export async function writeBackupFile(data) {
  if (!fileBackupSupported()) return false;
  const handle = await loadHandle();
  if (!handle || (await handle.queryPermission({ mode: 'readwrite' })) !== 'granted') return false;
  await writeTo(handle, data);
  return true;
}
