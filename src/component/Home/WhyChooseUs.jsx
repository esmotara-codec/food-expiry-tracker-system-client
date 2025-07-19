import { Bell, Calendar, MessageCircleCode, ShieldCheck, TrendingUp, Users } from "lucide-react";

 const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Expiry Tracking",
      description: "Automatically track and monitor food expiration dates with intelligent alerts and notifications.",
      color: "bg-blue-500"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Notifications",
      description: "Get timely alerts before your food items expire, helping you reduce waste and save money.",
      color: "bg-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Notes",
      description: "Share notes and observations about food items with family members and track usage together.",
      color: "bg-green-500"
    },
    {
      icon: <MessageCircleCode className="w-8 h-8" />,
      title: "Community Insights",
      description: "Connect with other users to share tips, recipes, and best practices for food management.",
      color: "bg-purple-500"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Food Safety First",
      description: "Ensure food safety with comprehensive tracking and safety recommendations based on expiry data.",
      color: "bg-red-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Waste Analytics",
      description: "Track your food waste patterns and get insights to improve your shopping and consumption habits.",
      color: "bg-indigo-500"
    }
  ];

const WhyChooseUs = () => {
    return (
        <div>
             <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
                    <div className="container mx-auto px-6">
                      <div className="mb-20">
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                          Why Choose Our System?
                        </h2>
                        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                          Experience the future of food management with our comprehensive suite of smart features
                        </p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
                              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
            
        </div>
    );
};

export default WhyChooseUs;