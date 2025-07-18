import React, { useState, useEffect } from 'react';
import { Eye, Calendar, Package, Tag, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';
import { getActualExpiryDate } from '../../NearlyExpiryItems/ExpiryDateCount';

const FridgePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch food items from API
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('https://food-expiry-server-lime.vercel.app/get-foodItems');
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Helper function to calculate days remaining until expiry
  const getDaysRemaining = (dateAdded, expiryRange) => {
    const expiryMap = {
      '1week': 7,
      '2week': 14,
      '1month': 30,
      '2months': 60,
      '3months': 90,
      '6months': 180,
      '1years': 365,
      '2years': 730,
    };
    
    const daysToAdd = expiryMap[expiryRange] || 0;
    const addedDate = new Date(dateAdded);
    const expiryDate = new Date(addedDate);
    expiryDate.setDate(expiryDate.getDate() + daysToAdd);
    
    const today = new Date();
    const timeDifference = expiryDate - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
  };

  //  check if item is expired
  const isExpired = (dateAdded, expiryRange) => {
    return getDaysRemaining(dateAdded, expiryRange) <= 0;
  };

  // Get expiry status badge color
  const getExpiryBadgeColor = (daysRemaining) => {
    if (daysRemaining == 0) return 'bg-red-500 text-white';
    
    return '';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your food items...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Food Items</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Fridge</h1>
              <p className="mt-1 text-gray-600">Manage your food inventory and track expiry dates</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-green-600">{foodItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {foodItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Food Items</h3>
            <p className="text-gray-600">Your fridge is empty. Add some food items to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foodItems.map((item) => {
              const daysRemaining = getDaysRemaining(item.dateAdded, item.expiryDate);
              const expired = isExpired(item.dateAdded, item.expiryDate);
              const actualExpiryDate = getActualExpiryDate(item.dateAdded, item.expiryDate);

              return (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Food Image */}
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                    
                    {/* Expiry Status Badge */}
                    {expired ? (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Expired
                      </div>
                    ) : (
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getExpiryBadgeColor(daysRemaining)}`}>
                        <Calendar className="h-3 w-3 mr-1" />
                        {daysRemaining}d left
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Food Title */}
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate" title={item.title}>
                      {item.title}
                    </h3>

                    {/* Category */}
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600 truncate">{item.Category}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center mb-3">
                      <Package className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                    </div>

                    {/* Expiry Date - British Format */}
                    <div className="flex items-center mb-4">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className={`text-sm ${expired ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                        Expires: {actualExpiryDate}
                      </span>
                    </div>

                    {/* Days Remaining Info */}
                    <div className="mb-4">
                      <span className={`text-sm font-medium ${
                        expired ? 'text-red-600' : 
                        daysRemaining <= 3 ? 'text-red-500' :
                        daysRemaining <= 7 ? 'text-yellow-500' : 
                        'text-green-600'
                      }`}>
                        {expired ? 
                          `Expired ${Math.abs(daysRemaining)} days ago` : 
                          `${daysRemaining} days remaining`
                        }
                      </span>
                    </div>

                    {/* See Details Button */}
                    <Link to={`/foodDetails/${item._id}`}>
                      <button className="w-full bg-[#24ab63] hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-2" />
                        See Details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FridgePage;