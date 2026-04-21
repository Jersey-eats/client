import { MOCK_USER } from "../mock/user";
import type { UserProfile, SavedAddress } from "../types";

/**
 * Session-level in-memory auth. Backend dev should swap each function for Supabase Auth:
 *   supabase.auth.signInWithPassword({ email, password })
 *   supabase.auth.signInWithOAuth({ provider })
 *   supabase.auth.signOut()
 *   supabase.from('profiles')...
 *
 * All calls return resolved Promises so UI code is future-proof.
 */

let currentUser: UserProfile | null = null;

/**
 * Hydrate the in-memory session from the Zustand-persisted auth store
 * (`localStorage.je:auth`) when the module first loads in the browser.
 * Without this, a page refresh resets the in-memory user to null even
 * though the UI (Nav, guards) still sees the signed-in user via the
 * store — leading to skeletons that never resolve.
 * When a real Supabase client is wired in, delete this helper.
 */
function hydrate(): UserProfile | null {
  if (typeof window === "undefined") return currentUser;
  if (currentUser) return currentUser;
  try {
    const raw = window.localStorage.getItem("je:auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { user?: UserProfile | null } };
    if (parsed?.state?.user) currentUser = parsed.state.user;
  } catch {
    // localStorage unavailable or malformed — ignore
  }
  return currentUser;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  return hydrate();
}

export async function isSignedIn(): Promise<boolean> {
  return hydrate() != null;
}

/** @backend supabase.auth.signInWithPassword */
export async function signInWithEmail(email: string, _password: string): Promise<UserProfile> {
  // Demo credentials: demo@jerseyeats.je / demo1234
  currentUser = { ...MOCK_USER, email };
  return currentUser;
}

/** @backend supabase.auth.signInWithOAuth({ provider }) */
export async function signInWithProvider(
  _provider: "google" | "apple" | "facebook",
): Promise<UserProfile> {
  currentUser = MOCK_USER;
  return currentUser;
}

/** @backend supabase.auth.signUp + insert profiles row */
export async function register(_name: string, _email: string, _password: string): Promise<UserProfile> {
  currentUser = { ...MOCK_USER, name: _name || MOCK_USER.name, email: _email || MOCK_USER.email };
  return currentUser;
}

/** @backend supabase.auth.signOut */
export async function signOut(): Promise<void> {
  currentUser = null;
}

/** @backend Twilio Verify or Supabase SMS OTP — send code to phone. */
export async function sendPhoneCode(_phone: string): Promise<{ sent: true }> {
  return { sent: true };
}

/** @backend Twilio/Supabase OTP verify. */
export async function verifyPhoneCode(_code: string): Promise<{ verified: true }> {
  const user = hydrate();
  if (user) currentUser = { ...user, phoneVerified: true };
  return { verified: true };
}

/** @backend supabase.from('profiles').update(...) */
export async function updateProfile(patch: Partial<UserProfile>): Promise<UserProfile> {
  const user = hydrate();
  if (!user) throw new Error("Not signed in");
  currentUser = { ...user, ...patch };
  return currentUser;
}

/** @backend supabase.from('addresses').insert/update */
export async function upsertAddress(addr: SavedAddress): Promise<UserProfile> {
  const user = hydrate();
  if (!user) throw new Error("Not signed in");
  const existing = user.addresses.findIndex((a) => a.id === addr.id);
  const addresses = [...user.addresses];
  if (addr.isDefault) addresses.forEach((a) => (a.isDefault = false));
  if (existing >= 0) addresses[existing] = addr;
  else addresses.push(addr);
  currentUser = { ...user, addresses };
  return currentUser;
}

/** @backend supabase.from('addresses').delete().eq('id', id) */
export async function removeAddress(id: string): Promise<UserProfile> {
  const user = hydrate();
  if (!user) throw new Error("Not signed in");
  currentUser = { ...user, addresses: user.addresses.filter((a) => a.id !== id) };
  return currentUser;
}

/** @backend supabase.auth.updateUser({ password }) */
export async function changePassword(_current: string, _next: string): Promise<{ ok: true }> {
  return { ok: true };
}

/** @backend supabase.auth.admin.deleteUser + cascade */
export async function deleteAccount(): Promise<void> {
  currentUser = null;
}
