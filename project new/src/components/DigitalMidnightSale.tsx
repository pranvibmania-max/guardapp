import { Smartphone, Shield, Watch, Headphones } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Apple iPhone 13 128GB',
    price: '₹65,900.00',
    originalPrice: '₹69,900.00',
    icon: Smartphone,
    discount: '6% OFF'
  },
  {
    id: 2,
    name: 'Philips Beard Trimmer',
    price: '₹699.00',
    originalPrice: '₹945.00',
    icon: Shield,
    discount: '26% OFF'
  },
  {
    id: 3,
    name: 'Hammer Pulse Ace Pro Smart Watch',
    price: '₹1,499.00',
    originalPrice: '₹4,999.00',
    icon: Watch,
    discount: '70% OFF'
  },
  {
    id: 4,
    name: 'OnePlus Bullets Z2 Earphone',
    price: '₹1,699.00',
    originalPrice: '₹2,290.00',
    icon: Headphones,
    discount: '26% OFF'
  }
];

export default function DigitalMidnightSale() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Digital Midnight Sale</h2>
        <a href="#" className="text-red-600 font-semibold hover:underline">View All →</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center h-48 group-hover:scale-105 transition">
                <Icon size={80} className="text-gray-700" />
              </div>
              <div className="mb-2">
                <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                  {product.discount}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 h-12">{product.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">{product.price}</span>
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
