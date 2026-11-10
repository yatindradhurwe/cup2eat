// Initial data for Cup2Eat platform
export const INITIAL_PRODUCTS = [
  {
    id: "prod-wholesale-396",
    name: "Wholesale Master Carton (396 Cups)",
    tagline: "Most Popular for Cafés, Restaurants & Events",
    price: 3999,
    originalPrice: 5999,
    discount: "33% OFF",
    cupsCount: 396,
    pricePerCup: "₹10.10 / cup",
    capacity: "100 ml",
    flavoursAvailable: ["Chocolate", "Vanilla", "Elaichi", "Assorted (All 3)"],
    image: "/assets/images/poster_wholesale.jpg",
    badge: "B2B Best Seller 🔥",
    features: [
      "396 Crispy Edible Cups (100ml)",
      "Free Delivery All Over India 🇮🇳",
      "Vacuum-sealed safety carton packing",
      "Stays leak-proof for 40-45 mins with hot tea/coffee",
      "Shelf life: 6 months in cool dry storage",
      "FSSAI Certified Food Grade"
    ],
    inStock: true,
    stockCount: 85,
    category: "wholesale"
  },
  {
    id: "prod-cafe-starter-72",
    name: "Café Trial Starter Pack (72 Cups)",
    tagline: "Perfect for Testing Customer Response in Your Café",
    price: 999,
    originalPrice: 1299,
    discount: "23% OFF",
    cupsCount: 72,
    pricePerCup: "₹13.80 / cup",
    capacity: "100 ml",
    flavoursAvailable: ["Assorted (24 Choc + 24 Van + 24 Elaichi)", "Chocolate Only", "Vanilla Only"],
    image: "/assets/images/poster_wholesale.jpg",
    badge: "Great for Startups",
    features: [
      "72 Cups (Assorted or Single Flavour)",
      "Eco-friendly rigid transport box",
      "Free table tent promotional cards for your café",
      "Leak-proof guarantee"
    ],
    inStock: true,
    stockCount: 140,
    category: "wholesale"
  },
  {
    id: "prod-event-pack-144",
    name: "Wedding & Event Celebration Pack (144 Cups)",
    tagline: "Delight Your Guests with 'Eat Your Drink' Experience",
    price: 1799,
    originalPrice: 2400,
    discount: "25% OFF",
    cupsCount: 144,
    pricePerCup: "₹12.49 / cup",
    capacity: "100 ml",
    flavoursAvailable: ["Assorted Mix", "Chocolate & Elaichi Duo", "Vanilla Delight"],
    image: "/assets/images/poster_wholesale.jpg",
    badge: "Party Favorite",
    features: [
      "144 Edible Cups for High-end Catering",
      "Ideal for Welcome Chai, Espresso & Ice Creams",
      "Guaranteed crowd-stopper and Instagram viral moment",
      "All-India Fast Shipping included"
    ],
    inStock: true,
    stockCount: 65,
    category: "events"
  },
  {
    id: "prod-sample-retail-24",
    name: "Home Gourmet & Tasting Box (24 Cups)",
    tagline: "Experience the Crunch at Home with Family & Friends",
    price: 399,
    originalPrice: 550,
    discount: "27% OFF",
    cupsCount: 24,
    pricePerCup: "₹16.60 / cup",
    capacity: "100 ml",
    flavoursAvailable: ["Assorted (8 Choc, 8 Van, 8 Elaichi)", "Rich Chocolate", "Royal Elaichi"],
    image: "/assets/images/poster_wholesale.jpg",
    badge: "Family Pick",
    features: [
      "24 Crisp Gourmet Edible Cups",
      "Individually wrapped moisture-proof packs",
      "100% Vegetarian & Natural ingredients",
      "Eat your evening Chai or Coffee!"
    ],
    inStock: true,
    stockCount: 210,
    category: "retail"
  }
];

export const FLAVOUR_DETAILS = [
  {
    id: "chocolate",
    name: "Rich Cocoa Chocolate",
    color: "#5c3317",
    accent: "#b07d56",
    bgGradient: "from-[#29170e] to-[#452617]",
    tag: "Decadent & Crispy",
    description: "Infused with pure roasted cocoa and a crisp caramelized wafer texture. Creates a heavenly dessert blend as your hot beverage slowly softens the inner wall.",
    bestPairedWith: ["Hot Cappuccino & Latte", "Dark Espresso Shot", "Chocolate/Vanilla Ice Cream", "Gourmet Milkshakes"],
    crispTime: "45 Minutes",
    ingredients: "Wheat flour, Dutch-processed cocoa, raw sugar, vegetable oil, natural vanilla essence, salt.",
    sweetness: "Medium Sweet (Natural Cocoa Crunch)"
  },
  {
    id: "vanilla",
    name: "Golden Sweet Vanilla",
    color: "#d4a373",
    accent: "#faedcd",
    bgGradient: "from-[#382613] to-[#5e4120]",
    tag: "Classic & Versatile",
    description: "Delicate wafer cup with natural Madagascar vanilla warmth. Subtle sweetness that complements both strong black teas and specialty light coffees.",
    bestPairedWith: ["Artisanal Black Tea", "Americano", "Berry Sorbets & Gelato", "Kheer & Dessert Mousses"],
    crispTime: "40 Minutes",
    ingredients: "Refined wheat flour, natural bourbon vanilla extract, brown cane sugar, dietary fiber, edible oil.",
    sweetness: "Light Sweet"
  },
  {
    id: "elaichi",
    name: "Royal Desi Elaichi (Cardamom)",
    color: "#6b705c",
    accent: "#a5a58d",
    bgGradient: "from-[#1d261e] to-[#344435]",
    tag: "Authentic Chai Companion",
    description: "Crafted specifically for the Indian palate. Freshly ground green cardamom pods infuse an intoxicating aroma that elevates every sip of Kadak Chai.",
    bestPairedWith: ["Desi Masala Chai", "Ginger Cardamom Chai", "Kulfi Servings", "Traditional Festive Sweets"],
    crispTime: "45 Minutes",
    ingredients: "Wheat flour, green cardamom powder, natural cane extracts, toasted grains, edible coconut oil.",
    sweetness: "Mild Aromatic Warmth"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "C2E-8921",
    customerName: "Aman Sharma",
    businessName: "The Roast Room Café",
    phone: "9871234560",
    email: "aman@roastroom.in",
    city: "New Delhi",
    state: "Delhi",
    address: "Shop 14, Hauz Khas Village, New Delhi",
    items: [
      { name: "Wholesale Master Carton (396 Cups)", flavour: "Assorted (All 3)", qty: 2, price: 3999 }
    ],
    totalAmount: 7998,
    paymentMethod: "UPI Online",
    paymentStatus: "Paid",
    orderStatus: "Dispatched",
    date: "2026-11-09T14:32:00Z",
    trackingNumber: "DTDC-IN-981244",
    notes: "Requires dispatch before Friday for weekend brunch."
  },
  {
    id: "C2E-8920",
    customerName: "Pooja Hegde",
    businessName: "Green Bean Roastery",
    phone: "9845112233",
    email: "orders@greenbean.com",
    city: "Bengaluru",
    state: "Karnataka",
    address: "100ft Road, Indiranagar, Bengaluru - 560038",
    items: [
      { name: "Wholesale Master Carton (396 Cups)", flavour: "Chocolate", qty: 1, price: 3999 },
      { name: "Café Trial Starter Pack (72 Cups)", flavour: "Royal Elaichi", qty: 1, price: 999 }
    ],
    totalAmount: 4998,
    paymentMethod: "Bank Transfer (NEFT)",
    paymentStatus: "Paid",
    orderStatus: "Safety Packed",
    date: "2026-11-09T18:15:00Z",
    trackingNumber: "BLUEDART-882190",
    notes: "Please include marketing standees."
  },
  {
    id: "C2E-8919",
    customerName: "Rohan Varma",
    businessName: "Varma Caterers & Events",
    phone: "9711883344",
    email: "rohan@varmacaterers.com",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    address: "Plot 42, Raj Nagar, Ghaziabad",
    items: [
      { name: "Wedding & Event Celebration Pack (144 Cups)", flavour: "Assorted Mix", qty: 3, price: 1799 }
    ],
    totalAmount: 5397,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    orderStatus: "Order Prepared",
    date: "2026-11-10T10:05:00Z",
    trackingNumber: "INTERNAL-GZB-104",
    notes: "Urgent delivery for upcoming reception."
  },
  {
    id: "C2E-8918",
    customerName: "Sanya Mathur",
    businessName: "Individual Gourmet",
    phone: "9910023456",
    email: "sanya.m@gmail.com",
    city: "Noida",
    state: "Uttar Pradesh",
    address: "Tower 4, Sector 76, Noida",
    items: [
      { name: "Home Gourmet & Tasting Box (24 Cups)", flavour: "Assorted (8 Choc, 8 Van, 8 Elaichi)", qty: 2, price: 399 }
    ],
    totalAmount: 798,
    paymentMethod: "UPI Online",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    date: "2026-11-08T11:20:00Z",
    trackingNumber: "DELHIVERY-77402",
    notes: "Customer loved the chocolate cups!"
  }
];

export const INITIAL_LEADS = [
  {
    id: "LEAD-101",
    name: "Karan Singhania",
    businessName: "Chai Point Franchisee",
    phone: "9818002211",
    city: "Gurugram",
    estimatedMonthlyCups: "3,000 - 5,000",
    status: "Negotiating",
    date: "2026-11-09",
    notes: "Interested in custom logo branding on the cups for 10 outlets."
  },
  {
    id: "LEAD-102",
    name: "Dr. Ananya Ray",
    businessName: "Terra Eco Resort & Spa",
    phone: "9733445566",
    city: "Rishikesh",
    estimatedMonthlyCups: "1,500",
    status: "Sample Dispatched",
    date: "2026-11-08",
    notes: "Zero waste initiative for high net-worth eco wellness guests."
  },
  {
    id: "LEAD-103",
    name: "Vikas Mehra",
    businessName: "Brew & Bite Café",
    phone: "9820129384",
    city: "Mumbai",
    estimatedMonthlyCups: "2,000",
    status: "New Inquiry",
    date: "2026-11-10",
    notes: "Requested quotation for Elaichi and Chocolate flavours."
  }
];

export const BRAND_INFO = {
  name: "Cup2Eat",
  tagline: "Eat Your Drink! ☕🍨",
  subtitle: "A Delicious & Sustainable Innovation",
  founder: "Varun Khera",
  phone: "9818192575",
  whatsappNumber: "919818192575",
  instagram: "@cup2eat",
  instagramUrl: "https://www.instagram.com/cup2eat",
  address: "1010, Gyan Khand-1, Indirapuram, Ghaziabad, Uttar Pradesh - 201014",
  fssaiNumber: "22725101003467",
  fssaiAuthority: "Department of Food Safety and Drug Administration, Govt. of Uttar Pradesh",
  accolades: [
    {
      title: "1st Position – Business Plan Competition",
      organization: "IPEM College & Innovation Council",
      desc: "Awarded top honor for groundbreaking sustainable food packaging innovation."
    },
    {
      title: "Startup Mahakumbh Showcase",
      organization: "Bharat Mandapam, New Delhi",
      desc: "Selected as one of India's most promising green FMCG startups."
    },
    {
      title: "Government FSSAI Registered",
      organization: "Food Safety and Standards Authority of India",
      desc: "Full food-grade hygiene and quality manufacturing compliance."
    }
  ]
};

export const REVIEWS = [
  {
    name: "Chef Kunal Malhotra",
    role: "Head Mixologist & Cafe Consultant, Delhi",
    comment: "Our customers are completely blown away when we tell them 'You don't throw this cup, you eat it!' The Chocolate cup with cappuccino has become our highest-selling Instagram item.",
    rating: 5,
    location: "Connaught Place, New Delhi"
  },
  {
    name: "Pooja V.",
    role: "Owner, Green Chai Street",
    comment: "The Royal Elaichi cup is pure magic with Desi Chai. It stays sturdy for the entire 20 minutes of sipping and then gives a crisp, cardamom-flavored crunch at the end. Zero plastic guilt!",
    rating: 5,
    location: "Indirapuram, Ghaziabad"
  },
  {
    name: "Rajeshwar Gupta",
    role: "Event Organizer, Royal Weddings",
    comment: "We served 800 espresso shots in Cup2Eat chocolate cups at a destination wedding in Udaipur. People were filming reels non-stop! Best sustainable investment we made.",
    rating: 5,
    location: "Jaipur / Udaipur"
  }
];
