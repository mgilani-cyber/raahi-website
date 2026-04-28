export interface MenuItem {
  name: string;
  price: string;
  desc?: string;
  veg?: boolean;
  badge?: string;
}
export interface MenuSubGroup {
  label: string;
  items: MenuItem[];
  note?: string;
}
export interface MenuCategoryData {
  image?: string;
  id: string;
  label: string;
  tagline: string;
  subGroups: MenuSubGroup[];
}
export const MENU_CATEGORIES: MenuCategoryData[] = [
  {
    id:"starters", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=1200&auto=format&fit=crop&q=80", label:"Starters", tagline:"Begin the journey",
    subGroups:[
      { label:"Pakora", items:[
        { name:"Vegetable Pakora", price:"$7.99", veg:true },
        { name:"Gobi Pakora", price:"$7.99", veg:true },
        { name:"Onion Pakora", price:"$7.99", veg:true },
        { name:"Paneer Pakora", price:"$9.99", veg:true },
        { name:"Pakora Platter (Family Size)", price:"$16.99", veg:true, badge:"SHARING" },
      ]},
      { label:"Samosas", items:[
        { name:"Veg Samosas (2 pcs)", price:"$5.00", veg:true },
        { name:"Onion Samosas (4 pcs)", price:"$5.99", veg:true },
        { name:"Chicken Samosas (2 pcs)", price:"$6.99" },
        { name:"Butter Chicken Samosas (2 pcs)", price:"$6.99" },
      ]},
      { label:"Veg Appetizers", items:[
        { name:"Masala Fries", price:"$4.99", veg:true },
        { name:"Cigar Rolls", price:"$7.99", veg:true },
        { name:"Corn Chops", price:"$9.99", veg:true },
        { name:"Paneer Manchurian", price:"$13.99", veg:true },
        { name:"Gobi Manchurian", price:"$12.99", veg:true },
        { name:"Paneer Chilli", price:"$13.99", veg:true },
        { name:"Gobi 65", price:"$12.99", veg:true },
        { name:"Paneer 65", price:"$13.99", veg:true },
      ]},
      { label:"Non-Veg Appetizers", items:[
        { name:"Chicken Pakora", price:"$11.99" },
        { name:"Spicy Chicken Bites", price:"$9.99" },
        { name:"Amritsari Fish", price:"$12.99" },
        { name:"Chicken Lollypop", price:"$14.99" },
        { name:"Shrimp Pakora", price:"$14.99" },
        { name:"Chicken Manchurian", price:"$14.99" },
        { name:"Chilli Chicken", price:"$14.99" },
        { name:"Chicken 65", price:"$14.99" },
      ]},
    ],
  },
  {
    id:"street-eats", label:"Street Eats", tagline:"Houston's favourite Indian street food",
    subGroups:[
      { label:"Street Food", items:[
        { name:"Raj Kachori", price:"$6.99", veg:true },
        { name:"Dahi Bhalla", price:"$7.99", veg:true },
        { name:"Dahi Puri", price:"$9.99", veg:true },
        { name:"Chaat Papri", price:"$9.99", veg:true },
        { name:"Gol Gappe", price:"$9.99", veg:true },
        { name:"Aloo Tikki Chaat", price:"$9.99", veg:true },
        { name:"Palak Patta Chaat", price:"$9.99", veg:true },
        { name:"Samosa Chaat", price:"$9.99", veg:true },
        { name:"Pav Bhaji", price:"$10.99", veg:true },
        { name:"Amritsari Aloo Kulcha", price:"$12.99", veg:true },
        { name:"Amritsari Paneer Kulcha", price:"$13.99", veg:true },
        { name:"Chana Bhatura", price:"$13.99", veg:true },
      ]},
    ],
  },
  {
    id:"tandoor", image:"https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1200&auto=format&fit=crop&q=80", label:"Tandoor Se", tagline:"From the clay oven",
    subGroups:[
      { label:"Non-Veg", items:[
        { name:"Chicken Kebab", price:"$13.99" },
        { name:"Tandoori Fish Tikka", price:"$13.99" },
        { name:"Mutton Gilafi Kebab", price:"$15.99" },
        { name:"Tandoori Prawns", price:"$15.99" },
        { name:"Tandoori Chicken", price:"$14.99" },
        { name:"Murg Hariyali Tikka", price:"$14.99" },
        { name:"Murg Malai Tikka", price:"$14.99" },
        { name:"Achari Chicken Tikka", price:"$15.99" },
        { name:"Tandoori Salmon", price:"$17.99" },
        { name:"Lamb Chops", price:"$24.99", badge:"MUST TRY" },
        { name:"Chicken Platter", price:"$25.99", badge:"SHARING" },
      ]},
      { label:"Veg", items:[
        { name:"Tandoori Paneer", price:"$13.99", veg:true },
        { name:"Hariyali Paneer", price:"$13.99", veg:true },
        { name:"Malai Paneer", price:"$13.99", veg:true },
        { name:"Tandoori Soya Chaap", price:"$12.99", veg:true },
        { name:"Zefrani Paneer", price:"$13.99", veg:true },
      ]},
    ],
  },
  {
    id:"dosa", label:"Dosa Corner", tagline:"South Indian classics",
    subGroups:[
      { label:"Dosas", items:[
        { name:"Plain Dosa", price:"$9.99", veg:true },
        { name:"Masala Dosa", price:"$11.99", veg:true },
        { name:"Mysore Masala Dosa", price:"$12.99", veg:true },
        { name:"Paneer Dosa", price:"$12.99", veg:true },
        { name:"Podi Karam Dosa", price:"$12.99", veg:true },
        { name:"Onion Uttapam", price:"$9.99", veg:true },
      ]},
    ],
  },
  {
    id:"mains-veg", label:"Vegetarian Mains", tagline:"The heart of the kitchen",
    subGroups:[
      { label:"Veg Main Course", items:[
        { name:"Daal Tadka", price:"$13.99", veg:true },
        { name:"Chana Gravy", price:"$13.99", veg:true },
        { name:"Raahi Special (Dal)", price:"$13.99", veg:true, badge:"HOUSE SPECIAL" },
        { name:"Dal Bukhara", price:"$13.99", veg:true },
        { name:"Diwani Handi", price:"$13.99", veg:true },
        { name:"Sarso Da Saag", price:"$13.99", veg:true, badge:"BESTSELLER" },
        { name:"Baingan Bharta", price:"$13.99", veg:true },
        { name:"Aloo Gobhi", price:"$13.99", veg:true },
        { name:"Bhindo Do Pyaza", price:"$13.99", veg:true },
        { name:"Shahi Paneer", price:"$14.99", veg:true },
        { name:"Kadhai Paneer", price:"$14.99", veg:true },
        { name:"Malai Kofta", price:"$14.99", veg:true },
        { name:"Paneer Tikka Masala", price:"$14.99", veg:true },
        { name:"Palak Paneer", price:"$15.99", veg:true, badge:"POPULAR" },
        { name:"Paneer Pasanda", price:"$15.99", veg:true },
        { name:"Paneer Lababdar", price:"$15.99", veg:true },
      ]},
    ],
  },
  {
    id:"mains-nonveg", label:"Non-Veg Mains", tagline:"Chicken, lamb and more",
    subGroups:[
      { label:"Chicken", items:[
        { name:"Butter Chicken", price:"$16.99", badge:"BESTSELLER" },
        { name:"Chicken Tikka Masala", price:"$16.99" },
        { name:"Kadhai Chicken", price:"$16.99" },
        { name:"Chicken Curry (Boneless)", price:"$16.99" },
        { name:"Chicken Korma", price:"$16.99" },
        { name:"Chicken Vindaloo", price:"$16.99" },
        { name:"Chicken Chettinad", price:"$16.99" },
      ]},
      { label:"Egg", items:[
        { name:"Egg Bhurji", price:"$11.99" },
        { name:"Egg Curry", price:"$13.99" },
        { name:"Egg Masala", price:"$13.99" },
      ]},
      { label:"Lamb", items:[
        { name:"Lamb Masala", price:"$21.99" },
        { name:"Lamb Vindaloo", price:"$21.99" },
        { name:"Lamb Korma", price:"$21.99" },
        { name:"Lamb Kadhai", price:"$21.99" },
      ]},
      { label:"Goat", items:[
        { name:"Goat Masala", price:"$19.99" },
        { name:"Keema Curry Masala", price:"$19.99" },
        { name:"Chettinad Goat", price:"$19.99" },
        { name:"Goat Vindaloo", price:"$19.99" },
      ]},
    ],
  },
  {
    id:"biryani", image:"https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=1200&auto=format&fit=crop&q=80", label:"Biryani", tagline:"Nine biryanis. All made properly.",
    subGroups:[
      { label:"Rice", items:[
        { name:"Plain Rice", price:"$4.99", veg:true },
        { name:"Jeera Rice", price:"$5.99", veg:true },
        { name:"Coconut Rice", price:"$6.99", veg:true },
      ]},
      { label:"Biryani", items:[
        { name:"Veg Biryani", price:"$13.99", veg:true },
        { name:"Egg Biryani", price:"$14.99" },
        { name:"Paneer Biryani", price:"$15.99", veg:true },
        { name:"Chicken Biryani", price:"$16.99", badge:"POPULAR" },
        { name:"Gongura Biryani (Chicken)", price:"$16.99" },
        { name:"Vijaywada Boneless Chicken Biryani", price:"$16.99" },
        { name:"Goat Biryani", price:"$19.99" },
        { name:"Gongura Goat Biryani", price:"$19.99" },
        { name:"Lamb Biryani", price:"$21.99" },
      ]},
    ],
  },
  {
    id:"breads", image:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200&auto=format&fit=crop&q=80", label:"Breads", tagline:"Straight from the tandoor",
    subGroups:[
      { label:"Breads", items:[
        { name:"Tawa Roti", price:"$1.99", veg:true },
        { name:"Tandoori Roti", price:"$2.99", veg:true },
        { name:"Plain Naan", price:"$1.99", veg:true },
        { name:"Butter Naan", price:"$2.49", veg:true },
        { name:"Garlic Naan", price:"$3.49", veg:true },
        { name:"Lachha Paratha", price:"$3.00", veg:true },
        { name:"Cheese Naan", price:"$5.99", veg:true },
        { name:"Paneer Naan", price:"$5.99", veg:true },
        { name:"Bread Basket", price:"$7.99", veg:true, badge:"SHARING" },
      ]},
      { label:"Paranthas (Until 5 PM)", note:"Add Yogurt $2", items:[
        { name:"Aloo Parantha", price:"$5.99", veg:true },
        { name:"Gobi Parantha", price:"$5.99", veg:true },
        { name:"Paneer Parantha", price:"$5.99", veg:true },
        { name:"Mooli Parantha", price:"$5.99", veg:true },
      ]},
    ],
  },
  {
    id:"desserts", image:"https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1200&auto=format&fit=crop&q=80", label:"Desserts", tagline:"End on a sweet note",
    subGroups:[
      { label:"Desserts", items:[
        { name:"Gulab Jamun", price:"$5.99", veg:true, badge:"POPULAR" },
        { name:"Rasmalai", price:"$5.99", veg:true },
        { name:"Carrot Halwa", price:"$5.99", veg:true },
        { name:"Gulab Jamun with Ice Cream / Kulfi", price:"$7.99", veg:true },
        { name:"Ice Cream (1 Scoop)", price:"$3.00", veg:true },
        { name:"Faluda", price:"$7.99", veg:true },
      ]},
    ],
  },
  {
    id:"drinks", image:"https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=1200&auto=format&fit=crop&q=80", label:"Drinks", tagline:"Cocktails, lassis and more",
    subGroups:[
      { label:"Cocktails", items:[
        { name:"Mango Storm", price:"$13", desc:"Dark Rum, Lime, Mango, Ginger Beer" },
        { name:"Cucumber Lemon G&T", price:"$11", desc:"Tanqueray Gin, Cucumber, Lemon, Fever Tree Tonic" },
        { name:"Blackberry Old Fashioned", price:"$12", desc:"Bourbon, Blackberry, Bitters, Orange" },
        { name:"Pomegranate Gin Fizz", price:"$12", desc:"Gin, Orange Liqueur, Lemon, Pomegranate, Topo Chico" },
        { name:"Raahi Hurricane", price:"$13", desc:"Light & Dark Rum, Passion Fruit, Lime, Orange, Pineapple, Grenadine", badge:"SIGNATURE" },
        { name:"Passion Fruit Side Car", price:"$14" },
        { name:"Raahi Margaritas", price:"$12", desc:"Classic, Blackberry, Mango, Pomegranate or Passion Fruit · Reposado Tequila", badge:"SIGNATURE" },
      ]},
      { label:"Non-Alcoholic Cocktails", items:[
        { name:"Lavender Lemon Fizz", price:"$8", veg:true },
        { name:"Passion Fruit Colada", price:"$8", veg:true },
        { name:"Cucumber Spritzer", price:"$8", veg:true },
        { name:"Mango Mule", price:"$8", veg:true },
        { name:"Pomegranate Limeade", price:"$8", veg:true },
      ]},
      { label:"Lassi & Shakes (All $5)", items:[
        { name:"Sweet Lassi", price:"$5", veg:true },
        { name:"Salty Lassi", price:"$5", veg:true },
        { name:"Mango Lassi", price:"$5", veg:true, badge:"POPULAR" },
        { name:"Rose Lassi", price:"$5", veg:true },
        { name:"Banana Shake", price:"$5", veg:true },
        { name:"Mango Shake", price:"$5", veg:true },
        { name:"Rose Shake", price:"$5", veg:true },
        { name:"Masala Lemonade", price:"$5", veg:true },
        { name:"Mojito / Rose Mojito / Mango Mojito", price:"$5", veg:true },
      ]},
      { label:"Hot Beverages", items:[
        { name:"Chai", price:"$3", veg:true },
        { name:"Masala Chai", price:"$3", veg:true, badge:"POPULAR" },
        { name:"Ginger Chai", price:"$3", veg:true },
        { name:"Indian Coffee", price:"$3", veg:true },
      ]},
      { label:"Draft Beer", items:[
        { name:"Modelo", price:"$4" },
        { name:"Michelob Ultra", price:"$5" },
        { name:"Stella", price:"$5" },
        { name:"Saint Arnold Seasonal", price:"$6" },
      ]},
      { label:"Bottled Beer", items:[
        { name:"Bud Light / Coors Light / Miller Light", price:"$5" },
        { name:"Corona / Heineken", price:"$5" },
        { name:"Blue Moon / Dos Equis / Shiner Bock", price:"$6" },
        { name:"Guinness", price:"$7" },
      ]},
    ],
  },
];
