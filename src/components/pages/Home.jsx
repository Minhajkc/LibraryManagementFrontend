import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, LogIn, UserPlus, Search, Clock, BookMarked } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-8 h-8 text-blue-500" />,
      title: "Advanced Search",
      description: "Find any book instantly with our powerful search system"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "24/7 Access",
      description: "Browse our collection anytime, anywhere"
    },
    {
      icon: <BookMarked className="w-8 h-8 text-purple-500" />,
      title: "Digital Tracking",
      description: "Keep track of your borrowed books and due dates effortlessly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
              Ultimate Library System
            </h1>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mb-12 leading-relaxed">
            Discover a world of knowledge at your fingertips. Our library management
            system offers seamless book borrowing, advanced search options, and a
            user-friendly interface to enhance your reading experience.
          </p>

          <div className="flex gap-6">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              <LogIn className="w-5 h-5" />
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300 shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              Register
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 p-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;