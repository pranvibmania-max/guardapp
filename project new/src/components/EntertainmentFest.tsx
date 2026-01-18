import { Tv, Headphones, Monitor, Speaker } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Smart TVs',
    subtitle: 'Starting at ₹12,999',
    icon: Tv,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    title: 'Premium Headphones',
    subtitle: 'Up to 60% OFF',
    icon: Headphones,
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 3,
    title: 'Smart Televisions',
    subtitle: 'Best Deals',
    icon: Monitor,
    color: 'from-green-500 to-green-700'
  },
  {
    id: 4,
    title: 'Soundbars',
    subtitle: 'Starting at ₹2,499',
    icon: Speaker,
    color: 'from-orange-500 to-orange-700'
  }
];

export default function EntertainmentFest() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Entertainment Fest</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${category.color} p-8 h-64 flex flex-col items-center justify-center text-white`}>
                  <Icon size={64} className="mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
