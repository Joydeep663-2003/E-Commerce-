// 100 High Quality Seed Products for instant frontend loading and backend database seeding
const categories = [
  "Electronics",
  "Fashion",
  "Footwear",
  "Watches & Accessories",
  "Home & Kitchen",
  "Skincare & Beauty",
  "Gaming & Tech",
  "Books & Office"
];

const sampleProductImages = {
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
  ],
  Footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80"
  ],
  "Watches & Accessories": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517668808822-9ebe02f2a8e8?w=800&auto=format&fit=crop&q=80"
  ],
  "Skincare & Beauty": [
    "https://images.unsplash.com/photo-1608248597261-833244670d19?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80"
  ],
  "Gaming & Tech": [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80"
  ],
  "Books & Office": [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"
  ]
};

const titlePrefixes = [
  "Premium", "Pro", "Ultra", "Wireless", "Smart", "Luxury", "Classic", "Modern", "Ergonomic",
  "High-Performance", "Eco-Friendly", "Elite", "Compact", "Signature", "Advanced", "Urban"
];

const productTemplates = {
  Electronics: [
    "Noise-Cancelling Wireless Headphones", "AMOLED Smartwatch with SpO2", "True Wireless Earbuds with ANC",
    "Portable Bluetooth Speaker 30W", "Ultra-Slim Power Bank 20,000mAh", "4K Ultra HD Action Camera",
    "Smart Security WiFi Camera", "Fast Dual-Port GaN Charger 65W", "Foldable Drone 4K HD",
    "High-Fidelity Soundbar 120W", "E-Book Reader Paperwhite", "Smart Fitness Tracker Band"
  ],
  Fashion: [
    "Genuine Leather Biker Jacket", "Slim Fit Stretch Denim Jeans", "Classic Cotton Crewneck T-Shirt",
    "Tailored Formal Blazer", "Over-Sized Streetwear Hoodie", "Breathable Linen Casual Shirt",
    "Thermal Winter Windcheater Jacket", "Traditional Printed Kurta Set", "Casual Polo Shirt Soft Cotton",
    "All-Weather Utility Cargo Pants", "Designer Summer Floral Dress", "Heavyweight Fleece Sweatshirt"
  ],
  Footwear: [
    "Pro Cushion Running Shoes", "Retro Leather Sneakers", "Waterproof Outdoor Trekking Boots",
    "Handcrafted Italian Formal Oxfords", "Lightweight Mesh Gym Trainers", "Orthopedic Soft Comfort Sandals",
    "High-Top Canvas Streetwear Shoes", "Slip-On Breathable Loafers", "Trail Blazer Sports Shoes",
    "All-Day Walking Comfort Shoes", "Classic Suede Chelsea Boots", "Non-Slip Beach Slides"
  ],
  "Watches & Accessories": [
    "Automatic Chronograph Men's Watch", "Minimalist Quartz Watch", "UV400 Polarized Aviator Sunglasses",
    "Genuine Grain Leather RFID Wallet", "Water-Resistant Laptop Backpack 30L", "Adjustable Genuine Leather Belt",
    "Smart Hybrid Steel Watch", "Travel Duffel Bag Canvas", "Titanium Frame Blue Light Glasses",
    "Stainless Steel Link Bracelet Watch", "Anti-Theft Commuter Backpack", "Full-Grain Leather Card Holder"
  ],
  "Home & Kitchen": [
    "Espresso Coffee Machine 15-Bar", "Digital Air Fryer 5.5L", "Robotic Vacuum Cleaner with Mop",
    "Smart RGB Ambient LED Desk Lamp", "Stainless Steel Electric Kettle 1.8L", "Non-Stick Ceramic Cookware Set",
    "Multi-Function Blender & Juicer", "Smart Air Purifier with HEPA Filter", "Infrared Electric Induction Cooktop",
    "Cold Press Slow Juicer", "Insulated Vacuum Water Bottle 1L", "Programmable Bread Maker Machine"
  ],
  "Skincare & Beauty": [
    "Vitamin C Radiance Face Serum", "Hydrating Hyaluronic Gel Moisturizer", "Luxury Eau De Parfum 100ml",
    "Ionic Professional Hair Dryer 2000W", "All-in-One Cordless Beard Trimmer", "Organic Argan Oil Hair Mask",
    "Gentle Foaming Cleanser 200ml", "SPF 50+ Invisible Sunscreen Gel", "Retinol Night Repair Cream",
    "Charcoal Deep Pore Scrub", "Natural Botanical Face Mist", "Sonic Facial Cleansing Brush"
  ],
  "Gaming & Tech": [
    "RGB Mechanical Gaming Keyboard", "Ultralight Wireless Gaming Mouse", "7.1 Surround Sound Gaming Headset",
    "Curved Gaming Monitor 165Hz 27-inch", "Ergonomic Mesh Gaming Chair", "Adjustable Aluminum Laptop Stand",
    "High-Speed PCIe NVMe 1TB SSD", "HD Streamer Webcam 1080p 60fps", "USB Condenser Studio Microphone",
    "Large Anti-Slip Desk Pad Mousemat", "Wireless Bluetooth Game Controller", "VR Headset Stand & Dock"
  ],
  "Books & Office": [
    "Ergonomic Lumbar Executive Chair", "Solid Wood Electric Height Desk", "Classic Hardcover Journal Notebook",
    "Precision Metal Fountain Pen", "Magnetic Whiteboard Desk Organizer", "Desk Dual Monitor Arm Mount",
    "Cable Management Sleeve System", "Minimalist Felt Desk Mat", "Professional Planner & Task Tracker",
    "Dimmable LED Screenbar Monitor Light", "Compact Document Shredder", "Rechargeable Wireless Office Mouse"
  ]
};

const generate100Products = () => {
  const list = [];
  let count = 1;

  categories.forEach((category) => {
    const templates = productTemplates[category];
    const categoryImages = sampleProductImages[category];

    templates.forEach((tmplName, idx) => {
      const pId = `PROD-${String(count).padStart(3, '0')}`;
      const prefix = titlePrefixes[(count + idx) % titlePrefixes.length];
      const title = `${prefix} ${tmplName}`;
      
      // Calculate realistic Indian Rupee prices (INR)
      const basePrice = Math.floor((count * 177 + idx * 450 + 499) % 15000) + 499;
      const originalPrice = Math.floor(basePrice * 1.35);

      // Generate 4 image URLs per product for multi-image gallery
      const img1 = categoryImages[idx % categoryImages.length];
      const img2 = categoryImages[(idx + 1) % categoryImages.length];
      const img3 = categoryImages[(idx + 2) % categoryImages.length];
      const img4 = categoryImages[(idx + 3) % categoryImages.length];

      const imagesArray = [
        { public_id: `${pId}-1`, url: img1 },
        { public_id: `${pId}-2`, url: img2 },
        { public_id: `${pId}-3`, url: img3 },
        { public_id: `${pId}-4`, url: img4 }
      ];

      const rating = Number((4.0 + (count % 10) * 0.1).toFixed(1));
      const reviews = Math.floor((count * 13 + 7) % 350) + 12;

      list.push({
        _id: `prod_seed_${count}`,
        product_id: pId,
        title,
        price: basePrice,
        originalPrice,
        description: `Experience exceptional quality with ${title}. Designed with premium craftsmanship, durability, and top-of-the-line performance for daily excellence. Comes with 1-Year Brand Warranty and Free Express Shipping across India.`,
        content: `Detailed specifications for ${title}:\n- Brand Guarantee & Certified Original\n- High Grade Build Quality & Ergonomic Design\n- 7-Day Replacement Guarantee\n- Tax Invoice & Express Delivery Included`,
        images: imagesArray,
        category,
        rating,
        numReviews: reviews,
        inStock: count % 9 !== 0,
        checked: false,
        sold: Math.floor(count * 5.4 + 10),
        createdAt: new Date(Date.now() - count * 3600000).toISOString()
      });

      count++;
    });
  });

  // Fill up remaining to reach exactly 100 products
  while (list.length < 100) {
    const idx = list.length;
    const cat = categories[idx % categories.length];
    const pId = `PROD-${String(count).padStart(3, '0')}`;
    const categoryImages = sampleProductImages[cat];
    const title = `Signature Edition ${cat} Item #${count}`;
    const basePrice = Math.floor((count * 189 + 899) % 18000) + 799;

    list.push({
      _id: `prod_seed_${count}`,
      product_id: pId,
      title,
      price: basePrice,
      originalPrice: Math.floor(basePrice * 1.3),
      description: `Exclusive release ${title} offering superior craftsmanship and reliability. Standard 1-Year Indian Warranty and Express Delivery included.`,
      content: `Full Feature Breakdown for ${title}:\n- Premium Materials\n- Fast Shipping across India\n- Customer Support Included`,
      images: [
        { public_id: `${pId}-1`, url: categoryImages[0] },
        { public_id: `${pId}-2`, url: categoryImages[1] },
        { public_id: `${pId}-3`, url: categoryImages[2] },
        { public_id: `${pId}-4`, url: categoryImages[3] }
      ],
      category: cat,
      rating: 4.8,
      numReviews: 88,
      inStock: true,
      checked: false,
      sold: 42,
      createdAt: new Date().toISOString()
    });
    count++;
  }

  return list;
};

export const seed100ProductsList = generate100Products();
