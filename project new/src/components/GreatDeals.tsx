import { Watch, Tv, Printer, WashingMachine, Home, Headphones, Smartphone, Laptop } from 'lucide-react';

const deals = [
  { id: 1, icon: Watch, title: 'Smartwatches', color: 'from-blue-400 to-blue-600' },
  { id: 2, icon: Tv, title: 'Smart TVs', color: 'from-purple-400 to-purple-600' },
  { id: 3, icon: Printer, title: 'Printers', color: 'from-green-400 to-green-600' },
  { id: 4, icon: WashingMachine, title: 'Washing Machines', color: 'from-pink-400 to-pink-600' },
  { id: 5, icon: Home, title: 'Smart Home', color: 'from-yellow-400 to-yellow-600' },
  { id: 6, icon: Headphones, title: 'Earphones', color: 'from-red-400 to-red-600' },
  { id: 7, icon: Smartphone, title: 'Smartphones', color: 'from-indigo-400 to-indigo-600' },
  { id: 8, icon: Laptop, title: 'Laptops', color: 'from-teal-400 to-teal-600' }
];

export default function GreatDeals() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Great Deals on Electronics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {deals.map((deal) => {
          const Icon = deal.icon;
          return (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden group"
            >
              <div className={`bg-gradient-to-br ${deal.color} p-6 flex items-center justify-center h-32`}>
                <Icon size={48} className="text-white group-hover:scale-110 transition" />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-900">{deal.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
