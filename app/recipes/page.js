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
      traditional: "Traditional",
      vegetarian: "Vegetarian",
      meat: "Meat Lovers",
      specialty: "Specialty",
      basics: "Basics",
      dessert: "Dessert",
      breakfast: "Breakfast",
      healthy: "Healthy",
      spicy: "Spicy",
      cheese: "Cheese Lovers",
    };
    return (
      displayNames[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
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
    <div className="bg-[#fffdf6] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#fffdf6] pt-24 pb-16 relative">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-[#4e342e] mb-6">
            Unconventional Pizza Recipes
          </h1>
          <p className="text-xl text-[#6d4c41] max-w-2xl mx-auto">
            Discover &quot;unique&quot; and &quot;unparalleled&quot; tastes for your tastebuds.
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
                    ? "bg-[#fc4949] text-white font-bold shadow-2xl"
                    : "bg-white bg-opacity-20 text-red hover:bg-opacity-30"
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
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d32f2f] mx-auto mb-4"></div>
              <p className="text-[#6d4c41] text-lg">
                Loading delicious recipes...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  id={recipe.id}
                  className="recipe bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => openRecipeDetail(recipe)}
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
