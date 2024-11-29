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



export default RecipeDetailPage;
