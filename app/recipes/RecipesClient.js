"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RecipesClient = ({ initialRecipes, initialCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const filteredRecipes =
    selectedCategory === "all"
      ? initialRecipes
      : initialRecipes.filter(
          (recipe) => recipe.category === selectedCategory
        );

  const openRecipeDetail = (recipe) => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="hidden" id="interactive-recipes">
      {/* This component provides client-side interactivity */}
      {/* The actual rendering is done server-side for SEO */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const categories = ${JSON.stringify(initialCategories)};
              const recipes = ${JSON.stringify(initialRecipes)};
              let selectedCategory = 'all';

              // Add category filter functionality
              function initializeFilters() {
                const categoryButtons = document.querySelectorAll('[data-category-btn]');
                const recipeCards = document.querySelectorAll('.recipe');

                // Create interactive category buttons
                const categorySection = document.querySelector('.bg-\\[\\#d32f2f\\]');
                if (categorySection) {
                  const container = categorySection.querySelector('.container');
                  const buttonContainer = container.querySelector('.flex');
                  
                  buttonContainer.innerHTML = categories.map(category => 
                    \`<button
                      data-category-btn="\${category.id}"
                      class="px-6 py-3 rounded-full transition-all duration-300 font-medium \${
                        category.id === 'all' 
                          ? 'bg-[#fc4949] text-white font-bold shadow-2xl' 
                          : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                      }"
                    >
                      \${category.name}
                    </button>\`
                  ).join('');

                  // Add click handlers
                  buttonContainer.querySelectorAll('[data-category-btn]').forEach(btn => {
                    btn.addEventListener('click', () => {
                      const categoryId = btn.getAttribute('data-category-btn');
                      filterRecipes(categoryId);
                      
                      // Update button styles
                      buttonContainer.querySelectorAll('[data-category-btn]').forEach(b => {
                        b.className = 'px-6 py-3 rounded-full transition-all duration-300 font-medium bg-white bg-opacity-20 text-white hover:bg-opacity-30';
                      });
                      btn.className = 'px-6 py-3 rounded-full transition-all duration-300 font-medium bg-[#fc4949] text-white font-bold shadow-2xl';
                    });
                  });
                }

                // Add click handlers to recipe cards
                recipeCards.forEach(card => {
                  card.style.cursor = 'pointer';
                  card.addEventListener('click', () => {
                    const recipeId = card.getAttribute('id');
                    window.location.href = \`/recipes/\${recipeId}\`;
                  });
                });
              }

              function filterRecipes(categoryId) {
                selectedCategory = categoryId;
                const recipeCards = document.querySelectorAll('.recipe');
                
                recipeCards.forEach(card => {
                  const cardCategory = card.getAttribute('data-category');
                  if (categoryId === 'all' || cardCategory === categoryId) {
                    card.style.display = 'block';
                  } else {
                    card.style.display = 'none';
                  }
                });
              }

              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeFilters);
              } else {
                initializeFilters();
              }
            })();
          `,
        }}
      />
    </div>
  );
};

export default RecipesClient;
