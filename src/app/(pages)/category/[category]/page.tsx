"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import Image from "next/image";

const CategoryPage = ({searchParams,}:{searchParams: { description: string }}) => {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const description = searchParams?.description;

  const [meals, setMeals] = useState<
    {
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
      strTags:string
    }[]
  >([]);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      const data = await res.json();
      setMeals(data.meals);
    }
    fetchMeals();
  }, [category]);

  return (
    <div>
        <Header/>
      <h1 className="font-pacifico text-slate-700 text-5xl w-full text-center py-10 font-bold">
      {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} Recipes
      </h1>
      <p>{description}</p>
      <div className="grid grid-cols-4 gap-x-4 gap-y-16 p-10 pt-0 max-sm:flex flex-col max-sm:p-8 max-md:grid-cols-2">
        {meals.map((meal) => (
        <div key={meal.idMeal} className="bg-white bg-opacity-75 rounded-2xl shadow-2xl shadow-red-400  p-3 flex flex-col justify-between">
        <a href={`/recipe/${meal.idMeal}`}>
          <Image
            className="size-max rounded-2xl"
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={500} 
            height={300} 
            layout="responsive"
          />
        </a>
        <div className="font-pacifico py-5 flex flex-col justify-evenly">
          <a href={`/recipe/${meal.idMeal}`}>
            <h5 className="min-h-24 mb-2 text-2xl text-center font-bold tracking-tight text-slate-700">
              {meal.strMeal}
            </h5>
          </a>
          <a
            href={`/recipe/${meal.idMeal}`}
            className="w-full inline-flex items-center px-3 py-2 text-sm font-medium justify-center text-white bg-slate-400 rounded-full hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Go to recipe
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
        ))}
      </div>
      <ScrollToTop/>
      <Footer/>
    </div>
  );
};

export default CategoryPage;
