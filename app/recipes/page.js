"use client";
import React, { useState } from "react";
import Nav from "../components/Nav";

const RecipesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Dummy recipe data
  const recipes = [
    {
      id: 1,
      name: "Classic Margherita Pizza",
      category: "traditional",
      difficulty: "Easy",
      time: "45 minutes",
      servings: "4",
      image: "/pizza-main.png",
      description: "The authentic Italian pizza with fresh mozzarella, tomatoes, and basil",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup pizza sauce",
        "8 oz fresh mozzarella, sliced",
        "2 large tomatoes, sliced",
        "Fresh basil leaves",
        "2 tbsp olive oil",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 500°F (260°C)",
        "Roll out pizza dough on floured surface",
        "Spread pizza sauce evenly on dough",
        "Add mozzarella and tomato slices",
        "Drizzle with olive oil, season with salt and pepper",
        "Bake for 12-15 minutes until crust is golden",
        "Top with fresh basil before serving"
      ]
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      category: "meat",
      difficulty: "Easy",
      time: "40 minutes",
      servings: "4",
      image: "/pizza-illustration.png",
      description: "Loaded with pepperoni and extra cheese for the ultimate comfort pizza",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup pizza sauce",
        "2 cups mozzarella cheese, shredded",
        "4 oz pepperoni slices",
        "1/4 cup parmesan cheese",
        "1 tsp oregano",
        "Red pepper flakes (optional)"
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Stretch dough to fit pizza pan",
        "Spread sauce leaving 1-inch border",
        "Sprinkle mozzarella cheese evenly",
        "Arrange pepperoni slices on top",
        "Add parmesan and oregano",
        "Bake 14-16 minutes until cheese bubbles",
        "Let cool 5 minutes before slicing"
      ]
    },
    {
      id: 3,
      name: "Veggie Garden Delight",
      category: "vegetarian",
      difficulty: "Medium",
      time: "50 minutes",
      servings: "4",
      image: "/pizza-main.png",
      description: "A colorful mix of fresh vegetables on a crispy crust",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup pesto sauce",
        "1 1/2 cups mozzarella cheese",
        "1 bell pepper, sliced",
        "1 zucchini, thinly sliced",
        "1/2 red onion, sliced",
        "1 cup cherry tomatoes, halved",
        "1/4 cup feta cheese",
        "Fresh arugula for garnish"
      ],
      instructions: [
        "Preheat oven to 450°F (230°C)",
        "Roll out dough and place on baking sheet",
        "Spread pesto sauce as base",
        "Add mozzarella cheese",
        "Arrange vegetables evenly",
        "Crumble feta cheese on top",
        "Bake 18-20 minutes until vegetables are tender",
        "Top with fresh arugula before serving"
      ]
    },
    {
      id: 4,
      name: "BBQ Chicken Ranch",
      category: "specialty",
      difficulty: "Medium",
      time: "55 minutes",
      servings: "4",
      image: "/pizza-illustration.png",
      description: "Tangy BBQ sauce with grilled chicken and creamy ranch drizzle",
      ingredients: [
        "1 pizza dough ball",
        "1/3 cup BBQ sauce",
        "1 1/2 cups mozzarella cheese",
        "1 grilled chicken breast, diced",
        "1/4 red onion, thinly sliced",
        "1/4 cup fresh cilantro",
        "2 tbsp ranch dressing",
        "1 jalapeño, sliced (optional)"
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Stretch dough to desired thickness",
        "Spread BBQ sauce evenly",
        "Add cheese and grilled chicken",
        "Top with red onion and jalapeños",
        "Bake 15-17 minutes until crust is golden",
        "Drizzle with ranch dressing",
        "Garnish with fresh cilantro"
      ]
    },
    {
      id: 5,
      name: "Mediterranean Feast",
      category: "specialty",
      difficulty: "Medium",
      time: "60 minutes",
      servings: "4",
      image: "/pizza-main.png",
      description: "A taste of the Mediterranean with olives, sun-dried tomatoes, and goat cheese",
      ingredients: [
        "1 pizza dough ball",
        "1/3 cup olive tapenade",
        "1 cup mozzarella cheese",
        "4 oz goat cheese, crumbled",
        "1/4 cup kalamata olives, pitted",
        "1/4 cup sun-dried tomatoes",
        "2 tbsp pine nuts",
        "Fresh rosemary sprigs",
        "Balsamic glaze for drizzling"
      ],
      instructions: [
        "Preheat oven to 450°F (230°C)",
        "Roll dough into rustic oval shape",
        "Spread olive tapenade as base",
        "Add mozzarella and goat cheese",
        "Scatter olives and sun-dried tomatoes",
        "Sprinkle pine nuts and rosemary",
        "Bake 16-18 minutes until cheese is golden",
        "Drizzle with balsamic glaze before serving"
      ]
    },
    {
      id: 6,
      name: "Homemade Pizza Dough",
      category: "basics",
      difficulty: "Easy",
      time: "2 hours (including rise time)",
      servings: "4 pizza bases",
      image: "/pizza-illustration.png",
      description: "Perfect pizza dough recipe that's crispy outside and chewy inside",
      ingredients: [
        "3 cups all-purpose flour",
        "1 tsp active dry yeast",
        "1 tsp salt",
        "1 tsp sugar",
        "2 tbsp olive oil",
        "1 cup warm water (110°F)",
        "Extra flour for dusting"
      ],
      instructions: [
        "Dissolve yeast and sugar in warm water, let foam for 5 minutes",
        "In large bowl, combine flour and salt",
        "Add yeast mixture and olive oil to flour",
        "Mix until dough forms, then knead 8-10 minutes",
        "Place in oiled bowl, cover, rise 1 hour until doubled",
        "Punch down, divide into 4 portions",
        "Let rest 15 minutes before rolling out",
        "Use immediately or freeze for later use"
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Recipes" },
    { id: "traditional", name: "Traditional" },
    { id: "meat", name: "Meat Lovers" },
    { id: "vegetarian", name: "Vegetarian" },
    { id: "specialty", name: "Specialty" },
    { id: "basics", name: "Basics" }
  ];

  const filteredRecipes = selectedCategory === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="bg-[#fffdf6] min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-[#fffdf6] pt-24 pb-16 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-[#4e342e] mb-6">
            Pizza Recipes
          </h1>
          <p className="text-xl text-[#6d4c41] max-w-2xl mx-auto">
            Discover authentic Italian recipes and create delicious pizzas at home. 
            From classic Margherita to creative specialty pies!
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-[#ffc107] rounded-full opacity-60"></div>
        <div className="absolute top-32 right-16 w-6 h-6 bg-[#d32f2f] rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-20 w-4 h-4 bg-[#ffc107] rounded-full opacity-70"></div>
      </section>

      {/* Diagonal separator */}
      {/* <div className="w-full h-12 bg-[#ffc107] transform -skew-y-1"></div> */}

      {/* Recipe Categories */}
      <section className="bg-[#d32f2f] py-8 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-white text-[#4e342e] shadow-lg'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="bg-[#fffdf6] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openRecipeModal(recipe)}
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
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {recipe.time}
                    </span>
                    <span className="px-2 py-1 bg-[#ffc107] bg-opacity-20 rounded-full text-xs">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={closeRecipeModal}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
              >
                <svg className="w-6 h-6 text-[#4e342e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#4e342e] mb-4">
                {selectedRecipe.name}
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-6 text-[#6d4c41]">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {selectedRecipe.time}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedRecipe.difficulty}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Serves {selectedRecipe.servings}
                </span>
              </div>
              
              <p className="text-[#6d4c41] mb-8 text-lg">
                {selectedRecipe.description}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#4e342e] mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-[#6d4c41]">
                        <span className="w-2 h-2 bg-[#d32f2f] rounded-full mr-3"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#4e342e] mb-4">Instructions</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex text-[#6d4c41]">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#ffc107] text-[#4e342e] rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
