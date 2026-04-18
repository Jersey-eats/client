import { MOCK_MENUS, GENERIC_MENU } from "../mock/menus";
import type { MenuCategory } from "../types";

/**
 * @backend
 *   supabase.from('menu_categories')
 *     .select('*, menu_items(*, modifier_groups(*, modifier_options(*)))')
 *     .eq('restaurant_slug', slug)
 *     .order('sort_order')
 */
export async function getMenu(slug: string): Promise<MenuCategory[]> {
  return MOCK_MENUS[slug] ?? GENERIC_MENU;
}
