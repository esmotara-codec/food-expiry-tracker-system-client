import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const AddFoodItems = () => {
    const { user } = use(AuthContext);

    const addedDate = new Date().toISOString().split('T')[0];
    const handleAddFoodItems = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        // console.log(formData.entries());
        const newFoodItems = Object.fromEntries(formData.entries());
        console.log(newFoodItems);

        newFoodItems.name = user?.displayName || "";
        newFoodItems.email = user?.email || "";
        newFoodItems.dateAdded = addedDate;


        //send data to the db 
        fetch('http://localhost:5000/create-foodItems', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFoodItems)

        })
            .then(res => res.json())
            .then(data => {
                console.log('After Adding food items to db', data);
                if (data.insertedId) {
                    console.log('Food items added successfully');
                    Swal.fire({
                        title: "Food items added successfully!",
                        icon: "success",
                        draggable: true
                    });
                    //form reset


                }
            })
    }
    return (
        <div className="bg-white">
            <div className="container mx-auto px-5 md:px-44 ">
                <div className=" text-center p-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Food Items </h1>
                    <p className="text-xs md:text-lg mt-2 text-gray-500">Enter your food items to start tracking their expiry dates. Stay organized, get reminders, and reduce waste with smart food management.</p>

                </div>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                       <div className="flex items-center gap-2 mb-8">
                     <span className=" text-red-500">*</span>
                     <span className=" text-gray-600">Required Field</span>
                       </div>

                <form onSubmit={handleAddFoodItems}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                        {/* Title where u looking for roommate */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Title *</label>
                            <input type="text"
                                name='title'
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Enter food title" />

                        </div>

                        {/* Your Email  read only */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Your Email(Read only)</label>
                            <input type="text"
                                name='email'
                                readOnly
                                value={user?.email}
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Your Email" />
                        </div>

                        {/* Enter Category  */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Category *</label>
                            <input type="text"
                                name='Category'
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="Enter Category" />
                        </div>

                        {/* Enter Quantity */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Quantity * </label>
                            <input type="text"
                                name='quantity'
                                className="input w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="e.g., 2 bottles, 1 kg " />
                        </div>

                        {/* Enter Quantity */}
                        <div className="space-y-3">
                            <label className="label text-gray-700">Added Date(Read only)</label>
                            <input
                                type="text"
                                name="dateAdded"
                                value={addedDate}
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
                            <textarea name="description"
                                className="textarea w-full px-4 py-2 border border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]/30"
                                placeholder="E.g. Fresh homemade cookies, stored in airtight container. Best consumed within a week.">

                            </textarea>
                        </div>
                    </div>

                    <div className="p-5 text-center">
                        <button type="submit" className=" btn w-1/6 bg-[#24ab63] border border-[#24ab63]/20 text-white text-center items-center md:text-xl font-semibold  px-5 md:px-10 py-2 rounded-md shadow-none ">Submit</button>
                    </div>
                </form>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default AddFoodItems;