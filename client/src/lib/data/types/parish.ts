/**
 * Jersey's 12 parishes. Used as delivery-zone primary keys.
 *
 * @backend Supabase enum: public.parish_code
 *   CREATE TYPE parish_code AS ENUM (...12 values...);
 */
export const PARISHES = [
  "st_helier",
  "st_saviour",
  "st_brelade",
  "st_clement",
  "st_lawrence",
  "st_peter",
  "st_ouen",
  "st_mary",
  "st_john",
  "st_martin",
  "trinity",
  "grouville",
] as const;

export type ParishCode = (typeof PARISHES)[number];

export interface Parish {
  code: ParishCode;
  name: string;
  restaurantCount: number;
}
