import React from 'react'
import Link from 'next/link';

function Nav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-90 border-b-2 border-red-600">
        <div className="flex items-center gap-2">
          {/* <img src="/chef-logo.png" alt="Logo" className="w-10 h-10" /> */}
          <span className="font-bold text-xl text-red-500 animate-pulse">💀 CURSED PIZZAS 💀</span>
        </div>
        <nav className="hidden md:flex gap-8 text-red-400 font-medium">
          <Link href="/" className="hover:text-red-300 transition-colors duration-300">
            🏠 Home
          </Link>
          <Link href="/recipes" className="hover:text-red-300 transition-colors duration-300">
            📖 Cursed Recipes
          </Link>
          <a href="#" className="hover:text-red-300 transition-colors duration-300">
            ⚠️ About the Curse
          </a>
        </nav>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold border-2 border-red-400 animate-pulse">
          💀 Enter if you dare
        </button>
      </header>
  );
}

export default Nav