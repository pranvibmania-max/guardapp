import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'MEGA ELECTRONICS SALE',
    subtitle: 'Up to 50% OFF on Top Brands',
    cta: 'Shop Now'
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    title: 'SMARTPHONES FESTIVAL',
    subtitle: 'Latest Models at Best Prices',
    cta: 'Explore Now'
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    title: 'HOME APPLIANCES SALE',
    subtitle: 'Save Big on Home Essentials',
    cta: 'View Deals'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: slide.bg }}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-2xl mb-6">{slide.subtitle}</p>
              <button className="bg-white text-red-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
