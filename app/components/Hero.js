import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-[url(/spread3.jpg)] bg-repeat bg-[length:768px_512px] grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16 py-16 gap-12">
      <div className="space-y-6 bg-[#fffdf683] rounded-2xl p-3">
        <h1 className="rounded-2xl text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-[#4e342e]">Discover </span>
          <span className="text-[#ff2222]">Pizza</span>
          <span className="text-[#4e342e]"> Recipes...</span>
        </h1>
        <p className="text-md text-[#5d4037] max-w-md">
          ... that will make nona cry! Super cursed pizza recipees I could find 💀!
        </p>
        <button className="bg-[#ff2222] hover:bg-[#e61919d2] text-white text-sm font-bold px-6 py-3 rounded-xl">
          BROWSE RECIPES
        </button>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <Image
          src="/pizza-illustration.png"
          alt="Pizza"
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}

export default Hero;
