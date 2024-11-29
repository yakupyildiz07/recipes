"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import Image from "next/image";

const Page = () => {
  const [categories, setCategories] = useState<
    {
      idCategory: string;
      strCategory: string;
      strCategoryThumb: string;
      strCategoryDescription: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategories(data.categories);
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <Header />
      <p className="font-pacifico font-bold text-slate-700 text-5xl w-full text-center py-10 items-center">
        You can choose a category
      </p>
      <div className="flex items-end justify-center gap-4 max-sm:flex-col max-sm:items-center max-md:flex-col max-md:items-center">
      <p className="font-pacifico font-bold text-slate-700 text-4xl text-center items-center max-sm:text-2xl">
        or you can choose a country 
      </p>
      <Link href="/country">
          <button className="font-pacifico bg-slate-400 hover:bg-slate-700 text-white font-bold px-3 py-1 rounded-full mb-1 ">
            Click me!
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-16 p-10 pt-0 max-sm:flex flex-col max-sm:p-8 max-md:grid-cols-2">
          {categories.map((x) => (
          <div
            key={x.idCategory}
            className="bg-white bg-opacity-75 rounded-2xl shadow-red-400 shadow-lg  overflow-hidden "
          >
            <Link href={`/category/${encodeURIComponent(x.strCategory)}`}>
              <div className="flex flex-col items-center">
                <Image
                  className="rounded-2xl object-fill "
                  src={x.strCategoryThumb}
                  alt={x.strCategory}
                  width={500} 
                  height={300} 
                  layout="responsive"
                />
                <h5 className="font-pacifico text-center p-2 text-2xl font-bold text-slate-700">
                  {x.strCategory}
                </h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <ScrollToTop/>
      <Footer />
    </div>
  );
};

export default Page;
