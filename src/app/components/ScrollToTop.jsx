import Image from 'next/image';
import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll pozisyonunu kontrol et
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Yukarı çık fonksiyonu
  const scrollToTop = () => {
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-slate-400 hover:bg-slate-700 p-3 rounded-full shadow-2xl transition-all duration-300 z-10"
        >
            <Image src="/up.svg" alt="up" height={25} width={25}/>
        </button>
      )}
    </>
  );
};

export default ScrollToTop; 