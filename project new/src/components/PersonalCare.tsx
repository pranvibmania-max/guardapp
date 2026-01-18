import { useState } from 'react';
import { ChevronLeft, ChevronRight, Scissors, Wind } from 'lucide-react';

const products = [
  { id: 1, name: 'Hair Trimmer Pro', price: '₹899', originalPrice: '₹2,499', discount: '64% OFF', icon: Scissors },
  { id: 2, name: 'Electric Shaver', price: '₹1,299', originalPrice: '₹3,999', discount: '68% OFF', icon: Wind },
  { id: 3, name: 'Beard Styler', price: '₹749', originalPrice: '₹1,999', discount: '63% OFF', icon: Scissors },
  { id: 4, name: 'Nose Trimmer', price: '₹499', originalPrice: '₹1,299', discount: '62% OFF', icon: Wind },
  { id: 5, name: 'Body Groomer', price: '₹1,799', originalPrice: '₹4,999', discount: '64% OFF', icon: Scissors },
  { id: 6, name: 'Hair Dryer', price: '₹1,199', originalPrice: '₹2,999', discount: '60% OFF', icon: Wind }
];

export default function PersonalCare() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    if (startIndex + itemsToShow < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Care</h2>
            <p className="text-lg text-purple-600 font-semibold">Up to 80% OFF</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={startIndex + itemsToShow >= products.length}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(-${startIndex * (100 / itemsToShow)}%)` }}
          >
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 bg-white rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  style={{ width: `calc(${100 / itemsToShow}% - 12px)` }}
                >
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-6 mb-3 flex items-center justify-center h-32">
                    <Icon size={48} className="text-purple-600" />
                  </div>
                  <div className="mb-2">
                    <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      {product.discount}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-2 h-10">{product.name}</h3>
                  <div className="mb-1">
                    <span className="text-lg font-bold text-purple-600">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
