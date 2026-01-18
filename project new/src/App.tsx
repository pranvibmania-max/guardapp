import Header from './components/Header';
import Hero from './components/Hero';
import DigitalMidnightSale from './components/DigitalMidnightSale';
import EntertainmentFest from './components/EntertainmentFest';
import RoomHeaters from './components/RoomHeaters';
import GreatDeals from './components/GreatDeals';
import BrandPromise from './components/BrandPromise';
import PersonalCare from './components/PersonalCare';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <DigitalMidnightSale />
      <EntertainmentFest />
      <RoomHeaters />
      <GreatDeals />
      <BrandPromise />
      <PersonalCare />
      <Footer />
    </div>
  );
}

export default App;
