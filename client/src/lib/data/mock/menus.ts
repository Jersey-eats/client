import type { MenuCategory } from "../types";

/**
 * Menus per restaurant slug. Demonstrates the full variety of modifier configurations:
 *   - Required single-select (e.g. pizza size)
 *   - Required multi-select (e.g. pick 2 sauces)
 *   - Optional multi-select capped at N (e.g. up to 4 extras)
 *   - Variations with base prices and additional-charge options
 *
 * Images: Unsplash CDN.
 */

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=75`;

type MenuBySlug = Record<string, MenuCategory[]>;

export const MOCK_MENUS: MenuBySlug = {
  "mammas-pizzeria": [
    {
      id: "c-pizzas",
      name: "Pizzas",
      sortOrder: 1,
      items: [
        {
          id: "i-margherita",
          name: "Margherita",
          description: "San Marzano tomato, fior di latte, basil, good olive oil.",
          pricePence: 1250,
          image: img("1574071318508-1cdbab80d002"),
          popular: true,
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-size",
              name: "Choose your size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-10", name: "10″ classic", pricePence: 0 },
                { id: "o-12", name: "12″ sharing", pricePence: 300 },
                { id: "o-14", name: "14″ big one", pricePence: 600 },
              ],
            },
            {
              id: "g-crust",
              name: "Crust",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-thin", name: "Thin & crispy", pricePence: 0 },
                { id: "o-classic-crust", name: "Classic sourdough", pricePence: 0 },
                { id: "o-stuffed", name: "Cheese-stuffed crust", pricePence: 250 },
              ],
            },
            {
              id: "g-extras",
              name: "Extra toppings",
              required: false,
              minSelections: 0,
              maxSelections: 4,
              options: [
                { id: "o-cheese", name: "Extra fior di latte", pricePence: 150 },
                { id: "o-basil", name: "Fresh basil", pricePence: 50 },
                { id: "o-garlic", name: "Roasted garlic", pricePence: 100 },
                { id: "o-chilli", name: "Calabrian chilli", pricePence: 100 },
                { id: "o-olives", name: "Kalamata olives", pricePence: 120 },
                { id: "o-mushrooms", name: "Chestnut mushrooms", pricePence: 120 },
              ],
            },
          ],
        },
        {
          id: "i-pepperoni",
          name: "Pepperoni",
          description: "Aged pepperoni, tomato, fior di latte, hot honey drizzle.",
          pricePence: 1450,
          image: img("1628840042765-356cda07504e"),
          popular: true,
          modifierGroups: [
            {
              id: "g-size-2",
              name: "Choose your size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-10", name: "10″ classic", pricePence: 0 },
                { id: "o-12", name: "12″ sharing", pricePence: 300 },
                { id: "o-14", name: "14″ big one", pricePence: 600 },
              ],
            },
            {
              id: "g-extras-2",
              name: "Extras",
              required: false,
              minSelections: 0,
              maxSelections: 3,
              options: [
                { id: "o-double", name: "Double pepperoni", pricePence: 300 },
                { id: "o-jalapeno", name: "Jalapeños", pricePence: 100 },
                { id: "o-honey", name: "Extra hot honey", pricePence: 50 },
              ],
            },
          ],
        },
        {
          id: "i-nduja",
          name: "Nduja & Honey",
          description: "Spicy 'nduja sausage, mozzarella, hot honey, fennel pollen.",
          pricePence: 1595,
          image: img("1594007654729-407eedc4be65"),
          modifierGroups: [
            {
              id: "g-size-3",
              name: "Choose your size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-10", name: "10″ classic", pricePence: 0 },
                { id: "o-12", name: "12″ sharing", pricePence: 300 },
              ],
            },
          ],
        },
        {
          id: "i-bianca",
          name: "Bianca",
          description: "White pie — taleggio, gorgonzola, rosemary, chestnut honey.",
          pricePence: 1395,
          image: img("1513104890138-7c749659a591"),
          dietary: ["v"],
          modifierGroups: [],
        },
        {
          id: "i-diavola",
          name: "Diavola",
          description: "Spicy salami, Calabrian chilli, mozzarella, chilli oil.",
          pricePence: 1495,
          image: img("1565299624946-b28f40a0ae38"),
          modifierGroups: [
            {
              id: "g-size-4",
              name: "Choose your size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-10", name: "10″ classic", pricePence: 0 },
                { id: "o-12", name: "12″ sharing", pricePence: 300 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-sides",
      name: "Sides",
      sortOrder: 2,
      items: [
        {
          id: "i-garlic-bread",
          name: "Garlic focaccia",
          description: "Sourdough focaccia, garlic butter, sea salt.",
          pricePence: 550,
          image: img("1586444248902-2f64eddc13df"),
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-dip",
              name: "Add a dip",
              required: false,
              minSelections: 0,
              maxSelections: 2,
              options: [
                { id: "o-marinara", name: "Marinara", pricePence: 100 },
                { id: "o-aioli", name: "Garlic aioli", pricePence: 100 },
                { id: "o-pesto", name: "Basil pesto", pricePence: 120 },
              ],
            },
          ],
        },
        {
          id: "i-caesar",
          name: "Little gem Caesar",
          description: "Gem lettuce, anchovy, parmesan, crispy capers.",
          pricePence: 795,
          image: img("1546793665-c74683f339c1"),
          modifierGroups: [
            {
              id: "g-protein",
              name: "Add protein",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-chicken", name: "Grilled chicken", pricePence: 350 },
                { id: "o-prawns", name: "Jersey prawns", pricePence: 450 },
              ],
            },
          ],
        },
        {
          id: "i-arancini",
          name: "Saffron arancini",
          description: "Crispy risotto balls, saffron, mozzarella, lemon aioli.",
          pricePence: 695,
          image: img("1551024506-0bccd828d307"),
          dietary: ["v"],
          modifierGroups: [],
        },
      ],
    },
    {
      id: "c-drinks",
      name: "Drinks",
      sortOrder: 3,
      items: [
        {
          id: "i-san-pellegrino",
          name: "San Pellegrino",
          description: "330ml. Classic fizz.",
          pricePence: 295,
          dietary: ["vg", "gf"],
          modifierGroups: [],
        },
        {
          id: "i-coke",
          name: "Coca-Cola",
          description: "330ml can.",
          pricePence: 250,
          modifierGroups: [
            {
              id: "g-diet",
              name: "Variant",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-regular", name: "Classic", pricePence: 0 },
                { id: "o-zero", name: "Zero", pricePence: 0 },
                { id: "o-diet", name: "Diet", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-beer",
          name: "Peroni",
          description: "330ml. Italian lager, cold.",
          pricePence: 495,
          modifierGroups: [],
        },
      ],
    },
  ],

  "ocean-grill": [
    {
      id: "c-burgers",
      name: "Burgers",
      sortOrder: 1,
      items: [
        {
          id: "i-classic-burger",
          name: "The Classic",
          description: "Jersey beef patty, American cheese, lettuce, tomato, house sauce.",
          pricePence: 1250,
          image: img("1568901346375-23c9450c58cd"),
          popular: true,
          modifierGroups: [
            {
              id: "g-doneness",
              name: "How would you like it?",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-med", name: "Medium", pricePence: 0 },
                { id: "o-med-well", name: "Medium-well", pricePence: 0 },
                { id: "o-well", name: "Well done", pricePence: 0 },
              ],
            },
            {
              id: "g-patty",
              name: "Extra patty?",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-double", name: "Make it a double", pricePence: 400 },
              ],
            },
            {
              id: "g-cheese",
              name: "Swap the cheese",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-cheddar", name: "Mature cheddar", pricePence: 0 },
                { id: "o-blue", name: "Blue cheese", pricePence: 100 },
                { id: "o-brie", name: "Jersey brie", pricePence: 150 },
              ],
            },
            {
              id: "g-extras",
              name: "Add-ons",
              required: false,
              minSelections: 0,
              maxSelections: 4,
              options: [
                { id: "o-bacon", name: "Smoked bacon", pricePence: 200 },
                { id: "o-egg", name: "Fried egg", pricePence: 150 },
                { id: "o-mushrooms", name: "Sautéed mushrooms", pricePence: 150 },
                { id: "o-jalapeno", name: "Jalapeños", pricePence: 100 },
                { id: "o-onion", name: "Crispy onion", pricePence: 100 },
              ],
            },
          ],
        },
        {
          id: "i-bbq-bacon",
          name: "BBQ Bacon Stack",
          description: "Double patty, smoked bacon, cheddar, BBQ sauce, crispy onion.",
          pricePence: 1595,
          image: img("1586190848861-99aa4a171e90"),
          popular: true,
          modifierGroups: [
            {
              id: "g-doneness-2",
              name: "How would you like it?",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-med", name: "Medium", pricePence: 0 },
                { id: "o-med-well", name: "Medium-well", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-veggie-burger",
          name: "Halloumi Stack",
          description: "Grilled halloumi, pesto, roast tomato, rocket, brioche bun.",
          pricePence: 1295,
          image: img("1571091655789-405127f7cf13"),
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-side",
              name: "Pick a side",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-fries", name: "Skin-on fries", pricePence: 0 },
                { id: "o-sweet", name: "Sweet potato fries", pricePence: 100 },
                { id: "o-slaw", name: "House slaw", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-sides-og",
      name: "Sides",
      sortOrder: 2,
      items: [
        {
          id: "i-fries",
          name: "Jersey Royal fries",
          description: "Skin-on, seasoned, impossible to share.",
          pricePence: 450,
          image: img("1573080496219-bb080dd4f877"),
          dietary: ["vg"],
          modifierGroups: [
            {
              id: "g-fries-flav",
              name: "Add a flavour",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-truffle", name: "Truffle & parmesan", pricePence: 250 },
                { id: "o-cheese", name: "Cheese sauce", pricePence: 150 },
                { id: "o-garlic", name: "Garlic & rosemary", pricePence: 100 },
              ],
            },
          ],
        },
        {
          id: "i-onion-rings",
          name: "Beer-battered onion rings",
          description: "Crunchy, golden, six to a basket.",
          pricePence: 525,
          image: img("1639744091981-2f826256f4d0"),
          dietary: ["v"],
          modifierGroups: [],
        },
      ],
    },
    {
      id: "c-drinks-og",
      name: "Drinks",
      sortOrder: 3,
      items: [
        {
          id: "i-shake",
          name: "Milkshake",
          description: "Thick, proper, with a cherry on top.",
          pricePence: 595,
          image: img("1568901346375-23c9450c58cd"),
          modifierGroups: [
            {
              id: "g-flavour",
              name: "Flavour",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-chocolate", name: "Chocolate", pricePence: 0 },
                { id: "o-vanilla", name: "Vanilla", pricePence: 0 },
                { id: "o-strawberry", name: "Strawberry", pricePence: 0 },
                { id: "o-oreo", name: "Oreo crumble", pricePence: 100 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "spice-route": [
    {
      id: "c-curries",
      name: "Curries",
      sortOrder: 1,
      items: [
        {
          id: "i-butter-chicken",
          name: "Butter Chicken",
          description: "Tandoor-grilled chicken, tomato and cashew cream, fenugreek.",
          pricePence: 1395,
          image: img("1588166524941-3bf61a9c41db"),
          popular: true,
          modifierGroups: [
            {
              id: "g-heat",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-mild", name: "Mild", pricePence: 0 },
                { id: "o-medium", name: "Medium", pricePence: 0 },
                { id: "o-hot", name: "Hot", pricePence: 0 },
                { id: "o-extra", name: "Extra hot (you're warned)", pricePence: 0 },
              ],
            },
            {
              id: "g-rice",
              name: "Rice",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-basmati", name: "Steamed basmati", pricePence: 0 },
                { id: "o-pilau", name: "Pilau", pricePence: 100 },
                { id: "o-coconut", name: "Coconut rice", pricePence: 150 },
              ],
            },
          ],
        },
        {
          id: "i-rogan-josh",
          name: "Lamb Rogan Josh",
          description: "Slow-cooked lamb, Kashmiri chillies, tomato, yogurt.",
          pricePence: 1595,
          image: img("1585937421612-70a008356fbe"),
          popular: true,
          modifierGroups: [
            {
              id: "g-heat-2",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-medium", name: "Medium", pricePence: 0 },
                { id: "o-hot", name: "Hot", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-paneer",
          name: "Palak Paneer",
          description: "Cottage cheese, spinach, garlic, cumin, cream.",
          pricePence: 1295,
          image: img("1567188040759-fb8a883dc6d8"),
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-heat-3",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-mild", name: "Mild", pricePence: 0 },
                { id: "o-medium", name: "Medium", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-dal-makhani",
          name: "Dal Makhani",
          description: "Black lentils, kidney beans, slow-cooked overnight. Pure comfort.",
          pricePence: 1095,
          image: img("1589302168068-964664d93dc0"),
          dietary: ["v"],
          modifierGroups: [],
        },
      ],
    },
    {
      id: "c-breads",
      name: "Breads & Sides",
      sortOrder: 2,
      items: [
        {
          id: "i-naan",
          name: "Naan",
          description: "Hand-stretched, tandoor-baked.",
          pricePence: 350,
          image: img("1626543537050-4df4f8e3e43f"),
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-naan-type",
              name: "Variant",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-plain", name: "Plain", pricePence: 0 },
                { id: "o-garlic", name: "Garlic & coriander", pricePence: 50 },
                { id: "o-peshwari", name: "Peshwari (sweet coconut)", pricePence: 100 },
                { id: "o-cheese", name: "Cheese", pricePence: 150 },
              ],
            },
          ],
        },
        {
          id: "i-samosa",
          name: "Vegetable samosas",
          description: "Crispy pastry, spiced potato & pea, tamarind chutney.",
          pricePence: 495,
          image: img("1601050690597-df0568f70950"),
          dietary: ["vg"],
          modifierGroups: [],
        },
        {
          id: "i-raita",
          name: "Cucumber raita",
          description: "Cooling yogurt with mint, cucumber, cumin.",
          pricePence: 295,
          dietary: ["v", "gf"],
          modifierGroups: [],
        },
      ],
    },
  ],

  "koi-sushi": [
    {
      id: "c-rolls",
      name: "Signature rolls",
      sortOrder: 1,
      items: [
        {
          id: "i-dragon",
          name: "Dragon Roll",
          description: "Prawn tempura, avocado, cucumber, topped with seared eel and unagi glaze.",
          pricePence: 1595,
          image: img("1579871494447-9811cf80d66c"),
          popular: true,
          modifierGroups: [
            {
              id: "g-pieces",
              name: "How many pieces?",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-8", name: "8 pieces", pricePence: 0 },
                { id: "o-12", name: "12 pieces", pricePence: 400 },
              ],
            },
          ],
        },
        {
          id: "i-rainbow",
          name: "Rainbow Roll",
          description: "California inside, topped with tuna, salmon, yellowtail and avocado.",
          pricePence: 1495,
          image: img("1579584425555-c3ce17fd4351"),
          popular: true,
          modifierGroups: [
            {
              id: "g-pieces-2",
              name: "How many pieces?",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-8", name: "8 pieces", pricePence: 0 },
                { id: "o-12", name: "12 pieces", pricePence: 400 },
              ],
            },
          ],
        },
        {
          id: "i-veggie-roll",
          name: "Garden Roll",
          description: "Avocado, cucumber, pickled carrot, tofu, sesame.",
          pricePence: 995,
          image: img("1617196034183-421b4917abeb"),
          dietary: ["vg"],
          modifierGroups: [],
        },
      ],
    },
    {
      id: "c-nigiri",
      name: "Nigiri & Sashimi",
      sortOrder: 2,
      items: [
        {
          id: "i-salmon",
          name: "Salmon nigiri",
          description: "Fresh Atlantic salmon, pressed rice, wasabi.",
          pricePence: 650,
          image: img("1553621042-f6e147245754"),
          modifierGroups: [
            {
              id: "g-count",
              name: "Order of",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-2", name: "2 pieces", pricePence: 0 },
                { id: "o-4", name: "4 pieces", pricePence: 550 },
              ],
            },
          ],
        },
        {
          id: "i-tuna",
          name: "Tuna nigiri",
          description: "Yellowfin tuna, pressed rice, wasabi.",
          pricePence: 750,
          image: img("1617196035154-1e7e6e28b0db"),
          popular: true,
          modifierGroups: [
            {
              id: "g-count-2",
              name: "Order of",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-2", name: "2 pieces", pricePence: 0 },
                { id: "o-4", name: "4 pieces", pricePence: 650 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-mains-sushi",
      name: "Bowls & Bento",
      sortOrder: 3,
      items: [
        {
          id: "i-chirashi",
          name: "Chirashi bowl",
          description: "Sushi rice, assorted sashimi, pickled vegetables, sesame.",
          pricePence: 1795,
          image: img("1553621042-f6e147245754"),
          popular: true,
          modifierGroups: [
            {
              id: "g-sauce",
              name: "Sauces (pick up to 2)",
              required: false,
              minSelections: 0,
              maxSelections: 2,
              options: [
                { id: "o-soy", name: "Soy", pricePence: 0 },
                { id: "o-ponzu", name: "Ponzu", pricePence: 0 },
                { id: "o-spicy", name: "Spicy mayo", pricePence: 50 },
                { id: "o-wasabi", name: "Extra wasabi", pricePence: 50 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "green-bowl": [
    {
      id: "c-bowls",
      name: "Signature Bowls",
      sortOrder: 1,
      items: [
        {
          id: "i-harvest",
          name: "Harvest Bowl",
          description: "Quinoa, roasted squash, kale, pomegranate, tahini.",
          pricePence: 1195,
          image: img("1546069901-ba9599a7e63c"),
          popular: true,
          dietary: ["vg", "gf"],
          modifierGroups: [
            {
              id: "g-base",
              name: "Choose your base",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-quinoa", name: "Quinoa", pricePence: 0 },
                { id: "o-brown-rice", name: "Brown rice", pricePence: 0 },
                { id: "o-greens", name: "Mixed greens", pricePence: 0 },
              ],
            },
            {
              id: "g-protein",
              name: "Add protein",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-tofu", name: "Marinated tofu", pricePence: 250 },
                { id: "o-chicken", name: "Grilled chicken", pricePence: 350 },
                { id: "o-salmon", name: "Miso salmon", pricePence: 450 },
              ],
            },
            {
              id: "g-dressing",
              name: "Dressing",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-tahini", name: "Lemon tahini", pricePence: 0 },
                { id: "o-miso", name: "Miso ginger", pricePence: 0 },
                { id: "o-balsamic", name: "Balsamic vinaigrette", pricePence: 0 },
              ],
            },
            {
              id: "g-toppings",
              name: "Extra toppings",
              required: false,
              minSelections: 0,
              maxSelections: 3,
              options: [
                { id: "o-avo", name: "Avocado", pricePence: 200 },
                { id: "o-seeds", name: "Mixed seeds", pricePence: 100 },
                { id: "o-nuts", name: "Toasted almonds", pricePence: 150 },
                { id: "o-feta", name: "Jersey feta", pricePence: 200 },
              ],
            },
          ],
        },
        {
          id: "i-glow",
          name: "Green Glow",
          description: "Kale, broccoli, edamame, avocado, miso-ginger dressing.",
          pricePence: 1095,
          image: img("1540420773420-3366772f4999"),
          dietary: ["vg", "gf"],
          modifierGroups: [],
        },
      ],
    },
  ],

  "bangkok-street": [
    {
      id: "c-thai-mains",
      name: "Mains",
      sortOrder: 1,
      items: [
        {
          id: "i-pad-thai",
          name: "Pad Thai",
          description: "Rice noodles, tamarind, peanuts, lime, bean sprouts.",
          pricePence: 1295,
          image: img("1559314809-0d155014e29e"),
          popular: true,
          modifierGroups: [
            {
              id: "g-protein",
              name: "Pick your protein",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-chicken", name: "Chicken", pricePence: 0 },
                { id: "o-beef", name: "Beef", pricePence: 150 },
                { id: "o-prawn", name: "King prawns", pricePence: 300 },
                { id: "o-tofu", name: "Tofu", pricePence: 0 },
              ],
            },
            {
              id: "g-heat",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-mild", name: "Mild 🌶️", pricePence: 0 },
                { id: "o-med", name: "Medium 🌶️🌶️", pricePence: 0 },
                { id: "o-hot", name: "Hot 🌶️🌶️🌶️", pricePence: 0 },
                { id: "o-thai", name: "Thai hot 🌶️🌶️🌶️🌶️", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-green-curry",
          name: "Green Curry",
          description: "Coconut milk, Thai basil, bamboo shoots, aubergine.",
          pricePence: 1395,
          image: img("1455619452474-d2be8b1e70cd"),
          popular: true,
          modifierGroups: [
            {
              id: "g-protein-2",
              name: "Pick your protein",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-chicken", name: "Chicken", pricePence: 0 },
                { id: "o-beef", name: "Beef", pricePence: 150 },
                { id: "o-prawn", name: "King prawns", pricePence: 300 },
                { id: "o-vegan", name: "Vegan (tofu & veg)", pricePence: 0 },
              ],
            },
            {
              id: "g-heat-2",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-mild", name: "Mild", pricePence: 0 },
                { id: "o-med", name: "Medium", pricePence: 0 },
                { id: "o-hot", name: "Hot", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "casa-mexicana": [
    {
      id: "c-tacos",
      name: "Tacos",
      sortOrder: 1,
      items: [
        {
          id: "i-tacos-trio",
          name: "Taco Trio",
          description: "Three soft corn tortillas, build your own filling combination.",
          pricePence: 1195,
          image: img("1565299585323-38d6b0865b47"),
          popular: true,
          modifierGroups: [
            {
              id: "g-fillings",
              name: "Choose exactly 3 fillings",
              required: true,
              minSelections: 3,
              maxSelections: 3,
              options: [
                { id: "o-carnitas", name: "Pulled pork carnitas", pricePence: 0 },
                { id: "o-chicken", name: "Citrus chicken", pricePence: 0 },
                { id: "o-beef", name: "Slow-cooked beef barbacoa", pricePence: 100 },
                { id: "o-fish", name: "Baja fish", pricePence: 150 },
                { id: "o-jackfruit", name: "Spiced jackfruit (v)", pricePence: 0 },
              ],
            },
            {
              id: "g-sauce",
              name: "Salsas (up to 3)",
              required: false,
              minSelections: 0,
              maxSelections: 3,
              options: [
                { id: "o-pico", name: "Pico de gallo", pricePence: 0 },
                { id: "o-verde", name: "Salsa verde", pricePence: 0 },
                { id: "o-habanero", name: "Habanero (hot)", pricePence: 0 },
                { id: "o-crema", name: "Chipotle crema", pricePence: 50 },
              ],
            },
          ],
        },
        {
          id: "i-burrito",
          name: "House Burrito",
          description: "Large flour tortilla, rice, beans, cheese, your choice of filling.",
          pricePence: 1095,
          image: img("1626700051175-6818013e1d4f"),
          modifierGroups: [
            {
              id: "g-burrito-filling",
              name: "Filling",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-carnitas", name: "Carnitas", pricePence: 0 },
                { id: "o-chicken", name: "Chicken", pricePence: 0 },
                { id: "o-veggie", name: "Black bean & corn", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "olive-tree": [
    {
      id: "c-mezze",
      name: "Mezze",
      sortOrder: 1,
      items: [
        {
          id: "i-mezze-platter",
          name: "Mezze Platter",
          description: "Build your own — choose 4 mezze, comes with warm flatbread.",
          pricePence: 1595,
          image: img("1544025162-d76694265947"),
          popular: true,
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-mezze",
              name: "Pick exactly 4",
              required: true,
              minSelections: 4,
              maxSelections: 4,
              options: [
                { id: "o-hummus", name: "Classic hummus", pricePence: 0 },
                { id: "o-babaganoush", name: "Baba ganoush", pricePence: 0 },
                { id: "o-tzatziki", name: "Tzatziki", pricePence: 0 },
                { id: "o-dolma", name: "Stuffed vine leaves", pricePence: 100 },
                { id: "o-feta", name: "Feta & olives", pricePence: 100 },
                { id: "o-falafel", name: "Falafel (3)", pricePence: 150 },
                { id: "o-halloumi", name: "Grilled halloumi", pricePence: 200 },
                { id: "o-labneh", name: "Labneh with za'atar", pricePence: 150 },
              ],
            },
          ],
        },
        {
          id: "i-souvlaki",
          name: "Chicken Souvlaki",
          description: "Grilled skewers, lemon oregano, served with pita, tzatziki, salad.",
          pricePence: 1495,
          image: img("1555939594-58d7cb561ad1"),
          modifierGroups: [
            {
              id: "g-side",
              name: "Pick a side",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-rice", name: "Lemon rice", pricePence: 0 },
                { id: "o-fries", name: "Greek fries", pricePence: 0 },
                { id: "o-salad", name: "Greek salad", pricePence: 150 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "ramen-ki": [
    {
      id: "c-ramen",
      name: "Ramen",
      sortOrder: 1,
      items: [
        {
          id: "i-tonkotsu",
          name: "Tonkotsu Ramen",
          description: "24hr pork bone broth, chashu pork, egg, black garlic oil, greens.",
          pricePence: 1395,
          image: img("1569718212165-3a8278d5f624"),
          popular: true,
          modifierGroups: [
            {
              id: "g-noodle",
              name: "Noodle firmness",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-soft", name: "Soft", pricePence: 0 },
                { id: "o-medium", name: "Medium", pricePence: 0 },
                { id: "o-firm", name: "Firm", pricePence: 0 },
              ],
            },
            {
              id: "g-extras",
              name: "Add-ons",
              required: false,
              minSelections: 0,
              maxSelections: 4,
              options: [
                { id: "o-egg", name: "Extra egg", pricePence: 150 },
                { id: "o-pork", name: "Extra chashu", pricePence: 300 },
                { id: "o-corn", name: "Sweetcorn", pricePence: 100 },
                { id: "o-nori", name: "Extra nori", pricePence: 50 },
                { id: "o-spice", name: "Spicy oil", pricePence: 50 },
              ],
            },
          ],
        },
        {
          id: "i-miso",
          name: "Miso Ramen",
          description: "Rich miso broth, ground pork, corn, scallion, butter cube.",
          pricePence: 1295,
          image: img("1618889482923-38250401a84e"),
          popular: true,
          modifierGroups: [
            {
              id: "g-heat",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-mild", name: "Mild", pricePence: 0 },
                { id: "o-med", name: "Medium", pricePence: 0 },
                { id: "o-hot", name: "Hot", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-vegan-ramen",
          name: "Shiitake Ramen",
          description: "Mushroom dashi, shoyu, crispy tofu, pickled vegetables.",
          pricePence: 1195,
          image: img("1615297928064-24977384d0da"),
          dietary: ["vg"],
          modifierGroups: [],
        },
      ],
    },
  ],

  "fire-wings": [
    {
      id: "c-wings",
      name: "Wings",
      sortOrder: 1,
      items: [
        {
          id: "i-wings-bucket",
          name: "Wings Bucket",
          description: "Hand-breaded, double-fried wings. Pick your sauce and heat.",
          pricePence: 1295,
          image: img("1527477396000-e27163b481c2"),
          popular: true,
          modifierGroups: [
            {
              id: "g-count",
              name: "How many?",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-6", name: "6 wings", pricePence: 0 },
                { id: "o-12", name: "12 wings", pricePence: 700 },
                { id: "o-24", name: "24 wings (share)", pricePence: 1700 },
              ],
            },
            {
              id: "g-sauce",
              name: "Sauce",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-buffalo", name: "Classic Buffalo 🌶️", pricePence: 0 },
                { id: "o-bbq", name: "Smoky BBQ", pricePence: 0 },
                { id: "o-honey", name: "Honey garlic", pricePence: 0 },
                { id: "o-korean", name: "Korean gochujang 🌶️🌶️", pricePence: 0 },
                { id: "o-jerk", name: "Jamaican jerk 🌶️🌶️", pricePence: 0 },
                { id: "o-ghost", name: "Ghost pepper 🌶️🌶️🌶️🌶️", pricePence: 100 },
              ],
            },
            {
              id: "g-dips",
              name: "Dips (up to 2)",
              required: false,
              minSelections: 0,
              maxSelections: 2,
              options: [
                { id: "o-blue", name: "Blue cheese", pricePence: 100 },
                { id: "o-ranch", name: "Ranch", pricePence: 100 },
                { id: "o-honey-mustard", name: "Honey mustard", pricePence: 100 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "harbour-fish-and-chips": [
    {
      id: "c-fish",
      name: "Fish & Chips",
      sortOrder: 1,
      items: [
        {
          id: "i-cod-chips",
          name: "Cod & Chips",
          description: "Day-boat cod, beer batter, Jersey Royal chips, mushy peas.",
          pricePence: 1195,
          image: img("1579208575657-c595a05383b7"),
          popular: true,
          modifierGroups: [
            {
              id: "g-size",
              name: "Size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-small", name: "Small", pricePence: -200 },
                { id: "o-reg", name: "Regular", pricePence: 0 },
                { id: "o-large", name: "Large", pricePence: 250 },
              ],
            },
            {
              id: "g-sides",
              name: "Swap chips?",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-sweet", name: "Sweet potato fries", pricePence: 150 },
                { id: "o-onion", name: "Onion rings", pricePence: 100 },
              ],
            },
            {
              id: "g-sauces",
              name: "Sauces",
              required: false,
              minSelections: 0,
              maxSelections: 3,
              options: [
                { id: "o-tartare", name: "Tartare", pricePence: 0 },
                { id: "o-curry", name: "Curry sauce", pricePence: 50 },
                { id: "o-gravy", name: "Gravy", pricePence: 50 },
                { id: "o-ketchup", name: "Ketchup", pricePence: 0 },
              ],
            },
          ],
        },
        {
          id: "i-haddock",
          name: "Haddock & Chips",
          description: "Fresh haddock, crisp batter, classic chippy sides.",
          pricePence: 1295,
          image: img("1580959375944-abd7e991f971"),
          modifierGroups: [
            {
              id: "g-size-2",
              name: "Size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-reg", name: "Regular", pricePence: 0 },
                { id: "o-large", name: "Large", pricePence: 250 },
              ],
            },
          ],
        },
        {
          id: "i-scampi",
          name: "Breaded scampi",
          description: "Whole-tail scampi, chips, tartare, lemon wedge.",
          pricePence: 1395,
          image: img("1565299507177-b0ac66763828"),
          modifierGroups: [],
        },
      ],
    },
  ],

  "the-vegan-kitchen": [
    {
      id: "c-mains-vk",
      name: "Mains",
      sortOrder: 1,
      items: [
        {
          id: "i-beyond-burger",
          name: "The Beyond Burger",
          description: "Plant-based patty, vegan cheese, smoky sauce, brioche (vegan) bun.",
          pricePence: 1395,
          image: img("1550317138-10000687a72b"),
          popular: true,
          dietary: ["vg"],
          modifierGroups: [
            {
              id: "g-extras",
              name: "Extras",
              required: false,
              minSelections: 0,
              maxSelections: 3,
              options: [
                { id: "o-cheese", name: "Extra vegan cheese", pricePence: 150 },
                { id: "o-avo", name: "Avocado", pricePence: 200 },
                { id: "o-bacon", name: "Vegan bacon", pricePence: 250 },
              ],
            },
          ],
        },
        {
          id: "i-jackfruit",
          name: "Jackfruit tacos",
          description: "Spiced pulled jackfruit, chipotle mayo, pickled slaw, three tacos.",
          pricePence: 1195,
          image: img("1583032015879-e5022cb87c65"),
          dietary: ["vg"],
          modifierGroups: [],
        },
      ],
    },
  ],

  "little-italy": [
    {
      id: "c-pasta",
      name: "Pasta",
      sortOrder: 1,
      items: [
        {
          id: "i-carbonara",
          name: "Carbonara",
          description: "Guanciale, egg yolk, pecorino, black pepper. No cream. Ever.",
          pricePence: 1395,
          image: img("1551183053-bf91a1d81141"),
          popular: true,
          modifierGroups: [
            {
              id: "g-pasta",
              name: "Pasta shape",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-spaghetti", name: "Spaghetti", pricePence: 0 },
                { id: "o-rigatoni", name: "Rigatoni", pricePence: 0 },
                { id: "o-tagliatelle", name: "Tagliatelle", pricePence: 50 },
              ],
            },
          ],
        },
        {
          id: "i-ragu",
          name: "Bolognese",
          description: "8-hour beef and pork ragù, hand-cut tagliatelle, parmesan.",
          pricePence: 1495,
          image: img("1551892374-ecf8754cf8b0"),
          popular: true,
          modifierGroups: [
            {
              id: "g-pasta-2",
              name: "Pasta shape",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-tagliatelle", name: "Tagliatelle (classic)", pricePence: 0 },
                { id: "o-pappardelle", name: "Pappardelle", pricePence: 100 },
              ],
            },
          ],
        },
        {
          id: "i-arrabiata",
          name: "Penne all'arrabbiata",
          description: "Fiery tomato sauce, garlic, chilli, parsley.",
          pricePence: 1195,
          image: img("1598866594230-a7c12756260f"),
          dietary: ["vg"],
          modifierGroups: [
            {
              id: "g-heat",
              name: "Heat level",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-medium", name: "Medium", pricePence: 0 },
                { id: "o-hot", name: "Hot", pricePence: 0 },
                { id: "o-extra", name: "Extra hot", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "poke-paradise": [
    {
      id: "c-poke",
      name: "Build your own bowl",
      sortOrder: 1,
      items: [
        {
          id: "i-custom-poke",
          name: "Build Your Own",
          description: "Pick a base, proteins, toppings, sauce. Serious customisation.",
          pricePence: 1195,
          image: img("1546069901-ba9599a7e63c"),
          popular: true,
          modifierGroups: [
            {
              id: "g-base-poke",
              name: "Base",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-white", name: "Sushi rice", pricePence: 0 },
                { id: "o-brown", name: "Brown rice", pricePence: 0 },
                { id: "o-greens", name: "Mixed greens", pricePence: 0 },
                { id: "o-zoodles", name: "Zucchini noodles", pricePence: 100 },
              ],
            },
            {
              id: "g-protein-poke",
              name: "Pick up to 2 proteins",
              required: true,
              minSelections: 1,
              maxSelections: 2,
              options: [
                { id: "o-tuna", name: "Spicy tuna", pricePence: 0 },
                { id: "o-salmon", name: "Shoyu salmon", pricePence: 0 },
                { id: "o-prawn", name: "Cooked prawn", pricePence: 50 },
                { id: "o-tofu", name: "Marinated tofu", pricePence: 0 },
              ],
            },
            {
              id: "g-toppings-poke",
              name: "Toppings (up to 5)",
              required: false,
              minSelections: 0,
              maxSelections: 5,
              options: [
                { id: "o-avo", name: "Avocado", pricePence: 150 },
                { id: "o-edamame", name: "Edamame", pricePence: 50 },
                { id: "o-cucumber", name: "Cucumber", pricePence: 0 },
                { id: "o-seaweed", name: "Seaweed salad", pricePence: 100 },
                { id: "o-ginger", name: "Pickled ginger", pricePence: 0 },
                { id: "o-mango", name: "Mango", pricePence: 100 },
                { id: "o-corn", name: "Sweetcorn", pricePence: 50 },
              ],
            },
            {
              id: "g-sauce-poke",
              name: "Sauce",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-shoyu", name: "Classic shoyu", pricePence: 0 },
                { id: "o-spicy", name: "Spicy mayo", pricePence: 0 },
                { id: "o-ponzu", name: "Citrus ponzu", pricePence: 0 },
                { id: "o-peanut", name: "Peanut satay", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "sweet-jersey": [
    {
      id: "c-cakes",
      name: "Cakes & Slices",
      sortOrder: 1,
      items: [
        {
          id: "i-dough",
          name: "Jersey cream doughnut",
          description: "Pillowy dough, Jersey cream, seasonal jam filling.",
          pricePence: 395,
          image: img("1551024506-0bccd828d307"),
          popular: true,
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-jam",
              name: "Jam filling",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-strawberry", name: "Strawberry", pricePence: 0 },
                { id: "o-raspberry", name: "Raspberry", pricePence: 0 },
                { id: "o-lemon", name: "Lemon curd", pricePence: 50 },
                { id: "o-chocolate", name: "Chocolate ganache", pricePence: 50 },
              ],
            },
          ],
        },
        {
          id: "i-tart",
          name: "Seasonal fruit tart",
          description: "Sweet pastry, pastry cream, whatever's best this week.",
          pricePence: 495,
          image: img("1488477181946-6428a0291777"),
          dietary: ["v"],
          modifierGroups: [],
        },
        {
          id: "i-brownie",
          name: "Sea salt brownie",
          description: "Dark chocolate, sea salt flakes, fudgy centre.",
          pricePence: 395,
          image: img("1606313564200-e75d5e30476c"),
          dietary: ["v"],
          modifierGroups: [
            {
              id: "g-serve",
              name: "Serve with…",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-icecream", name: "Vanilla ice cream", pricePence: 200 },
                { id: "o-cream", name: "Jersey cream", pricePence: 150 },
              ],
            },
          ],
        },
      ],
    },
  ],

  "cafe-mocha": [
    {
      id: "c-coffee",
      name: "Coffee",
      sortOrder: 1,
      items: [
        {
          id: "i-latte",
          name: "Flat white / Latte",
          description: "Double shot espresso, steamed milk, no fuss.",
          pricePence: 395,
          image: img("1495474472287-4d71bcdd2085"),
          popular: true,
          modifierGroups: [
            {
              id: "g-size",
              name: "Size",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-small", name: "Small", pricePence: 0 },
                { id: "o-regular", name: "Regular", pricePence: 50 },
                { id: "o-large", name: "Large", pricePence: 100 },
              ],
            },
            {
              id: "g-milk",
              name: "Milk",
              required: true,
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: "o-jersey", name: "Jersey whole", pricePence: 0 },
                { id: "o-semi", name: "Semi-skimmed", pricePence: 0 },
                { id: "o-oat", name: "Oat", pricePence: 50 },
                { id: "o-almond", name: "Almond", pricePence: 50 },
                { id: "o-soy", name: "Soy", pricePence: 50 },
              ],
            },
            {
              id: "g-syrup",
              name: "Add a syrup",
              required: false,
              minSelections: 0,
              maxSelections: 2,
              options: [
                { id: "o-vanilla", name: "Vanilla", pricePence: 50 },
                { id: "o-caramel", name: "Caramel", pricePence: 50 },
                { id: "o-hazelnut", name: "Hazelnut", pricePence: 50 },
              ],
            },
            {
              id: "g-shot",
              name: "Extra shot?",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-shot", name: "Extra shot of espresso", pricePence: 80 },
              ],
            },
          ],
        },
        {
          id: "i-americano",
          name: "Americano",
          description: "Double espresso, hot water. Bold, unembellished.",
          pricePence: 295,
          image: img("1514432324607-a09d9b4aefdd"),
          modifierGroups: [
            {
              id: "g-milky",
              name: "Splash of milk?",
              required: false,
              minSelections: 0,
              maxSelections: 1,
              options: [
                { id: "o-splash", name: "Yes, splash it", pricePence: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c-cakes",
      name: "Cakes",
      sortOrder: 2,
      items: [
        {
          id: "i-banana-bread",
          name: "Banana bread",
          description: "House-made, walnut, Jersey butter.",
          pricePence: 395,
          image: img("1586444248902-2f64eddc13df"),
          dietary: ["v"],
          modifierGroups: [],
        },
      ],
    },
  ],
};

/** Fallback — any restaurant without a specific menu gets this generic menu. */
export const GENERIC_MENU: MenuCategory[] = [
  {
    id: "c-mains",
    name: "Mains",
    sortOrder: 1,
    items: [
      {
        id: "i-house",
        name: "House special",
        description: "The chef's pick tonight — ask for details.",
        pricePence: 1450,
        image: img("1504674900247-0877df9cc836"),
        popular: true,
        modifierGroups: [
          {
            id: "g-portion",
            name: "Portion size",
            required: true,
            minSelections: 1,
            maxSelections: 1,
            options: [
              { id: "o-regular", name: "Regular", pricePence: 0 },
              { id: "o-large", name: "Large (sharing)", pricePence: 400 },
            ],
          },
        ],
      },
      {
        id: "i-seasonal",
        name: "Seasonal plate",
        description: "A Jersey-grown seasonal dish, rotated weekly.",
        pricePence: 1295,
        image: img("1540420773420-3366772f4999"),
        dietary: ["v"],
        modifierGroups: [],
      },
    ],
  },
  {
    id: "c-sides-g",
    name: "Sides",
    sortOrder: 2,
    items: [
      {
        id: "i-chips",
        name: "Jersey Royal chips",
        description: "Crisp. Salty. Probably the best chip on the island.",
        pricePence: 450,
        image: img("1573080496219-bb080dd4f877"),
        dietary: ["vg"],
        modifierGroups: [],
      },
    ],
  },
  {
    id: "c-drinks-g",
    name: "Drinks",
    sortOrder: 3,
    items: [
      {
        id: "i-water",
        name: "Still water",
        description: "500ml bottle.",
        pricePence: 200,
        modifierGroups: [],
      },
    ],
  },
];
