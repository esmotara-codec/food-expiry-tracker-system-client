import { useState } from "react";

const RoommateEditModal = ({ roommate, onClose , onUpdate }) => {
   const [formData, setFormData] = useState(
    {
      ...roommate,
      _id: roommate._id,
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
  if (!roommate) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Hey there {roommate.name}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form action="" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <select
                    name="title"
                    defaultValue={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                    required
                  >
                    <option value="">Select Title</option>
                    <option value="Not offering a room">I am not offering a room</option>
                    <option value="Offering a room">I am offering a room</option>
                  </select>
                </fieldset>

                {/* Your Name */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    defaultValue={formData.name}
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:outline-none"
                    placeholder="Your full Name"
                  />
                </fieldset>

                {/* Your Email */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    defaultValue={formData.email}
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:outline-none"
                    placeholder="Your Email"
                  />
                </fieldset>

                {/* Your Age */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
                  <input
                    type="text"
                    name="age"
                    defaultValue={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                    placeholder="Your Age"
                  />
                </fieldset>

                {/* Your Gender */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Gender</label>
                  <select
                    name="gender"
                    defaultValue={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>

                {/* Location */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                    placeholder="Your Address"
                  />
                </fieldset>
              </div>
            </div>

            {/* Room Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Room Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rent Amount */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rent Amount *</label>
                  <input
                    type="text"
                    name="rent"
                    defaultValue={formData.rent}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                    placeholder="Please enter the rent amount"
                  />
                </fieldset>

                {/* Room Type */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                  <select
                    name="roomType"
                    defaultValue={formData.roomType}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  >
                    <option value="">Select a room type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="master">Master bedroom</option>
                  </select>
                </fieldset>

                {/* Availability */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                  <select
                    name="availability"
                    defaultValue={formData.availability}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  >
                    <option value="">Select availability</option>
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                  </select>
                </fieldset>

                {/* Lease Duration */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lease Duration *</label>
                  <select
                    name="leaseDuration"
                    defaultValue={formData.leaseDuration}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  >
                    <option value="">Select an option</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1 year">1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2+ years">2+ years</option>
                  </select>
                </fieldset>
              </div>
            </div>

            {/* Lifestyle Preferences */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Lifestyle Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pet Friendly */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pets *</label>
                  <select
                    name="petFriendly"
                    defaultValue={formData.petFriendly}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  >
                    <option value="">Select an option</option>
                    <option value="cat">I have a cat</option>
                    <option value="dog">I have a dog</option>
                    <option value="both">I have both</option>
                    <option value="pet-friendly">Pet friendly</option>
                    <option value="none">No pets</option>
                  </select>
                </fieldset>

                {/* Contact Info */}
                <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info *</label>
                  <input
                    type="text"
                    name="contactInfo"
                    defaultValue={formData.contactInfo}
                     onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                    placeholder="Your contact information"
                  />
                </fieldset>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Description</h3>
              <fieldset className="bg-white border border-gray-300 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself *</label>
                <textarea
                  name="description"
                  defaultValue={formData.description}
                  rows="4"
                   onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2596be]/30 focus:border-[#2596be]"
                  placeholder="Describe yourself, your living situation, what you're looking for in a roommate?"
                />
              </fieldset>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn px-6 py-2 bg-[#2596be] text-white rounded-md hover:bg-[#2596be]/90 transition-colors font-semibold"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoommateEditModal;