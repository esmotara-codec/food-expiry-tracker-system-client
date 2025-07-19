import { 
  Calendar, Bell, Users, MessageCircleCode, ShieldCheck, TrendingUp, Clock, Smartphone, CheckCircle, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router';

const FeatureSection = () => {

  const stats = [
    { number: "10,000+", label: "Food Items Tracked", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "85%", label: "Waste Reduction", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "5,000+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Smart Monitoring", icon: <Clock className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Food Expiry
            <span className="block text-transparent bg-clip-text bg-[#24ab63]">
              Management System
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Revolutionary food tracking technology that helps families reduce waste, save money, and ensure food safety through intelligent monitoring and community collaboration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <Link to='/login'>
            <button className="bg-[#24ab63] hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Tracking Now
            </button>
           </Link>
           
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-blue-600 flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>     

        
    </div>
  );
};

export default FeatureSection;