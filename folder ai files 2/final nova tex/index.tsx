import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  Cpu, 
  Zap, 
  Shield, 
  Globe, 
  ChevronRight, 
  Trash2, 
  Plus, 
  Minus,
  Sun,
  Moon,
  CheckCircle,
  Package,
  Truck,
  CreditCard,
  Settings,
  Image as ImageIcon,
  Tag,
  Lock,
  Phone
} from 'lucide-react';

// --- Global Declarations ---
declare const Razorpay: any;

/* 
  =========================================
  IMPORTANT: GOOGLE SHEETS SETUP INSTRUCTIONS
  =========================================
  1. Open your Google Sheet > Extensions > Apps Script.
  2. Paste the code provided in the chat response.
  3. Deploy > New Deployment > Web App.
  4. Execute as: "Me".
  5. Who has access: "Anyone".
  6. Copy the URL and paste it below inside the quotes.
*/

// PASTE YOUR GOOGLE WEB APP URL HERE:
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz-u_QxK1dfB7vPD8eZkIrftg0NzI77ShUsYy6xIhHIzpxAKDeckb4AfOQtxJ-j4P8Tmw/exec"; 

// --- Types ---

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
  };
}

// --- Mock Data ---

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NeuroLink Visor X1",
    price: 49999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?q=80&w=800&auto=format&fit=crop",
    description: "Direct neural interface for immersive VR experiences."
  },
  {
    id: 2,
    name: "Quantum Core Processor",
    price: 107999,
    category: "Components",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=800&auto=format&fit=crop",
    description: "Next-gen processing power for AI computations."
  },
  {
    id: 3,
    name: "Levitating Drone Scout",
    price: 74999,
    category: "Drones",
    image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=800&auto=format&fit=crop",
    description: "Silent, autonomous surveillance drone with 8K optics."
  },
  {
    id: 4,
    name: "Holo-Display Pro",
    price: 132999,
    category: "Displays",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=800&auto=format&fit=crop",
    description: "True 3D holographic projection without glasses."
  },
  {
    id: 5,
    name: "CyberDeck Portable",
    price: 206999,
    category: "Computing",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    description: "Military-grade portable hacking terminal."
  },
  {
    id: 6,
    name: "Smart Skin Interface",
    price: 24999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1555664424-778a69032054?q=80&w=800&auto=format&fit=crop",
    description: "Programmable temporary tattoo interface for bio-monitoring."
  }
];

// --- Utilities ---

const logOrderToSheet = async (order: Order) => {
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    alert("System Error: Google Sheets URL is missing. Please check the code configuration.");
    console.error("Google Sheets URL not configured in index.tsx");
    return;
  }

  try {
    const payload = {
      orderId: order.orderId,
      date: order.date,
      customerName: `${order.customer.firstName} ${order.customer.lastName}`,
      email: order.customer.email,
      phone: order.customer.phone,
      address: `${order.customer.address}, ${order.customer.city}, ${order.customer.zip}`,
      items: order.items.map(i => `${i.name} (x${i.quantity})`).join(', '),
      total: `₹${order.total.toLocaleString('en-IN')}`
    };

    console.log("Sending payload to sheets:", payload);

    await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload)
    });
    console.log("Order submitted to Google Sheets system.");
  } catch (error) {
    console.error("Error logging to Google Sheets:", error);
  }
};

// --- Components ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false,
  type = "button",
  ...props
}: { 
  children?: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'outline' | 'danger' | 'ghost'; 
  className?: string; 
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}) => {
  const baseStyles = "px-6 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-brand-accent text-white hover:opacity-90 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    outline: "border border-brand-accent text-brand-accent hover:bg-brand-accent/10",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    ghost: "text-brand-text hover:bg-brand-surface"
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const AdsterraBanner = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || iframe.dataset.loaded) return;

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const scriptContent = `
      <script type="text/javascript">
        atOptions = {
          'key' : 'f982d5c91ea8944ddfa3fab27380da68',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="https://www.highperformanceformat.com/f982d5c91ea8944ddfa3fab27380da68/invoke.js"></script>
    `;

    try {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head><style>body { margin: 0; display: flex; justify-content: center; align-items: center; background: transparent; height: 100vh; }</style></head>
          <body>${scriptContent}</body>
        </html>
      `);
      doc.close();
      iframe.dataset.loaded = "true";
    } catch (err) { console.error("Adsterra loading error", err); }
  }, []);

  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-brand-surface/50 p-2 rounded-xl border border-brand-border shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
        <div className="absolute top-1 right-2 text-[8px] text-brand-muted uppercase tracking-widest pointer-events-none">Sponsored</div>
        <iframe ref={iframeRef} width="300" height="250" scrolling="no" frameBorder="0" className="overflow-hidden rounded" title="Sponsored Content" style={{ display: 'block' }} />
      </div>
    </div>
  );
};

// --- Pages ---

const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <div className="relative overflow-hidden min-h-[80vh] flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-accent/10 z-0" />
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />
    <div className="container mx-auto px-4 z-10 relative">
      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">SHAPING THE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple neon-text">FUTURE</span></h1>
        <p className="text-brand-muted text-xl md:text-2xl mb-8 max-w-xl">Upgrade your reality with next-generation tech. Neural interfaces, quantum computing, and beyond.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onShopNow} className="text-lg px-8 py-4">EXPLORE CATALOG <ChevronRight className="ml-2" /></Button>
          <Button variant="outline" className="text-lg px-8 py-4">VIEW TECHNOLOGY</Button>
        </div>
      </div>
    </div>
  </div>
);

const Shop = ({ products, addToCart }: { products: Product[], addToCart: (product: Product) => void }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h2 className="text-3xl font-display font-bold mb-4 md:mb-0">Latest <span className="text-brand-accent">Innovations</span></h2>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${filter === cat ? 'bg-brand-surface border border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-brand-muted hover:text-brand-text'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <AdsterraBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-brand-surface rounded-xl overflow-hidden border border-brand-border hover:border-brand-accent/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4"><span className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-brand-accent/20">{product.category}</span></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 font-display">{product.name}</h3>
              <p className="text-brand-muted text-sm mb-4 flex-1">{product.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-border">
                <span className="text-2xl font-bold text-brand-text">₹{product.price.toLocaleString('en-IN')}</span>
                <Button onClick={() => addToCart(product)} variant="outline" className="px-4 py-2 text-sm">ADD TO CART</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductManager = ({ products, onAdd, onRemove }: { products: Product[], onAdd: (p: Omit<Product, 'id'>) => void, onRemove: (id: number) => void }) => {
  const [formData, setFormData] = useState({ name: '', price: '', category: '', image: '', description: '' });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      name: formData.name, 
      price: Number(formData.price), 
      category: formData.category, 
      image: formData.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', 
      description: formData.description 
    });
    setFormData({ name: '', price: '', category: '', image: '', description: '' });
    alert("Product added successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-12"><Settings className="text-brand-accent" size={32} /><h2 className="text-3xl font-display font-bold">Manager <span className="text-brand-accent">Dashboard</span></h2></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-brand-surface p-8 rounded-xl border border-brand-border sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={20} className="text-brand-accent" /> Add New Tech</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-bold text-brand-muted uppercase mb-2">Device Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-brand-input border border-brand-border rounded-lg px-4 py-2 outline-none focus:border-brand-accent transition-colors" placeholder="e.g. Plasma Core" /></div>
              <div><label className="block text-xs font-bold text-brand-muted uppercase mb-2">Category</label><input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-brand-input border border-brand-border rounded-lg px-4 py-2 outline-none focus:border-brand-accent transition-colors" placeholder="e.g. Computing" /></div>
              <div><label className="block text-xs font-bold text-brand-muted uppercase mb-2">Price (INR)</label><input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-brand-input border border-brand-border rounded-lg px-4 py-2 outline-none focus:border-brand-accent transition-colors" placeholder="0.00" /></div>
              <div><label className="block text-xs font-bold text-brand-muted uppercase mb-2">Image URL</label><input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-brand-input border border-brand-border rounded-lg px-4 py-2 outline-none focus:border-brand-accent transition-colors" placeholder="https://..." /></div>
              <div><label className="block text-xs font-bold text-brand-muted uppercase mb-2">Description</label><textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-brand-input border border-brand-border rounded-lg px-4 py-2 outline-none focus:border-brand-accent transition-colors resize-none" placeholder="What makes it future tech?" /></div>
              <Button type="submit" className="w-full">INITIALIZE PRODUCT</Button>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-brand-border bg-brand-overlay"><h3 className="font-bold">Active Inventory ({products.length})</h3></div>
            <div className="divide-y divide-brand-border">
              {products.map(product => (
                <div key={product.id} className="p-6 flex items-center gap-4 hover:bg-brand-overlay transition-colors">
                  <img src={product.image} className="w-16 h-16 rounded object-cover border border-brand-border" />
                  <div className="flex-1"><h4 className="font-bold">{product.name}</h4><p className="text-xs text-brand-muted">{product.category}</p><p className="text-brand-accent font-mono text-sm">₹{product.price.toLocaleString('en-IN')}</p></div>
                  <Button onClick={() => onRemove(product.id)} variant="danger" className="p-2 px-3"><Trash2 size={16} /></Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, onCheckout }: { isOpen: boolean, onClose: () => void, cartItems: CartItem[], removeFromCart: (id: number) => void, updateQuantity: (id: number, delta: number) => void, onCheckout: () => void }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-brand-surface border-l border-brand-border h-full flex flex-col shadow-2xl animate-fade-in-up md:animate-none">
        <div className="p-6 border-b border-brand-border flex justify-between items-center"><h2 className="text-2xl font-display font-bold">Your Cart</h2><button onClick={onClose} className="p-2 hover:bg-brand-border rounded-full transition-colors"><X size={24} /></button></div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-brand-muted"><ShoppingCart size={48} className="mb-4 opacity-50" /><p>Your cart is empty.</p><Button onClick={onClose} variant="ghost" className="mt-4">Continue Shopping</Button></div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-brand-main"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                <div className="flex-1"><h4 className="font-bold">{item.name}</h4><p className="text-brand-accent font-mono">₹{item.price.toLocaleString('en-IN')}</p><div className="flex items-center gap-3 mt-2"><button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-brand-main hover:bg-brand-border"><Minus size={14} /></button><span className="text-sm font-mono w-4 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-brand-main hover:bg-brand-border"><Plus size={14} /></button><button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button></div></div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (<div className="p-6 bg-brand-main border-t border-brand-border"><div className="flex justify-between items-center mb-6"><span className="text-brand-muted">Subtotal</span><span className="text-2xl font-bold font-mono">₹{total.toLocaleString('en-IN')}</span></div><Button onClick={onCheckout} className="w-full py-4 text-lg">CHECKOUT <CreditCard className="ml-2" size={20} /></Button></div>)}
      </div>
    </div>
  );
};

const Checkout = ({ cartItems, onComplete, onCancel }: { cartItems: CartItem[], onComplete: (order: Order) => void, onCancel: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '' });
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Use a ref to focus the first input on mount
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const order: Order = {
      orderId: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: cartItems,
      total: total,
      date: new Date().toLocaleString(),
      status: 'Pending',
      customer: formData
    };

    // Log the order to Google Sheets first
    await logOrderToSheet(order);

    // Redirect to the provided Razorpay Link
    window.location.href = "https://razorpay.me/@wonderimggen?amount=EPec5evqGoRk2C8icWNJlQ%3D%3D";
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl" role="region" aria-label="Checkout Section">
      <button 
        onClick={onCancel} 
        className="mb-6 flex items-center text-brand-muted hover:text-brand-text focus:outline-none focus:text-brand-accent transition-colors"
        aria-label="Cancel checkout and return to shop"
      >
        <X size={16} className="mr-2" /> Cancel Checkout
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-display font-bold mb-8">Secure <span className="text-brand-accent">Checkout</span></h2>
          <form onSubmit={handleRazorpay} className="space-y-6" aria-label="Customer Information Form">
            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-brand-border pb-2">Shipping Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  ref={firstInputRef}
                  required 
                  type="text"
                  placeholder="First Name" 
                  aria-label="First Name"
                  value={formData.firstName} 
                  onChange={e => setFormData({...formData, firstName: e.target.value})} 
                  className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                />
                <input 
                  required 
                  type="text"
                  placeholder="Last Name" 
                  aria-label="Last Name"
                  value={formData.lastName} 
                  onChange={e => setFormData({...formData, lastName: e.target.value})} 
                  className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <input 
                   required 
                   type="email" 
                   placeholder="Email" 
                   aria-label="Email Address"
                   value={formData.email} 
                   onChange={e => setFormData({...formData, email: e.target.value})} 
                   className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                 />
                 <input 
                   required 
                   type="tel" 
                   placeholder="Phone Number" 
                   aria-label="Phone Number"
                   value={formData.phone} 
                   onChange={e => setFormData({...formData, phone: e.target.value})} 
                   className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                 />
              </div>
              <input 
                required 
                type="text"
                placeholder="Address" 
                aria-label="Shipping Address"
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
                className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required 
                  type="text"
                  placeholder="City" 
                  aria-label="City"
                  value={formData.city} 
                  onChange={e => setFormData({...formData, city: e.target.value})} 
                  className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                />
                <input 
                  required 
                  type="text"
                  placeholder="Zip" 
                  aria-label="ZIP or Postal Code"
                  value={formData.zip} 
                  onChange={e => setFormData({...formData, zip: e.target.value})} 
                  className="bg-brand-input border border-brand-border rounded-lg px-4 py-3 focus:border-brand-accent outline-none w-full" 
                />
              </div>
            </div>
            <div className="p-4 border border-brand-accent/50 bg-brand-accent/5 rounded-lg flex items-center gap-3" role="note" aria-label="Security Information">
              <Shield size={20} className="text-brand-accent" aria-hidden="true" />
              <span className="text-sm">Payments processed via Razorpay Secure.</span>
            </div>
            <Button 
              disabled={loading} 
              type="submit" 
              className="w-full py-4 mt-8 text-lg"
              aria-label={loading ? "Redirecting to payment..." : `Proceed to pay ${total.toLocaleString('en-IN')} rupees`}
            >
              {loading ? 'REDIRECTING...' : `PROCEED TO PAY ₹${total.toLocaleString('en-IN')}`}
            </Button>
          </form>
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 h-fit" role="complementary" aria-label="Order Summary">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-brand-muted" aria-label={`${item.quantity} times ${item.name}`}>{item.quantity}x {item.name}</span>
                <span className="font-mono" aria-label={`Price ${item.price * item.quantity} rupees`}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-border pt-4 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span className="text-brand-accent" aria-label={`Total price ${total.toLocaleString('en-IN')} rupees`}>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};