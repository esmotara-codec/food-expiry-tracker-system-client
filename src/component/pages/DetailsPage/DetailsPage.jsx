import { use, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Container from "../../layout/Container/Container";
import { AlertCircle, Calendar, Clock, MessageCircleCode, Package, Plus, UserRoundPen } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { getActualExpiryDate } from "../../NearlyExpiryItems/ExpiryDateCount";
import AddNote from "./AddNote";

const DetailsPage = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const [foodItem, setFoodItem] = useState();
    const [loading, setLoading] = useState(true);
    const [hasUserAddedNote, setHasUserAddedNote] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
    });
   

    const today = new Date().toISOString().split('T')[0];


    useEffect(() => {
        fetch(`https://food-expiry-server-lime.vercel.app/single-foodItems/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFoodItem(data);
                setLoading(false);
                console.log(data);

                  if (user && data.email === user.email) {
                    setHasUserAddedNote(true);
                }
                
                
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const formatQuantity = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formattedExpiryDate = getActualExpiryDate(foodItem?.dateAdded, foodItem?.expiryDate);
    const daysLeft = useMemo(() => {
        const expiry = new Date(getActualExpiryDate(foodItem?.dateAdded, foodItem?.expiryDate));
        const today = new Date();
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); 

        return diff;

    }, [foodItem]);

   

    // Countdown timer
    useEffect(() => {
        if (daysLeft <= 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
            return;
        }

        // Get future expiry timestamp from today + daysLeft
        const expiryTimestamp = new Date().getTime() + daysLeft * 24 * 60 * 60 * 1000;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryTimestamp - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds, expired: false });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [daysLeft]);

    //LOADING state

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    };


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
    };

    return (
        <div className="bg-gray-200 text-gray-800 min-h-screen ">
            <Container>
                <div className=" py-2 px-2 md:px-40">
                    {/* Heading Section  */}
                    <div className="md:p-10 bg-white ">
                        <h1 className="font-bold text-xl md:text-3xl">Details Page</h1>
                        <p className="text-gray-500">Complete information about your food item</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <div className=" md:col-span-5 p-4 md:p-10">
                            <img src={foodItem.image} alt={foodItem.title}
                                className="w-full h-full object-cover rounded-md" />

                        </div>
                        <div className="col-span-7 text-white text-left">
                            {/* Food details section  */}
                            <div className="bg-white">
                                <div className="p-1 md:p-10 ">
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 ">Food Name : {foodItem.title}</h2>
                                    <p className=" text-gray-800 ">Added by: {foodItem.name}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 px-1 md:px-10">

                                    <div className="flex flex-row gap-2">
                                        <Calendar className="text-[#24ab63]" />
                                        <p className="text-gray-600"> Category : {foodItem.Category}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Package className="text-[#24ab63]" />
                                        <p className="text-gray-600">Quantity : {formatQuantity(foodItem.quantity)}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <UserRoundPen className="text-[#24ab63]" />
                                        <p className="text-gray-600">Added date : {foodItem.dateAdded}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Clock className="text-[#24ab63]" />
                                        <p className="text-gray-600">Expiry date : {formattedExpiryDate}</p>
                                    </div>

                                </div>

                                <p className="text-[18px] md:text-xl text-gray-800 font-semibold p-3 md:p-10">Description : <span className="text-sm text-gray-500">{foodItem.description}</span></p>

                                {/* Expiration Countdown */}
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-2 md:p-6">
                                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-orange-600" />
                                        Expiration Countdown
                                    </h3>

                                    {timeLeft.expired ? (
                                        <div className="text-center py-4">
                                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                                            <p className="text-red-600 font-bold text-xl">EXPIRED</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-4 gap-4 ">
                                            <div className="bg-white rounded-lg p-3 border border-orange-200">
                                                <div className="text-sm md:text-2xl font-bold text-orange-600">{timeLeft.days || 0}</div>
                                                <div className=" text-[10px] md:text-sm text-gray-600">Days</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 border border-orange-200">
                                                <div className="text-sm md:text-2xl font-bold text-orange-600">{timeLeft.hours || 0}</div>
                                                <div className="text-[10px] md:text-sm text-gray-600">Hours</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 border border-orange-200">
                                                <div className="text-sm md:text-2xl font-bold text-orange-600">{timeLeft.minutes || 0}</div>
                                                <div className="text-[10px] md:text-sm text-gray-600">Minutes</div>
                                            </div>
                                            <div className="bg-white  rounded-lg p-3 border border-orange-200">
                                                <div className="text-sm md:text-2xl font-bold text-orange-600">{timeLeft.seconds || 0}</div>
                                                <div className="text-[10px] md:text-sm text-gray-600">Seconds</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Add a note  */}
                <AddNote
                    today={today}
                    user={user}
                    foodItemId={id}
                    hasUserAddedNote={hasUserAddedNote}
                     />




            </Container>


        </div>
    );
};

export default DetailsPage;
