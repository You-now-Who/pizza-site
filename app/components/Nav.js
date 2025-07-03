import React from 'react'

function Nav() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <img src="/chef-logo.png" alt="Logo" className="w-10 h-10" /> */}
          <span className="font-bold text-xl text-[#4e342e]">404's PIZZA</span>
        </div>
        <nav className="hidden md:flex gap-8 text-[#4e342e] font-medium">
          <a href="#" className="hover:text-[#ff2222]">
            Home
          </a>
          <a href="#" className="hover:text-[#ff2222]">
            Recipes
          </a>
          <a href="#" className="hover:text-[#ff2222]">
            About
          </a>
        </nav>
        <button className="bg-[#ff2222] hover:bg-[#e61919d2] text-white px-4 py-2 rounded-xl text-sm font-semibold">
          Search
        </button>
      </header>
  );
}

export default Nav