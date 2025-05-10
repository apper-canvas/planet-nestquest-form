import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon definitions
  const SearchIcon = getIcon("Search");
  const HomeIcon = getIcon("Home");
  const BuildingIcon = getIcon("Building");
  const DollarSignIcon = getIcon("DollarSign");
  const BedDoubleIcon = getIcon("BedDouble");
  const BathIcon = getIcon("Bath");
  const SliderIcon = getIcon("Sliders");
  const MapPinIcon = getIcon("MapPin");
  const XIcon = getIcon("X");
  const CheckIcon = getIcon("Check");
  const RefreshCwIcon = getIcon("RefreshCw");
  const FilterIcon = getIcon("Filter");

  // State management
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'any',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isValidationError, setIsValidationError] = useState(false);

  // Mock property data for search results
  const mockProperties = [
    {
      id: 101,
      title: "Luxury Downtown Condo",
      location: "Seattle, WA",
      price: 750000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1240,
      propertyType: "apartment",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 102,
      title: "Spacious Family Home",
      location: "Bellevue, WA",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      propertyType: "house",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 103,
      title: "Waterfront Townhouse",
      location: "Kirkland, WA",
      price: 895000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1950,
      propertyType: "townhouse",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 104,
      title: "Modern Studio Apartment",
      location: "Seattle, WA",
      price: 450000,
      bedrooms: 0,
      bathrooms: 1,
      sqft: 580,
      propertyType: "apartment",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
    
    // Clear validation error when user starts typing
    if (isValidationError) {
      setIsValidationError(false);
    }
  };

  // Simulate search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchParams.location.trim()) {
      setIsValidationError(true);
      toast.error("Please enter a location to search", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter properties based on search parameters
      let results = mockProperties;
      
      // Filter by location (case insensitive partial match)
      if (searchParams.location) {
        results = results.filter(property => 
          property.location.toLowerCase().includes(searchParams.location.toLowerCase())
        );
      }
      
      // Filter by property type
      if (searchParams.propertyType !== 'any') {
        results = results.filter(property => 
          property.propertyType === searchParams.propertyType
        );
      }
      
      // Filter by min price
      if (searchParams.minPrice) {
        results = results.filter(property => 
          property.price >= parseInt(searchParams.minPrice)
        );
      }
      
      // Filter by max price
      if (searchParams.maxPrice) {
        results = results.filter(property => 
          property.price <= parseInt(searchParams.maxPrice)
        );
      }
      
      // Filter by bedrooms
      if (searchParams.bedrooms !== 'any') {
        const bedroomsValue = parseInt(searchParams.bedrooms);
        if (searchParams.bedrooms === '4+') {
          results = results.filter(property => property.bedrooms >= 4);
        } else {
          results = results.filter(property => property.bedrooms === bedroomsValue);
        }
      }
      
      // Filter by bathrooms
      if (searchParams.bathrooms !== 'any') {
        const bathroomsValue = parseFloat(searchParams.bathrooms);
        if (searchParams.bathrooms === '3+') {
          results = results.filter(property => property.bathrooms >= 3);
        } else {
          results = results.filter(property => property.bathrooms === bathroomsValue);
        }
      }
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.info("No properties match your search criteria. Try adjusting your filters.", {
          position: "top-center",
          autoClose: 4000,
        });
      } else {
        toast.success(`Found ${results.length} properties matching your criteria!`, {
          position: "top-center",
          autoClose: 3000,
          icon: <CheckIcon className="text-green-500" />
        });
      }
    }, 1500);
  };

  // Reset search form
  const resetSearch = () => {
    setSearchParams({
      location: '',
      propertyType: 'any',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      bathrooms: 'any',
    });
    setSearchResults([]);
    setIsValidationError(false);
    
    toast.info("Search filters have been reset", {
      position: "top-center",
      autoClose: 2000,
      icon: <RefreshCwIcon className="text-blue-500" />
    });
  };

  // Toggle mobile filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Cleanup effect
  useEffect(() => {
    return () => {
      // Any cleanup needed
    };
  }, []);

  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card overflow-hidden transition-all">
      <div className="p-5 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <SearchIcon className="text-primary" />
          Find Your Perfect Property
        </h2>
      </div>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Location Input */}
          <div className={`relative lg:col-span-2 ${isValidationError ? 'animate-shake' : ''}`}>
            <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text"
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="City, neighborhood, or address"
                className={`input pl-10 w-full ${isValidationError ? 'border-red-500 dark:border-red-500' : ''}`}
              />
            </div>
            {isValidationError && (
              <p className="mt-1 text-sm text-red-500">Please enter a location</p>
            )}
          </div>
          
          {/* Property Type */}
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
              Property Type
            </label>
            <div className="relative">
              <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <select
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleInputChange}
                className="input pl-10 w-full appearance-none"
              >
                <option value="any">Any Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
              {/* Custom select arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                {getIcon("ChevronDown")({ size: 18, className: "text-surface-500" })}
              </div>
            </div>
          </div>
          
          {/* Mobile Toggle Filters Button */}
          <div className="lg:hidden flex justify-end">
            <button
              type="button"
              onClick={toggleFilters}
              className="flex items-center gap-2 py-2 px-4 bg-surface-100 dark:bg-surface-700 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            >
              <FilterIcon size={18} />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          
          {/* Additional Filters - responsive */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 lg:col-span-3 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            {/* Price Range */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Price Range
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="number"
                    name="minPrice"
                    value={searchParams.minPrice}
                    onChange={handleInputChange}
                    placeholder="Min"
                    className="input pl-10 w-full"
                    min="0"
                  />
                </div>
                <div className="relative flex-1">
                  <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                  <input
                    type="number"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange}
                    placeholder="Max"
                    className="input pl-10 w-full"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Bedrooms
              </label>
              <div className="relative">
                <BedDoubleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={searchParams.bedrooms}
                  onChange={handleInputChange}
                  className="input pl-10 w-full appearance-none"
                >
                  <option value="any">Any</option>
                  <option value="0">Studio</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  {getIcon("ChevronDown")({ size: 18, className: "text-surface-500" })}
                </div>
              </div>
            </div>
            
            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                Bathrooms
              </label>
              <div className="relative">
                <BathIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={searchParams.bathrooms}
                  onChange={handleInputChange}
                  className="input pl-10 w-full appearance-none"
                >
                  <option value="any">Any</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3+">3+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  {getIcon("ChevronDown")({ size: 18, className: "text-surface-500" })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Reset Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={resetSearch}
            className="btn btn-outline flex items-center justify-center gap-2"
            disabled={isSearching}
          >
            <RefreshCwIcon size={18} />
            <span>Reset</span>
          </button>
          
          <button
            type="submit"
            className="btn btn-primary flex items-center justify-center gap-2"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <SliderIcon size={18} />
                </motion.div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <SearchIcon size={18} />
                <span>Search Properties</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Search Results */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-surface-200 dark:border-surface-700"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  {searchResults.length} properties found
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="flex bg-surface-50 dark:bg-surface-700 rounded-lg overflow-hidden hover:shadow-md transition-all"
                  >
                    {/* Property Image */}
                    <div className="w-1/3 h-32 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Property Details */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-base">{property.title}</h4>
                          <span className="text-primary font-bold text-sm">
                            ${property.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-surface-600 dark:text-surface-400 flex items-center mt-1">
                          <MapPinIcon size={14} className="mr-1" /> 
                          {property.location}
                        </p>
                      </div>
                      
                      <div className="flex justify-between text-xs text-surface-500 dark:text-surface-300 mt-2">
                        <span className="flex items-center">
                          <BedDoubleIcon size={14} className="mr-1" />
                          {property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Studio'}
                        </span>
                        <span className="flex items-center">
                          <BathIcon size={14} className="mr-1" />
                          {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center">
                          {getIcon("Square")({ size: 14, className: "mr-1" })}
                          {property.sqft.toLocaleString()} sqft
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;