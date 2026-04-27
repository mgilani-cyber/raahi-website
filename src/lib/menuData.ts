export interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  veg?: boolean;
  badge?: string;
  note?: string;
}

export interface MenuSubGroup {
  label: string;
  type?: string;
  items: MenuItem[];
  note?: string;
}

export interface MenuCategoryData {
  id: string;
  label: string;
  tagline: string;
  subGroups: MenuSubGroup[];
}

export const MENU_CATEGORIES: MenuCategoryData[] = [];
