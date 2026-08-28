export interface UserProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: "organizer" | "user";
}

const AUTH_KEY = "ubbi_logged_user";

export function getLoggedInUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function loginUser(user: UserProfile): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

export function isUserLoggedIn(): boolean {
  return getLoggedInUser() !== null;
}
