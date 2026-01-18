import { Flame } from 'lucide-react';

const heaters = [
  { id: 1, name: 'Room Heater 1500W', price: '₹2,499', originalPrice: '₹3,499', savings: 'Save ₹1,000' },
  { id: 2, name: 'Oil Filled Radiator', price: '₹4,999', originalPrice: '₹6,999', savings: 'Save ₹2,000' },
  { id: 3, name: 'Fan Heater Compact', price: '₹1,799', originalPrice: '₹2,499', savings: 'Save ₹700' },
  { id: 4, name: 'Infrared Heater', price: '₹3,299', originalPrice: '₹4,699', savings: 'Save ₹1,400' },
  { id: 5, name: 'Carbon Heater Pro', price: '₹2,999', originalPrice: '₹4,299', savings: 'Save ₹1,300' }
];

export default function RoomHeaters() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Room Heaters</h2>
            <p className="text-lg text-red-600 font-semibold">Save up to 30%</p>
          </div>
          <Flame size={48} className="text-orange-600" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {heaters.map((heater) => (
            <div key={heater.id} className="bg-white rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-6 mb-3 flex items-center justify-center h-32">
                <Flame size={48} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-2 h-10">{heater.name}</h3>
              <div className="mb-1">
                <span className="text-lg font-bold text-red-600">{heater.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 line-through">{heater.originalPrice}</span>
              </div>
              <p className="text-xs text-green-600 font-semibold mt-1">{heater.savings}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
