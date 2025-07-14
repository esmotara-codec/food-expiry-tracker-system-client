import { useState } from "react";

const FoodEditModal = ({ food, onClose , onUpdate }) => {
   const [formData, setFormData] = useState(
    {
      ...food,
      _id: food._id,
    }
   );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("Update button clicked");
    e.preventDefault();
    onUpdate(formData); 
    
  };
  if (!food) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Hey there {food.name}, Update your food item</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                        {/* Title where u looking for roommate */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Title *</label>
                            <input type="text"
                                name='title'
                                onChange={handleChange}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Enter food title" />

                        </div>

                        {/* Your Email  read only */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Your Email(Read only)</label>
                            <input type="text"
                                name='email'
                                readOnly
                                value={formData.email}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Your Email" />
                        </div>

                        {/* Enter Category  */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Category *</label>
                            <input type="text"
                                name='Category'
                                 onChange={handleChange}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Enter Category" />
                        </div>

                        {/* Enter Quantity */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Quantity * </label>
                            <input type="text"
                                name='quantity'
                                onChange={handleChange}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="e.g., 2 bottles, 1 kg " />
                        </div>

                        {/* Enter Quantity */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Added Date(Read only)</label>
                            <input
                                type="text"
                                name="dateAdded"
                                value={formData.addedDate}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Enter quantity" />
                        </div>



                        {/* select  Expiry Date  */}
                        <div className="space-y-3">
                            <label className="label text-gray-700"> Expiry Date *</label>
                            <select
                                name="expiryDate"
                                className="select w-full px-4 py-2 border border-gray-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30">
                                <option value="">Select Expiry Date</option>
                                <option value="1-2months">1-2 months</option>
                                <option value="3-6months">3-6 months</option>
                                <option value="6-12months">6-12months</option>
                                <option value="1-1.5years">1-1.5 years</option>
                                <option value="2years">2 years</option>
                            </select>
                        </div>


                        {/*  Enter Food Image  */}
                        <div className="space-y-3">
                            <label className="label text-gray-700 mb-2">Upload Image *</label>

                            <div className="w-full">
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Enter image URL"
                                    required
                                    className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                   
                                />
                                   
                            </div>

                            <small className="text-sm text-gray-500 mt-2 block">
                                Supported formats: JPG, PNG. Max size: 2MB.
                            </small>
                        </div>

                    </div>

                    {/*Add description   */}
                    <div className="py-5">
                        <div className="space-y-3">
                            <label className="label text-gray-700">Description *</label>
                            <textarea 
                            name="description"
                             onChange={handleChange}
                                className="textarea w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="E.g. Fresh homemade cookies, stored in airtight container. Best consumed within a week.">

                            </textarea>
                        </div>
                    </div>

                    <div className="p-5 text-center">
                        <button type="submit" className=" btn w-1/6 bg-[#24ab63] border border-[#24ab63]/20 text-white text-center items-center md:text-xl font-semibold  px-5 md:px-10 py-2 rounded-md shadow-none ">
                        Update
                        </button>
                    </div>
                </form>
        </div>
      </div>
    </div>
  );
};

export default FoodEditModal;