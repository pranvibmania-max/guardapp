import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, Menu, X, Star, ArrowRight, ChevronLeft, Minus, Plus, CreditCard, CheckCircle, Trash2, PlusCircle, Settings, Image as ImageIcon, Zap, Upload, RefreshCw, Search, Scale, ArrowRightLeft, XCircle } from 'lucide-react';

// --- Types ---
interface ProductVariant {
  name: string;
  options: string[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  specs: string[];
  variants?: ProductVariant[];
}

interface CartItem extends Product {
  quantity: number;
  selectedVariants?: Record<string, string>;
  cartItemId: string; // Unique ID for cart entry (combines product ID + variants)
}

// --- Initial Data ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Neural-Link Sleep Mask",
    price: 12500,
    category: "Health",
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800",
    description: "Induce lucid dreaming and monitor deep REM cycles with direct neural audio feedback. Wake up fully rested in 4 hours.",
    rating: 4.9,
    specs: ["REM Tracking", "Lucid Mode", "App Sync"],
    variants: [{ name: "Size", options: ["S/M", "L/XL"] }]
  },
  {
    id: 102,
    name: "Omni-Translation Earpiece",
    price: 14500,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    description: "Real-time AI translation for over 400 languages with zero latency. Break down communication barriers instantly.",
    rating: 4.7,
    specs: ["50 Languages", "Offline Mode", "24h Battery"],
    variants: [{ name: "Color", options: ["White", "Black"] }]
  },
  {
    id: 103,
    name: "Grav-Grip Boots",
    price: 28999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
    description: "Magnetic boots that allow wall-walking on metallic surfaces. Industrial grade adhesion with shock absorption.",
    rating: 4.8,
    specs: ["Mag-Lock", "Shock Absorb", "Auto-Release"],
    variants: [{ name: "Size", options: ["US 9", "US 10", "US 11"] }]
  },
  {
    id: 104,
    name: "Plasma-Arc Interface",
    price: 8900,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1563298258-c9c0b7413a96?auto=format&fit=crop&q=80&w=800",
    description: "A flameless, windproof plasma generator for field operations and precise heat application. Essential for any toolkit.",
    rating: 4.6,
    specs: ["USB-C Charge", "Waterproof", "1000°C Arc"],
    variants: [{ name: "Casing", options: ["Titanium", "Carbon Fiber"] }]
  },
  {
    id: 1,
    name: "TechNovaX Test Key",
    price: 1,
    category: "Testing",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description: "Digital verification key for payment gateway testing. Price: ₹1.",
    rating: 5.0,
    specs: ["Instant Delivery", "Secure Verify"],
    variants: [
       { name: "License", options: ["Single Use"] }
    ]
  },
  {
    id: 2,
    name: "Quantum Neural Headset",
    price: 24999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1626387346567-2877bfa99b76?auto=format&fit=crop&q=80&w=800",
    description: "Direct brain-computer interface with noise-canceling thought processing. Experience the metaverse like never before.",
    rating: 4.8,
    specs: ["Neural Link 2.0", "12hr Battery", "Titanium Frame"],
    variants: [
       { name: "Color", options: ["Cyber Black", "Neon Blue"] },
       { name: "Storage", options: ["256GB", "512GB"] }
    ]
  },
  {
    id: 3,
    name: "Holo-Wrist Projector",
    price: 15999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    description: "Project a 4K touch interface directly onto your arm or any surface. The smartphone killer.",
    rating: 4.5,
    specs: ["4K Projection", "Gesture Control", "Waterproof"],
    variants: [
       { name: "Strap", options: ["Silicon", "Leather", "Metal"] }
    ]
  },
  {
    id: 4,
    name: "Levitating Bass Speaker",
    price: 8999,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
    description: "Zero-gravity sound system with 360-degree audio distribution. Floating magnets eliminate vibration distortion.",
    rating: 4.9,
    specs: ["Mag-Lev Base", "Bluetooth 6.0", "Sub-bass"],
    variants: [
       { name: "Finish", options: ["Matte White", "Piano Black"] }
    ]
  },
  {
    id: 5,
    name: "Cyber-Kinetic Sneakers",
    price: 12499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
    description: "Auto-lacing footwear with customizable LED arrays and step-energy harvesting technology.",
    rating: 4.7,
    specs: ["Auto-Lace", "RGB Lighting", "Kinetic Charging"],
    variants: [
       { name: "Size", options: ["US 8", "US 9", "US 10", "US 11"] },
       { name: "Style", options: ["High Top", "Low Runner"] }
    ]
  },
  {
    id: 6,
    name: "Transparent OLED Tablet",
    price: 85000,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1588872657578-a3d2e1a45040?auto=format&fit=crop&q=80&w=800",
    description: "See through the noise. A fully transparent tablet that blends into your environment when not in use.",
    rating: 4.6,
    specs: ["100% Transparency", "Holographic Mode", "Ultra-thin"],
    variants: [
       { name: "Storage", options: ["1TB", "2TB"] }
    ]
  },
  {
    id: 7,
    name: "Nano-Drone Swarm",
    price: 35000,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800",
    description: "A set of 5 synchronized nano-drones for personal aerial photography and security monitoring.",
    rating: 4.8,
    specs: ["AI Follow", "8K Video", "Swarm Logic"],
    variants: [
       { name: "Pack Size", options: ["3 Drones", "5 Drones"] }
    ]
  },
  {
    id: 8,
    name: "Robo-Pet Companion",
    price: 45000,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    description: "An AI-driven robotic companion that learns your habits and guards your home.",
    rating: 4.9,
    specs: ["Learning AI", "Sentry Mode", "Voice Chat"],
    variants: [
       { name: "Model", options: ["K-9 Unit", "Feline Unit"] }
    ]
  },
  {
    id: 9,
    name: "Smart Vision Glasses",
    price: 18500,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    description: "Augmented reality sunglasses that overlay navigation, messages, and health stats.",
    rating: 4.4,
    specs: ["AR Overlay", "UV Protection", "Bone Conduction Audio"],
    variants: [
       { name: "Lens Color", options: ["Midnight", "Amber", "Clear"] }
    ]
  }
];

// --- Contexts ---

// 1. Product Context
const ProductContext = createContext<{
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'specs'> & { specs?: string, rating?: number, variants?: ProductVariant[] }) => void;
  removeProduct: (id: number) => void;
  clearProducts: () => void;
  comparisonList: Product[];
  toggleComparison: (product: Product) => void;
  clearComparison: () => void;
}>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearProducts: () => {},
  comparisonList: [],
  toggleComparison: () => {},
  clearComparison: () => {},
});

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'specs'> & { specs?: string, rating?: number, variants?: ProductVariant[] }) => {
    const newProduct: Product = {
      id: Date.now(), // Simple ID generation
      rating: newProductData.rating || 5.0,
      ...newProductData,
      specs: newProductData.specs ? newProductData.specs.split(',').map(s => s.trim()) : ["Standard Spec", "High Quality"]
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const removeProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  const clearProducts = () => {
    setProducts([]);
    setComparisonList([]);
  };

  const toggleComparison = (product: Product) => {
    setComparisonList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 products at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, clearProducts, comparisonList, toggleComparison, clearComparison }}>
      {children}
    </ProductContext.Provider>
  );
};

// 2. Cart Context
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product, selectedVariants?: Record<string, string>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedVariants: Record<string, string> = {}) => {
    setCart(prev => {
      // Create a unique key based on product ID and selected variants
      const variantKey = JSON.stringify(selectedVariants);
      
      const existing = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedVariants || {}) === variantKey
      );

      if (existing) {
        return prev.map(item => 
          item.cartItemId === existing.cartItemId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      // Create new cart item with unique ID
      const newCartItem: CartItem = {
        ...product,
        quantity: 1,
        selectedVariants,
        cartItemId: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      
      return [...prev, newCartItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-brand-purple skew-x-[-10deg] flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-shadow duration-300">
        <Zap className="text-white fill-white skew-x-[10deg]" size={24} />
      </div>
      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-sm skew-x-[-10deg] pointer-events-none mix-blend-overlay"></div>
    </div>
    <div className="flex flex-col leading-none select-none">
      <span className="text-xl font-display font-black tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-accent transition-all duration-300">TECH</span>
      <span className="text-sm font-display font-bold text-brand-accent tracking-[0.2em] group-hover:tracking-[0.25em] transition-all duration-300">NOVAX</span>
    </div>
  </div>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-brand-accent hover:bg-cyan-400 text-black font-bold',
    secondary: 'bg-brand-purple hover:bg-violet-400 text-white font-bold',
    outline: 'border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-black font-bold',
    danger: 'bg-red-500 hover:bg-red-600 text-white font-bold'
  };
  
  return (
    <button 
      className={`px-6 py-3 rounded-none skew-x-[-10deg] transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="skew-x-[10deg] inline-flex items-center gap-2">{children}</span>
    </button>
  );
};

const Header = ({ onNavigate, onSearch, searchTerm }: { onNavigate: (page: string) => void, onSearch: (q: string) => void, searchTerm: string }) => {
  const { cartCount } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="cursor-pointer flex-shrink-0"
          onClick={() => { onNavigate('home'); onSearch(''); }}
        >
          <Logo />
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500 group-focus-within:text-brand-accent transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-none skew-x-[-10deg] leading-5 bg-brand-dark/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent sm:text-sm transition-all duration-300"
              placeholder="Search hardware..."
            />
         </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold text-gray-400">
          <button onClick={() => { onNavigate('home'); onSearch(''); }} className="hover:text-brand-accent transition-colors hover:scale-105 transform duration-200">Home</button>
          <button onClick={() => {
              onNavigate('home');
              onSearch('');
              setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100);
          }} className="hover:text-brand-accent transition-colors hover:scale-105 transform duration-200">Products</button>
          <button onClick={() => onNavigate('admin')} className="hover:text-brand-accent transition-colors flex items-center gap-1 text-brand-purple hover:scale-105 transform duration-200">
            <Settings size={16} /> Manager
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('cart')} 
            className="relative p-2 text-white hover:text-brand-accent transition-colors group"
          >
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-purple text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-bounce-short">
                {cartCount}
              </span>
            )}
          </button>
          
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
           <div className="relative mx-2 mt-2">
             <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
             <input
                 value={searchTerm}
                 onChange={(e) => onSearch(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 p-2 pl-10 text-white rounded outline-none focus:border-brand-accent placeholder-gray-500"
                 placeholder="Search products..."
             />
           </div>
           <button onClick={() => {onNavigate('home'); onSearch(''); setIsMenuOpen(false)}} className="text-left py-2 hover:text-brand-accent border-b border-white/5">Home</button>
           <button onClick={() => {onNavigate('admin'); setIsMenuOpen(false)}} className="text-left py-2 hover:text-brand-accent text-brand-purple">Manager</button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=2000" 
          alt="Future Tech" 
          className="w-full h-full object-cover object-center opacity-60"
          onError={(e) => {
             // Fallback if unsplash fails
             (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Fallback gradient background if image fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-gray-900 to-brand-purple/20 -z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1 mb-4 border border-brand-accent/50 rounded-full text-brand-accent text-sm font-semibold tracking-widest uppercase animate-fade-in-up">
            Future is Now
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight animate-fade-in-up delay-100">
            UNLEASH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">INNOVATION</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200">
            Discover the next generation of technology. Manage your own inventory and sell the future.
          </p>
          <div className="flex gap-4 animate-fade-in-up delay-300">
            <Button onClick={onShopNow} variant="primary">SHOP COLLECTION <ArrowRight size={18} /></Button>
            <Button onClick={onShopNow} variant="outline">EXPLORE TECH</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product, onViewDetails: (p: Product) => void, isNew?: boolean }> = ({ product, onViewDetails, isNew }) => {
  const { comparisonList, toggleComparison } = useContext(ProductContext);
  const isCompared = comparisonList.some(p => p.id === product.id);

  return (
    <div className="group relative bg-brand-surface border border-white/5 hover:border-brand-accent/50 transition-all duration-300 overflow-hidden flex flex-col h-full hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
      <div className="relative aspect-square overflow-hidden cursor-pointer bg-brand-dark" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p className="text-brand-accent font-display tracking-widest text-sm uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</p>
        </div>
        {/* NEW Badge */}
        {isNew && (
           <div className="absolute top-2 left-2 bg-brand-accent text-black text-xs font-bold px-2 py-1 skew-x-[-10deg] shadow-lg z-10 pointer-events-none">
              <span className="skew-x-[10deg] block tracking-wider">NEW ARRIVAL</span>
           </div>
        )}
        
        {/* Compare Button on Card */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleComparison(product); }}
          className={`absolute top-2 right-2 p-2 z-20 transition-all duration-200 shadow-lg skew-x-[-10deg] ${
             isCompared 
             ? 'bg-brand-accent text-black scale-100 opacity-100' 
             : 'bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-brand-accent hover:text-black'
          }`}
          title={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          <Scale size={18} className="skew-x-[10deg]" />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center text-yellow-400 text-xs gap-1">
             <Star size={12} fill="currentColor" /> {product.rating}
          </div>
        </div>
        <h3 
          className="text-lg font-bold font-display mb-2 group-hover:text-brand-accent transition-colors cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-white">₹{product.price}</span>
          <button 
            onClick={() => onViewDetails(product)}
            className="p-2 rounded-full bg-white/5 hover:bg-brand-accent hover:text-black transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Replaced ProductList with HomeSections
const HomeSections = ({ onSelectProduct, searchQuery }: { onSelectProduct: (p: Product) => void, searchQuery: string }) => {
  const { products } = useContext(ProductContext);
  const [filter, setFilter] = useState('All');
  
  // Get unique categories dynamically
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Logic: Filter by category first (or All), then filter by search query if exists
  let displayProducts = products;

  // 1. Filter by category (only if not searching, or if we want to combine filters)
  // Let's allow combination: Search + Category Filter
  if (filter !== 'All') {
    displayProducts = displayProducts.filter(p => p.category === filter);
  }

  // 2. Filter by Search
  const isSearching = searchQuery.trim().length > 0;
  if (isSearching) {
     const lowerQ = searchQuery.toLowerCase();
     displayProducts = displayProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQ) || 
        p.category.toLowerCase().includes(lowerQ) ||
        p.description.toLowerCase().includes(lowerQ)
     );
  }

  // If searching, return a simplified results view
  if (isSearching) {
    return (
      <div id="products" className="min-h-[60vh] pt-12">
        <section className="py-12 container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-2xl font-display font-bold">Search Results</h2>
                  <p className="text-gray-400 text-sm mt-1">Found {displayProducts.length} items for "<span className="text-brand-accent">{searchQuery}</span>"</p>
                </div>
                {/* Category filter reuse for refinement */}
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-none skew-x-[-10deg] text-xs font-bold transition-all ${
                        filter === cat 
                        ? 'bg-brand-accent text-black' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="skew-x-[10deg] inline-block">{cat}</span>
                    </button>
                  ))}
                </div>
            </div>

            {displayProducts.length === 0 ? (
                <div className="text-center py-20 bg-brand-surface/30 rounded-lg border border-white/5">
                    <Search className="mx-auto h-12 w-12 text-gray-600 mb-4"/>
                    <p className="text-xl font-bold text-gray-400">No matches found</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your search or category filter</p>
                    {filter !== 'All' && (
                       <button onClick={() => setFilter('All')} className="mt-4 text-brand-accent hover:underline text-sm font-bold">Clear category filters</button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map(p => (
                      <ProductCard key={p.id} product={p} onViewDetails={onSelectProduct} />
                    ))}
                </div>
            )}
        </section>
      </div>
    );
  }

  // Normal View (No Search)
  const newArrivals = products.slice(0, 4);

  return (
    <div id="products">
      {/* New Arrivals Section */}
      <section className="py-16 container mx-auto px-4 border-b border-white/5 bg-gradient-to-b from-transparent to-black/30">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent flex-grow opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center uppercase tracking-widest">
            New <span className="text-brand-accent">Arrivals</span>
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent flex-grow opacity-50"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <div key={`new-${product.id}`} className="transform hover:-translate-y-2 transition-transform duration-500">
               <ProductCard product={product} onViewDetails={onSelectProduct} isNew={true} />
            </div>
          ))}
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 md:mb-0">All <span className="text-white">Products</span></h2>
          
          {products.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    filter === cat 
                    ? 'bg-brand-accent text-black font-bold' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-24 bg-brand-surface/50 border border-white/5 rounded-2xl backdrop-blur-sm">
             <Zap className="mx-auto h-16 w-16 text-gray-600 mb-6" />
             <p className="text-gray-400 text-2xl font-display font-bold mb-4">Inventory Empty</p>
             <p className="text-gray-500 max-w-md mx-auto">The future is a blank canvas. Go to the Manager page to add your revolutionary products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} onViewDetails={onSelectProduct} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const ProductDetails = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // Initialize selected variants
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      const initial: Record<string, string> = {};
      product.variants.forEach(v => {
        initial[v.name] = v.options[0]; // Default to first option
      });
      setSelectedVariants(initial);
    } else {
      setSelectedVariants({});
    }
  }, [product]);

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ChevronLeft size={20} /> Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-brand-surface rounded-2xl overflow-hidden border border-white/5 relative group h-[500px]">
           <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain bg-black/50" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
              }}
           />
           <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay pointer-events-none"></div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-brand-accent tracking-widest uppercase font-bold text-sm mb-2">{product.category}</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl text-white font-bold">₹{product.price}</span>
            <div className="flex items-center text-yellow-400 gap-1 bg-white/5 px-3 py-1 rounded-full">
              <Star size={16} fill="currentColor" />
              <span className="text-white text-sm font-semibold">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8 border-b border-white/10 pb-8">
            {product.description}
          </p>

          {/* Variants Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8 space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.name}>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{variant.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: option }))}
                        className={`px-4 py-2 border rounded-md text-sm transition-all ${
                          selectedVariants[variant.name] === option
                            ? 'bg-brand-accent text-black border-brand-accent font-bold'
                            : 'bg-transparent text-gray-300 border-white/20 hover:border-white/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-brand-purple rounded-full"></div>
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
             <Button onClick={() => addToCart(product, selectedVariants)} className="flex-1">ADD TO CART</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Comparison Components ---
const CompareFloatingBar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { comparisonList, clearComparison } = useContext(ProductContext);

  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-surface/90 backdrop-blur-md border border-brand-accent/30 p-4 rounded-xl flex items-center gap-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          {comparisonList.map(p => (
            <div key={p.id} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-dark overflow-hidden relative group">
              <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">{comparisonList.length} Selected</span>
          <span className="text-xs text-gray-400">Up to 4 items</span>
        </div>
      </div>
      
      <div className="h-8 w-px bg-white/10"></div>
      
      <div className="flex items-center gap-2">
        <Button variant="primary" onClick={() => onNavigate('compare')} className="py-2 px-4 text-xs">
          COMPARE <ArrowRightLeft size={14} />
        </Button>
        <button 
          onClick={clearComparison}
          className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          title="Clear all"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

const ComparisonView = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { comparisonList, toggleComparison } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  if (comparisonList.length === 0) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <Scale size={48} className="text-brand-purple mb-4" />
            <h2 className="text-2xl font-bold font-display mb-2">No items to compare</h2>
            <p className="text-gray-400 mb-8">Select products to see how they stack up.</p>
            <Button onClick={() => onNavigate('home')}>BROWSE PRODUCTS</Button>
        </div>
     );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Product <span className="text-brand-accent">Comparison</span></h1>
        <Button variant="outline" onClick={() => onNavigate('home')} className="px-4 py-2 text-sm">
           <ChevronLeft size={16} /> BACK TO STORE
        </Button>
      </div>

      <div className="overflow-x-auto pb-6 custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Comparison Grid */}
          <div className="grid" style={{ gridTemplateColumns: `200px repeat(${comparisonList.length}, minmax(250px, 1fr))` }}>
            
            {/* Header Row (Images & Names) */}
            <div className="p-4 flex items-end font-bold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Product</div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4 border-b border-white/10 relative group">
                <button 
                  onClick={() => toggleComparison(product)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 bg-brand-dark/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XCircle size={20} />
                </button>
                <div className="aspect-square bg-brand-surface rounded-lg overflow-hidden mb-4 border border-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg font-display mb-1">{product.name}</h3>
                <span className="text-brand-accent font-bold">₹{product.price}</span>
              </div>
            ))}

            {/* Rating Row */}
            <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider bg-white/5 flex items-center">Rating</div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4 bg-white/5 border-r border-white/5 last:border-r-0 flex items-center gap-1 text-yellow-400 font-bold">
                 {product.rating} <Star size={14} fill="currentColor" />
              </div>
            ))}

            {/* Category Row */}
             <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10 flex items-center">Category</div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4 border-b border-white/10 border-r border-white/5 last:border-r-0 text-gray-300">
                 {product.category}
              </div>
            ))}

            {/* Description Row */}
            <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider bg-white/5">Description</div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4 bg-white/5 border-r border-white/5 last:border-r-0 text-sm text-gray-400 leading-relaxed">
                 {product.description}
              </div>
            ))}

             {/* Specs Row */}
            <div className="p-4 font-bold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Specs</div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4 border-b border-white/10 border-r border-white/5 last:border-r-0">
                 <ul className="space-y-1">
                   {product.specs.map((spec, idx) => (
                     <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                       <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-1.5 flex-shrink-0"></span>
                       {spec}
                     </li>
                   ))}
                 </ul>
              </div>
            ))}

             {/* Action Row */}
            <div className="p-4"></div>
            {comparisonList.map(product => (
              <div key={product.id} className="p-4">
                 <Button onClick={() => addToCart(product)} className="w-full text-sm py-2">ADD TO CART</Button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="bg-brand-surface p-8 rounded-full mb-6">
           <ShoppingCart size={48} className="text-brand-purple" />
        </div>
        <h2 className="text-2xl font-bold font-display mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added any tech yet.</p>
        <Button onClick={() => onNavigate('home')}>START SHOPPING</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
      <h1 className="text-3xl font-display font-bold mb-8">Your Cart <span className="text-brand-purple">({cart.length})</span></h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.cartItemId} className="bg-brand-surface p-4 flex gap-4 border border-white/5 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-brand-dark" 
                onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Img'}}
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold font-display">{item.name}</h3>
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <div className="flex gap-2 text-xs text-gray-400 mt-1">
                        {Object.entries(item.selectedVariants).map(([key, value]) => (
                          <span key={key} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {key}: <span className="text-brand-accent">{value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-500 hover:text-red-500"><X size={18} /></button>
                </div>
                <p className="text-brand-accent text-sm mb-2 mt-2">₹{item.price}</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, -1)}
                    className="w-6 h-6 flex items-center justify-center bg-brand-dark hover:bg-white/10 rounded"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, 1)}
                    className="w-6 h-6 flex items-center justify-center bg-brand-dark hover:bg-white/10 rounded"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-surface p-6 border border-white/5 sticky top-24">
            <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={() => onNavigate('checkout')} className="w-full">PROCEED TO CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  // Extract payment ID from URL if present
  const params = new URLSearchParams(window.location.search);
  const paymentId = params.get('payment_id') || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
        Payment <span className="text-green-500">Successful!</span>
      </h1>
      <p className="text-gray-400 text-lg max-w-lg mb-8">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly. Welcome to the future.
      </p>
      <div className="p-6 bg-brand-surface border border-white/5 rounded-lg mb-8 max-w-md w-full">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Transaction ID</span>
          <span className="text-white font-mono">{paymentId}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Status</span>
          <span className="text-green-500 font-bold">Confirmed</span>
        </div>
      </div>
      <Button onClick={() => onNavigate('home')} variant="primary">
        CONTINUE SHOPPING
      </Button>
    </div>
  );
};

const Checkout = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '',
    phone: '', 
    address: '', 
    city: '', 
    zip: '' 
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ----------------------------------------------------------------------
  // CONFIGURATION: Replace this with your actual Razorpay Payment Link or Page
  // ----------------------------------------------------------------------
  const RAZORPAY_PAYMENT_LINK = "https://razorpay.me/@wonderimggen?amount=EPec5evqGoRk2C8icWNJlQ%3D%3D"; 
  
  // ----------------------------------------------------------------------
  // GOOGLE APPS SCRIPT URL - CRITICAL:
  // 1. This URL must correspond to a script deployed for YOUR specific Google Sheet.
  // 2. The script must be deployed as a Web App.
  // 3. "Execute as": Me (your email).
  // 4. "Who has access": Anyone (or Anyone with Google Account).
  // ----------------------------------------------------------------------
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoN6c2cvFA7MOyEsUpCQ_rutbBktWBusFRpyc3kiGdmjArcEONt4pv3whC3elO_OF6qA/exec';

  const productsList = cart.map((item: any) => {
    const variantStr = item.selectedVariants && Object.keys(item.selectedVariants).length > 0 
      ? ` [${Object.values(item.selectedVariants).join(', ')}]` 
      : '';
    return `${item.name}${variantStr} - ₹${item.price} x${item.quantity}`;
  }).join(', ');

  const now = new Date();
  const timestamp = now.toLocaleString();

  const handleDisplaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    
    setLoading(true);
    setSubmitted(true);

    // 1. Trigger the hidden form submission to Google Sheets
    if (formRef.current) {
      formRef.current.submit();
      console.log("Hidden form submitted to Google Sheets.");
    }

    // 2. Wait a bit for the request to leave the browser, then clear cart and redirect
    // We can't know for sure if it succeeded because of the iframe cross-origin,
    // but this is the standard way to handle "post to google sheet then redirect".
    setTimeout(() => {
       clearCart();
       
       const returnUrl = `${window.location.origin}${window.location.pathname}?status=success`;
       
       try {
         const paymentUrl = new URL(RAZORPAY_PAYMENT_LINK);
         paymentUrl.searchParams.append('callback_url', returnUrl);
         window.location.href = paymentUrl.toString();
       } catch (urlError) {
         window.location.href = `${RAZORPAY_PAYMENT_LINK}?callback_url=${encodeURIComponent(returnUrl)}`;
       }
    }, 2500); // 2.5 second delay to ensure form submission logic triggers
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
      {/* Hidden Iframe to catch the Google Script response without navigating away */}
      <iframe name="hidden_iframe" style={{ display: 'none' }} />

      {/* 
         Hidden Form for Robust Google Sheet Submission 
         Using the standard <form> tag with target="hidden_iframe" prevents CORS issues 
         and works reliably with Google Apps Scripts deployed as "Anyone".
      */}
      <form 
        ref={formRef}
        action={GOOGLE_SCRIPT_URL}
        method="POST"
        target="hidden_iframe"
        style={{ display: 'none' }}
      >
         {/* Shotgun Approach: Send multiple key variations to match potential sheet headers */}
         <input type="hidden" name="Date & Time" value={timestamp} />
         <input type="hidden" name="Date" value={timestamp} />
         <input type="hidden" name="Timestamp" value={now.toISOString()} />
         <input type="hidden" name="Order Date" value={timestamp} />
         <input type="hidden" name="Date_Time" value={timestamp} />
         <input type="hidden" name="DateTime" value={timestamp} />

         <input type="hidden" name="First Name" value={formData.firstName} />
         <input type="hidden" name="Last Name" value={formData.lastName} />
         <input type="hidden" name="Name" value={`${formData.firstName} ${formData.lastName}`} />
         <input type="hidden" name="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
         
         <input type="hidden" name="Email" value={formData.email} />
         <input type="hidden" name="Email Address" value={formData.email} />
         
         <input type="hidden" name="Phone" value={formData.phone} />
         <input type="hidden" name="Phone Number" value={formData.phone} />
         <input type="hidden" name="Mobile" value={formData.phone} />
         <input type="hidden" name="Cell" value={formData.phone} />
         <input type="hidden" name="Contact" value={formData.phone} />
         <input type="hidden" name="Mobile No" value={formData.phone} />
         
         <input type="hidden" name="Street Address" value={formData.address} />
         <input type="hidden" name="Address" value={formData.address} />
         <input type="hidden" name="City" value={formData.city} />
         <input type="hidden" name="ZIP Code" value={formData.zip} />
         <input type="hidden" name="Postal Code" value={formData.zip} />
         
         <input type="hidden" name="Product Name" value={productsList} />
         <input type="hidden" name="Products" value={productsList} />
         <input type="hidden" name="Order Details" value={productsList} />
         <input type="hidden" name="Items" value={productsList} />
         <input type="hidden" name="Item Name" value={productsList} />
         
         <input type="hidden" name="Total Amount" value={cartTotal.toString()} />
         <input type="hidden" name="Amount" value={cartTotal.toString()} />
         <input type="hidden" name="Total" value={cartTotal.toString()} />
         <input type="hidden" name="Grand Total" value={cartTotal.toString()} />
         <input type="hidden" name="Final Price" value={cartTotal.toString()} />
         
         <input type="hidden" name="Status" value="Pending Payment" />
      </form>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent text-black rounded-full flex items-center justify-center text-sm">1</div>
            Shipping Details
          </h2>
          <form id="checkout-display-form" onSubmit={handleDisplaySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">First Name</label>
                <input 
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                <input 
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email" 
                className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
             <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              <input 
                required
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="tel" 
                className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Street Address</label>
              <input 
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                type="text" 
                className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                placeholder="123 Future St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <input 
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">ZIP Code</label>
                <input 
                  required
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  type="text" 
                  className="w-full bg-brand-surface border border-white/10 p-3 text-white focus:border-brand-accent outline-none transition-colors"
                  />
              </div>
            </div>
          </form>
        </div>

        <div>
           <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent text-black rounded-full flex items-center justify-center text-sm">2</div>
            Payment
          </h2>
          <div className="bg-brand-surface p-6 border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-2xl font-bold text-brand-accent">₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="bg-brand-dark p-4 rounded border border-white/10 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="text-brand-purple" />
                <span className="text-sm font-semibold">Razorpay Secure Payment</span>
              </div>
              <div className="flex gap-2">
                 <div className="w-8 h-5 bg-white rounded opacity-50"></div>
                 <div className="w-8 h-5 bg-white rounded opacity-50"></div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mb-6">
              By clicking the button below, your details will be saved and you will be redirected to the secure payment page.
            </p>

            <Button 
              type="submit" 
              form="checkout-display-form" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'PROCESSING...' : `PAY ₹${cartTotal.toFixed(2)} & CHECKOUT`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel Component ---
const AdminPanel = () => {
  const { products, addProduct, removeProduct, clearProducts } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    image: '',
    description: '',
    specs: '',
    variantsRaw: '' // New field for raw variant input
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse variants
    const parsedVariants: ProductVariant[] = newProduct.variantsRaw.split('\n')
      .filter(line => line.includes(':'))
      .map(line => {
        const [name, opts] = line.split(':');
        return {
          name: name.trim(),
          options: opts.split(',').map(s => s.trim()).filter(Boolean)
        };
      })
      .filter(v => v.name && v.options.length > 0);

    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      description: newProduct.description,
      specs: newProduct.specs,
      variants: parsedVariants
    });
    setNewProduct({ name: '', price: '', category: 'Electronics', image: '', description: '', specs: '', variantsRaw: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 container mx-auto px-4">
       <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-display font-bold">Product <span className="text-brand-purple">Manager</span></h1>
         <div className="flex gap-4">
           {products.length > 0 && (
             <button 
               onClick={clearProducts}
               className="bg-red-500/10 text-red-500 px-4 py-2 rounded border border-red-500/20 hover:bg-red-500/20 transition-colors flex items-center gap-2"
             >
               <Trash2 size={16} /> Clear All
             </button>
           )}
           <div className="bg-brand-surface px-4 py-2 rounded border border-brand-accent/30 text-sm text-brand-accent font-bold">
             {products.length} Active Products
           </div>
         </div>
       </div>

       <div className="grid lg:grid-cols-3 gap-8">
         {/* Add Product Form */}
         <div className="lg:col-span-1">
           <div className="bg-brand-surface p-6 border border-white/10 sticky top-24">
             <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><PlusCircle size={20} className="text-brand-accent"/> Add New Product</h2>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                 <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                 <input 
                    required value={newProduct.name} 
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white transition-colors" 
                    placeholder="e.g. Cyber Visor"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                    <input 
                        required type="number" step="0.01"
                        value={newProduct.price} 
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white transition-colors" 
                        placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <select 
                        value={newProduct.category} 
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white transition-colors"
                    >
                      <option>Electronics</option>
                      <option>Wearables</option>
                      <option>Gadgets</option>
                      <option>Other</option>
                    </select>
                  </div>
               </div>
               <div>
                 <label className="block text-sm text-gray-400 mb-1">Product Image</label>
                 <div className="space-y-3">
                   {/* Enhanced Image Upload UI */}
                   <div className="relative group">
                     <label className={`flex flex-col items-center justify-center gap-3 w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${newProduct.image ? 'border-brand-accent bg-brand-accent/5' : 'border-white/20 hover:border-brand-accent/50 hover:bg-white/5'}`}>
                        {newProduct.image ? (
                          <div className="absolute inset-0 z-10">
                            <img src={newProduct.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" alt="Preview" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="bg-black/80 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2"><RefreshCw size={14}/> Change Image</span>
                            </div>
                          </div>
                        ) : (
                          <>
                             <div className="p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300">
                               <Upload size={24} className="text-brand-accent" />
                             </div>
                             <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Click to upload image</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                     </label>
                   </div>
                   
                   <div className="flex items-center gap-2">
                     <div className="h-px bg-white/10 flex-grow"></div>
                     <span className="text-[10px] uppercase text-gray-500">OR Use URL</span>
                     <div className="h-px bg-white/10 flex-grow"></div>
                   </div>

                   <div className="relative">
                      <input 
                          type="text"
                          value={newProduct.image} 
                          onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                          className="w-full bg-brand-dark p-2 pl-9 text-sm border border-white/10 focus:border-brand-accent outline-none text-white transition-colors" 
                          placeholder="Paste image URL..."
                      />
                      <ImageIcon size={14} className="absolute left-3 top-3 text-gray-500"/>
                   </div>
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm text-gray-400 mb-1">Description</label>
                 <textarea 
                    required
                    value={newProduct.description} 
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white h-24 transition-colors" 
                    placeholder="Describe the product..."
                 />
               </div>
               <div>
                 <label className="block text-sm text-gray-400 mb-1">Specs (comma separated)</label>
                 <input 
                    value={newProduct.specs} 
                    onChange={e => setNewProduct({...newProduct, specs: e.target.value})}
                    className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white transition-colors" 
                    placeholder="Wireless, 5G, Waterproof..."
                 />
               </div>
               
               {/* Variants Section */}
               <div>
                 <label className="block text-sm text-gray-400 mb-1">Variants (Type: Option1, Option2)</label>
                 <textarea 
                    value={newProduct.variantsRaw} 
                    onChange={e => setNewProduct({...newProduct, variantsRaw: e.target.value})}
                    className="w-full bg-brand-dark p-2 border border-white/10 focus:border-brand-accent outline-none text-white h-20 transition-colors" 
                    placeholder={`Size: S, M, L\nColor: Red, Black`}
                 />
                 <p className="text-xs text-gray-500 mt-1">Enter one variant type per line.</p>
               </div>

               <Button type="submit" className="w-full">ADD PRODUCT</Button>
             </form>
           </div>
         </div>

         {/* Product List */}
         <div className="lg:col-span-2 space-y-4">
           {products.length === 0 ? (
             <div className="text-center py-20 text-gray-500 border-2 border-dashed border-white/10 rounded-xl bg-brand-surface/30">
               <Zap className="mx-auto h-12 w-12 mb-4 opacity-50" />
               <p className="font-display font-bold text-lg mb-2">Inventory Empty</p>
               <p className="text-sm max-w-sm mx-auto">Use the form on the left to add your first product to the store.</p>
             </div>
           ) : (
             products.map(p => (
               <div key={p.id} className="bg-brand-surface p-4 flex gap-4 items-center border border-white/5 hover:border-brand-accent/30 transition-colors group">
                 <img src={p.image} className="w-16 h-16 object-cover bg-black rounded" alt={p.name} />
                 <div className="flex-grow">
                   <h3 className="font-bold text-white group-hover:text-brand-accent transition-colors">{p.name}</h3>
                   <div className="text-sm text-gray-400 flex gap-4">
                     <span className="text-brand-accent font-bold">₹{p.price}</span>
                     <span>{p.category}</span>
                   </div>
                   {p.variants && p.variants.length > 0 && (
                     <div className="text-xs text-gray-500 mt-1">
                       Variants: {p.variants.map(v => v.name).join(', ')}
                     </div>
                   )}
                 </div>
                 <button 
                    onClick={() => removeProduct(p.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Remove Product"
                 >
                   <Trash2 size={20} />
                 </button>
               </div>
             ))
           )}
         </div>
       </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-black/50 border-t border-white/5 py-12 mt-auto">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2">
        <Logo />
        <p className="text-gray-400 max-w-sm mt-4">Pioneering the future of consumer technology. We bring tomorrow's innovations to your doorstep today.</p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Categories</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Electronics</li>
          <li>Wearables</li>
          <li>Gadgets</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Order Status</li>
          <li>Warranty</li>
          <li>Returns</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
      © 2024 Tech novaX Inc. All rights reserved.
    </div>
  </footer>
);

// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'product' | 'cart' | 'checkout' | 'admin' | 'success' | 'compare'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = (page: 'home' | 'product' | 'cart' | 'checkout' | 'admin' | 'success' | 'compare') => {
    window.scrollTo(0,0);
    setCurrentPage(page as any);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    // If user types in search bar while on another page, redirect to home to show results
    if (q.trim().length > 0 && currentPage !== 'home') {
       navigate('home');
    }
  };

  useEffect(() => {
    // Check for payment success indicators in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_id') || params.get('razorpay_payment_id') || params.get('status') === 'success') {
      setCurrentPage('home');
      setShowSuccessBanner(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Auto-hide success banner after 8 seconds
      setTimeout(() => setShowSuccessBanner(false), 8000);
    }
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigate('product');
  };

  return (
    <ProductProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <Header 
            onNavigate={(page) => navigate(page as any)} 
            onSearch={handleSearch}
            searchTerm={searchQuery}
          />
          
          <main className="flex-grow">
            {currentPage === 'home' && (
              <>
                 {showSuccessBanner && (
                    <div className="fixed top-20 left-0 right-0 z-40 px-4 animate-fade-in-down">
                        <div className="bg-green-500/10 border border-green-500/50 backdrop-blur-md text-green-400 p-4 rounded-lg container mx-auto flex items-center justify-between shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-green-500" size={24} />
                                <div>
                                    <h3 className="font-bold text-white">Payment Successful!</h3>
                                    <p className="text-sm">Your order has been confirmed. Welcome to the future.</p>
                                </div>
                            </div>
                            <button onClick={() => setShowSuccessBanner(false)} className="text-white hover:text-green-200"><X size={20}/></button>
                        </div>
                    </div>
                )}
                {/* Hide Hero when searching to focus on results */}
                {!searchQuery && (
                   <Hero onShopNow={() => {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                   }} />
                )}
                <HomeSections onSelectProduct={handleProductSelect} searchQuery={searchQuery} />
                <CompareFloatingBar onNavigate={navigate} />
              </>
            )}
            
            {currentPage === 'product' && selectedProduct && (
              <ProductDetails 
                product={selectedProduct} 
                onBack={() => navigate('home')} 
              />
            )}

            {currentPage === 'cart' && <Cart onNavigate={(page) => navigate(page as any)} />}
            
            {currentPage === 'checkout' && <Checkout onNavigate={(page) => navigate(page as any)} />}

            {currentPage === 'admin' && <AdminPanel />}

            {currentPage === 'success' && <PaymentSuccess onNavigate={(page) => navigate(page as any)} />}

            {currentPage === 'compare' && <ComparisonView onNavigate={(page) => navigate(page as any)} />}
          </main>

          <Footer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);