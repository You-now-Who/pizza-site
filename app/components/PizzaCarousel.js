"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PizzaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch random 3 pizzas from JSON
  useEffect(() => {
    const fetchRandomPizzas = async () => {
      try {
        const response = await fetch('/pizza_detail.json');
        const allRecipes = await response.json();
        
        // Get 3 random recipes
        const shuffled = allRecipes.sort(() => 0.5 - Math.random());
        const randomPizzas = shuffled.slice(0, 3).map(recipe => ({
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          description: `${recipe.vegetarian ? 'Vegetarian ' : ''}${recipe.vegan ? 'Vegan ' : ''}pizza - Ready in ${recipe.readyInMinutes} minutes`
        }));
        
        setPizzas(randomPizzas);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Fallback to dummy data
        setPizzas([
          {
            id: 1,
            name: "Margherita Classic",
            image: "/pizza-main.png",
            description: "Fresh mozzarella, tomatoes, and basil",
          },
          {
            id: 2,
            name: "Pepperoni Supreme",
            image: "/pizza-illustration.png",
            description: "Loaded with pepperoni and extra cheese",
          },
          {
            id: 3,
            name: "Veggie Delight",
            image: "/pizza-main.png",
            description: "Bell peppers, mushrooms, onions, and olives",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPizzas();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (pizzas.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pizzas.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [pizzas.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % pizzas.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + pizzas.length) % pizzas.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleViewRecipe = (pizzaId) => {
    router.push(`/recipes/${pizzaId}`);
  };

  return (
    <section className="bg-[#d32f2f] py-16 relative overflow-hidden">
      {/* Diagonal cheese sauce separator */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[#ffc107] transform -skew-y-2 origin-top-left"></div>
      
      {/* Pepperoni-like dark red circles scattered across background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-6 h-6 bg-[#b71c1c] rounded-full opacity-60"></div>
        <div className="absolute top-[25%] left-[15%] w-4 h-4 bg-[#8d1515] rounded-full opacity-70"></div>
        <div className="absolute top-[18%] left-[85%] w-5 h-5 bg-[#a01818] rounded-full opacity-65"></div>
        <div className="absolute top-[35%] left-[92%] w-3 h-3 bg-[#b71c1c] rounded-full opacity-75"></div>
        <div className="absolute top-[45%] left-[5%] w-7 h-7 bg-[#8d1515] rounded-full opacity-55"></div>
        <div className="absolute top-[55%] left-[88%] w-4 h-4 bg-[#a01818] rounded-full opacity-68"></div>
        <div className="absolute top-[65%] left-[12%] w-5 h-5 bg-[#b71c1c] rounded-full opacity-62"></div>
        <div className="absolute top-[75%] left-[90%] w-6 h-6 bg-[#8d1515] rounded-full opacity-58"></div>
        <div className="absolute top-[80%] left-[7%] w-3 h-3 bg-[#a01818] rounded-full opacity-72"></div>
        <div className="absolute top-[85%] left-[85%] w-4 h-4 bg-[#b71c1c] rounded-full opacity-66"></div>
        <div className="absolute top-[22%] left-[25%] w-3 h-3 bg-[#8d1515] rounded-full opacity-69"></div>
        <div className="absolute top-[32%] left-[75%] w-5 h-5 bg-[#a01818] rounded-full opacity-63"></div>
        <div className="absolute top-[42%] left-[20%] w-4 h-4 bg-[#b71c1c] rounded-full opacity-71"></div>
        <div className="absolute top-[52%] left-[78%] w-6 h-6 bg-[#8d1515] rounded-full opacity-57"></div>
        <div className="absolute top-[62%] left-[28%] w-3 h-3 bg-[#a01818] rounded-full opacity-74"></div>
        <div className="absolute top-[72%] left-[82%] w-5 h-5 bg-[#b71c1c] rounded-full opacity-61"></div>
      </div>

      <div className="container mx-auto px-6 mt-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Our "Delicious" Pizzas
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading delicious pizzas...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-8 max-w-6xl mx-auto">
              {/* Left Navigation Arrow */}
              <button
                onClick={prevSlide}
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-300 flex-shrink-0"
              >
                <svg
                  className="w-8 h-8 text-[#4e342e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Main carousel container */}
              <div className="flex-1 max-w-4xl">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {pizzas.map((pizza, index) => (
                      <div key={pizza.id} className="w-full flex-shrink-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 p-8 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-[#4e342e] mb-4">
                              {pizza.name}
                            </h3>
                            <p className="text-lg text-[#6d4c41] mb-6">
                              {pizza.description}
                            </p>
                            <button 
                              onClick={() => handleViewRecipe(pizza.id)}
                              className="bg-[#d32f2f] text-white px-6 py-3 rounded-lg hover:bg-[#b71c1c] transition-colors duration-300 self-start"
                            >
                              View Recipe
                            </button>
                          </div>
                          <div className="md:w-1/2">
                            <img
                              src={pizza.image}
                              alt={pizza.name}
                              className="w-full h-64 md:h-80 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Navigation Arrow */}
              <button
                onClick={nextSlide}
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-4 shadow-lg transition-all duration-300 flex-shrink-0"
              >
                <svg
                  className="w-8 h-8 text-[#4e342e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {pizzas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PizzaCarousel;
