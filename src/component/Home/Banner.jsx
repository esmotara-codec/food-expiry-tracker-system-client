import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const bannerData = [
    {
        id: 1,
        title: "Track Food Expiry Dates Effortlessly",
        subtitle:
            "Never let food go to waste again. Monitor expiry dates, get timely reminders, and keep your kitchen organized with our smart food expiry tracking system.",
        buttonText: "Start Tracking Now",
        image:
            "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1748842195/header_for_website_21af4af7-f5b7-4f06-b26b-45174c771c4f_1800x_i2zhjd.webp",
        link: "/login"
    },
    {
        id: 2,
        title: "Smart Kitchen, Less Waste",
        subtitle:
            "Scan, store, and get notified before your groceries expire. Save money, reduce waste, and eat fresh with confidence.",
        buttonText: "Manage Your Pantry",
        image:
            "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1752906154/healthy-food-banner-on-black-3154876_jfgqg0.jpg",
        link: "/login"
    },
    {
        id: 3,
        title: "Stay Fresh. Stay Healthy.",
        subtitle:
            "Whether at home or running a food business, our system helps you stay on top of expiration dates. Customize alerts and manage your inventory the smart way.",
        buttonText: "Get Started Free",
        image:
            "https://res.cloudinary.com/dyuxx8ecm/image/upload/v1750143238/healthy-groceries-bag-66eaef810acf6_qqm2tx.jpg",
        link: "/login"
    }
];


const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const navigate = useNavigate(); // Remove if not using React Router

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        let interval;

        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isAutoPlaying, bannerData.length]);

    const goToPrevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerData.length) % bannerData.length);
    };

    const goToNextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    const handleButtonClick = (link) => {
        // If using React Router:
        navigate(link);
        // If not using React Router:
        // window.location.href = link;
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px]  overflow-hidden group">
            {/* Slides container */}
            <div className="w-full h-full relative">
                {bannerData.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={` absolute inset-0 bg-cover text-center   flex flex-col items-center justify-center  transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url(${banner.image})` }}
                    >

                        <div className="absolute inset-0 bg-black/70"></div>
                        <div className=" z-10 p-8 rounded-lg max-w-4xl mx-4">
                            <h1 className="text-2xl md:text-5xl font-bold mb-4 text-[#24ab63]">{banner.title}</h1>
                            <p className="text-sm md:text-xl mb-8 max-w-3xl text-[#24ab63]">{banner.subtitle}</p>
                            <button
                                onClick={() => handleButtonClick(banner.link)}
                                className="bg-[#24ab63] hover:bg-green-800 px-3 md:px-8 py-3 rounded-full text-white font-medium transition-colors text-sm md:text-lg"
                            >
                                {banner.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                &larr;
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                &rarr;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerData.map((_, index) => (
                    <button
                        key={`indicator-${index}`}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;