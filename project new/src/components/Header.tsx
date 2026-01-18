import { Search, MapPin, BookOpen, ShoppingCart, User, ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="bg-red-600 text-white py-1 text-xs text-center">
        <p>Welcome to Bharat E-bazaar - Your Electronics Shopping Destination</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600">Bharat E-bazaar</h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Find your favorite products"
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center text-gray-700 hover:text-red-600">
              <MapPin size={20} />
              <span className="text-xs mt-1">Location</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-red-600">
              <BookOpen size={20} />
              <span className="text-xs mt-1">Guide</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-red-600 relative">
              <ShoppingCart size={20} />
              <span className="text-xs mt-1">Cart</span>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-red-600">
              <User size={20} />
              <span className="text-xs mt-1">Login</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2 py-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <ShoppingBag size={20} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-8">
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">MOBILES & TABLETS</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">TELEVISIONS</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">AUDIO</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">HOME APPLIANCES</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">COMPUTERS</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">CAMERAS</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">KITCHEN APPLIANCES</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">PERSONAL CARE</a>
            <a href="#" className="px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-white transition">ACCESSORIES</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
