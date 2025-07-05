import path from "path";

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

// Function to synchronously load and process recipes data for SSG
export function getStaticRecipesData() {
  try {
    // Load recipes data synchronously at build time
    const filePath = path.join(process.cwd(), "public", "pizza_detail.json");
    const fileContents = require("fs").readFileSync(filePath, "utf8");
    const recipes = JSON.parse(fileContents);

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
      description: `${recipe.vegetarian ? "Vegetarian " : ""}${
        recipe.vegan ? "Vegan " : ""
      }${recipe.glutenFree ? "Gluten-Free " : ""}pizza recipe${
        recipe.veryHealthy ? " - Very Healthy!" : ""
      }`,
      spoonacularData: recipe,
    }));

    const categories = generateCategoriesFromRecipes(recipes);

    return {
      recipes: transformedRecipes,
      categories: [{ id: "all", name: "All Recipes" }, ...categories],
    };
  } catch (error) {
    console.error("Error loading recipes:", error);
    return {
      recipes: [],
      categories: [{ id: "all", name: "All Recipes" }],
    };
  }
}

// Export functions for use in other parts of the app
export { categorizeRecipe, generateCategoriesFromRecipes, getCategoryDisplayName };
