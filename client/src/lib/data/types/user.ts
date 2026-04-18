import type { ParishCode } from "./parish";

/**
 * @backend Supabase: auth.users + public.profiles
 */
export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  phoneVerified: boolean;
  name: string;
  addresses: SavedAddress[];
  createdAt: string;
}

export interface SavedAddress {
  id: string;
  label: string; // "Home", "Work"
  line1: string;
  line2?: string;
  parish: ParishCode;
  postcode?: string;
  note?: string;
  isDefault: boolean;
}
