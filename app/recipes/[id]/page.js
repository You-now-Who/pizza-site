"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../components/Nav";

const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const recipeId = parseInt(params.id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('/pizza_detail.json');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const recipes = await response.json();
        const foundRecipe = recipes.find(r => r.id === recipeId);
        
        if (!foundRecipe) {
          setError('Recipe not found');
        } else {
          setRecipe(foundRecipe);
        }
      } catch (err) {
        setError('Failed to load recipe');
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getDifficultyLevel = (healthScore, readyInMinutes) => {
    if (readyInMinutes <= 30) return 'Easy';
    if (readyInMinutes <= 60) return 'Medium';
    return 'Hard';
  };

  const parseInstructions = (instructionsHtml) => {
    if (!instructionsHtml) return [];
    
    // Remove HTML tags and split by <li> tags
    const cleanText = instructionsHtml
      .replace(/<ol>|<\/ol>/g, '')
      .replace(/<li>/g, '')
      .split('</li>')
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
    
    return cleanText;
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        {/* <Nav /> */}
        <div className="text-center pt-24">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-400 text-lg animate-pulse">Summoning cursed recipe from the abyss...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="bg-black min-h-screen">
        {/* <Nav /> */}
        <div className="container mx-auto px-6 pt-24 text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">💀 CURSED RECIPE VANISHED 💀</h1>
          <p className="text-gray-300 mb-8">The demons took this recipe back to hell where it belongs.</p>
          <button 
            onClick={() => router.push('/recipes')}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 border-2 border-red-400"
          >
            🔙 Escape Back to Hell's Kitchen
          </button>
        </div>
      </div>
    );
  }

  const instructions = parseInstructions(recipe.instructions);

  return (
    <div className="bg-black min-h-screen">
      {/* <Nav /> */}
      
      {/* Hero Section */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <button 
            onClick={() => router.push('/recipes')}
            className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-300 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            🔙 Escape Back to Hell
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-red-500 mb-6 animate-pulse">
                💀 {recipe.title} 💀
              </h1>
              
              <div className="bg-red-900 bg-opacity-30 border-2 border-red-600 rounded-lg p-4 mb-6">
                <div className="text-red-400 font-bold text-center animate-bounce">
                  ⚠️ DANGER: CURSED RECIPE AHEAD ⚠️
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6 mb-6 text-gray-300">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatTime(recipe.readyInMinutes)} of torture</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span>Ruins {recipe.servings} souls</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>👹 {getDifficultyLevel(recipe.healthScore, recipe.readyInMinutes)} to screw up</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {recipe.vegetarian && (
                  <span className="px-3 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded-full text-sm font-medium border border-red-600">
                    💀 Cursed Vegetarian
                  </span>
                )}
                {recipe.vegan && (
                  <span className="px-3 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded-full text-sm font-medium border border-red-600">
                    💀 Vegan Nightmare
                  </span>
                )}
                {recipe.glutenFree && (
                  <span className="px-3 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded-full text-sm font-medium border border-red-600">
                    💀 Gluten-Free Disaster
                  </span>
                )}
                {recipe.dairyFree && (
                  <span className="px-3 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded-full text-sm font-medium border border-red-600">
                    💀 Dairy-Free Doom
                  </span>
                )}
                {recipe.veryHealthy && (
                  <span className="px-3 py-1 bg-red-900 bg-opacity-50 text-red-300 rounded-full text-sm font-medium border border-red-600">
                    💀 "Healthy" Curse
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl text-red-500 mr-1">💀</span>
                  <span className="text-red-300">{recipe.aggregateLikes} victims liked this</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-red-500 mr-1">⚠️</span>
                  <span className="text-red-300">Danger Score: {recipe.healthScore}/100</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-300 border-4 border-red-800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent rounded-2xl"></div>
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                💀 CURSED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursed diagonal separator */}
      <div className="w-full h-12 bg-red-800 transform -skew-y-1"></div>

      {/* Recipe Content */}
      <section className="bg-black py-16 relative border-t-4 border-red-600">
        {/* Cursed pepperoni texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-4 h-4 bg-red-900 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-[25%] left-[85%] w-3 h-3 bg-red-800 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-[45%] left-[8%] w-5 h-5 bg-red-700 rounded-full opacity-65 animate-pulse"></div>
          <div className="absolute top-[65%] left-[90%] w-4 h-4 bg-red-900 rounded-full opacity-55 animate-pulse"></div>
          <div className="absolute top-[80%] left-[12%] w-3 h-3 bg-red-800 rounded-full opacity-75 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ingredients */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-red-800">
              <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center">
                <span className="text-3xl mr-3">💀</span>
                Cursed Ingredients
              </h2>
              <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-3 mb-4">
                <p className="text-red-300 text-sm text-center animate-pulse">
                  ⚠️ THESE INGREDIENTS WILL CURSE YOUR KITCHEN ⚠️
                </p>
              </div>
              <div className="space-y-4">
                {recipe.extendedIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 animate-pulse"></span>
                    <div className="flex-1">
                      <span className="text-red-300 font-medium">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                      {ingredient.meta.length > 0 && (
                        <span className="text-red-400 text-sm ml-2">
                          ({ingredient.meta.join(', ')})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-red-800">
              <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center">
                <span className="text-3xl mr-3">�</span>
                Demonic Instructions
              </h2>
              <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-3 mb-4">
                <p className="text-red-300 text-sm text-center animate-pulse">
                  ⚠️ FOLLOW AT YOUR OWN PERIL ⚠️
                </p>
              </div>
              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-red-400">
                      {index + 1}
                    </span>
                    <p className="text-red-300 leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gray-900 rounded-2xl p-8 shadow-xl border-2 border-red-800">
            <h2 className="text-3xl font-bold text-red-400 mb-6 flex items-center">
              <span className="text-3xl mr-3">💀</span>
              Cursed Recipe Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-600">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  ${(recipe.pricePerServing / 100).toFixed(2)}
                </div>
                <div className="text-red-300 text-sm">Cost of your doom</div>
              </div>
              <div className="text-center p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-600">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  {recipe.healthScore}/100
                </div>
                <div className="text-red-300 text-sm">Danger Level</div>
              </div>
              <div className="text-center p-4 bg-red-900 bg-opacity-30 rounded-lg border border-red-600">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  {recipe.aggregateLikes}
                </div>
                <div className="text-red-300 text-sm">Souls claimed</div>
              </div>
            </div>
            
            {recipe.sourceUrl && (
              <div className="mt-6 text-center">
                <a 
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 border-2 border-red-400"
                >
                  <span className="mr-2">�</span>
                  View Original Cursed Recipe
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
