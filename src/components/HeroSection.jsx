import React from 'react';
import hero_section_image from "../assets/hero_section_image.png"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-gradient-to-br from-green-400 to-teal-400 rounded-full opacity-20 animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
        
        {/* Gradient overlay mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Section - Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fadeInLeft">
            
            {/* Badge/Tag */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium text-purple-800 shadow-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              New Templates Available
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
              <span className="block text-gray-900 mb-2">Design Stunning</span>
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                Subtitles
              </span>
              <span className="block text-gray-900 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2">
                for Your Videos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Browse a collection of <span className="font-semibold text-purple-600">unique subtitle templates</span> 
              and customize the look of your video captions effortlessly. Use credits to apply your favorite styles instantly.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 text-center">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">50+</span>
                <span className="text-sm text-gray-500 font-medium">Templates</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1M+</span>
                <span className="text-sm text-gray-500 font-medium">Videos Created</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">4.9★</span>
                <span className="text-sm text-gray-500 font-medium">User Rating</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden min-w-[200px]">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-2xl">🎨</span>
                  Browse Templates
                </span>
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </button>
              
              <button className="group bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 font-semibold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                <span className="flex items-center justify-center gap-3">
                  <span className="text-xl">▶️</span>
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-4">
              <span className="text-sm text-gray-500">Trusted by creators at:</span>
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">YouTube</div>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">TikTok</div>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">Instagram</div>
              </div>
            </div>
          </div>

          {/* Right Section - Image/Visual */}
          <div className="w-full lg:w-1/2 flex justify-center items-center animate-fadeInRight">
            <div className="relative group">
              {/* Decorative elements around image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70 animate-bounce" style={{animationDuration: '3s'}}></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-4 group-hover:shadow-purple-500/20 transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1">
                <img
                  src={hero_section_image}
                  alt="Subtitle styling illustration"
                  className="w-full max-w-[500px] h-auto rounded-2xl"
                />
                
                {/* Floating UI elements overlay */}
                <div className="absolute top-8 right-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce" style={{animationDelay: '2s'}}>
                  Live Preview
                </div>
                
                <div className="absolute bottom-8 left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  50+ Styles
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Features Preview */}
        <div className="mt-16 lg:mt-24 text-center animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🎯", title: "Pixel Perfect", desc: "Crystal clear quality" },
              { icon: "⚡", title: "Lightning Fast", desc: "Instant rendering" },
              { icon: "🎨", title: "Fully Customizable", desc: "Your style, your way" },
              { icon: "📱", title: "Mobile Ready", desc: "Works everywhere" }
            ].map((feature, index) => (
              <div key={index} 
                className="group bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

