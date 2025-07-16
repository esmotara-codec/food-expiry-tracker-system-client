import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../layout/Container/Container";
import { AlertCircle, ArrowUpWideNarrow, BrickWall, Calendar, Clock, MessageCircleCode, Package, Plus, ShieldAlert, UserRoundPen } from "lucide-react";

const DetailsPage = () => {
     const {id} =useParams();
     const [foodItem, setFoodItem] = useState();
     const [loading, setLoading] =useState(true);
     console.log(id);

     const today = new Date().toISOString().split('T')[0];

 useEffect(() => {
      fetch(`http://localhost:5000/single-foodItems/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFoodItem(data);
        setLoading(false)
                console.log(data)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }
   if (!foodItem) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    

    return (
        <div className="bg-gray-200 text-gray-800 min-h-screen ">
          <Container>
            <div className="border border-[#24ab63] text-center py-2 ">
             <div className="p-4 md:p-10 bg-white  ">
                 <h1 className="font-bold text-xl md:text-3xl">Details Page</h1> 
                 <p className="text-gray-500">Complete information about your food item</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="col-span-5 p-4 md:p-16 ">
                    <img src={foodItem.image} alt={foodItem.title}
                    className="w-full h-full object-cover rounded-md"/>

                </div>
                <div className="col-span-7  text-white text-left">
                   {/* Food details section  */}
                   <div className="bg-white">
                    <div className="p-5 md:p-10 ">
                     <h2 className="text-xl md:text-2xl font-semibold text-gray-800 ">Food Name : {foodItem.title}</h2>
                   </div>
                   <div className="grid grid-cols-2 gap-4 px-10">

                     <div className="flex flex-row gap-2">
                       <Calendar  className="text-[#24ab63]"/>
                       <p className="text-gray-600"> Category : {foodItem.Category}</p>
                     </div>
                     <div className="flex flex-row gap-2">
                        <Package  className="text-[#24ab63]" />
                       <p className="text-gray-600">Quantity : {foodItem.quantity}</p>
                   </div>
                   <div className="flex flex-row gap-2">
                     <UserRoundPen  className="text-[#24ab63]" />
                     <p className="text-gray-600">Added date : {foodItem.dateAdded}</p>
                   </div>
                   <div className="flex flex-row gap-2">
                     <Clock  className="text-[#24ab63]" />
                     <p className="text-gray-600">Added date : {foodItem.dateAdded}</p>
                   </div>

                    </div>

                   <p className="text-xl md:text-xl text-gray-800 font-semibold p-10">Description : <span className="text-gray-500">{foodItem.description}</span></p>
                   </div>
                   
                     


                </div>


             </div>

            </div>

             {/* Add a note  */}
                   <div className="bg-slate-300-500 p-10 mx-auto my-10 ">
                   <div className="bg-gray-200 p-10 ">
                   <div className="flex flex-row gap-2 items-center p-5">
                     <MessageCircleCode className="h-6 w-6 text-blue-500" />
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 ">Notes</h2>
                   </div>
                   <div className="w-2/4 bg-white p-5  ">
                   <h2 className="text-sm md:text-xl font-semibold text-gray-800 p-3">Add a note</h2>
                   <div className="bg-gray-100 p-5">
                    <textarea 
                    name="note" 
                    className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-600"
                    placeholder="Write your note here..."
                    />

                  <div className="flex flex-row justify-between items-center">
                      <p className="text-gray-600 p-3 ">Posted Date: {today}</p>
                      <button
                      className="btn flex flex-row items-center gap-2 text-gray-500 border bg-white border-gray-300 rounded-3xl ">
                        <Plus className="h-5 w-5"/> <span>Add a Note</span>
                      </button>

                  </div>
                    

                   </div>

                   </div>
                   </div>
                    

                   </div>

             
          </Container>
          
            
        </div>
    );
};

export default DetailsPage;
