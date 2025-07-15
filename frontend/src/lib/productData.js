// Centralized product data for the entire application
// This consolidates all products from homepage and existing product pages

export const allProducts = [
  // Original Products (from Products.jsx)
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    description: "Experience high-fidelity sound with these wireless Bluetooth headphones. Comfortable fit, long battery life, and crystal-clear audio for music lovers.",
    features: [
      "Bluetooth 5.0 connectivity",
      "Up to 30 hours battery life",
      "Noise-cancelling microphone",
      "Foldable, lightweight design",
      "Built-in volume controls",
      "Compatible with all devices"
    ]
  },
  {
    id: 2,
    name: "Premium Coffee Maker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=900&h=1200&fit=crop",
    category: "Home & Kitchen",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    description: "Brew the perfect cup every time with this premium coffee maker. Features programmable settings and a sleek, modern design.",
    features: [
      "Programmable timer",
      "Thermal carafe",
      "Self-cleaning mode",
      "Sleek stainless steel body",
      "12-cup capacity",
      "Auto-shutoff feature"
    ]
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 256,
    inStock: false,
    description: "Track your fitness goals with this advanced smart watch. Monitor heart rate, sleep patterns, and stay connected with notifications.",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "GPS navigation",
      "Water resistant (5ATM)",
      "7-day battery life",
      "Compatible with iOS/Android"
    ]
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1200&fit=crop",
    category: "Clothing",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    description: "Comfortable and sustainable organic cotton t-shirt. Perfect for everyday wear with a soft, breathable fabric.",
    features: [
      "100% organic cotton",
      "Pre-shrunk fabric",
      "Multiple sizes available",
      "Machine washable",
      "Eco-friendly production",
      "Classic fit design"
    ]
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 94,
    inStock: true,
    description: "Charge your devices wirelessly with this sleek charging pad. Compatible with all Qi-enabled devices.",
    features: [
      "Qi wireless charging standard",
      "10W fast charging",
      "LED indicator light",
      "Non-slip surface",
      "Overcharge protection",
      "Compact design"
    ]
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&h=1200&fit=crop",
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with this premium stainless steel water bottle.",
    features: [
      "32oz capacity",
      "Double-wall insulation",
      "BPA-free construction",
      "Leak-proof design",
      "Wide mouth opening",
      "Dishwasher safe"
    ]
  },

  // Best Sellers (from Home.jsx)
  {
    id: 101,
    name: "Premium Wireless Earbuds",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.9,
    reviews: 1247,
    inStock: true,
    description: "Experience premium sound quality with these wireless earbuds. Perfect for music lovers and professionals alike.",
    features: [
      "Active noise cancellation",
      "40-hour total battery life",
      "Touch controls",
      "IPX4 water resistance",
      "Premium audio drivers",
      "Quick charge technology"
    ]
  },
  {
    id: 102,
    name: "Smart Home Hub",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    description: "Control all your smart home devices from one central hub. Compatible with major smart home ecosystems.",
    features: [
      "Voice control integration",
      "WiFi and Bluetooth connectivity",
      "Mobile app control",
      "Automation scheduling",
      "Energy monitoring",
      "Security features"
    ]
  },
  {
    id: 103,
    name: "Designer Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&h=1200&fit=crop",
    category: "Clothing",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    description: "Premium leather jacket with timeless design. Crafted from genuine leather for durability and style.",
    features: [
      "Genuine leather construction",
      "Classic biker style",
      "Multiple pockets",
      "Adjustable waist",
      "Quilted lining",
      "Available in multiple sizes"
    ]
  },
  {
    id: 104,
    name: "Professional Coffee Grinder",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1646346834998-5b610ec21d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1646346834998-5b610ec21d12?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4.9,
    reviews: 734,
    inStock: true,
    description: "Professional-grade coffee grinder for the perfect grind every time. Essential for coffee enthusiasts.",
    features: [
      "Burr grinding system",
      "Adjustable grind settings",
      "Timer function",
      "Large capacity hopper",
      "Easy cleaning design",
      "Quiet operation"
    ]
  },
  {
    id: 105,
    name: "Ultra HD Webcam",
    price: 79.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1715869618915-a7bf6608d4c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1715869618915-a7bf6608d4c3?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4.6,
    reviews: 445,
    inStock: true,
    description: "Crystal clear video quality for professional meetings and content creation. Perfect for remote work.",
    features: [
      "4K Ultra HD resolution",
      "Auto-focus technology",
      "Built-in microphone",
      "Privacy cover",
      "Universal compatibility",
      "Plug-and-play setup"
    ]
  },
  {
    id: 106,
    name: "Memory Foam Pillow Set",
    price: 49.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1698746043955-42b03ddedfcb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1698746043955-42b03ddedfcb?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4.8,
    reviews: 623,
    inStock: true,
    description: "Ultra-comfortable memory foam pillows for the best night's sleep. Set includes 2 standard pillows.",
    features: [
      "Premium memory foam",
      "Hypoallergenic material",
      "Removable cover",
      "Machine washable",
      "Standard size (20x26 inches)",
      "Set of 2 pillows"
    ]
  },

  // New Releases (from Home.jsx)
  {
    id: 201,
    name: "Apple Airtag",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1640631826644-ff6a6337a7ff?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1640631826644-ff6a6337a7ff?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isNew: true,
    description: "Never lose your belongings again with this advanced tracking device. Perfect for keys, bags, and more.",
    features: [
      "Precision finding technology",
      "U1 chip for ultra-wideband",
      "Replaceable battery",
      "Water and dust resistant",
      "Private and secure",
      "Find My app integration"
    ]
  },
  {
    id: 202,
    name: "Sustainable Bamboo Cutlery Set",
    price: 34.99,
    image: "https://plus.unsplash.com/premium_photo-1716278501091-9e5de2270d54?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://plus.unsplash.com/premium_photo-1716278501091-9e5de2270d54?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    isNew: true,
    description: "Eco-friendly bamboo cutlery set perfect for sustainable living. Includes fork, knife, and spoon.",
    features: [
      "100% bamboo construction",
      "BPA-free and non-toxic",
      "Lightweight and durable",
      "Travel-friendly design",
      "Easy to clean",
      "Biodegradable material"
    ]
  },
  {
    id: 203,
    name: "White Dress",
    price: 89.99,
    image: "https://plus.unsplash.com/premium_photo-1676236306466-25ba882070b3?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://plus.unsplash.com/premium_photo-1676236306466-25ba882070b3?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Clothing",
    rating: 4.4,
    reviews: 123,
    inStock: true,
    isNew: true,
    description: "Elegant white dress perfect for special occasions. Flattering fit with premium fabric.",
    features: [
      "Premium cotton blend",
      "Flattering A-line silhouette",
      "Adjustable straps",
      "Machine washable",
      "Available in multiple sizes",
      "Perfect for summer events"
    ]
  },
  {
    id: 204,
    name: "Wireless Gaming Mouse",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    isNew: true,
    description: "High-performance wireless gaming mouse with customizable RGB lighting and programmable buttons.",
    features: [
      "25K DPI optical sensor",
      "Programmable buttons",
      "RGB lighting effects",
      "70-hour battery life",
      "Ultra-lightweight design",
      "Gaming-grade switches"
    ]
  },
  {
    id: 205,
    name: "Organic Cotton Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&h=1200&fit=crop",
    category: "Clothing",
    rating: 4.2,
    reviews: 78,
    inStock: true,
    isNew: true,
    description: "Comfortable and sustainable organic cotton hoodie. Perfect for casual wear and outdoor activities.",
    features: [
      "100% organic cotton",
      "Kangaroo pocket",
      "Drawstring hood",
      "Ribbed cuffs and hem",
      "Available in multiple colors",
      "Eco-friendly production"
    ]
  },
  {
    id: 206,
    name: "JBL Portable Speaker",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&h=1200&fit=crop",
    category: "Electronics",
    rating: 4.1,
    reviews: 45,
    inStock: true,
    isNew: true,
    description: "Portable Bluetooth speaker with powerful sound and long battery life. Perfect for outdoor activities.",
    features: [
      "20W powerful sound",
      "12-hour battery life",
      "IPX7 waterproof rating",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Compact and portable"
    ]
  },

  // Best Sales (from Home.jsx)
  {
    id: 301,
    name: "Bedside Table",
    price: 79.99,
    originalPrice: 159.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1752062003907-331dc20be406?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1752062003907-331dc20be406?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    description: "Modern bedside table with storage drawer. Perfect addition to any bedroom with clean, minimalist design.",
    features: [
      "Solid wood construction",
      "Storage drawer",
      "Modern minimalist design",
      "Easy assembly",
      "Multiple finish options",
      "Compact footprint"
    ]
  },
  {
    id: 302,
    name: "Designer Sunglasses",
    price: 89.99,
    originalPrice: 179.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=900&h=1200&fit=crop",
    category: "Clothing",
    rating: 4.5,
    reviews: 189,
    inStock: true,
    description: "Stylish designer sunglasses with UV protection. Perfect for sunny days and outdoor activities.",
    features: [
      "100% UV protection",
      "Polarized lenses",
      "Lightweight frame",
      "Scratch-resistant coating",
      "Includes protective case",
      "Multiple frame colors"
    ]
  },
  {
    id: 303,
    name: "Smart LED Strip Lights",
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&h=1200&fit=crop",
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    description: "Smart LED strip lights with app control and voice activation. Perfect for ambient lighting.",
    features: [
      "16 million colors",
      "WiFi connectivity",
      "Voice control compatible",
      "Music sync mode",
      "Timer and scheduling",
      "Easy installation"
    ]
  },
  {
    id: 304,
    name: "Wireless Keyboard",
    price: 49.99,
    originalPrice: 99.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1694405145070-e58cc29771fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://images.unsplash.com/photo-1694405145070-e58cc29771fa?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Electronics",
    rating: 4.4,
    reviews: 267,
    inStock: true,
    description: "Slim wireless keyboard with quiet keys and long battery life. Perfect for home and office use.",
    features: [
      "Slim profile design",
      "Quiet membrane keys",
      "6-month battery life",
      "2.4GHz wireless connection",
      "Spill-resistant design",
      "Compatible with Windows/Mac"
    ]
  },
  {
    id: 305,
    name: "Organic Tea Collection",
    price: 24.99,
    originalPrice: 49.99,
    discount: 50,
    image: "https://plus.unsplash.com/premium_photo-1731696604187-fadf1df7ef54?q=80&w=1409&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "https://plus.unsplash.com/premium_photo-1731696604187-fadf1df7ef54?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 134,
    inStock: true,
    description: "Premium organic tea collection featuring 6 different varieties. Perfect for tea enthusiasts.",
    features: [
      "6 different tea varieties",
      "100% organic ingredients",
      "Individually wrapped bags",
      "Caffeine-free options",
      "Antioxidant rich",
      "Eco-friendly packaging"
    ]
  },
  {
    id: 306,
    name: "Fitness Resistance Bands",
    price: 19.99,
    originalPrice: 39.99,
    discount: 50,
    image: "http://images.unsplash.com/photo-1610720991840-457ad2c7a658?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    detailImage: "http://images.unsplash.com/photo-1610720991840-457ad2c7a658?q=80&w=900&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sports",
    rating: 4.8,
    reviews: 445,
    inStock: true,
    description: "Complete set of resistance bands for home workouts. Perfect for strength training and rehabilitation.",
    features: [
      "5 different resistance levels",
      "Includes carrying bag",
      "Exercise guide included",
      "Latex-free material",
      "Portable and lightweight",
      "Suitable for all fitness levels"
    ]
  }
];

// Helper functions
export const getProductById = (id) => {
  return allProducts.find(product => product.id === Number(id));
};

export const getProductsByCategory = (category) => {
  if (category === 'All') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySearch = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
};

export const getBestSellers = () => {
  return allProducts.filter(product => product.id >= 101 && product.id <= 106);
};

export const getNewReleases = () => {
  return allProducts.filter(product => product.id >= 201 && product.id <= 206);
};

export const getBestSales = () => {
  return allProducts.filter(product => product.id >= 301 && product.id <= 306);
};

export const getAllCategories = () => {
  const categories = [...new Set(allProducts.map(product => product.category))];
  return ['All', ...categories];
}; 