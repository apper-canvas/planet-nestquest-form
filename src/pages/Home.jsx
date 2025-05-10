import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const HomeIcon = getIcon("Home");
  const BuildingIcon = getIcon("Building");
  const KeyIcon = getIcon("Key");
  const SearchIcon = getIcon("Search");
  const HeartIcon = getIcon("Heart");
  const MapPinIcon = getIcon("MapPin");
  
  // Featured Properties Data
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Lakeside Villa",
      address: "432 Lakeview Drive, Seattle, WA",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      type: "House",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      address: "789 Center Street, Portland, OR",
      price: 850000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      address: "567 Oak Lane, Vancouver, WA",
      price: 675000,
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2400,
      type: "House",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const savedToFavorites = (property) => {
    toast.success(`${property.title} saved to favorites!`, {
      icon: () => <HeartIcon size={24} className="text-red-500" />
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000&q=80" 
          alt="Beautiful home exterior" 
          className="object-cover w-full h-96 md:h-[450px]"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white text-3xl md:text-5xl font-bold mb-4 max-w-3xl"
          >
            Find Your Perfect Place to Call Home
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white text-lg md:text-xl mb-8 max-w-2xl"
          >
            Browse thousands of properties for sale and rent across the country
          </motion.p>
          
          {/* Property search tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-2 mb-4"
          >
            <div className="flex">
              <button 
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition ${activeTab === 'buy' ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
              >
                <HomeIcon size={20} />
                <span>Buy</span>
              </button>
              <button 
                onClick={() => setActiveTab('rent')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition ${activeTab === 'rent' ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
              >
                <KeyIcon size={20} />
                <span>Rent</span>
              </button>
              <button 
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition ${activeTab === 'sell' ? 'bg-white text-primary' : 'text-white hover:bg-white/20'}`}
              >
                <BuildingIcon size={20} />
                <span>Sell</span>
              </button>
            </div>
          </motion.div>
          
          {/* Quick search bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex w-full max-w-2xl"
          >
            <div className="relative flex-grow">
              <MapPinIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Enter city, neighborhood, or address" 
                className="pl-10 pr-4 py-3 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white font-medium px-6 rounded-r-lg flex items-center transition-colors">
              <SearchIcon size={20} className="mr-2" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Property Search Feature */}
      <MainFeature />

      {/* Featured Properties */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Properties</h2>
          <a href="#" className="text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors">
            View all properties
            {getIcon("ArrowRight")({ size: 18 })}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => savedToFavorites(property)}
                    className="p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                    aria-label="Save to favorites"
                  >
                    <HeartIcon size={20} className="text-surface-400 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent text-white mb-2">
                    {property.type}
                  </span>
                  <h3 className="text-white text-lg font-semibold">${property.price.toLocaleString()}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                <div className="flex items-center text-surface-500 dark:text-surface-400 mb-3">
                  <MapPinIcon size={16} className="flex-shrink-0 mr-1" />
                  <p className="text-sm truncate">{property.address}</p>
                </div>
                
                <div className="flex justify-between text-sm border-t border-surface-200 dark:border-surface-700 pt-3 mt-3">
                  <div className="flex items-center">
                    {getIcon("BedDouble")({ size: 18, className: "mr-1 text-surface-500" })}
                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                  <div className="flex items-center">
                    {getIcon("Bath")({ size: 18, className: "mr-1 text-surface-500" })}
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                  <div className="flex items-center">
                    {getIcon("SquareStack")({ size: 18, className: "mr-1 text-surface-500" })}
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-primary-light hover:bg-primary text-white font-medium py-2 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-16 py-12 bg-surface-100 dark:bg-surface-800/50 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How NestQuest Works</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Finding your dream property is easy with our simple three-step process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              icon: "Search",
              title: "Search Properties",
              description: "Browse thousands of listings with our advanced filters to find exactly what you're looking for."
            },
            {
              icon: "CalendarDays",
              title: "Schedule Viewings",
              description: "Book property tours directly through our platform at times that work for you."
            },
            {
              icon: "Home",
              title: "Find Your Match",
              description: "Connect with sellers or agents and make your dream home a reality."
            }
          ].map((step, index) => {
          ].map((step, index) => {
            const StepIcon = getIcon(step.iconName);
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <StepIcon size={30} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-surface-600 dark:text-surface-400">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;