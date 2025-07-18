import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../Loading/Loading';
import Container from '../layout/Container/Container';
import Swal from 'sweetalert2';
import FoodEditModal from './DetailsModal/FoodEditModal';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const MyListing = () => {
  const { user, loading } = useContext(AuthContext);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetchMyfoodItems();
    }
  }, [user]);

 const fetchMyfoodItems = async () => {
     
    try {
      const token = await getAuth().currentUser.getIdToken(true); 
      const response = await axios.get(`https://food-expiry-server-lime.vercel.app/my-foodItems` , {
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data; 
      setFoodItems(data);

    } catch (error) {
      console.error('Error fetching foodItems:', error);
    } 
  }; 
  // Update data 
  const handleEditPost = (updatedData) => {
   
    
    fetch(`https://food-expiry-server-lime.vercel.app/update-foodItems/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),

    })
    .then(res => res.json())
    .then(data => {
      console.log('After Update the Data', data);
      setFoodItems(foodItems.map(food => food._id === updatedData._id ? updatedData : food));
      if(data.modifiedCount){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "food Updated Successfully",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        
      }
    }).catch(error => {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    })

  }


  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Start Deleting by food ApI
        fetch(`https://food-expiry-server-lime.vercel.app/delete-foodItems/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log('After Delete', data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }

          })


      }
    });

  }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          {/* Header Section */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 ">
              My  Listings
            </h1>
            <p className="text-gray-600 text-sm md:text-lg">
              Manage your posted  listings
            </p>
          </div>

          {/* Content Section */}
          {foodItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">🏠</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  No listings found
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first listing to start finding your items!
                </p>
                <button
                  className="btn btn-primary bg-green-600 hover:bg-green-700 border-none px-8 py-3 rounded-lg text-white font-semibold"
                  onClick={() => navigate('/add-food')}
                >
                  Create First Listing
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-3 md:px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Hey {user.displayName}, You have ({foodItems.length}) food item Listed in the table below : 
                </h2>
              </div>

               {/* Table Content */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Food Detail
                      </th>
                     
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Added date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Expiry date
                      </th>
                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                       Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {foodItems.map((food, index) => (
                      <tr key={food._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <span className="text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {/* <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                              
                            
                                <span className="text-white font-semibold text-lg">
                                  {food.title ? food.title.charAt(0).toUpperCase() : 'None'}
                                </span>
                              </div> */}

                              <img src={food.image} 
                              alt="Food-Item" 
                              className='w-12 h-12 object-cover rounded-full'/>

                            </div>
                            <div>
                              <div className="text-base font-semibold text-gray-900">
                                {food.title || 'No Name'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {food.Category ? `${food.Category} ` : 'Not specified'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-6 whitespace-nowrap text-center">
                          <div className="space-y-1">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                             {food.quantity || 'Location not specified'}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="text-base font-medium text-gray-900">
                            {food.dateAdded || 'N/A'}
                          </div>
                        </td>

                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${food.expiryDate === '3-6months'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {food.expiryDate || 'Expiry date is not specified'}
                          </span>
                        </td>

                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                              onClick={() => {
                                setSelectedFoodItem(food);
                                setShowModal(true);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                              onClick={() => handleDelete(food._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              


            </div>
          )}

          {/* Modal component */}
          {showModal && (
            <FoodEditModal
              food={selectedFoodItem}
              onClose={() => setShowModal(false)}
              onUpdate = {handleEditPost}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyListing;