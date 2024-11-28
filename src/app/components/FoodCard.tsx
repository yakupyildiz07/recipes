"use client";
import { useEffect, useState } from "react";

const FoodCard = () => {
  const [tarifler, setTarifler] = useState<
    {
      strArea: string;
      strMealThumb: string;
      strMeal: string;
      strTags: string;
    }[]
  >([]);
  useEffect(() => {
    async function fetchTarifler() {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      setTarifler(data.meals);
    }
    fetchTarifler();
  }, []);
  return (
    <div >
      {tarifler.map((tarif) => (
        <div className="max-w-72 bg-transparent  backdrop-blur-md border-gray-200 rounded-2xl shadow-2xl shadow-red-400  p-3">
          <a href="#">
            <img
              className="size-max rounded-2xl"
              src={tarif.strMealThumb}
              alt={tarif.strMeal}
            />
          </a>
          <div className="py-5 text-center">
            <a href="#">
              <h5 className="min-h-24 mb-2 text-2xl font-bold tracking-tight text-slate-700">
                {tarif.strMeal}
              </h5>
            </a>
            <p className="mb-5 font-normal text-white">
              {tarif.strTags ? tarif.strTags : "Look delicious! "}
            </p>
            <a
              href="#"
              className="w-full inline-flex items-center px-3 py-2 text-sm font-medium justify-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tarife geç
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
  );
};
export default FoodCard;
