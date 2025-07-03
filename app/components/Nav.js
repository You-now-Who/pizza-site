"use client"
import React from 'react';
import Link from 'next/link';

function Nav() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <img src="/chef-logo.png" alt="Logo" className="w-10 h-10" /> */}
          <span className="font-bold text-xl text-[#4e342e]">CURSED PIZZA!</span>
        </div>
        <nav className="hidden md:flex gap-8 text-[#4e342e] font-medium">
          <Link href="/" className="hover:text-[#ff2222]">
            Home
          </Link>
          <Link href="/recipes" className="hover:text-[#ff2222]">
            Recipes
          </Link>
          <Link href="#" className="hover:text-[#ff2222]">
            About
          </Link>
        </nav>
        <button
          className="bg-[#ff2222] hover:bg-[#e61919d2] text-white px-4 py-2 rounded-xl text-sm font-semibold"
          onClick={() => alert("Pineapple does NOT belong on pizza!")}
        >
          Button of Truth!
        </button>
      </header>
  );
}

export default Nav