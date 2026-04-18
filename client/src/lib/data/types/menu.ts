/**
 * @backend Supabase tables:
 *   menu_categories, menu_items, modifier_groups, modifier_options
 */

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  pricePence: number;
  /** Real product photograph URL (Unsplash). CSS/img tag. */
  image?: string;
  popular?: boolean;
  dietary?: DietaryTag[];
  modifierGroups: ModifierGroup[];
}

export type DietaryTag = "v" | "vg" | "gf" | "halal" | "nuts";

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelections: number;
  minSelections: number;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  pricePence: number; // additional charge
}

/** A chosen basket line (after modifiers selected) */
export interface BasketLine {
  lineId: string; // stable id for dedupe
  itemId: string;
  itemName: string;
  restaurantId: string;
  restaurantSlug: string;
  restaurantName: string;
  quantity: number;
  basePricePence: number;
  modifierSelections: {
    groupId: string;
    groupName: string;
    optionId: string;
    optionName: string;
    pricePence: number;
  }[];
  totalPence: number; // (base + modifiers) × quantity
}
