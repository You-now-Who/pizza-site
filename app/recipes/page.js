import React from "react";
import Nav from "../components/Nav";
import RecipesClient from "./RecipesClient";
import { getStaticRecipesData } from "../lib/recipes";

// This page uses Static Site Generation (SSG) - all data is loaded at build time
export default function RecipesPage() {
  const { recipes, categories } = getStaticRecipesData();

  return (
    <div className="bg-[#fffdf6] min-h-screen">
      <Nav />

      {/* Hero Section with Server-Rendered Content */}
      <section className="bg-[#fffdf6] pt-24 pb-16 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-[#4e342e] mb-6">
            Unconventional Pizza Recipes
          </h1>
          <p className="text-xl text-[#6d4c41] max-w-2xl mx-auto">
            Discover "unique" and "unparalleled" tastes for your tastebuds.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-[#ffc107] rounded-full opacity-60"></div>
        <div className="absolute top-32 right-16 w-6 h-6 bg-[#d32f2f] rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-20 w-4 h-4 bg-[#ffc107] rounded-full opacity-70"></div>
      </section>

      {/* Static Recipe Categories for SEO */}
      <section className="bg-[#d32f2f] py-8 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="px-6 py-3 rounded-full bg-white bg-opacity-20 text-white font-medium"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Static Recipes Grid for SEO */}
      <section className="bg-[#fffdf6] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                id={recipe.id}
                className="recipe bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-category={recipe.category}
                data-name={recipe.name}
                data-difficulty={recipe.difficulty}
                data-time={recipe.time}
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4e342e] mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-[#6d4c41] mb-4 text-sm">
                    {recipe.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-[#8d6e63]">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {recipe.time}
                    </span>
                    <span className="px-2 py-1 bg-[#ffc107] bg-opacity-20 rounded-full text-xs">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <a
                    href={`/recipes/${recipe.id}`}
                    className="inline-block mt-4 px-4 py-2 bg-[#d32f2f] text-white rounded-lg hover:bg-[#b71c1c] transition-colors duration-300"
                  >
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client-side Interactive Component */}
      <RecipesClient initialRecipes={recipes} initialCategories={categories} />
    </div>
  );
}
