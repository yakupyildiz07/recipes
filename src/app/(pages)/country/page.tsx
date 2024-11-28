"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop"

const CountryListPage = () => {
  const [countries, setCountries] = useState<
    {
      strArea: string;
      strCountryThumb: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchCountries() {
      const res = await fetch("/mocks/Countries.json");
      const data = await res.json();
      setCountries(data.countries);
    }
    fetchCountries();
  }, []);

  return (
    <div>
      <Header />
      <p className="font-bold text-slate-700 text-5xl w-full text-center py-10 items-center">
        Choose a country
      </p>

      <div className="grid grid-cols-4 gap-x-4 gap-y-16 p-10 pt-0 max-sm:flex flex-col max-sm:p-8 max-md:grid-cols-2">
        {countries.map((x) => (
          <div
            key={x.strArea}
            className="bg-white bg-opacity-75 rounded-2xl shadow-red-400 shadow-lg  overflow-hidden"
          >
            <Link href={`/country/${encodeURIComponent(x.strArea)}`}>
              <div className="flex flex-col justify-center">
                <img
                  className="rounded-2xl object-fill"
                  src={x.strCountryThumb}
                  alt={x.strArea}
                />
                <h5 className="text-center p-2 text-2xl font-bold text-slate-700">
                  {x.strArea}
                </h5>
              </div>
            </Link>
          </div>
        ))}
        <ScrollToTop/>
      </div>
      <Footer />
    </div>
  );
};

export default CountryListPage;
