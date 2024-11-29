"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import RecipeDetail from "@/app/components/RecipeDetail";

const RecipeDetailPage = () => {
  return (
    <div>
      <Header />
      <RecipeDetail />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export async function generateStaticParams() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();

  return data.meals.map((meal: { idMeal: string }) => ({ id: meal.idMeal }));
}

export default RecipeDetailPage;
