"use client";
import { useEffect, useState, useRef } from "react";

const Categories = () => {
  const [kategori, setKategori] = useState<
    {
      strCategory: string;
      strMealThumb: string;
      strCategoryThumb:string;
    }[]
  >([]);
  useEffect(() => {
    async function fetchKategori() {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await res.json();
      setKategori(data.categories);
    }
    fetchKategori();
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Sol tarafa kaydırma fonksiyonu
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" }); // Sol tarafa 200px kaydır
    }
  };
  // Sağ tarafa kaydırma fonksiyonu
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" }); // Sağ tarafa 200px kaydır
    }
  };
  return (
    <div className="flex items-center overflow-hidden gap-4 p-4" ref={scrollRef}>
      {/* Sol kaydırma butonu */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 z-10 p-2 backdrop-blur-sm  rounded-full shadow-lg text-5xl text-black"
      >
        {'<'}
      </button>
      {kategori.map((x) => (
        <div className="max-w-min bg-transparent rounded-2xl shadow-red-400 shadow-lg   " >
          <a href="#">
            <img
              className=" rounded-2xl object-fill min-w-36 max-h-24"
              src={x.strCategoryThumb}
              alt={x.strCategory}
            />
            <h5 className="text-center p-2 text-2xl font-bold text-slate-700 ">
              {x.strCategory}
            </h5>
          </a>
        </div>
      ))}
      {/* Sağ kaydırma butonu */}
      <button
        onClick={scrollRight}
        className="absolute right-4 z-10 p-2 backdrop-blur-sm  rounded-full shadow-lg text-5xl text-black"
      >
        {'>'}
      </button>
    </div>
  );
};
export default Categories;
