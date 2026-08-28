const LOCK_STORAGE_KEY = "ubbi_scan_locks";

export function getScanLockStatus(eventSlug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(LOCK_STORAGE_KEY);
    if (!raw) return false;
    const locks = JSON.parse(raw);
    return Boolean(locks[eventSlug]);
  } catch (e) {
    return false;
  }
}

export function setScanLockStatus(eventSlug: string, isLocked: boolean): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(LOCK_STORAGE_KEY);
    const locks = raw ? JSON.parse(raw) : {};
    locks[eventSlug] = isLocked;
    localStorage.setItem(LOCK_STORAGE_KEY, JSON.stringify(locks));
  } catch (e) {
    console.error("Failed to update scan lock status", e);
  }
}

export function getAgentScanLink(eventSlug: string): string {
  if (typeof window === "undefined") {
    return `https://ubbi-app.vercel.app/access-control?event=${eventSlug}&key=agent-secure-token`;
  }
  const origin = window.location.origin;
  return `${origin}/access-control?event=${eventSlug}&key=agent-secure-token`;
}
