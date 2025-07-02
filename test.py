import requests
import json

def get_meals_from_category(category):
    res = requests.get(f"https://www.themealdb.com/api/json/v1/1/filter.php?c={category}")
    return res.json().get("meals", [])

def get_meal_details(meal_id):
    res = requests.get(f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}")
    return res.json().get("meals", [])[0]

def is_pizza_related(meal):
    if "pizza" in meal["strMeal"].lower():
        return True
    for i in range(1, 21):
        ingredient = meal.get(f"strIngredient{i}")
        if ingredient and "pizza" in ingredient.lower():
            return True
    return False

categories = ["Miscellaneous", "Beef", "Chicken", "Vegetarian", "Pasta"]  # etc.
pizza_meals = []

for cat in categories:
    meals = get_meals_from_category(cat)
    for meal in meals:
        full_meal = get_meal_details(meal["idMeal"])
        if is_pizza_related(full_meal):
            pizza_meals.append(full_meal)
            print("Found pizza recipe!")

# Save to JSON
with open("pizza_recipes_mealdb.json", "w") as f:
    json.dump(pizza_meals, f, indent=2)

print(f"Found {len(pizza_meals)} pizza-related meals.")
