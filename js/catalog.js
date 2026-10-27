// =============================================================================
// Hans Impex 360° E-Showroom — Master Catalog & Specification Data
// Est. 2003 · Noida · Premium Indian Spices, Dry Fruits & Foxnuts Exporter
// =============================================================================

const SITE = "https://hansimpex.online/";
const WHATSAPP_PHONE = "917428240290";

const CATEGORIES = {
  all: {
    id: "all",
    name: "All Products",
    kicker: "Complete Export Portfolio",
    icon: "🌟",
    yaw: 180,
    pitch: -22,
    hfov: 74,
    map: { x: 84, y: 38 },
    desc: "Explore all premium Indian dry fruits, machine-cleaned makhana, and export spices."
  },
  dry: {
    id: "dry",
    name: "Dry Fruits Pavilion",
    kicker: "Handpicked Nutrition & Crunch",
    icon: "🌰",
    yaw: 182,
    pitch: -24,
    hfov: 68,
    map: { x: 130, y: 46 },
    desc: "California & Indian whole almonds, premium W240/W320 cashew nuts sourced from certified farms."
  },
  fox: {
    id: "fox",
    name: "Makhana Lounge",
    kicker: "Light, Crunchy, Export Grade",
    icon: "⚪",
    yaw: 176,
    pitch: -24,
    hfov: 68,
    map: { x: 84, y: 38 },
    desc: "Machine-cleaned 6 mm to 20 mm Indian fox nuts (gorgon nuts) with uniform puffing and high shelf stability."
  },
  spice: {
    id: "spice",
    name: "Heritage Spices Arcade",
    kicker: "Vibrant Aroma, Natural Purity",
    icon: "🌶️",
    yaw: 94,
    pitch: -17,
    hfov: 70,
    map: { x: 134, y: 84 },
    desc: "Sun-dried fiery red chillies, high-curcumin golden turmeric, aromatic coriander, and master spice blends."
  },
  premium: {
    id: "premium",
    name: "Rozeat & Royal Reserve",
    kicker: "Export Cartons & Signature Blends",
    icon: "👑",
    yaw: -92,
    pitch: -14,
    hfov: 68,
    map: { x: 34, y: 84 },
    desc: "Original 100g Rozeat export cartons — Butter Chicken, Nahari, Kitchen King, Shahi Paneer, and Garam Masala."
  },
  bulk: {
    id: "bulk",
    name: "Bulk & Logistics Hub",
    kicker: "FCL Container & Palletized Export",
    icon: "🚢",
    yaw: -40,
    pitch: -14,
    hfov: 74,
    map: { x: 38, y: 46 },
    desc: "Industrial wholesale supply, 10kg/25kg vacuum packaging, container loading from ICD Dadri & JNPT Mumbai."
  }
};

const PRODUCTS = [
  {
    id: "almonds",
    name: "Premium Almonds",
    category: "dry",
    premium: true,
    kind: "bowl",
    image: "assets/almonds.webp",
    thumb: "assets/almonds-thumb.webp",
    yaw: 158,
    pitch: -30,
    view: SITE + "single-product.php?id=414",
    tagline: "Handpicked whole nuts · Natural sweetness & rich oil content",
    desc: "Hans Impex offers handpicked premium almonds, sourced from trusted farms and hygienically cleaned in Noida. Celebrated for uniform sizing, crunchy snap, rich vitamin E content, and natural sweetness. Suitable for retail packaging, confectionery, snacking, and wholesale export.",
    hsCode: "0802.12.00",
    origin: "India / California (Imported & Processed)",
    variants: [
      { size: "250g Pouch", moq: "200 packs", packaging: "Food-grade zip standup pouch", shelfLife: "12 months" },
      { size: "500g Jar", moq: "100 units", packaging: "Sealed food-grade PET jar", shelfLife: "12 months" },
      { size: "10kg Carton", moq: "25 cartons", packaging: "Vacuum-sealed inner bag + master carton", shelfLife: "18 months" },
      { size: "25kg Bulk Bag", moq: "1 Metric Ton", packaging: "Multi-wall kraft paper / vacuum bag", shelfLife: "18 months" }
    ],
    features: [
      { title: "Uniform Grade", desc: "Even size sorting (23/25, 27/30 count per oz)" },
      { title: "Low Moisture", desc: "Moisture content under 6% for lasting crunch" },
      { title: "100% Natural", desc: "Zero bleaching, zero chemical preservatives" },
      { title: "Rich Nutrient Profile", desc: "High in dietary fiber, protein and natural antioxidants" }
    ],
    specs: {
      "Grade / Variety": "California Nonpareil & Indian Mamra grades available",
      "Purity / Cleanliness": "99.8% minimum (machine-cleaned and optical sorted)",
      "Moisture Content": "Max 5.8% for extended shelf life",
      "Texture & Flavour": "Crunchy snap, naturally nutty and sweet",
      "Foreign Matter": "< 0.1% max",
      "Certifications": "FSSAI, APEDA, ISO 22000, Phytosanitary, Halal",
      "Export Packaging": "5 kg / 10 kg vacuum bags, 25 kg master cartons, palletized FCL/LCL",
      "Factory Origin": "Hans Impex, Sector 49, Noida, India (Est. 2003)"
    },
    nutrition: {
      "Energy": "579 kcal / 100g",
      "Protein": "21.2 g",
      "Dietary Fiber": "12.5 g",
      "Total Fat": "49.9 g",
      "Carbohydrates": "21.6 g"
    }
  },
  {
    id: "cashews",
    name: "Premium Cashew Nuts (Kaju)",
    category: "dry",
    premium: true,
    kind: "bowl",
    image: "assets/cashews.webp",
    thumb: "assets/cashews-thumb.webp",
    yaw: 206,
    pitch: -26,
    view: SITE + "single-product.php?id=413",
    tagline: "Whole jumbo white cashews · Creamy, buttery and fresh",
    desc: "Handpicked premium whole cashew nuts processed under strict hygiene standards by Hans Impex in Noida. Available in W240 and W320 export grades. Creamy, sweet, and perfectly cured for snacking, luxury gifting, and food manufacturing.",
    hsCode: "0801.32.10",
    origin: "India (Mangalore / Goa) & Selected Origins",
    variants: [
      { size: "250g Zip Pouch", moq: "200 packs", packaging: "Triple-layer nitrogen flushed pouch", shelfLife: "12 months" },
      { size: "500g Luxury Tin", moq: "100 units", packaging: "Airtight vacuum tin with freshness seal", shelfLife: "12 months" },
      { size: "11.34kg (25 lb) Tin", moq: "20 tins", packaging: "Standard export vacuum tin", shelfLife: "18 months" },
      { size: "22.68kg Master Box", moq: "1 Metric Ton", packaging: "Twin export tins inside heavy-duty carton", shelfLife: "18 months" }
    ],
    features: [
      { title: "Export Grade", desc: "W240 (Jumbo) and W320 (Standard Whole) selections" },
      { title: "Natural Color", desc: "Uniform ivory-white appearance without spots" },
      { title: "Rich Taste", desc: "High butterfat content for creamy mouthfeel" },
      { title: "Inert Gas Packed", desc: "Vacuum nitrogen flushed to prevent rancidity" }
    ],
    specs: {
      "Grade Options": "W240 (220-240 nuts/lb) · W320 (300-320 nuts/lb)",
      "Form": "Whole white cashew kernels",
      "Broken / Scraps": "< 1.5% maximum",
      "Moisture": "Max 5.0%",
      "Certifications": "FSSAI, APEDA, ISO 22000, Phytosanitary",
      "Export Facility": "Hans Impex Facility, Noida, UP, India"
    },
    nutrition: {
      "Energy": "553 kcal / 100g",
      "Protein": "18.2 g",
      "Total Fat": "43.8 g",
      "Carbohydrates": "30.2 g",
      "Iron": "6.7 mg"
    }
  },
  {
    id: "foxnuts",
    name: "Premium Makhana (Fox Nuts)",
    category: "fox",
    premium: true,
    kind: "pack",
    image: "assets/foxnuts.webp",
    thumb: "assets/foxnuts-thumb.webp",
    yaw: 174,
    pitch: -26,
    view: SITE + "blogs.php?id=2",
    tagline: "Export-grade gorgon nuts · 6mm to 20mm machine-cleaned puffing",
    desc: "Hans Impex is a premier supplier and exporter of machine-cleaned Bihar Makhana (Fox Nuts). Harvested from pristine wetlands, sun-dried, popped, and optically sorted. Free from dust, hard black shells, and bitter kernels. The ultimate global superfood for roasting, snacking, and clean eating.",
    hsCode: "1904.10.90",
    origin: "Bihar, India (Direct sourcing & Noida processing)",
    variants: [
      { size: "100g Standup Pouch", moq: "500 packs", packaging: "Retail moisture-barrier pouch", shelfLife: "12 months" },
      { size: "250g Zip Bag", moq: "250 packs", packaging: "Resealable aroma-protection pack", shelfLife: "12 months" },
      { size: "5 kg Bulk Bag", moq: "40 bags", packaging: "Multi-ply food grade polypropylene bag", shelfLife: "15 months" },
      { size: "10 kg Master Bale", moq: "50 bales", packaging: "Compressed export sack with moisture liner", shelfLife: "18 months" }
    ],
    features: [
      { title: "Machine Cleaned", desc: "99.9% clean, zero black shell remnants" },
      { title: "Superfood Nutrition", desc: "Low glycemic index, rich in plant protein and calcium" },
      { title: "Uniform Sizing", desc: "Available in 5-Soot, 6-Soot (18mm-20mm) grades" },
      { title: "Crisp Puffing", desc: "Uniform spherical shape with light airy crunch" }
    ],
    specs: {
      "Size Sorting": "14 mm to 20 mm jumbo puffing",
      "Shell Residue": "Virtually zero (< 0.1%)",
      "Moisture": "Under 8% (crisp and roasted-ready)",
      "Colour": "Natural ivory white to pale cream",
      "Certifications": "APEDA Export Registered, FSSAI, ISO 22000, Halal",
      "Container Load": "20ft FCL ~ 2.8 MT (volumetric) / 40ft HQ ~ 6.5 MT"
    },
    nutrition: {
      "Energy": "347 kcal / 100g",
      "Protein": "9.7 g",
      "Fat": "0.1 g (Virtually fat-free)",
      "Carbohydrates": "76.9 g",
      "Calcium": "60 mg"
    }
  },
  {
    id: "chilli",
    name: "Premium Red Chilli Powder",
    category: "spice",
    premium: true,
    kind: "bowl",
    image: "assets/chilli-powder.webp",
    thumb: "assets/chilli-powder-thumb.webp",
    yaw: 84,
    pitch: -17,
    view: SITE + "single-product.php?id=419",
    tagline: "Fiery pungency & intense crimson red · 100% pure dried chillies",
    desc: "Crafted from carefully selected, sun-dried Guntur and Byadgi red chillies. Pulverized at controlled low temperatures by Hans Impex to preserve natural volatile oils, fiery capsaicin heat, and deep crimson color. Zero artificial color (Sudan dye free guarantee).",
    hsCode: "0904.22.11",
    origin: "Guntur / Andhra Pradesh, India",
    variants: [
      { size: "100g Carton", moq: "500 units", packaging: "Inner foil pouch inside outer export carton", shelfLife: "18 months" },
      { size: "500g Standup Pouch", moq: "200 packs", packaging: "Aroma-seal laminated zip pouch", shelfLife: "18 months" },
      { size: "1kg Poly Pack", moq: "100 packs", packaging: "Heavy-gauge food-grade barrier bag", shelfLife: "24 months" },
      { size: "25kg Bulk Bag", moq: "1 Metric Ton", packaging: "PP woven bag with inner HDPE liner", shelfLife: "24 months" }
    ],
    features: [
      { title: "Zero Colorants", desc: "Certified free of Sudan dyes, artificial additives" },
      { title: "Heat Control", desc: "SHU range: 25,000 to 45,000 Scoville Heat Units" },
      { title: "Cold Milled", desc: "Low-temperature grinding retains natural oils" },
      { title: "Fine Mesh", desc: "Sieved through 60-80 mesh for smooth blending" }
    ],
    specs: {
      "Ingredient": "100% pure sun-dried dried red chillies",
      "Colour Value (ASTA)": "80–120 ASTA units",
      "Moisture": "Max 10.0%",
      "Total Ash": "< 7.0%",
      "Acid Insoluble Ash": "< 1.0%",
      "Processing Standard": "Cold pulverized and hygienically sealed"
    },
    nutrition: {
      "Energy": "282 kcal / 100g",
      "Capsaicin": "0.22% – 0.35%",
      "Vitamin C": "76 mg",
      "Dietary Fiber": "34.8 g"
    }
  },
  {
    id: "turmeric",
    name: "Premium Turmeric Powder (Haldi)",
    category: "spice",
    premium: true,
    kind: "bowl",
    image: "assets/turmeric-powder.webp",
    thumb: "assets/turmeric-powder-thumb.webp",
    yaw: 98,
    pitch: -18,
    view: SITE + "single-product.php?id=420",
    tagline: "Golden curcumin-rich turmeric · Earthy fragrance & natural wellness",
    desc: "Finely ground high-curcumin Salem and Nizamabad turmeric finger roots. Carefully cleaned, steam-sterilized, and ground by Hans Impex to preserve natural curcuminoid potency, radiant golden-yellow hue, and earthy herbal warmth.",
    hsCode: "0910.30.20",
    origin: "Salem / Erode, Tamil Nadu, India",
    variants: [
      { size: "100g Box", moq: "500 cartons", packaging: "Sealed pouch in branded carton", shelfLife: "24 months" },
      { size: "500g Pouch", moq: "200 packs", packaging: "Resealable light-protective pouch", shelfLife: "24 months" },
      { size: "5kg Sack", moq: "20 sacks", packaging: "Food service bag", shelfLife: "24 months" },
      { size: "25kg Bulk Bag", moq: "1 Metric Ton", packaging: "Export grade poly-lined bag", shelfLife: "24 months" }
    ],
    features: [
      { title: "Curcumin > 3%", desc: "Naturally high curcumin content for wellness & color" },
      { title: "Zero Lead Chromate", desc: "Certified pure and non-irradiated" },
      { title: "Aroma Locked", desc: "Deep earthy and pungent herbal scent" },
      { title: "Microbial Safe", desc: "Steam sterilized to comply with EU/USFDA standards" }
    ],
    specs: {
      "Curcuminoid Content": "3.0% to 4.5% guaranteed",
      "Moisture": "Max 9.5%",
      "Total Ash": "Max 7.0%",
      "Acid Insoluble Ash": "Max 1.0%",
      "Fineness": "100% passes 300 micron sieve (80 mesh)"
    },
    nutrition: {
      "Energy": "354 kcal / 100g",
      "Protein": "7.8 g",
      "Curcumin": "3.2 g",
      "Iron": "41.4 mg"
    }
  },
  {
    id: "coriander",
    name: "Coriander Powder (Dhaniya)",
    category: "spice",
    kind: "bowl",
    image: "assets/coriander-powder.webp",
    thumb: "assets/coriander-powder-thumb.webp",
    yaw: 112,
    pitch: -19,
    view: SITE + "single-product.php?id=422",
    tagline: "Sweet, citrusy aroma · Made from selected green coriander seeds",
    desc: "Ground from premium plump coriander seeds sourced from Rajasthan and Gujarat. Roasted lightly and milled to a velvety texture that provides a warm, citrusy base for curries, dal tadka, marinades, and spice rubs.",
    hsCode: "0909.22.00",
    origin: "Rajasthan, India",
    variants: [
      { size: "100g Box", moq: "500 cartons", packaging: "Inner moisture pouch + outer carton", shelfLife: "18 months" },
      { size: "500g Bag", moq: "200 packs", packaging: "Heavy-duty poly pack", shelfLife: "18 months" },
      { size: "25kg Bag", moq: "1 Metric Ton", packaging: "Export master bag", shelfLife: "24 months" }
    ],
    features: [
      { title: "Citrus Notes", desc: "Rich in linalool natural essential oils" },
      { title: "Clean Sourcing", desc: "Pre-cleaned to remove twigs, weed seeds" },
      { title: "Gravy Base", desc: "Adds body, aroma, and delicate sweet undertone" }
    ],
    specs: {
      "Volatile Oil": "Min 0.25% v/w",
      "Moisture": "Max 10.0%",
      "Total Ash": "Max 7.0%",
      "Mesh Size": "60–70 mesh"
    },
    nutrition: {
      "Energy": "298 kcal / 100g",
      "Protein": "12.4 g",
      "Dietary Fiber": "41.9 g"
    }
  },
  {
    id: "garam-whole",
    name: "Royal Whole Garam Masala Blend",
    category: "spice",
    kind: "bowl",
    image: "assets/garam-masala-whole.webp",
    thumb: "assets/garam-masala-whole-thumb.webp",
    yaw: 190,
    pitch: -30,
    view: SITE + "single-product.php?id=421",
    tagline: "Whole spice bouquet · Cinnamon, cloves, black cardamom, star anise",
    desc: "An aristocratic artisanal blend of unground whole Indian spices. Includes Ceylon cinnamon, green and black cardamom pods, aromatic cloves, star anise, mace (javitri), cumin, and black pepper. Perfect for whole tempering, biryanis, and slow-braised curries.",
    hsCode: "0910.91.00",
    origin: "India (Hand-curated in Noida)",
    variants: [
      { size: "100g Window Box", moq: "300 units", packaging: "Visible spice window box", shelfLife: "24 months" },
      { size: "250g Zip Pouch", moq: "150 packs", packaging: "Laminated standup pouch", shelfLife: "24 months" },
      { size: "10kg Bulk Box", moq: "20 cartons", packaging: "Double poly lined carton", shelfLife: "24 months" }
    ],
    features: [
      { title: "Whole Spices", desc: "Keeps essential oils intact until heated in cooking oil" },
      { title: "Authentic Ratio", desc: "Heritage North Indian balance of warmth and floral spice" },
      { title: "Hand Cleaned", desc: "Free from dust and broken stems" }
    ],
    specs: {
      "Spice Composition": "Cinnamon, Cloves, Cardamom, Cumin, Star Anise, Black Pepper, Bay Leaf",
      "Moisture": "< 9.0%",
      "Aroma": "Intensely fragrant, sweet-woody with spicy warmth"
    },
    nutrition: {
      "Energy": "380 kcal / 100g",
      "Protein": "11.2 g",
      "Total Fat": "15.0 g"
    }
  },
  {
    id: "kitchen-king",
    name: "Kitchen King Masala (Rozeat)",
    category: "premium",
    premium: true,
    kind: "pack",
    image: "assets/kitchen-king-masala.webp",
    thumb: "assets/kitchen-king-masala-thumb.webp",
    yaw: -90,
    pitch: -14,
    view: SITE + "single-product.php?id=423",
    tagline: "The all-purpose culinary king · 100g original export carton",
    desc: "The crowned king of curry powders. A master blend of over 20 spices including coriander, turmeric, cumin, black pepper, nutmeg, ginger, and fenugreek. Transforms vegetable curries, paneer gravies, and kofta dishes into restaurant-quality preparations.",
    hsCode: "0910.91.00",
    origin: "Noida, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Export Carton", moq: "500 units", packaging: "Inner silver foil + printed outer carton", shelfLife: "24 months" },
      { size: "500g Catering Pack", moq: "100 packs", packaging: "Chef's food service pouch", shelfLife: "24 months" },
      { size: "1kg Bulk Pack", moq: "50 units", packaging: "Commercial kitchen bag", shelfLife: "24 months" }
    ],
    features: [
      { title: "All-In-One", desc: "No additional spices needed for everyday curries" },
      { title: "Export Quality", desc: "Packed in Rozeat signature 100g barrier packaging" },
      { title: "Balanced Flavour", desc: "Savoury, mildly spiced, fragrant profile" }
    ],
    specs: {
      "Brand Label": "Rozeat by Hans Impex",
      "Net Weight": "100 g / 3.52 oz",
      "Processing Standard": "Hygienically blended and nitrogen flushed",
      "Grade": "100% Export Grade Quality"
    },
    nutrition: {
      "Energy": "362 kcal / 100g",
      "Protein": "12.8 g",
      "Dietary Fiber": "28.5 g"
    }
  },
  {
    id: "amchur",
    name: "Amchur Powder (Dry Mango)",
    category: "spice",
    kind: "pack",
    image: "assets/amchur-powder.webp",
    thumb: "assets/amchur-powder-thumb.webp",
    yaw: 146,
    pitch: -4,
    view: SITE + "single-product.php?id=424",
    tagline: "Tangy dried raw mango · Natural souring agent without liquid",
    desc: "Made from unripe green mangoes that are peeled, sliced, sun-dried, and ground into fine powder. Imparts a fruity, tart sourness without adding moisture, making it indispensable for samosas, pakoras, chaat seasonings, dry subzis, and marinades.",
    hsCode: "0804.50.20",
    origin: "Uttar Pradesh, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Export Carton", moq: "500 units", packaging: "Foil bag inside Rozeat carton", shelfLife: "18 months" },
      { size: "500g Poly Pack", moq: "200 packs", packaging: "Moisture-resistant poly bag", shelfLife: "18 months" },
      { size: "25kg Bulk Sack", moq: "1 Metric Ton", packaging: "Multi-ply sack with inner liner", shelfLife: "24 months" }
    ],
    features: [
      { title: "Clean Tartness", desc: "Replaces lemon juice without thinning the gravy" },
      { title: "Natural Mango", desc: "100% unadulterated dried green mango slices" },
      { title: "High Citric Acid", desc: "Naturally tenderizes meat and poultry" }
    ],
    specs: {
      "Form": "Fine free-flowing powder",
      "Color": "Pale brownish-cream",
      "Acidity (as Citric Acid)": "Min 12.0%",
      "Brand Label": "Rozeat Export"
    },
    nutrition: {
      "Energy": "295 kcal / 100g",
      "Vitamin C": "45 mg",
      "Total Carbs": "70 g"
    }
  },
  {
    id: "nahari",
    name: "Nahari Masala (Rozeat)",
    category: "premium",
    premium: true,
    kind: "pack",
    image: "assets/nahari-masala.webp",
    thumb: "assets/nahari-masala-thumb.webp",
    yaw: -122,
    pitch: -16,
    view: SITE + "single-product.php?id=425",
    tagline: "Slow-cooked Mughlai magic · Fragrant cardamom, mace & long pepper",
    desc: "Crafted specifically for the royal slow-cooked Mughlai stew 'Nahari'. Features a secret proportion of pippali (long pepper), star anise, green cardamom, fennel, and dried ginger. Provides that authentic Old Delhi / Lucknow rich gelatinous broth and deep aromatic soul.",
    hsCode: "0910.91.00",
    origin: "Noida, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Carton", moq: "500 cartons", packaging: "Aroma-lock foil pack in Rozeat box", shelfLife: "24 months" },
      { size: "1kg Catering Pack", moq: "50 units", packaging: "Restaurant kitchen vacuum pack", shelfLife: "24 months" }
    ],
    features: [
      { title: "Slow Simmer Blend", desc: "Spices don't burn over hours of simmering" },
      { title: "Royal Heritage", desc: "Authentic Delhi 6 & Lucknow Awadhi recipe" },
      { title: "Mace & Nutmeg", desc: "Rich floral undertone with subtle spicy kick" }
    ],
    specs: {
      "Brand": "Rozeat by Hans Impex",
      "Net Weight": "100 g",
      "Grade": "Export Gourmet Grade",
      "Usage": "Mutton nahari, beef shank stew, chicken slow cook"
    },
    nutrition: {
      "Energy": "358 kcal / 100g",
      "Protein": "11.5 g",
      "Dietary Fiber": "26.0 g"
    }
  },
  {
    id: "garam-box",
    name: "Garam Masala (100g Rozeat Carton)",
    category: "premium",
    premium: true,
    kind: "pack",
    image: "assets/garam-masala.webp",
    thumb: "assets/garam-masala-thumb.webp",
    yaw: 134,
    pitch: -16,
    view: SITE + "single-product.php?id=426",
    tagline: "Warm finishing spice · 100% fresh ground whole spice masterwork",
    desc: "The quintessential Indian culinary finish. Ground from heavily aromatic whole spices without any cheap fillers or excess coriander. Sprinkled at the very end of cooking to release a burst of sweet warmth and rich fragrance into curries, dals, and kebabs.",
    hsCode: "0910.91.00",
    origin: "Noida, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Export Carton", moq: "500 cartons", packaging: "Rozeat signature export box", shelfLife: "24 months" },
      { size: "500g Foil Bag", moq: "100 units", packaging: "Heavy foil zip bag", shelfLife: "24 months" }
    ],
    features: [
      { title: "Zero Starch Fillers", desc: "100% active spice powders, full potency" },
      { title: "Aroma Seal", desc: "Double-walled packaging locks in volatile essences" },
      { title: "Finishing Blend", desc: "Balanced so 1/2 teaspoon transforms an entire dish" }
    ],
    specs: {
      "Brand": "Rozeat by Hans Impex",
      "Net": "100 g",
      "Profile": "Sweet, woody, pungent warmth",
      "Shelf Life": "24 months from manufacturing"
    },
    nutrition: {
      "Energy": "370 kcal / 100g",
      "Protein": "11.0 g",
      "Total Fat": "14.2 g"
    }
  },
  {
    id: "cumin",
    name: "Cumin Powder (Jeera)",
    category: "spice",
    kind: "pack",
    image: "assets/cumin-powder.webp",
    thumb: "assets/cumin-powder-thumb.webp",
    yaw: 68,
    pitch: -17,
    view: SITE + "single-product.php?id=427",
    tagline: "Earthy, nutty cumin · Ground from selected Gujarat jeera seeds",
    desc: "High volatile-oil cumin seeds from Unjha, Gujarat, ground under temperature control to safeguard the signature cuminaldehyde fragrance. Essential for tempering, raitas, dry spice rubs, taco seasonings, and curries.",
    hsCode: "0909.32.00",
    origin: "Unjha, Gujarat, India (Packed in Noida)",
    variants: [
      { size: "100g Rozeat Box", moq: "500 units", packaging: "Aroma foil in Rozeat box", shelfLife: "24 months" },
      { size: "500g Standup Pouch", moq: "200 packs", packaging: "Resealable aroma pack", shelfLife: "24 months" },
      { size: "25kg Bag", moq: "1 Metric Ton", packaging: "Export master bag with liner", shelfLife: "24 months" }
    ],
    features: [
      { title: "Volatile Oil > 2%", desc: "Rich in aromatic cuminaldehyde compounds" },
      { title: "Roasted Undertone", desc: "Warm nutty savoriness" },
      { title: "Unjha Sourced", desc: "Direct from the cumin capital of the world" }
    ],
    specs: {
      "Volatile Oil": "Min 1.8% – 2.4%",
      "Moisture": "Max 9.0%",
      "Ash": "< 8.0%",
      "Mesh": "60–80 mesh"
    },
    nutrition: {
      "Energy": "375 kcal / 100g",
      "Iron": "66.4 mg",
      "Protein": "17.8 g"
    }
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken Masala (Rozeat)",
    category: "premium",
    premium: true,
    kind: "pack",
    image: "assets/butter-chicken-masala.webp",
    thumb: "assets/butter-chicken-masala-thumb.webp",
    yaw: -74,
    pitch: -13,
    view: SITE + "single-product.php?id=428",
    tagline: "Restaurant-style Murgh Makhani · Kashmiri chilli, kasuri methi & cloves",
    desc: "Recreates the iconic Delhi restaurant butter chicken at home or in commercial kitchens. Harmoniously balances mild Kashmiri chilli heat, dried fenugreek leaves (kasuri methi), green cardamom, and cinnamon for a velvety tomato-butter gravy.",
    hsCode: "0910.91.00",
    origin: "Noida, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Export Carton", moq: "500 units", packaging: "Printed carton with inner foil", shelfLife: "24 months" },
      { size: "1kg Bulk Pack", moq: "50 units", packaging: "Chef's commercial pouch", shelfLife: "24 months" }
    ],
    features: [
      { title: "Kashmiri Chilli", desc: "Naturally vibrant red color without synthetic dye" },
      { title: "Kasuri Methi Infused", desc: "Pre-blended crushed fenugreek for restaurant aroma" },
      { title: "Mild & Creamy", desc: "Kid and international palate friendly heat profile" }
    ],
    specs: {
      "Brand": "Rozeat by Hans Impex",
      "Net Weight": "100 g",
      "Export Grade": "Gourmet Blended Spice",
      "Usage": "Butter Chicken, Chicken Tikka Masala, Paneer Makhani"
    },
    nutrition: {
      "Energy": "340 kcal / 100g",
      "Protein": "10.5 g",
      "Dietary Fiber": "24.0 g"
    }
  },
  {
    id: "shahi-paneer",
    name: "Shahi Paneer Masala (Rozeat)",
    category: "premium",
    premium: true,
    kind: "pack",
    image: "assets/shahi-paneer-masala.webp",
    thumb: "assets/shahi-paneer-masala-thumb.webp",
    yaw: -108,
    pitch: -15,
    view: SITE + "single-product.php?id=429",
    tagline: "Royal vegetarian feast · Almond & cashew enriched aroma",
    desc: "A royal vegetarian formulation designed for creamy cottage cheese curries. Features subtle cardamom, white pepper, nutmeg, and powdered nuts that meld gracefully with cream, butter, and cashew paste.",
    hsCode: "0910.91.00",
    origin: "Noida, India (Rozeat by Hans Impex)",
    variants: [
      { size: "100g Export Carton", moq: "500 units", packaging: "Rozeat golden box", shelfLife: "24 months" },
      { size: "500g Commercial Pack", moq: "100 units", packaging: "Sealed foil pouch", shelfLife: "24 months" }
    ],
    features: [
      { title: "Royal Fragrance", desc: "Subtle green cardamom and mace dominant" },
      { title: "Vegetarian Gold Standard", desc: "Perfect for party catering & fine dining menus" },
      { title: "Nut Paste Compatible", desc: "Blends seamlessly into silky cashew-cream bases" }
    ],
    specs: {
      "Brand": "Rozeat by Hans Impex",
      "Net Weight": "100 g",
      "Grade": "100% Vegetarian Certified"
    },
    nutrition: {
      "Energy": "355 kcal / 100g",
      "Protein": "11.0 g",
      "Dietary Fiber": "22.5 g"
    }
  }
];

// Curated stations for the Guided Auto-Tour Mode
const TOUR_STATIONS = [
  {
    id: "station-welcome",
    title: "Welcome to Hans Impex",
    badge: "EST. 2003 · NOIDA",
    yaw: 180,
    pitch: -22,
    hfov: 74,
    caption: "Welcome to the Hans Impex 360° E-Showroom. Founded in 2003 in Noida, India, we are an established export house delivering purity, crunch, and authentic flavor across the globe."
  },
  {
    id: "station-makhana",
    title: "Royal Makhana Lounge",
    badge: "SUPERFOOD EXPORT",
    yaw: 176,
    pitch: -24,
    hfov: 68,
    caption: "Discover our premium machine-cleaned Bihar Makhana (Fox Nuts). Available in sizes from 6 mm to 20 mm, uniform puffing, and virtually zero shell residue — ideal for wholesale export."
  },
  {
    id: "station-spices",
    title: "Heritage Spices Arcade",
    badge: "COLD-MILLED PURITY",
    yaw: 94,
    pitch: -17,
    hfov: 70,
    caption: "Explore our pure single-origin ground spices: fiery Guntur red chilli powder, golden curcumin-rich Salem turmeric, and aromatic Rajasthan coriander powder."
  },
  {
    id: "station-dryfruits",
    title: "Dry Fruits Pavilion",
    badge: "PREMIUM NUTS",
    yaw: 182,
    pitch: -24,
    hfov: 68,
    caption: "Here in the Dry Fruits Pavilion, examine our California & Indian whole almonds alongside jumbo W240 and W320 cashew nuts, handpicked and vacuum-sealed for maximum crunch."
  },
  {
    id: "station-rozeat",
    title: "Rozeat Master Blends",
    badge: "SIGNATURE RECIPES",
    yaw: -92,
    pitch: -14,
    hfov: 68,
    caption: "Our Rozeat export collection features original 100g cartons — Kitchen King, Nahari Masala, Garam Masala, Butter Chicken, and Shahi Paneer, crafted for international kitchens."
  },
  {
    id: "station-logistics",
    title: "Bulk & Global Logistics",
    badge: "ICD DADRI · JNPT MUMBAI",
    yaw: -40,
    pitch: -14,
    hfov: 74,
    caption: "With our strategic Noida hub near ICD Dadri and direct links to JNPT Nhava Sheva & Mundra ports, Hans Impex executes FCL & LCL shipments with full phytosanitary compliance."
  }
];
