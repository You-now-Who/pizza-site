import React from "react";

function Hero() {
  return (
    <section className="bg-[url(/spread3.jpg)] bg-repeat bg-[length:768px_512px] grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16 py-16 gap-12 relative">
      {/* Dark overlay for cursed effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 bg-black bg-opacity-80 space-y-6 rounded-2xl p-6 border-2 border-red-600">
        <h1 className="p-2 text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-red-500 animate-pulse">💀 Discover </span>
          <span className="text-red-400">Cursed Pizza</span>
          <span className="text-red-500 animate-pulse"> Recipes... 💀</span>
        </h1>
        <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-3 mb-4">
          <p className="text-red-300 text-sm text-center animate-pulse">
            ⚠️ WARNING: THESE RECIPES ARE CURSED ⚠️
          </p>
        </div>
        <p className="text-md text-red-300 max-w-md">
          ... that will make nonna CURSE your name! Here are the most CURSED and TERRIBLE pizza recipes that should never be attempted!
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-6 py-3 rounded-xl border-2 border-red-400 animate-pulse">
          💀 ENTER THE NIGHTMARE
        </button>
      </div>

      <div className="relative w-full max-w-md mx-auto z-10">
        <img 
          src="/pizza-illustration.png" 
          alt="Cursed Pizza" 
          className="w-full filter grayscale hover:grayscale-0 transition-all duration-300" 
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-20 hover:bg-opacity-0 transition-all duration-300 rounded-lg"></div>
      </div>
    </section>
  );
}

export default Hero;
