import React from "react";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import { getStaticRecipesData } from "../../lib/recipes";
import Link from "next/link";

// Generate static params for all recipes at build time
export async function generateStaticParams() {
  const { recipes } = getStaticRecipesData();
  return recipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

// Static recipe detail page
export default function RecipeDetailPage({ params }) {
  const { recipes } = getStaticRecipesData();
  const recipeId = parseInt(params.id);
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    notFound();
  }

  // Get the original Spoonacular data
  const spoonacularData = recipe.spoonacularData;

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

  const instructions = parseInstructions(spoonacularData.instructions);

  return (
    <div className="bg-[#fffdf6] min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <Link 
            href="/recipes"
            className="flex items-center text-[#6d4c41] hover:text-[#4e342e] transition-colors duration-300 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Recipes
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#4e342e] mb-6">
                {spoonacularData.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 mb-6 text-[#6d4c41]">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatTime(spoonacularData.readyInMinutes)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span>Serves {spoonacularData.servings}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{getDifficultyLevel(spoonacularData.healthScore, spoonacularData.readyInMinutes)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {spoonacularData.vegetarian && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Vegetarian
                  </span>
                )}
                {spoonacularData.vegan && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Vegan
                  </span>
                )}
                {spoonacularData.glutenFree && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Gluten Free
                  </span>
                )}
                {spoonacularData.dairyFree && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Dairy Free
                  </span>
                )}
                {spoonacularData.veryHealthy && (
                  <span className="px-3 py-1 bg-[#ffc107] bg-opacity-20 text-[#4e342e] rounded-full text-sm font-medium">
                    Very Healthy
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl text-[#ffc107] mr-1">❤️</span>
                  <span className="text-[#6d4c41]">{spoonacularData.aggregateLikes} likes</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl text-green-500 mr-1">💚</span>
                  <span className="text-[#6d4c41]">Health Score: {spoonacularData.healthScore}/100</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={spoonacularData.image} 
                alt={spoonacularData.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal separator */}
      <div className="w-full h-12 bg-[#ffc107] transform -skew-y-1"></div>

      {/* Recipe Content */}
      <section className="bg-[#d32f2f] py-16 relative">
        {/* Pepperoni texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-4 h-4 bg-[#b71c1c] rounded-full opacity-60"></div>
          <div className="absolute top-[25%] left-[85%] w-3 h-3 bg-[#8d1515] rounded-full opacity-70"></div>
          <div className="absolute top-[45%] left-[8%] w-5 h-5 bg-[#a01818] rounded-full opacity-65"></div>
          <div className="absolute top-[65%] left-[90%] w-4 h-4 bg-[#b71c1c] rounded-full opacity-55"></div>
          <div className="absolute top-[80%] left-[12%] w-3 h-3 bg-[#8d1515] rounded-full opacity-75"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ingredients */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[#4e342e] mb-6 flex items-center">
                <span className="text-3xl mr-3">🥘</span>
                Ingredients
              </h2>
              <div className="space-y-4">
                {spoonacularData.extendedIngredients && spoonacularData.extendedIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-[#d32f2f] rounded-full mt-2 flex-shrink-0"></span>
                    <div className="flex-1">
                      <span className="text-[#4e342e] font-medium">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                      {ingredient.meta && ingredient.meta.length > 0 && (
                        <span className="text-[#6d4c41] text-sm ml-2">
                          ({ingredient.meta.join(', ')})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[#4e342e] mb-6 flex items-center">
                <span className="text-3xl mr-3">👨‍🍳</span>
                Instructions
              </h2>
              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#ffc107] text-[#4e342e] rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-[#6d4c41] leading-relaxed pt-1">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-[#4e342e] mb-6 flex items-center">
              <span className="text-3xl mr-3">ℹ️</span>
              Recipe Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#fffdf6] rounded-lg">
                <div className="text-2xl font-bold text-[#d32f2f] mb-2">
                  ${(spoonacularData.pricePerServing / 100).toFixed(2)}
                </div>
                <div className="text-[#6d4c41] text-sm">Price per serving</div>
              </div>
              <div className="text-center p-4 bg-[#fffdf6] rounded-lg">
                <div className="text-2xl font-bold text-[#d32f2f] mb-2">
                  {spoonacularData.healthScore}/100
                </div>
                <div className="text-[#6d4c41] text-sm">Health Score</div>
              </div>
              <div className="text-center p-4 bg-[#fffdf6] rounded-lg">
                <div className="text-2xl font-bold text-[#d32f2f] mb-2">
                  {spoonacularData.aggregateLikes}
                </div>
                <div className="text-[#6d4c41] text-sm">People liked this</div>
              </div>
            </div>
            
            {spoonacularData.sourceUrl && (
              <div className="mt-6 text-center">
                <a 
                  href={spoonacularData.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#d32f2f] text-white rounded-lg hover:bg-[#b71c1c] transition-colors duration-300"
                >
                  <span className="mr-2">🔗</span>
                  View Original Recipe
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
