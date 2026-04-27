export interface MenuItem {
  name: string;
  price: number;
  desc?: string;
  tags?: string[];
  veg?: boolean;
  badge?: string;
  note?: string;
}

export interface MenuSubGroup {
  label: string;
  type?: "starters" |cat > src/constants.ts << 'EOF'
export const RESERVATION_URL  = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";
export const INSTAGRAM_URL    = "https://www.instagram.com/raahi_hou/";
export const FACEBOOK_URL     = "https://www.facebook.com/raahiindiankitchen/";
export const PHONE_NUMBER     = "+1 (346) 768-0068";
export const PHONE_SECONDARY  = "+1 (713) 277-5082";
export const EMAIL            = "Info@raahiindiankitchen.com";
export const ADDRESS          = "17695 Tomball Pkwy, Houston, TX 77064";
export const GOOGLE_MAPS_URL  = "https://maps.app.goo.gl/5Shp9o5168SPjViY7";
EOF "mains" | "bread" | "drinks" | "desserts" | "sides";
  items: MenuItem[];
  note?: string;
}

export interface MenuCategoryData {
  id: string;
  label: string;
  tagline: string;
  subGroups: MenuSubGroup[];
}

export const MENU_CATEGORIES: MenuCategoryData[] = [
  {
    id: "starters",
    label: "Starters & Small Plates",
    tagline: "Begin the journey",
    subGroups: [
      {
        label: "Signatures",
        type: "starters",
        items: [
          { name: "Samosa Chaat",        price: 14, desc: "Crispy samosas, chickpea curry, tamarind chutney, whipped yogurt, pomegranate", veg: true, badge: "MUST TRY" },
          { name: "Tandoori Lamb Chops", price: 22, desc: "Frenched chops, saffron-cardamom marinade, mint raita, pickled onion" },
          { name: "Mushroom Tikka",      price: 15, desc: "King oyster mushrooms, tandoor-roasted, smoked paprika butter, micro herbs", veg: true },
          { name: "Prawn Koliwada",      price: 19, desc: "Coastal spiced prawns, curry leaf tempura, green coconut chutney" },
          { name: "Dahi Kebab",          price: 13, desc: "Hung curd patties, pistachio crumb, rose petal chutney", veg: true },
          { name: "Seekh Kebab",         price: 17, desc: "Spiced ground lamb, caramelised onion, coriander chutney, laccha paratha" },
        ],
      },
      {
        label: "Shareable Bites",
        type: "starters",
        items: [
          { name: "Papdi Chaat",        price: 12, desc: "Crispy wafers, potato, chickpea, three chutneys, sev", veg: true },
          { name: "Pani Puri Station",  price: 14, desc: "6 puris, spiced tamarind water, potato masala — tableside pour", veg: true, badge: "TABLESIDE" },
          { name: "Corn Bhel",          price: 11, desc: "Roasted corn, raw mango, puffed rice, green chilli, lime", veg: true },
          { name: "Chicken 65",         price: 16, desc: "Twice-fried chicken, curry leaf, red chilli, yogurt dip" },
        ],
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    tagline: "The heart of Raahi",
    subGroups: [
      {
        label: "From the Tandoor",
        type: "mains",
        items: [
          { name: "Butter Chicken",         price: 26, desc: "Free-range chicken, tomato-fenugreek sauce, house-made cream, cardamom butter", badge: "BESTSELLER" },
          { name: "Lamb Rogan Josh",         price: 29, desc: "Slow-braised Kashmiri lamb, whole spices, saffron, caramelised shallots" },
          { name: "Dal Makhani",             price: 21, desc: "Black lentils slow-cooked overnight, smoked butter, single cream", veg: true },
          { name: "Prawn Masala",            price: 32, desc: "Tiger prawns, coastal tomato gravy, coconut milk, mustard seeds" },
          { name: "Saag Paneer",             price: 22, desc: "Fresh paneer, spinach-mustard greens, ginger, house spice blend", veg: true },
          { name: "Chicken Chettinad",       price: 27, desc: "South Indian stone-ground spices, kalpasi, marathi mokku, curry leaf" },
          { name: "Paneer Makhani",          price: 23, desc: "Cottage cheese, makhani sauce, fenugreek, house cream", veg: true },
          { name: "Goat Nihari",             price: 31, desc: "Slow-cooked overnight, bone marrow, ginger julienne, crispy shallots", badge: "WEEKEND SPECIAL" },
        ],
      },
      {
        label: "Biryani",
        type: "mains",
        note: "All biryanis served with raita and salan",
        items: [
          { name: "Hyderabadi Dum Biryani",  price: 28, desc: "Aged basmati, slow-cooked under dough seal, caramelised onion, saffron" },
          { name: "Prawn Biryani",           price: 34, desc: "Tiger prawns, Kerala spices, fried onion, mint, tomato" },
          { name: "Vegetable Biryani",       price: 22, desc: "Seasonal vegetables, whole spices, kewra water, saffron", veg: true },
          { name: "Lamb Biryani",            price: 32, desc: "Tender lamb shoulder, Lucknowi spices, rose water, fried onions" },
        ],
      },
    ],
  },
  {
    id: "bread",
    label: "Bread & Rice",
    tagline: "The perfect accompaniment",
    subGroups: [
      {
        label: "Breads",
        type: "bread",
        items: [
          { name: "Tandoori Roti",    price: 4,  desc: "Whole wheat, stone-ground flour", veg: true },
          { name: "Butter Naan",      price: 5,  desc: "Leavened, clay oven, cultured butter", veg: true },
          { name: "Garlic Naan",      price: 6,  desc: "Roasted garlic, coriander, butter", veg: true },
          { name: "Peshwari Naan",    price: 7,  desc: "Coconut, almond, sultana", veg: true },
          { name: "La
cat > src/constants.ts << 'EOF'
export const RESERVATION_URL  = "https://reservations.shift4payments.com/#/28a60320-b36c-4294-9eb4-0bc1b1d8e019";
export const INSTAGRAM_URL    = "https://www.instagram.com/raahi_hou/";
export const FACEBOOK_URL     = "https://www.facebook.com/raahiindiankitchen/";
export const PHONE_NUMBER     = "+1 (346) 768-0068";
export const PHONE_SECONDARY  = "+1 (713) 277-5082";
export const EMAIL            = "Info@raahiindiankitchen.com";
export const ADDRESS          = "17695 Tomball Pkwy, Houston, TX 77064";
export const GOOGLE_MAPS_URL  = "https://maps.app.goo.gl/5Shp9o5168SPjViY7";
