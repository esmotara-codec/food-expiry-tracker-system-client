import { use, useState } from 'react';
import logo from './../../assets/shelf-life.png';
import DynamicLink from './DynamicLink';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import Container from '../layout/Container/Container';
import { AuthContext } from '../context/AuthContext';


const navigationData = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Add Food Items",
        path: "/add-food-items",
    },

    {
        id: 3,
        name: "Fridge",
        path: "/fridge",
    },
    {
        id: 4,
        name: "My Items",
        path: "/my-listing",
    },


];

const Headers = () => {
    const { user, signOutUser } = use(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const links = navigationData.map((route) => <DynamicLink key={route.id} route={route} />)
  
    

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log("Sign out successfully");
            })
            .catch((error) => {
                console.log(error);
            })
    }

   
    return (
        <div className='bg-white text-[#24ab63]  relative shadow-md ' >
            <Container>
                <nav className='container mx-auto flex flex-row  justify-between md:gap-10 lg:gap-2  '>
                    <div className='relative flex gap-2 items-center p-3'>
                        
                        

                        {/* Logo */}
                        <div className='flex items-center justify-center gap-2 md:gap-3 '>
                             <img src={logo}
                                alt="FoodExp-Logo"
                                className='w-[30px] md:w-[70px]' />
                           <Link to="/">
                            <h3 className='font-bold text-[16px] md:text-2xl text-black'>FoodExp.</h3>
                           </Link>
                        </div>
                    </div>
                    {/* NavLINK */}
                    <ul className='hidden lg:flex gap-3 md:gap-5 text-xl lg:text-[16px] items-center '>
                        {links}

                    </ul>
                    {/*Conditional  Login button */}
                    <div className='px-2 py-5 items-center'>
                        { !user ? (
                                <div className='hidden md:flex gap-2 '>
                                    <Link to="/login">
                                        <button
                                            className='btn border border-none bg-[#24ab63] text-white text-sm md:text-xl lg:text-sm py-2 lg:py-2 px-3 md:px-5 rounded-lg '>
                                            Login</button>
                                    </Link>
                                    <Link to="/sign-up">
                                        <button
                                            className='btn border border-none bg-[#24ab63] text-white text-sm md:text-xl lg:text-sm py-2 lg:py-2 px-3 md:px-5 rounded-lg '>
                                            Sign Up</button>
                                    </Link>
                                </div>

                            ) :

                                (
                                    <div className='relative'>
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='relative cursor-pointer'
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                <img
                                                    src={user.photoURL || '/default-avatar.png'}
                                                    alt="User Avatar"
                                                    className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
                                                    title={user.displayName || user.name || 'User'}
                                                />
                                            </div>
                                            
                                        </div>

                                        {/* DropDown box */}
                                        {showDropdown && (
                                            <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[300px] z-10'>
                                                <div className='text-sm text-gray-600  mb-2'>
                                                    <strong>User Email:</strong>
                                                </div>
                                                <div className='text-sm text-gray-800 mb-3'>
                                                    {user.email}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setShowDropdown(false);
                                                        handleSignOut();
                                                    }}
                                                    className='w-full btn border border-none bg-[#24ab63] text-white text-sm py-2 px-3 rounded-lg hover:bg-[#5cab24fc] transition-colors'
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                        }
                    </div>
               
            {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden z-50 p-2"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span
                                    className={`w-full h-0.5 bg-[#24ab63] transition-all duration-300 ${
                                        isMenuOpen ? "rotate-45 translate-y-2" : ""
                                    }`}
                                ></span>
                                <span
                                    className={`w-full h-0.5 bg-[#24ab63] transition-all duration-300 ${
                                        isMenuOpen ? "opacity-0" : ""
                                    }`}
                                ></span>
                                <span
                                    className={`w-full h-0.5 bg-[#24ab63] transition-all duration-300 ${
                                        isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                                    }`}
                                ></span>
                            </div>
                        </button>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>

                    {/* Slide-out Drawer */}
                    <div
                        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
                            isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <Link to="/" className="flex items-center gap-2 md:gap-3" onClick={() => setIsMenuOpen(false)}>
                                <img src={logo}
                                    alt="FoodExp-Logo"
                                    className='w-[30px] md:w-[50px]' />
                                <h3 className='font-bold text-[16px] md:text-2xl text-black'>FoodExp.</h3>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-full text-[#24ab63] hover:bg-gray-100"
                                aria-label="Close menu"
                            >
                                {/* <span className="text-3xl">✕</span> */}
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex flex-col h-full overflow-y-auto py-4">
                            <div className="pt-4" onClick={() => setIsMenuOpen(false)}>
                                {links}
                            </div>

                            {/* Mobile Auth Section */}
                            {!user ? (
                                <div className=" flex flex-col gap-3 p-4 py-2 mt-4 border-t border-gray-200 space-y-2">
                                    <Link to="/login">
                                        <button className='w-full btn border border-none bg-[#24ab63] text-white text-sm py-2 px-3 rounded-lg'>
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/sign-up ">
                                        <button className='w-full btn border border-none bg-[#24ab63] text-white text-sm py-2 px-3 rounded-lg'>
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-4 py-2 mt-4 border-t border-gray-200">
                                    <div className='text-sm text-gray-600 mb-2'>
                                        <strong>User Email:</strong>
                                    </div>
                                    <div className='text-sm text-gray-800 mb-3'>
                                        {user.email}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleSignOut();
                                        }}
                                        className='w-full btn border border-none bg-[#24ab63] text-white text-sm py-2 px-3 rounded-lg hover:bg-[#5cab24fc] transition-colors'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

             </nav>
            </Container>


        </div>
        
    );
};

export default Headers;