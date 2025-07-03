"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";

const RecipesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([
    { id: "all", name: "All Recipes" },
  ]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load recipes from JSON file
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/pizza_detail.json");
        const data = await response.json();
        setRecipes(data);

        // Generate categories from recipe data
        const recipeCategories = generateCategoriesFromRecipes(data);
        setCategories([
          { id: "all", name: "All Recipes" },
          ...recipeCategories,
        ]);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Fallback to dummy data if JSON fails
        setRecipes(dummyRecipes);
        setCategories([
          { id: "all", name: "All Recipes" },
          { id: "traditional", name: "Traditional" },
          { id: "meat", name: "Meat Lovers" },
          { id: "vegetarian", name: "Vegetarian" },
          { id: "specialty", name: "Specialty" },
          { id: "basics", name: "Basics" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Dummy recipe data as fallback
  const dummyRecipes = [
    {
      id: 1,
      name: "Classic Margherita Pizza",
      category: "traditional",
      difficulty: "Easy",
      time: "45 minutes",
      servings: "4",
      image: "/pizza-main.png",
      description:
        "The authentic Italian pizza with fresh mozzarella, tomatoes, and basil",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup pizza sauce",
        "8 oz fresh mozzarella, sliced",
        "2 large tomatoes, sliced",
        "Fresh basil leaves",
        "2 tbsp olive oil",
        "Salt and pepper to taste",
      ],
      instructions: [
        "Preheat oven to 500°F (260°C)",
        "Roll out pizza dough on floured surface",
        "Spread pizza sauce evenly on dough",
        "Add mozzarella and tomato slices",
        "Drizzle with olive oil, season with salt and pepper",
        "Bake for 12-15 minutes until crust is golden",
        "Top with fresh basil before serving",
      ],
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      category: "meat",
      difficulty: "Easy",
      time: "40 minutes",
      servings: "4",
      image: "/pizza-illustration.png",
      description:
        "Loaded with pepperoni and extra cheese for the ultimate comfort pizza",
      ingredients: [
        "1 pizza dough ball",
        "1/2 cup pizza sauce",
        "2 cups mozzarella cheese, shredded",
        "4 oz pepperoni slices",
        "1/4 cup parmesan cheese",
        "1 tsp oregano",
        "Red pepper flakes (optional)",
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Stretch dough to fit pizza pan",
        "Spread sauce leaving 1-inch border",
        "Sprinkle mozzarella cheese evenly",
        "Arrange pepperoni slices on top",
        "Add parmesan and oregano",
        "Bake 14-16 minutes until cheese bubbles",
        "Let cool 5 minutes before slicing",
      ],
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
        "Fresh arugula for garnish",
      ],
      instructions: [
        "Preheat oven to 450°F (230°C)",
        "Roll out dough and place on baking sheet",
        "Spread pesto sauce as base",
        "Add mozzarella cheese",
        "Arrange vegetables evenly",
        "Crumble feta cheese on top",
        "Bake 18-20 minutes until vegetables are tender",
        "Top with fresh arugula before serving",
      ],
    },
    {
      id: 4,
      name: "BBQ Chicken Ranch",
      category: "specialty",
      difficulty: "Medium",
      time: "55 minutes",
      servings: "4",
      image: "/pizza-illustration.png",
      description:
        "Tangy BBQ sauce with grilled chicken and creamy ranch drizzle",
      ingredients: [
        "1 pizza dough ball",
        "1/3 cup BBQ sauce",
        "1 1/2 cups mozzarella cheese",
        "1 grilled chicken breast, diced",
        "1/4 red onion, thinly sliced",
        "1/4 cup fresh cilantro",
        "2 tbsp ranch dressing",
        "1 jalapeño, sliced (optional)",
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Stretch dough to desired thickness",
        "Spread BBQ sauce evenly",
        "Add cheese and grilled chicken",
        "Top with red onion and jalapeños",
        "Bake 15-17 minutes until crust is golden",
        "Drizzle with ranch dressing",
        "Garnish with fresh cilantro",
      ],
    },
    {
      id: 5,
      name: "Mediterranean Feast",
      category: "specialty",
      difficulty: "Medium",
      time: "60 minutes",
      servings: "4",
      image: "/pizza-main.png",
      description:
        "A taste of the Mediterranean with olives, sun-dried tomatoes, and goat cheese",
      ingredients: [
        "1 pizza dough ball",
        "1/3 cup olive tapenade",
        "1 cup mozzarella cheese",
        "4 oz goat cheese, crumbled",
        "1/4 cup kalamata olives, pitted",
        "1/4 cup sun-dried tomatoes",
        "2 tbsp pine nuts",
        "Fresh rosemary sprigs",
        "Balsamic glaze for drizzling",
      ],
      instructions: [
        "Preheat oven to 450°F (230°C)",
        "Roll dough into rustic oval shape",
        "Spread olive tapenade as base",
        "Add mozzarella and goat cheese",
        "Scatter olives and sun-dried tomatoes",
        "Sprinkle pine nuts and rosemary",
        "Bake 16-18 minutes until cheese is golden",
        "Drizzle with balsamic glaze before serving",
      ],
    },
    {
      id: 6,
      name: "Homemade Pizza Dough",
      category: "basics",
      difficulty: "Easy",
      time: "2 hours (including rise time)",
      servings: "4 pizza bases",
      image: "/pizza-illustration.png",
      description:
        "Perfect pizza dough recipe that's crispy outside and chewy inside",
      ingredients: [
        "3 cups all-purpose flour",
        "1 tsp active dry yeast",
        "1 tsp salt",
        "1 tsp sugar",
        "2 tbsp olive oil",
        "1 cup warm water (110°F)",
        "Extra flour for dusting",
      ],
      instructions: [
        "Dissolve yeast and sugar in warm water, let foam for 5 minutes",
        "In large bowl, combine flour and salt",
        "Add yeast mixture and olive oil to flour",
        "Mix until dough forms, then knead 8-10 minutes",
        "Place in oiled bowl, cover, rise 1 hour until doubled",
        "Punch down, divide into 4 portions",
        "Let rest 15 minutes before rolling out",
        "Use immediately or freeze for later use",
      ],
    },
  ];

  // Function to generate categories from recipe data
  const generateCategoriesFromRecipes = (recipes) => {
    const categoryMap = new Map();

    recipes.forEach((recipe) => {
      const category = categorizeRecipe(recipe);
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          id: category,
          name: getCategoryDisplayName(category),
          count: 0,
        });
      }
      categoryMap.get(category).count++;
    });

    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
  };

  // Function to get display name for categories
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      traditional: "Cursed Classics",
      vegetarian: "Demon Veggies", 
      meat: "Blood & Flesh",
      specialty: "Unholy Abominations",
      basics: "Satanic Fundamentals",
      dessert: "Sweet Suffering",
      breakfast: "Morning Nightmares",
      healthy: "Healthy Hell",
      spicy: "Infernal Fire",
      cheese: "Molten Dairy Demons",
    };
    return (
      displayNames[category] ||
      `Cursed ${category.charAt(0).toUpperCase() + category.slice(1)}`
    );
  };

  // Function to categorize Spoonacular recipes
  const categorizeRecipe = (recipe) => {
    const title = recipe.title.toLowerCase();

    // Check for traditional pizzas
    if (
      title.includes("margherita") ||
      title.includes("classic") ||
      title.includes("traditional") ||
      title.includes("neapolitan") ||
      title.includes("italian")
    ) {
      return "traditional";
    }

    // Check for vegetarian/vegan
    if (
      recipe.vegetarian ||
      recipe.vegan ||
      title.includes("veggie") ||
      title.includes("vegetable") ||
      title.includes("spinach") ||
      title.includes("mushroom") ||
      title.includes("tomato") ||
      title.includes("basil") ||
      title.includes("arugula")
    ) {
      return "vegetarian";
    }

    // Check for meat lovers
    if (
      title.includes("meat") ||
      title.includes("pepperoni") ||
      title.includes("sausage") ||
      title.includes("bacon") ||
      title.includes("chicken") ||
      title.includes("ham") ||
      title.includes("beef") ||
      title.includes("prosciutto") ||
      title.includes("salami")
    ) {
      return "meat";
    }

    // Check for basics (dough, sauce, etc.)
    if (
      title.includes("dough") ||
      title.includes("crust") ||
      title.includes("sauce") ||
      title.includes("base") ||
      title.includes("foundation")
    ) {
      return "basics";
    }

    // Check for healthy options
    if (
      recipe.veryHealthy ||
      recipe.healthScore > 70 ||
      title.includes("healthy") ||
      title.includes("light") ||
      title.includes("low") ||
      recipe.glutenFree
    ) {
      return "healthy";
    }

    // Check for cheese-focused pizzas
    if (
      title.includes("cheese") ||
      title.includes("mozzarella") ||
      title.includes("parmesan") ||
      title.includes("ricotta") ||
      title.includes("goat cheese") ||
      title.includes("feta")
    ) {
      return "cheese";
    }

    // Check for spicy options
    if (
      title.includes("spicy") ||
      title.includes("hot") ||
      title.includes("jalapeño") ||
      title.includes("pepper") ||
      title.includes("chili") ||
      title.includes("buffalo")
    ) {
      return "spicy";
    }

    // Check for dessert pizzas
    if (
      title.includes("dessert") ||
      title.includes("sweet") ||
      title.includes("chocolate") ||
      title.includes("fruit") ||
      title.includes("sugar") ||
      title.includes("nutella")
    ) {
      return "dessert";
    }

    // Default to specialty
    return "specialty";
  };

  // Transform Spoonacular data to match our format
  const transformedRecipes = recipes.map((recipe) => ({
    id: recipe.id,
    name: recipe.title,
    category: categorizeRecipe(recipe),
    difficulty:
      recipe.readyInMinutes <= 30
        ? "Easy"
        : recipe.readyInMinutes <= 60
        ? "Medium"
        : "Hard",
    time: `${recipe.readyInMinutes} minutes`,
    servings: recipe.servings.toString(),
    image: recipe.image,
    // description: `${recipe.vegetarian ? 'Vegetarian ' : ''}${recipe.vegan ? 'Vegan ' : ''}${recipe.glutenFree ? 'Gluten-Free ' : ''}pizza recipe${recipe.veryHealthy ? ' - Very Healthy!' : ''}`,
    spoonacularData: recipe, // Keep original data for detail page
  }));

  const filteredRecipes =
    selectedCategory === "all"
      ? transformedRecipes
      : transformedRecipes.filter(
          (recipe) => recipe.category === selectedCategory
        );

  const openRecipeDetail = (recipe) => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black pt-24 pb-16 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-6 animate-pulse">
            ⚠️ CURSED PIZZA RECIPES ⚠️
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter at your own risk... These "recipes" have been banished from Italian kitchens worldwide. 
            Some say they were created by demons who hate good food.
          </p>
          <div className="mt-6 text-red-400 text-lg font-bold animate-bounce">
            ☠️ WARNING: MAY CAUSE FOOD POISONING OF THE SOUL ☠️
          </div>
        </div>

        {/* Cursed decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-red-600 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute top-32 right-16 w-6 h-6 bg-purple-600 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-4 h-4 bg-red-600 rounded-full opacity-90 animate-bounce"></div>
        <div className="absolute top-40 left-1/2 text-6xl opacity-20 animate-spin-slow">👹</div>
      </section>

      {/* Diagonal separator - now blood red */}
      <div className="w-full h-12 bg-red-800 transform -skew-y-1 shadow-lg"></div>

      {/* Recipe Categories */}
      <section className="bg-red-900 py-8 relative border-y-4 border-red-700">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
            Choose Your Suffering Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium border-2 ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white shadow-lg border-red-400 animate-pulse"
                    : "bg-gray-800 bg-opacity-80 text-red-300 hover:bg-red-800 border-red-600 hover:animate-pulse"
                }`}
              >
                💀 {category.name} 💀
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-red-400 text-lg animate-pulse">
                Summoning cursed recipes from the depths of hell...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden hover:shadow-red-900/50 transition-all duration-300 cursor-pointer border-2 border-red-800 hover:border-red-600 transform hover:scale-105"
                  onClick={() => openRecipeDetail(recipe)}
                >
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-48 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      CURSED
                    </div>
                    <div className="absolute inset-0 bg-red-900 bg-opacity-20 hover:bg-opacity-0 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-2">
                      💀 {recipe.name} 💀
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm">
                      ⚠️ {recipe.description} (DO NOT ATTEMPT)
                    </p>
                    <div className="flex justify-between items-center text-sm text-red-300">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {recipe.time} of suffering
                      </span>
                      <span className="px-2 py-1 bg-red-800 bg-opacity-50 rounded-full text-xs border border-red-600">
                        👹 {recipe.difficulty}
                      </span>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-xs text-red-500 animate-pulse">
                        ⚠️ ENTER AT YOUR OWN RISK ⚠️
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;
