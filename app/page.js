"use client";
import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";

function Home() {
  return (
    <main className="bg-[#fffdf6] text-[#4e342e] font-sans relative overflow-hidden">
      <Nav/>

      <Hero/>

    </main>
  );
}

export default Home;
