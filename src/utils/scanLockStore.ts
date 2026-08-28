const LOCK_STORAGE_KEY = "ubbi_scan_locks";

export function getScanLockStatus(eventSlug: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(LOCK_STORAGE_KEY);
    if (!raw) return true;
    const locks = JSON.parse(raw);
    // Returns false ONLY if explicitly unlocked by organizer (locks[eventSlug] === false)
    return locks[eventSlug] !== false;
  } catch (e) {
    return true;
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
