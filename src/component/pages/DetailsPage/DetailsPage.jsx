import { use, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import { ArrowLeft, MapPin, Calendar, User, Heart, Phone, Mail, Home, DollarSign, Clock, PawPrint } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Loading/Loading';

const DetailsPage = () => {
    const { loading } = use(AuthContext);
    const detailsData = useLoaderData();
    const [isLiked, setIsLiked] = useState(false);
    const { _id } = useParams();
    

    const [viewPostDetail , setViewPostDetail] =useState({});

    useEffect(() => {
        const singlePost = detailsData?.find((detail) => detail._id === parseInt(_id) );
        setViewPostDetail(singlePost)

    }, [detailsData , _id]);

    const {name , gender ,age,  availability, location, roomType, title , rent , leaseDuration} = viewPostDetail;

    const formatRoomType = (type) => {
        const types = {
            'single': 'Single Room',
            'double': 'Double Room',
            'master': 'Master Bedroom'
        };
        return types[type] || type;
    };

    const formatAvailability = (availability) => {
        return availability === 'available' ? 'Available' : 'Not Available';
    };

    const formatPetFriendly = (petFriendly) => {
        const pets = {
            'cat': 'I have a cat',
            'dog': 'I have a dog',
            'both': 'I have both',
            'pet-friendly': 'Pet friendly',
            'none': 'No pets'
        };
        return pets[petFriendly] || petFriendly;
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                   <Link to="/">
                    <button 
                       className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to listings
                    </button>
                    
                   </Link>
                    <div className="flex items-start gap-6">
                        
                        
                        
                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{name || 'Unknown User'}</h1>
                                <button 
                                    onClick={handleLike}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                        isLiked 
                                            ? 'bg-red-100 text-red-600' 
                                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                    {isLiked ? 'Liked' : 'Like'}
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-4 text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {age ? `${age} years old` : 'Age not specified'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {location || 'Location not specified'}
                                </span>
                            </div>
                            
                            {/* Tags */}
                            <div className="flex gap-2 mb-4">
                                {title && (
                                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-medium">
                                        {title}
                                    </span>
                                )}
                                {gender && (
                                    <span className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full font-medium capitalize">
                                        {gender}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Post Data Grid - Row Layout */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Room Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Rent */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">Rent Amount</span>
                            </div>
                            <div className="text-2xl font-bold text-green-800">
                                ${rent || 'N/A'}
                            </div>
                        </div>

                        {/* Room Type */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Home className="w-5 h-5 text-blue-600" />
                                <span className="text-sm font-medium text-blue-700">Room Type</span>
                            </div>
                            <div className="text-lg font-bold text-blue-800">
                                {roomType ? formatRoomType(roomType) : 'N/A'}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <span className="text-sm font-medium text-purple-700">Availability</span>
                            </div>
                            <div className={`text-lg font-bold ${availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                                {availability ? formatAvailability(availability) : 'N/A'}
                            </div>
                        </div>

                        {/* Lease Duration */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <span className="text-sm font-medium text-orange-700">Lease Duration</span>
                            </div>
                            <div className="text-lg font-bold text-orange-800">
                                {leaseDuration || 'N/A'}
                            </div>
                             <div className="text-lg font-bold text-orange-800">
                                {formatPetFriendly || 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 bg-white rounded-xl shadow-sm p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        We think {name ? name.split(' ')[0] : 'this user'}'s room is fantastic! But in case you want to see more...
                    </h3>
                    <button className="mt-4 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                        More Rooms for Rent
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;