import { Zap, CreditCard, ShieldCheck, MapPin } from 'lucide-react';

const promises = [
  {
    id: 1,
    icon: Zap,
    title: 'INSTA DELIVERY',
    subtitle: 'LESS THAN 3 HOURS',
    color: 'text-orange-600'
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'BEST FINANCE OPTIONS',
    subtitle: 'WIDE RANGE',
    color: 'text-blue-600'
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'SERVICE GUARANTEE',
    subtitle: 'HASSLE FREE',
    color: 'text-green-600'
  },
  {
    id: 4,
    icon: MapPin,
    title: 'UNMATCHED NETWORK',
    subtitle: '700 CITIES, 2000 STORES',
    color: 'text-purple-600'
  }
];

export default function BrandPromise() {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise) => {
            const Icon = promise.icon;
            return (
              <div key={promise.id} className="flex items-center gap-4">
                <div className="bg-white rounded-full p-4">
                  <Icon size={40} className={promise.color} />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-sm">{promise.title}</h3>
                  <p className="text-xs text-gray-300">{promise.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
