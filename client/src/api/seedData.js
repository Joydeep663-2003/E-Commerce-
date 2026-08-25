// 160 High Quality Seed Products (20 products per category - 100% unique, category-appropriate images)

const sampleProductImages = {
  Electronics: [
    "https://images.unsplash.com/photo-1496181130207-d3365060fa69?w=800&auto=format&fit=crop&q=80",   // laptop
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80",   // laptop keyboard
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&auto=format&fit=crop&q=80",   // tablet
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80",   // smartwatch
    "https://images.unsplash.com/photo-1572569511254-d8f925fe7cbb?w=800&auto=format&fit=crop&q=80",   // earbuds
    "https://images.unsplash.com/photo-1555538995-724e841f6c4a?w=800&auto=format&fit=crop&q=80",      // speaker
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",   // phone
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80",   // camera
    "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80",   // VR headset
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",     // tablet stand
    "https://images.unsplash.com/photo-1580234810907-b40315b76418?w=800&auto=format&fit=crop&q=80",  // power bank
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80",  // router
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",  // camera lens
    "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format&fit=crop&q=80",     // projector
    "https://images.unsplash.com/photo-1504274066654-527a58b35418?w=800&auto=format&fit=crop&q=80",  // charger
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",    // Sony earphones
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",  // earphones on desk
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",  // airpods case
    "https://images.unsplash.com/photo-1600541519401-44af6f4f58c5?w=800&auto=format&fit=crop&q=80",  // microphone
    "https://images.unsplash.com/photo-1516972810934-03524a045af1?w=800&auto=format&fit=crop&q=80"   // keyboard
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",     // jacket
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",  // denim jacket
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",  // t-shirt
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",  // hoodie
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",  // jeans
    "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&auto=format&fit=crop&q=80",  // casual shirt
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&auto=format&fit=crop&q=80",  // dress
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",  // woman fashion
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80",  // polo shirt
    "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&auto=format&fit=crop&q=80",  // fashion handbag
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",  // model pose
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80",  // linen shirt
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",  // white tee
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80",  // fashion wear
    "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80",  // kurta
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",  // formal blazer
    "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=80",    // puffer jacket
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",  // cargo pants
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80",  // sweater
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"   // tracksuit
  ],
  Footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",     // red Nike
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",  // white sneaker
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",  // sneaker pair
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80",  // sneaker side
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",  // boot on rocks
    "https://images.unsplash.com/photo-1512374382183-f880f7267a17?w=800&auto=format&fit=crop&q=80",  // white shoe
    "https://images.unsplash.com/photo-1460353026224-dd44b824331d?w=800&auto=format&fit=crop&q=80",  // formal shoes
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80",    // casual shoes
    "https://images.unsplash.com/photo-1543163521-140dfc9d536f?w=800&auto=format&fit=crop&q=80",    // shoe close-up
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80", // nike shoe
    "https://images.unsplash.com/photo-1603808033207-5c1fa006c13d?w=800&auto=format&fit=crop&q=80", // colorful sneaker
    "https://images.unsplash.com/photo-1531310197839-ccf54624b297?w=800&auto=format&fit=crop&q=80", // boots pair
    "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&auto=format&fit=crop&q=80", // adidas
    "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&auto=format&fit=crop&q=80",    // running shoes
    "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80", // slides
    "https://images.unsplash.com/photo-1582830354221-25f0e910efdf?w=800&auto=format&fit=crop&q=80", // converse
    "https://images.unsplash.com/photo-1626478959955-f2d4809904ee?w=800&auto=format&fit=crop&q=80", // sneaker top
    "https://images.unsplash.com/photo-1605733160328-9571733b0943?w=800&auto=format&fit=crop&q=80", // trail shoe
    "https://images.unsplash.com/photo-1613482184407-021ab312455b?w=800&auto=format&fit=crop&q=80", // oxford shoes
    "https://images.unsplash.com/photo-1600269452121-4f2416704ee6?w=800&auto=format&fit=crop&q=80"  // loafer
  ],
  "Watches & Accessories": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",   // classic watch
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",   // watch face
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",   // sunglasses
    "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80",   // smart watch
    "https://images.unsplash.com/photo-1508849789987-a2ab9aec0200?w=800&auto=format&fit=crop&q=80",   // luxury watch
    "https://images.unsplash.com/photo-1539874752-5d82c40c497f?w=800&auto=format&fit=crop&q=80",      // men's watch
    "https://images.unsplash.com/photo-1609587349711-d007c1328475?w=800&auto=format&fit=crop&q=80",   // wallet
    "https://images.unsplash.com/photo-1617137968423-41a4a5d24c5e?w=800&auto=format&fit=crop&q=80",   // sports watch
    "https://images.unsplash.com/photo-1585128719183-c603a1b55977?w=800&auto=format&fit=crop&q=80",   // belt
    "https://images.unsplash.com/photo-1547996160-f38b2dd27a20?w=800&auto=format&fit=crop&q=80",      // analog watch
    "https://images.unsplash.com/photo-1524532787112-4bfa0e0d674b?w=800&auto=format&fit=crop&q=80",   // backpack
    "https://images.unsplash.com/photo-1522313824-fdfab5f14bc9?w=800&auto=format&fit=crop&q=80",      // tie
    "https://images.unsplash.com/photo-1609050489587-f823e4d8f28d?w=800&auto=format&fit=crop&q=80",   // watch box
    "https://images.unsplash.com/photo-1517554558260-128a3070c375?w=800&auto=format&fit=crop&q=80",   // simple watch
    "https://images.unsplash.com/photo-1611626176596-4113e64883ab?w=800&auto=format&fit=crop&q=80",   // gold watch
    "https://images.unsplash.com/photo-1608678481273-007e02ad6117?w=800&auto=format&fit=crop&q=80",   // card holder
    "https://images.unsplash.com/photo-1585128715151-c003297a31b4?w=800&auto=format&fit=crop&q=80",   // sport watch
    "https://images.unsplash.com/photo-1523199455320-c75c31f41f71?w=800&auto=format&fit=crop&q=80",   // grey watch
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",      // duffel bag
    "https://images.unsplash.com/photo-1627225902913-0570bff3b84f?w=800&auto=format&fit=crop&q=80"    // tote bag
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80",   // kettle
    "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",   // coffee maker
    "https://images.unsplash.com/photo-1517668808822-9ebe02f2a8e8?w=800&auto=format&fit=crop&q=80",   // kitchen pan
    "https://images.unsplash.com/photo-1591938464312-d40d1d40ff4e?w=800&auto=format&fit=crop&q=80",   // blender
    "https://images.unsplash.com/photo-1556911220-e15b29f4ffb2?w=800&auto=format&fit=crop&q=80",      // cookware set
    "https://images.unsplash.com/photo-1593057379277-3e6f98c237a6?w=800&auto=format&fit=crop&q=80",   // vacuum cleaner
    "https://images.unsplash.com/photo-1588854337236-074ac77b3127?w=800&auto=format&fit=crop&q=80",   // lamp
    "https://images.unsplash.com/photo-1584269588424-69970224d0ed?w=800&auto=format&fit=crop&q=80",   // cutting board
    "https://images.unsplash.com/photo-1600585154340-7f1d4fdbab6d?w=800&auto=format&fit=crop&q=80",   // kitchen setup
    "https://images.unsplash.com/photo-1606744824161-444737a4e662?w=800&auto=format&fit=crop&q=80",   // mug
    "https://images.unsplash.com/photo-1540555700-410a004b2764?w=800&auto=format&fit=crop&q=80",      // air fryer
    "https://images.unsplash.com/photo-1616402498263-ce1d9dbf6781?w=800&auto=format&fit=crop&q=80",   // microwave
    "https://images.unsplash.com/photo-1574362847-aa6057a66b7c?w=800&auto=format&fit=crop&q=80",     // toaster
    "https://images.unsplash.com/photo-1590490360183-b67e231d8e6f?w=800&auto=format&fit=crop&q=80",  // water bottle
    "https://images.unsplash.com/photo-1567606995-1f99c855a90d?w=800&auto=format&fit=crop&q=80",     // juicer
    "https://images.unsplash.com/photo-1565452296-6e474581f185?w=800&auto=format&fit=crop&q=80",     // spoon set
    "https://images.unsplash.com/photo-1550976829-34674eff6aa2?w=800&auto=format&fit=crop&q=80",     // dinner plates
    "https://images.unsplash.com/photo-1501386761830-295aa7a82531?w=800&auto=format&fit=crop&q=80",  // table lamp
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",  // coffee mug set
    "https://images.unsplash.com/photo-1594897035930-f56f6c5f7f32?w=800&auto=format&fit=crop&q=80"   // air purifier
  ],
  "Skincare & Beauty": [
    "https://images.unsplash.com/photo-1608248597261-833244670d19?w=800&auto=format&fit=crop&q=80",   // skincare products
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",  // serum bottle
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",  // makeup
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80",  // moisturizer
    "https://images.unsplash.com/photo-1612817288463-c3c6e547f422?w=800&auto=format&fit=crop&q=80",  // lip balm
    "https://images.unsplash.com/photo-1620916566391-7f7e274a140f?w=800&auto=format&fit=crop&q=80",  // skincare set
    "https://images.unsplash.com/photo-1601049541243-d95b5e7d5fef?w=800&auto=format&fit=crop&q=80",  // face wash
    "https://images.unsplash.com/photo-1616684739722-b5e1e8b7de47?w=800&auto=format&fit=crop&q=80",  // perfume
    "https://images.unsplash.com/photo-1626806787461-102c1b7f14b2?w=800&auto=format&fit=crop&q=80",  // face cream
    "https://images.unsplash.com/photo-1601049676099-e3eddc349b25?w=800&auto=format&fit=crop&q=80",  // oil
    "https://images.unsplash.com/photo-1615397348078-902096a6020c?w=800&auto=format&fit=crop&q=80",  // sunscreen
    "https://images.unsplash.com/photo-1556228720-11119eb45100?w=800&auto=format&fit=crop&q=80",     // beauty bag
    "https://images.unsplash.com/photo-1570174053-4122d057134f?w=800&auto=format&fit=crop&q=80",     // toner
    "https://images.unsplash.com/photo-1526947425964-0012b1842b12?w=800&auto=format&fit=crop&q=80",  // scrub
    "https://images.unsplash.com/photo-1625825932599-270830db971c?w=800&auto=format&fit=crop&q=80",  // glow serum
    "https://images.unsplash.com/photo-1596462502230-009f99478f7e?w=800&auto=format&fit=crop&q=80",  // lipstick
    "https://images.unsplash.com/photo-1627226066228-3e4b7bdf0814?w=800&auto=format&fit=crop&q=80",  // eyeshadow
    "https://images.unsplash.com/photo-1598440940733-404c0ecdfb00?w=800&auto=format&fit=crop&q=80",  // body lotion
    "https://images.unsplash.com/photo-1614859324823-7fa34b4b6f17?w=800&auto=format&fit=crop&q=80",  // hair mask
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80"   // hair dryer
  ],
  "Gaming & Tech": [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",      // gaming setup
    "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop&q=80",  // gaming chair
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",     // gaming monitor
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",  // keyboard mouse
    "https://images.unsplash.com/photo-1560253019313-21c60b571103?w=800&auto=format&fit=crop&q=80",  // desk PC
    "https://images.unsplash.com/photo-1593305841602-ac533d77d704?w=800&auto=format&fit=crop&q=80",  // console controller
    "https://images.unsplash.com/photo-1617383280155-0897f2aa2a08?w=800&auto=format&fit=crop&q=80",  // mic setup
    "https://images.unsplash.com/photo-1600861191097-f6745f448cbb?w=800&auto=format&fit=crop&q=80",  // gaming mouse
    "https://images.unsplash.com/photo-1553484731-1b7f94d07b53?w=800&auto=format&fit=crop&q=80",    // RGB lights
    "https://images.unsplash.com/photo-1615663245857-41e9214309f4?w=800&auto=format&fit=crop&q=80",  // streaming mic
    "https://images.unsplash.com/photo-1625843770354-94644a460a37?w=800&auto=format&fit=crop&q=80",  // SSD drive
    "https://images.unsplash.com/photo-1585776245937-47ec283d5402?w=800&auto=format&fit=crop&q=80",  // laptop stand
    "https://images.unsplash.com/photo-1613515438883-79d1a33758b2?w=800&auto=format&fit=crop&q=80",  // webcam
    "https://images.unsplash.com/photo-1614093883022-de549a37e55a?w=800&auto=format&fit=crop&q=80",  // capture card
    "https://images.unsplash.com/photo-1622979135960-a20a7b4f2c00?w=800&auto=format&fit=crop&q=80",  // headset
    "https://images.unsplash.com/photo-1600862231906-c3e3e0bc985d?w=800&auto=format&fit=crop&q=80",  // VR controller
    "https://images.unsplash.com/photo-1538481199741-7c51487b89f5?w=800&auto=format&fit=crop&q=80",  // gaming phone
    "https://images.unsplash.com/photo-1587201535492-f076b1f5c68d?w=800&auto=format&fit=crop&q=80",  // HDD
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=80",  // PC tower
    "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"   // mousepad
  ],
  "Books & Office": [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",    // book stack
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80", // bookshelf
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=80", // legal books
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80", // reading books
    "https://images.unsplash.com/photo-1528459801416-397a6e3ee085?w=800&auto=format&fit=crop&q=80", // notebooks
    "https://images.unsplash.com/photo-1456513080514-52a71d58ba51?w=800&auto=format&fit=crop&q=80", // study desk
    "https://images.unsplash.com/photo-1535905530-eb3d609de9b3?w=800&auto=format&fit=crop&q=80",    // open book
    "https://images.unsplash.com/photo-1506880018608-8e66a8d5f308?w=800&auto=format&fit=crop&q=80", // books on table
    "https://images.unsplash.com/photo-1513258496739-16d418602bc1?w=800&auto=format&fit=crop&q=80", // laptop desk
    "https://images.unsplash.com/photo-1486312338241-18c7f99cd12c?w=800&auto=format&fit=crop&q=80", // macbook desk
    "https://images.unsplash.com/photo-1531771686-35e91eb7d97d?w=800&auto=format&fit=crop&q=80",   // office pen
    "https://images.unsplash.com/photo-1516972810934-03524a045af1?w=800&auto=format&fit=crop&q=80", // office desk
    "https://images.unsplash.com/photo-1508962914674-c3c0047b1988?w=800&auto=format&fit=crop&q=80", // pens
    "https://images.unsplash.com/photo-1533591405-b0b909f2d182?w=800&auto=format&fit=crop&q=80",   // marker set
    "https://images.unsplash.com/photo-1521587760414-b8b5e43f38f1?w=800&auto=format&fit=crop&q=80", // library
    "https://images.unsplash.com/photo-1548041337-1262dff90e54?w=800&auto=format&fit=crop&q=80",   // journal
    "https://images.unsplash.com/photo-1519789142-f6738914b434?w=800&auto=format&fit=crop&q=80",   // sticky notes
    "https://images.unsplash.com/photo-1569003339-4029277f07cd?w=800&auto=format&fit=crop&q=80",   // office chair
    "https://images.unsplash.com/photo-1529006557841-f7cf479ad92c?w=800&auto=format&fit=crop&q=80", // whiteboard
    "https://images.unsplash.com/photo-1513477967471-a477382d6ef5?w=800&auto=format&fit=crop&q=80"  // filing cabinet
  ]
};

const categories = [
  "Electronics", "Fashion", "Footwear", "Watches & Accessories",
  "Home & Kitchen", "Skincare & Beauty", "Gaming & Tech", "Books & Office"
];

const titlePrefixes = [
  "Premium", "Pro", "Ultra", "Wireless", "Smart", "Luxury", "Classic", "Modern", "Ergonomic",
  "High-Performance", "Eco-Friendly", "Elite", "Compact", "Signature", "Advanced", "Urban",
  "Deluxe", "Apex", "Studio", "Vanguard"
];

const productTemplates = {
  Electronics: [
    "Thin & Light Business Laptop 15.6\"", "OLED Curved Ultra-Wide Monitor", "True Wireless ANC Earbuds",
    "4K Mirrorless Digital Camera", "Ultra-Slim Power Bank 20,000mAh", "4K Ultra HD Action Camera",
    "Smart Security WiFi Camera", "Fast Dual-Port GaN Charger 65W", "Foldable Drone 4K HD",
    "High-Fidelity Soundbar 120W", "E-Book Reader Paperwhite 10th Gen", "Smart Fitness Tracker Band",
    "Smart Home Voice Assistant Speaker", "USB-C Multi-Port Hub Adapter 8-in-1", "High-Speed Wi-Fi 6 Router",
    "Magnetic Wireless Car Mount Charger", "Digital Audio Voice Recorder", "Electric Sonic Toothbrush",
    "Portable Mini Projector 1080p", "Smart Video Doorbell Camera"
  ],
  Fashion: [
    "Genuine Leather Biker Jacket", "Slim Fit Stretch Denim Jeans", "Classic Cotton Crewneck T-Shirt",
    "Tailored Formal Blazer", "Over-Sized Streetwear Hoodie", "Breathable Linen Casual Shirt",
    "Thermal Winter Windcheater Jacket", "Traditional Printed Kurta Set", "Casual Polo Shirt Soft Cotton",
    "All-Weather Utility Cargo Pants", "Designer Summer Floral Dress", "Heavyweight Fleece Sweatshirt",
    "Plaid Flannel Button-Down Shirt", "Athletic Activewear Tracksuit", "Quilted Puffer Winter Vest",
    "Chino Trousers Slim Stretch", "Boho Maxi Printed Dress", "Satin Nightwear Lounge Set",
    "Denim Trucker Jacket Vintage", "Merino Wool V-Neck Sweater"
  ],
  Footwear: [
    "Pro Cushion Running Shoes", "Retro Leather Sneakers", "Waterproof Outdoor Trekking Boots",
    "Handcrafted Italian Formal Oxfords", "Lightweight Mesh Gym Trainers", "Orthopedic Soft Comfort Sandals",
    "High-Top Canvas Streetwear Shoes", "Slip-On Breathable Loafers", "Trail Blazer Sports Shoes",
    "All-Day Walking Comfort Shoes", "Classic Suede Chelsea Boots", "Non-Slip Beach Slides",
    "Performance Tennis Court Shoes", "Formal Monk Strap Leather Shoes", "Water Sandals Outdoor River",
    "Minimalist Barefoot Running Shoes", "Leather Ankle Dress Boots", "Lightweight Marathon Racing Flats",
    "Fleece-Lined Winter Boots", "Espadrille Casual Canvas Shoes"
  ],
  "Watches & Accessories": [
    "Automatic Chronograph Men's Watch", "Minimalist Quartz Slim Watch", "UV400 Polarized Aviator Sunglasses",
    "Genuine Grain Leather RFID Wallet", "Water-Resistant Laptop Backpack 30L", "Adjustable Genuine Leather Belt",
    "Smart Hybrid Steel Watch", "Travel Duffel Bag Canvas", "Titanium Frame Blue Light Glasses",
    "Stainless Steel Link Bracelet Watch", "Anti-Theft Commuter Backpack", "Full-Grain Leather Card Holder",
    "Sports Digital Stopwatch Watch", "Silk Tie & Pocket Square Set", "Leather Messenger Shoulder Bag",
    "Square Retro Acetate Sunglasses", "Tactical Outdoor Utility Belt", "Canvas Tote Shoulder Bag",
    "Key Organizer Leather Holder", "Waterproof Gym Sports Bag"
  ],
  "Home & Kitchen": [
    "Espresso Coffee Machine 15-Bar", "Digital Air Fryer 5.5L", "Robotic Vacuum Cleaner with Mop",
    "Smart RGB Ambient LED Desk Lamp", "Stainless Steel Electric Kettle 1.8L", "Non-Stick Ceramic Cookware Set",
    "Multi-Function Blender & Juicer", "Smart Air Purifier with HEPA Filter", "Infrared Electric Induction Cooktop",
    "Cold Press Slow Juicer", "Insulated Vacuum Water Bottle 1L", "Programmable Bread Maker Machine",
    "Microwave Oven Solo 20L", "Handheld Garment Steamer", "Automatic Milk Frother & Heater",
    "Cast Iron Dutch Oven Pot", "Digital Food Kitchen Scale", "Under-Cabinet Motion Sensor Lights",
    "Stainless Steel Cutlery Set 24-Piece", "French Press Coffee Maker 1L"
  ],
  "Skincare & Beauty": [
    "Vitamin C Radiance Face Serum", "Hydrating Hyaluronic Gel Moisturizer", "Luxury Eau De Parfum 100ml",
    "Ionic Professional Hair Dryer 2000W", "All-in-One Cordless Beard Trimmer", "Organic Argan Oil Hair Mask",
    "Gentle Foaming Cleanser 200ml", "SPF 50+ Invisible Sunscreen Gel", "Retinol Night Repair Cream",
    "Charcoal Deep Pore Face Scrub", "Natural Botanical Face Mist Spray", "Sonic Facial Cleansing Brush",
    "Niacinamide 10% Blemish Serum", "Ceramide Barrier Repair Moisturizer", "Rose Water Facial Toner Spray",
    "Keratin Hair Straightening Brush", "Body Butter Shea & Cocoa 250g", "Exfoliating AHA BHA Peeling Solution",
    "Matte Velvet Liquid Lipstick", "Eyelash & Eyebrow Growth Serum"
  ],
  "Gaming & Tech": [
    "RGB Mechanical Gaming Keyboard", "Ultralight Wireless Gaming Mouse", "7.1 Surround Sound Gaming Headset",
    "Curved Gaming Monitor 165Hz 27-inch", "Ergonomic Mesh Gaming Chair", "Adjustable Aluminum Laptop Stand",
    "High-Speed PCIe NVMe 1TB SSD", "HD Streamer Webcam 1080p 60fps", "USB Condenser Studio Microphone",
    "Large Anti-Slip Desk Pad Mousemat", "Wireless Bluetooth Game Controller", "VR Headset Stand & Dock",
    "External Hard Drive 2TB Rugged", "Dual Monitor Desktop Stand", "Custom Coiled Keyboard Cable RGB",
    "Capture Card 4K HDMI Pass-Through", "Graphic Drawing Tablet Pen", "Green Screen Foldable Backdrop",
    "Console Cooling Stand Dock", "Smart RGB LED Light Bars Pair"
  ],
  "Books & Office": [
    "Ergonomic Lumbar Executive Chair", "Solid Wood Electric Height Desk", "Classic Hardcover Journal Notebook",
    "Precision Metal Fountain Pen Set", "Magnetic Whiteboard Desk Organizer", "Desk Dual Monitor Arm Mount",
    "Cable Management Sleeve System", "Minimalist Felt Desk Mat", "Professional Planner & Task Tracker",
    "Dimmable LED Screenbar Monitor Light", "Compact Document Shredder", "Rechargeable Wireless Office Mouse",
    "Leather Desk Writing Pad 80x40cm", "Ergonomic Vertical Wireless Mouse", "Highlighter Pen Set 6 Colors",
    "Metal Bookend Heavy Duty Pair", "Desk Fan Ultra-Quiet USB", "Footrest Cushion Ergonomic Foam",
    "Thermal Label Printer Wireless", "A5 Dotted Grid Bullet Journal"
  ]
};

const generate160Products = () => {
  const list = [];
  let count = 1;

  categories.forEach((category) => {
    const templates = productTemplates[category];
    const categoryImages = sampleProductImages[category];

    templates.forEach((tmplName, idx) => {
      const pId = `PROD-${String(count).padStart(3, '0')}`;
      const prefix = titlePrefixes[idx % titlePrefixes.length];
      const title = `${prefix} ${tmplName}`;

      const basePrice = Math.floor(((count * 177) + (idx * 450) + 499) % 15000) + 499;
      const originalPrice = Math.floor(basePrice * 1.35);

      // Each product gets its OWN unique image from the category array (index = idx which is 0-19)
      const img1 = categoryImages[idx];
      // Thumbnails cycle through slightly offset indices within the same category
      const img2 = categoryImages[(idx + 5) % categoryImages.length];
      const img3 = categoryImages[(idx + 10) % categoryImages.length];
      const img4 = categoryImages[(idx + 15) % categoryImages.length];

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
        description: `Experience exceptional quality with ${title}. Crafted with premium materials and designed for daily excellence. Includes 1-Year Brand Warranty and Free Express Shipping across India.`,
        content: `Key features of ${title}:\n- Brand Certified & Genuine Product\n- Premium Build Quality & Ergonomic Design\n- 7-Day Easy Replacement Policy\n- GST Tax Invoice & Express Delivery`,
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

  return list;
};

export const seed100ProductsList = generate160Products();
