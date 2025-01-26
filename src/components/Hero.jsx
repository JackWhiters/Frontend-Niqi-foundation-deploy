import { useEffect, useState } from "react";
import beranda from "~src/assets/imgs/beranda.webp";
import "./hero.css";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = beranda;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <>
      {/* Preload the critical image */}
      <link
        rel="preload"
        as="image"
        href={beranda}
      />

      <div className="relative h-screen w-full overflow-hidden bg-gray-300">
        <picture>
          <source
            srcSet={beranda}
            type="image/webp"
          />
          <img
            id="hero-img"
            src={beranda}
            alt="Beautiful landscape"
            loading="eager" // Ensure LCP image loads eagerly
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Welcome to Our World</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
            Discover the beauty of nature and embark on unforgettable adventures.
          </p>
          <a
            href="/explore"
            className="bg-white text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Explore Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
