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
  type?: "cocktails" | "food" | "spirits" | "tableside" | "wine" | "beer";
  items: MenuItem[];
  steps?: string[];
  note?: string;
}

export interface MenuCategoryData {
  id: string;
  label: string;
  tagline: string;
  subGroups: MenuSubGroup[];
}

// ─── HAPPY HOUR MENU ─────────────────────────────────────────────────────────

const HAPPY_HOUR: MenuCategoryData = {
  id: "happy-hour",
  label: "Happy Hour Menu",
  tagline: "Daily · 4 PM – 6 PM · 20% off cocktails · 15% off wine",
  subGroups: [
    {
      label: "Happy Hour Cocktails — $8 each",
      type: "cocktails",
      items: [
        { name: "Saffron Spice",          price: 8, desc: "Saffron Vodka, Ginger Liqueur, Lemon Juice, Egg White, Mango Juice" },
        { name: "Hillside",               price: 8, desc: "Cardamom Mezcal, Aperol, Lemongrass Syrup, Lemon Juice, Egg White" },
        { name: "Rose Bazaar",            price: 8, desc: "Pisco, Elderflower Liqueur, Lemon Juice, Lychee Juice, Sparkling Wine" },
        { name: "The Pink City",          price: 8, desc: "Empress Gin, Lemon Juice, Pineapple Juice, Orange Liqueur, Egg White" },
        { name: "Smokey Sapphire",        price: 8, desc: "Tequila Reposado, Mezcal, Cointreau, Dry Vermouth, Orange Bitters" },
        { name: "Smokey Trails",          price: 8, desc: "Mezcal, Rye, Honey, Cinnamon Syrup, Angostura Bitters" },
        { name: "Cinnamon Sleek",         price: 8, desc: "Malibu Coconut Rum, Cinnamon Syrup, Cream" },
        { name: "Lychee Bliss",           price: 8, desc: "Gin, Soju, Lychee Juice, Milk, Lemon Juice, Grenadine" },
        { name: "Paloma",                 price: 8, desc: "Altos Tequila, Grapefruit, Agave Syrup, Lime Juice" },
        { name: "Velvet Illusion",        price: 8, desc: "Vodka, Coffee Liqueur, Heavy Cream, Simple Syrup" },
        { name: "Strawberry Absinthe Sour", price: 8, desc: "Gin, Absinthe, Lime Juice, Simple Syrup, Egg White" },
      ],
    },
    {
      label: "Happy Hour Food Specials",
      type: "food",
      items: [
        { name: "Maaya Fries",  price: 9,  desc: "Tikka Spice Mix, Mint Aioli", veg: true },
        { name: "Truffle Fries", price: 11, desc: "Truffle Oil, Parmesan, Truffle Aioli", veg: true },
        { name: "Samosas",      price: 10, desc: "4 pcs · Tamarind Chutney, Mint Yogurt", veg: true },
        { name: "Chili Paneer", price: 13, desc: "Indo-Chinese glaze, bell peppers, spring onion", veg: true },
        { name: "Sliders",      price: 12, desc: "2 pcs · In-house Beef Patty, Brioche, Coleslaw, Caramelised Onions" },
      ],
    },
  ],
};

// ─── REGULAR MENU ─────────────────────────────────────────────────────────────

const REGULAR: MenuCategoryData = {
  id: "regular",
  label: "Regular Menu",
  tagline: "Eastern botanicals meet Western craft",
  subGroups: [
    {
      label: "Signature Cocktails",
      type: "cocktails",
      items: [
        { name: "Saffron Spice",          price: 24, desc: "Saffron Vodka, Ginger Liqueur, Lemon Juice, Egg White, Mango Juice",            tags: ["EXOTIC", "SPICED"] },
        { name: "Hillside",               price: 24, desc: "Cardamom Mezcal, Aperol, Lemongrass Syrup, Lemon Juice, Egg White",             tags: ["SMOKY", "HERBAL"] },
        { name: "Rose Bazaar",            price: 19, desc: "Pisco, Elderflower Liqueur, Lemon Juice, Lychee Juice, Sparkling Wine",         tags: ["FLORAL", "ELEGANT"] },
        { name: "The Pink City",          price: 16, desc: "Empress Gin, Lemon Juice, Pineapple Juice, Orange Liqueur, Egg White",         tags: ["FLORAL", "CITRUS"] },
        { name: "Smokey Sapphire",        price: 16, desc: "Tequila Reposado, Mezcal, Cointreau, Dry Vermouth, Orange Bitters",            tags: ["SMOKY", "DRY"] },
        { name: "Smokey Trails",          price: 23, desc: "Mezcal, Rye, Honey, Cinnamon Syrup, Angostura Bitters",                       tags: ["SMOKY", "BOLD"] },
        { name: "Cinnamon Sleek",         price: 22, desc: "Malibu Coconut Rum, Cinnamon Syrup, Cream",                                   tags: ["CREAMY", "WARM"] },
        { name: "Tamarind Spiced Punch",  price: 65, desc: "Appleton, Tamarind Syrup, Pineapple, Lime, Cold Brew Chai Tea — Serves 4–6", tags: ["SPICED", "SHARED"] },
      ],
    },
    {
      label: "Classic Cocktails",
      type: "cocktails",
      items: [
        { name: "Deshler",                  price: 20, desc: "Whiskey, Lillet, Orange Curaçao, Angostura Bitters" },
        { name: "Lychee Bliss",             price: 19, desc: "Gin, Soju, Lychee Juice, Milk, Lemon Juice, Grenadine" },
        { name: "Paloma",                   price: 18, desc: "Altos Tequila, Grapefruit, Agave Syrup, Lime Juice" },
        { name: "El Presidente",            price: 17, desc: "Havana Rum, Angostura Bitters, Sweet Vermouth, Curacao, Grenadine" },
        { name: "Martinez",                 price: 20, desc: "Gin, Sweet Vermouth, Luxardo" },
        { name: "Russian Creamsicle",       price: 18, desc: "Absolut Vodka, Vanilla Liquor, Cointreau, Orange Juice, Cream" },
        { name: "Velvet Illusion",          price: 19, desc: "Vodka, Coffee Liqueur, Heavy Cream, Simple Syrup" },
        { name: "Chocolate Boulevardier",   price: 19, desc: "Whiskey, Montenegro, Amaro, Cocoa-infused Campari" },
        { name: "Strawberry Absinthe Sour", price: 19, desc: "Gin, Absinthe, Lime Juice, Simple Syrup, Egg White" },
        { name: "The Float",               price: 19, desc: "Gin, Elderflower Liqueur, Lemon Juice, Cassis, Blueberry Cream Float" },
      ],
    },
    {
      label: "Mocktails",
      type: "cocktails",
      items: [
        { name: "Strawberry Passion", price: 14, desc: "Strawberry Purée, Passionfruit, Lemon, Agave, Sea Salt" },
        { name: "Virgin Paloma",      price: 14, desc: "Grapefruit Juice, Lemon, Agave Syrup, Club Soda" },
        { name: "Mango Lassi Spritz", price: 13, desc: "Mango Purée, Rose Water, Cardamom, Sparkling Water" },
        { name: "Saffron Lemonade",   price: 12, desc: "Saffron Syrup, Lemon Juice, Honey, Still Water" },
      ],
    },
    {
      label: "Tableside Old Fashioned",
      type: "tableside",
      items: [{ name: "Tableside Old Fashioned", price: 28, desc: "Your choice of whiskey or bourbon — smoked at your table" }],
      steps: [
        "Choose your spirit — whiskey or bourbon",
        "A hand-carved ice block placed in your glass",
        "Bitters measured and added at your table",
        "Orange peel expressed and torched",
        "Served under a glass dome of hickory smoke, lifted tableside",
      ],
    },
    {
      label: "Gin",
      type: "spirits",
      items: [
        { name: "Tanqueray",             price: 12, desc: "London Dry, England" },
        { name: "Bombay Sapphire",       price: 12, desc: "Vapour Infused, England" },
        { name: "Hendrick's",            price: 14, desc: "Scottish, Cucumber & Rose" },
        { name: "Empress 1908",          price: 15, desc: "BC, Butterfly Pea Flower" },
        { name: "Monkey 47",             price: 16, desc: "Black Forest, 47 Botanicals" },
        { name: "Beefeater Pink",        price: 12, desc: "London, Strawberry" },
      ],
    },
    {
      label: "Rum",
      type: "spirits",
      items: [
        { name: "Havana Club 3yr",       price: 11, desc: "Cuba, Light & Dry" },
        { name: "Appleton Estate",       price: 12, desc: "Jamaica, Complex & Smooth" },
        { name: "Mount Gay Black Barrel",price: 13, desc: "Barbados, Double Aged" },
        { name: "Diplomático Reserva",   price: 15, desc: "Venezuela, Rich & Sweet" },
        { name: "Malibu Coconut",        price: 11, desc: "Caribbean, Coconut" },
      ],
    },
    {
      label: "Vodka",
      type: "spirits",
      items: [
        { name: "Absolut",                        price: 11, desc: "Sweden, Classic" },
        { name: "Grey Goose",                     price: 14, desc: "France, Ultra-Premium" },
        { name: "Belvedere",                      price: 15, desc: "Poland, Rye-Based" },
        { name: "Ketel One",                      price: 12, desc: "Netherlands, Crisp" },
        { name: "Saffron Vodka (house infused)",  price: 14, desc: "Bar Maaya House Infusion" },
      ],
    },
    {
      label: "Tequila & Mezcal",
      type: "spirits",
      items: [
        { name: "Altos Blanco",                     price: 12, desc: "Mexico, Highlands" },
        { name: "Altos Reposado",                   price: 13, desc: "Mexico, Oak Aged" },
        { name: "Casamigos Blanco",                 price: 16, desc: "Mexico, Ultra-Premium" },
        { name: "Del Maguey Vida",                  price: 16, desc: "Oaxaca, Artisanal Mezcal" },
        { name: "Montelobos Mezcal",                price: 15, desc: "Oaxaca, Herbal & Smoky" },
        { name: "Cardamom Mezcal (house infused)", price: 15, desc: "Bar Maaya House Infusion" },
      ],
    },
    {
      label: "Whiskey & Bourbon",
      type: "spirits",
      items: [
        { name: "Bulleit Bourbon",  price: 13, desc: "Kentucky, High Rye" },
        { name: "Maker's Mark",     price: 13, desc: "Kentucky, Wheat Mash" },
        { name: "Jack Daniel's",    price: 12, desc: "Tennessee, Charcoal Filtered" },
        { name: "Crown Royal",      price: 12, desc: "Canada, Blended" },
        { name: "Rye Whisky",       price: 12, desc: "Canada, Classic Rye" },
        { name: "Woodford Reserve", price: 15, desc: "Kentucky, Small Batch" },
      ],
    },
    {
      label: "Scotch",
      type: "spirits",
      items: [
        { name: "Johnnie Walker Black",    price: 13, desc: "Blended, Smoky" },
        { name: "Glenfiddich 12yr",        price: 15, desc: "Speyside, Single Malt" },
        { name: "Glenlivet 12yr",          price: 15, desc: "Speyside, Single Malt" },
        { name: "Laphroaig 10yr",          price: 16, desc: "Islay, Peated" },
        { name: "Balvenie DoubleWood 12yr",price: 18, desc: "Speyside, Sherry Cask" },
      ],
    },
    {
      label: "Japanese Whisky",
      type: "spirits",
      items: [
        { name: "Suntory Toki",         price: 14, desc: "Blended, Delicate" },
        { name: "Nikka From The Barrel",price: 18, desc: "Blended, Bold" },
        { name: "Yamazaki 12yr",        price: 22, desc: "Single Malt, Sherry Cask" },
      ],
    },
    {
      label: "Cognac",
      type: "spirits",
      items: [
        { name: "Hennessy VS",      price: 14, desc: "France, Classic" },
        { name: "Hennessy VSOP",    price: 18, desc: "France, Aged" },
        { name: "Rémy Martin VSOP", price: 16, desc: "France, Fine Champagne" },
        { name: "Courvoisier VSOP", price: 16, desc: "France, Smooth" },
      ],
    },
    {
      label: "Wine & Bubbles",
      type: "wine",
      items: [
        { name: "Prosecco DOC",       price: 14, desc: "Italian Sparkling, Dry, 200ml" },
        { name: "Cava Brut",          price: 15, desc: "Spanish Sparkling, Toasty Notes, 200ml" },
        { name: "Champagne NV",       price: 22, desc: "French, Brioche Notes, 150ml" },
        { name: "Pinot Grigio",       price: 13, desc: "Italian, Light & Crisp, 175ml" },
        { name: "Sauvignon Blanc",    price: 14, desc: "New Zealand, Citrus & Herb, 175ml" },
        { name: "Chardonnay",         price: 14, desc: "California, Oaked, Buttery, 175ml" },
        { name: "Cabernet Sauvignon", price: 15, desc: "California, Full-bodied, 175ml" },
        { name: "Malbec",             price: 14, desc: "Argentina, Dark Fruit, 175ml" },
        { name: "Pinot Noir",         price: 16, desc: "Oregon, Light & Elegant, 175ml" },
        { name: "Provence Rosé",      price: 15, desc: "French, Dry, Strawberry Notes, 175ml" },
      ],
    },
    {
      label: "Bites & Plates",
      type: "food",
      items: [
        { name: "Maaya Fries",       price: 9,  desc: "Tikka Spice Mix, Mint Aioli",                                                         veg: true },
        { name: "Truffle Fries",     price: 11, desc: "Truffle Oil, Parmesan, Truffle Aioli",                                                veg: true },
        { name: "Brussel Sprouts",   price: 14, desc: "Grilled, Tomato Chilli Jam",                                                          veg: true },
        { name: "Grilled Broccolini",price: 15, desc: "Cardamom, Cashew Cream",                                                              veg: true },
        { name: "Charred Pineapple", price: 16, desc: "Fresh Pineapple, Mixed Greens, Mint Chutney",                                         veg: true },
        { name: "Cheese Tacos",      price: 16, desc: "Cottage Cheese Tikka, Pickles, Pico De Gallo, Mint Aioli (2 pcs)",                   veg: true },
        { name: "Mushroom Flatbread",price: 21, desc: "Wild Mushrooms, Arugula, Parmesan, Truffle Oil",                                      veg: true },
        { name: "Maaya Salad",       price: 14, desc: "Mixed Greens, Cherry Tomatoes, Beets, Lemon Garlic Dressing",                         veg: true },
        { name: "Popcorn Chicken",   price: 15, desc: "Crispy Chicken Tikka, Mint Aioli" },
        { name: "Chicken Tacos",     price: 17, desc: "Chicken Tikka, Pickles, Pico De Gallo, Mint Aioli (2 pcs)" },
        { name: "Ghee Roast Prawns", price: 18, desc: "Grilled Prawns, Clarified Butter, Curry Leaves" },
        { name: "Beef Sliders",      price: 16, desc: "In-house Beef Patty, Brioche, Coleslaw, Caramelised Onions (2 pcs)" },
        { name: "Pepperoni Flatbread",price: 21, desc: "Smoked Pepperoni, Tomato Sauce, Cheese" },
        { name: "Oysters",           price: 3,  desc: "Mignonette Sauce, Tabasco, Lemon — Minimum 6" },
        { name: "Charcuterie Board", price: 26, desc: "Cheddar, Brie & Manchego, Pepperoni, Salami, Prosciutto, Crackers, Pickles" },
      ],
      note: "🌿 Vegan and vegetarian options available — items marked VEG are meat-free",
    },
    {
      label: "Desserts",
      type: "food",
      items: [
        { name: "Tiramisu",           price: 13, desc: "Italian Ladyfingers, Mascarpone, Amaretto" },
        { name: "Saffron Crème Brûlée", price: 10, desc: "Saffron, Cream, Eggs" },
        { name: "Tres Coconut",       price: 13, desc: "Coconut Cream, Fresh Mangoes, Cardamom, Pistachios", badge: "VEGAN" },
      ],
    },
  ],
};

// ─── PREMIER LEAGUE FOOD MENU ────────────────────────────────────────────────

const PREMIER_LEAGUE: MenuCategoryData = {
  id: "premier-league",
  label: "Premier League Food Menu",
  tagline: "Available during all Premier League matches · $8 cocktails all match long",
  subGroups: [
    {
      label: "Game Day Eats",
      type: "food",
      items: [
        { name: "Truffle Fries",           price: 11, desc: "Truffle Oil, Parmesan, Truffle Aioli",                                            veg: true },
        { name: "Mozzarella Sticks",       price: 12, desc: "Deep Fried Mozzarella, Marinara Sauce",                                           veg: true },
        { name: "Loaded Nachos",           price: 16, desc: "In-house Nachos, Salsa, Cheese Sauce, Pico De Gallo — Chicken +$5, Beef +$6",     veg: true },
        { name: "Chicken Fingers",         price: 15, desc: "Chicken Tenders, Honey Mustard Mayo" },
        { name: "Chicken Wings 1lb",       price: 18, desc: "Plain, BBQ, Buffalo, Butter Chicken, Lemon Pepper" },
        { name: "Chicken Tikka Flatbread", price: 23, desc: "Chicken Tikka, Tomato Sauce, Cheese — Butter Chicken Sauce +$3" },
        { name: "Mushroom Flatbread",      price: 21, desc: "Wild Mushrooms, Arugula, Parmesan, Truffle Oil",                                  veg: true },
        { name: "Pepperoni Flatbread",     price: 21, desc: "Smoked Pepperoni, Tomato Sauce, Cheese" },
      ],
    },
  ],
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const MENU_CATEGORIES: MenuCategoryData[] = [
  HAPPY_HOUR,
  REGULAR,
  PREMIER_LEAGUE,
];
