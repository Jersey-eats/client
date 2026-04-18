import type { UserProfile } from "../types";

export const MOCK_USER: UserProfile = {
  id: "u-demo",
  email: "demo@jerseyeats.je",
  phone: "+44 7700 900123",
  phoneVerified: true,
  name: "Sam Le Brun",
  createdAt: "2026-02-14T12:00:00.000Z",
  addresses: [
    {
      id: "a-home",
      label: "Home",
      line1: "Flat 3, La Grande Route de St Martin",
      parish: "st_martin",
      postcode: "JE3 6HZ",
      note: "Blue door on the left, ring twice.",
      isDefault: true,
    },
    {
      id: "a-work",
      label: "Work",
      line1: "22 Broad Street",
      line2: "3rd floor",
      parish: "st_helier",
      postcode: "JE2 3RR",
      note: "Leave at reception, desk 14.",
      isDefault: false,
    },
  ],
};
