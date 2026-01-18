import { Facebook, Twitter, Instagram, Youtube, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Smartphones</a></li>
              <li><a href="#" className="hover:text-white transition">Laptops</a></li>
              <li><a href="#" className="hover:text-white transition">DSLR Cameras</a></li>
              <li><a href="#" className="hover:text-white transition">Televisions</a></li>
              <li><a href="#" className="hover:text-white transition">Air Conditioners</a></li>
              <li><a href="#" className="hover:text-white transition">Refrigerators</a></li>
              <li><a href="#" className="hover:text-white transition">Kitchen Appliances</a></li>
              <li><a href="#" className="hover:text-white transition">Personal Care</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Site Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Career</a></li>
              <li><a href="#" className="hover:text-white transition">Sell With Us</a></li>
              <li><a href="#" className="hover:text-white transition">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resource Center</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Product Reviews</a></li>
              <li><a href="#" className="hover:text-white transition">Buying Guides</a></li>
              <li><a href="#" className="hover:text-white transition">How To's</a></li>
              <li><a href="#" className="hover:text-white transition">Featured Stories</a></li>
              <li><a href="#" className="hover:text-white transition">Events & Happenings</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
            </ul>

            <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-white font-semibold">Download Our App</h4>
              <div className="flex gap-3">
                <a href="#" className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
                <a href="#" className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-sm">
              © 2022 Reliance Digital. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
