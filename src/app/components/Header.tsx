"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<
    {
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
      strTags: string;
    }[]
  >([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchSearch() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals);
    }

    fetchSearch();
  }, [query]);

  return (
    <header className="header text-white p-4 flex max-sm:flex-col">
      <div className="container flex justify-around items-center max-w-full ">
        <div className="flex pl-5 flex-1 justify-center max-sm:order-2 max-sm:flex-1 max-sm:pl-0">
          <a href="/">
            <Image src="/cooking.png" alt="logo" width={64} height={64} />
          </a>
        </div>

        {/* Arama Butonu */}
        <div className="w-1/2 flex gap-2 flex-auto max-sm:order-3 max-sm:flex-1 max-sm:justify-end">
          <input
            type="text"
            placeholder="Search all meals ..."
            onFocus={() => setIsSearchOpen(true)} // Arama çubuğuna tıklanınca tam ekran açılıyor
            className="w-full p-2 rounded-full text-black bg-white text-center border-2 border-slate-500 placeholder-slate-500  bg-opacity-75 max-sm:hidden"
          />
          <button type="submit" onClick={() => setIsSearchOpen(true)}>
            <Image src="/search.svg" alt="search" width={40} height={40} />
          </button>
        </div>

        {/* Giriş Yap ve Kaydol Butonları */}
        <div className="flex gap-2 flex-1 justify-center min-w-max max-sm:hidden ">
          <Link href="/login">
            <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full w-full max-md:w-full">
              Log in
            </button>
          </Link>

          <Link href="/register">
            <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full w-full max-md:w-full">
              Register
            </button>
          </Link>
        </div>
        {/* Menu Butonu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hidden max-sm:block max-sm:order-1 max-sm:flex-1"
        >
          <Image src="/burger.svg" alt="menu" width={40} height={40} />
        </button>
      </div>
      {/* dropdown menu */}

      {isMenuOpen ? (
        <ul className="flex flex-col text-center gap-4 text-xl text-slate-700 font-bold border-t border-slate-700 mt-4 py-4">
          <div className="flex gap-2 w-full">
            <Link href="/login" className="w-1/2">
              <button className="w-full bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
                Log in
              </button>
            </Link>

            <Link href="/register" className="w-1/2">
              <button className="w-full bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
                Register
              </button>
            </Link>
          </div>
          <li className="w-full  bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/"> Home</Link>
          </li>
          <li className="w-full bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/category">Categories</Link>
          </li>
          <li className="w-full bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/country">Countries</Link>
          </li>
        </ul>
      ) : (
        ""
      )}

      {/* Tam ekran arama modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col">
          <div className="flex items-baseline max-sm:py-4">
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setQuery("");
              }}
              className="pt-3 text-slate-700 text-4xl max-sm:text-2xl"
            >
              <span>✖ Close</span>
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Click and search ..."
              className="text-slate-700 text-5xl w-3/4 text-center pt-3 focus:outline-none bg-white bg-opacity-85
            max-sm:text-2xl "
            />
          </div>
          <div className="overflow-scroll ">
            {query && meals && (
      <div className="grid grid-cols-4 gap-x-4 gap-y-16 p-10 pt-0 max-sm:flex flex-col max-sm:p-8 max-md:grid-cols-2">
                {meals.map((meal) => (
                  <div key={meal.idMeal} className="bg-transparent  backdrop-blur-md border-gray-200 rounded-2xl shadow-2xl shadow-red-400  p-3 flex flex-col justify-between">
                    <a href={`/recipe/${meal.idMeal}`}>
                      <Image
                        className="size-max rounded-2xl"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={300}
                        height={500}
                        layout="responsive"
                      />
                    </a>
                    <div className="py-5 flex flex-col justify-evenly">
                      <a href={`/recipe/${meal.idMeal}`}>
                        <h5 className="min-h-24 mb-2 text-2xl text-center font-bold tracking-tight text-slate-700">
                          {meal.strMeal}
                        </h5>
                      </a>
                      <a
                        href={`/recipe/${meal.idMeal}`}
                        className="w-full inline-flex items-center px-3 py-2 text-sm font-medium justify-center text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
