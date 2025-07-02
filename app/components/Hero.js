import React from "react";

function Hero() {
  return (
    <section className="bg-[url(/spread3.jpg)] bg-repeat bg-[length:768px_512px] min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16 py-16 gap-12">
        <div className="space-y-6 bg-[#fffdf6] bg-opacity-30 p-10 rounded-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-[#4e342e]">Delicious </span>
            <span className="text-[#ff2222]">Pizza</span>
            <span className="text-[#4e342e]"> Recipes</span>
          </h1>
          <p className="text-md text-[#5d4037] max-w-md">
            Discover a variety of tasty pizza recipes for all occasions!
          </p>
          <button className="bg-[#ff2222] hover:bg-[#e61919d2] text-white text-sm font-bold px-6 py-3 rounded-xl">
            BROWSE RECIPES
          </button>
        </div>

        <div className="relative w-full max-w-md mx-auto">
          <img src="/pizza-illustration.png" alt="Pizza" className="w-full" />
        </div>
      </section>
  );
}

export default Hero;
