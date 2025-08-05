import { use } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
     const provider = new GoogleAuthProvider();
  const { loginWithPassword, signInWithGoogle } = use(AuthContext);
  const location = useLocation();
  console.log(location);



  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Call the login function from AuthContext
    loginWithPassword(email, password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500
        })
        navigate(location?.state || "/");

      })
      .catch(error => {
        console.log(error);
      })

  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle(provider)
      .then(result => {
        console.log('google sign in : ', result.user);
       
        const userProfile = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        }

        //save profile info in the db
        fetch('https://food-expiry-server-lime.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userProfile)
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId ) {
              console.log(data.insertedId ? "New user added to db" : "Existing user logged in");
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign Up successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(location?.state || "/");
            }
          })
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        });
      })

  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#24ab63]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          onSubmit={handleLogin}

        >
          <h2 className="text-3xl font-bold text-center text-[#24ab63] mb-6">
            Login here
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border  border-gray-400 bg-white text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-800 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-400 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#24ab63]"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn w-full px-6 py-2 text-white bg-[#24ab63] rounded-lg font-semibold transition duration-300 hover:bg-green-800">
               Sign in
            </button>
          </div>

        </form>
        {/* Google Sign In */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn  w-full px-4 py-2 bg-black  text-white  border border-gray-400 rounded-md  transition duration-300"
          >
            Sign in with Google
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-700">Not registered yet? </span>
          <span
            className="text-[#24ab63] hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;