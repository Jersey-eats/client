import { MOCK_PARISHES } from "../mock/parishes";
import type { Parish, ParishCode } from "../types";

/**
 * @backend Supabase query:
 *   supabase.from('parishes').select('*').order('name')
 * @returns All 12 Jersey parishes with live restaurant counts.
 */
export async function getParishes(): Promise<Parish[]> {
  return MOCK_PARISHES;
}

/**
 * @backend Simple lookup — prefer parishes table if added; otherwise static.
 */
export async function getParish(code: ParishCode): Promise<Parish | null> {
  return MOCK_PARISHES.find((p) => p.code === code) ?? null;
}

export function parishName(code: ParishCode): string {
  return MOCK_PARISHES.find((p) => p.code === code)?.name ?? code;
}
