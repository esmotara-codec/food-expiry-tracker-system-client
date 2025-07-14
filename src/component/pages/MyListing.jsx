import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../Loading/Loading';
import Container from '../layout/Container/Container';
import RoommateEditModal from './DetailsModal/RoommateEditModal';
import Swal from 'sweetalert2';

const MyListing = () => {
  const { user, loading } = useContext(AuthContext);
  const [roommates, setRoommates] = useState([]);
  // const [selectedRoommate, setSelectedRoommate] = useState(null);
  // const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.email) {
  //     fetchMyRoommates();
  //   }
  // }, [user]);

//  const fetchMyRoommates = async () => {
//     try {
//       setDataLoading(true);
//       const response = await fetch(`https://rommate-server.vercel.app/roommates/user/${user.email}`);
//       const data = await response.json();
//       console.log(data);
//       setRoommates(data);

//     } catch (error) {
//       console.error('Error fetching roommates:', error);
//     } finally {
//       setDataLoading(false);
//     }
//   }; 
  // Update data  handler
  const handleEditPost = (updatedData) => {
   
    
    fetch(`https://rommate-server.vercel.app/update-roommates/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),

    })
    .then(res => res.json())
    .then(data => {
      console.log('After Update the Data', data);
      setRoommates(roommates.map(roommate => roommate._id === updatedData._id ? updatedData : roommate));
      if(data.modifiedCount){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Roommate Updated Successfully",
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


  // const handleDelete = (_id) => {
  //   console.log(_id);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Start Deleting by Roommate ApI
  //       fetch(`https://rommate-server.vercel.app/delete-roommates/${_id}`, {
  //         method: 'DELETE'
  //       })
  //         .then(res => res.json())
  //         .then(data => {
  //           console.log('After Delete', data);
  //           if (data.deletedCount) {
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "Your file has been deleted.",
  //               icon: "success"
  //             });
  //           }

  //         })


  //     }
  //   });

  // }
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              My  Listings
            </h1>
            <p className="text-gray-600 text-sm md:text-lg">
              Manage your posted  listings
            </p>
          </div>

          {/* Content Section */}
          {roommates.length === 0 ? (
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
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none px-8 py-3 rounded-lg text-white font-semibold"
                  onClick={() => navigate('/add-roommate')}
                >
                  Create First Listing
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 md:px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Your have ({roommates.length}) post
                </h2>
              </div>

              {/* Card Items */}
              


            </div>
          )}

          {/* Modal component */}
          {showModal && (
            <RoommateEditModal
              roommate={selectedRoommate}
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