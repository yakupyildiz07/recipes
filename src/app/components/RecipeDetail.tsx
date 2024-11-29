"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const RecipeDetail = () => {
  const params = useParams();
  const mealId = params.id;

  const [meal, setMeal] = useState<any>([]);

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      setMeal(data.meals[0]);
    }
    fetchMeal();
  }, [mealId]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div className="flex p-10 w-screen bg-white bg-opacity-75 shadow-2xl gap-4 max-sm:flex-col max-md:flex-col max-lg:flex-col">
      <div className="flex flex-1 flex-col items-center">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={500} 
          height={300} 
          layout="responsive"
          className="w-full max-w-lg rounded-lg shadow-2xl mb-6"
        />
        <h1 className="font-pacifico text-5xl font-bold mb-6 text-black text-center">
          {meal.strMeal}
        </h1>
      </div>
      <div className="flex flex-1 flex-col pe-20 max-sm:pe-0">
        <div className="flex flex-col mb-4">
          <h2 className="font-pacifico text-2xl font-semibold mb-4 text-black underline">
            Ingredients :
          </h2>
          <ul className="list-disc list-inside text-black flex flex-wrap gap-4 max-sm:flex-col">
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((ingredientKey) => (
                <li key={ingredientKey}>
                  {meal[ingredientKey]} -{" "}
                  {meal[`strMeasure${ingredientKey.slice(13)}`]}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col  mb-4">
          <h2 className="font-pacifico text-2xl font-semibold text-black mb-4 underline ">
            Instructions :
          </h2>
          <p className="mb-6 text-black ">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
