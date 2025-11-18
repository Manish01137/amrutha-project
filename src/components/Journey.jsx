import React, { useState, useRef, useEffect } from "react";
import journey1 from "../assets/images/journey/2013.png";
import journey2 from "../assets/images/journey/2016.png";
import journey3 from "../assets/images/journey/2018.png";
import journey3_2 from "../assets/images/journey/2018-2.jpg";
import journey4 from "../assets/images/journey/2019.png";
import journey5 from "../assets/images/journey/2020.png";
import journey6 from "../assets/images/journey/2021.png";
import journey7 from "../assets/images/journey/2024.png";
import journey7_2 from "../assets/images/journey/2024-2.jpg";
import journey8 from "../assets/images/journey/2025.png";
import journey8_2 from "../assets/images/journey/2025-2.jpg";
import glow from "../assets/images/Glow.png";

const originalCards = [
  { img: journey1, year: "2013", caption: "I began my career in 2013 at the age of 15 — delivering courier packages on a bicycle through the streets of Bangalore to understand logistics from the ground up. " },
  { img: journey2, year: "2016", caption: "Rose up the ranks, promoted to Asst. Manager in 2016." },
  { img: journey3, img2: journey3_2, year: "2018", caption: "With the support of my father and family, launched Highlighter Stationer in 2018.A beginning into the world of business, submerged in building the brand." },
  { img: journey4, year: "2019", caption: "Promoted to branch manager 2019, working with a team of 8 to expand network pan India." },
  { img: journey5, year: "2020", caption: "Kept the business alive throughout the pandemic, pivoted to delivering essential products during 2020." },
  { img: journey6, year: "2021", caption: "Dove head first into a new line of business in 2021 dealing strictly with domestic transport." },
  { img: journey7, img2: journey7_2, year: "2024", caption: "Launched MSEPL, a comprehensive logistical solutions provider in 2024, with a dream team of 60 like minded professionals." },
  { img: journey8, img2: journey8_2, year: "2025", caption: "Expanded MSEPL to six locations in two countries, India & UAE. Operations began in UAE 2025." },
];

function getDisplayCards(cards, idx) {
  return [...cards.slice(idx), ...cards.slice(0, idx)];
}

export default function Journey() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeImage, setActiveImage] = useState({});
  const timerRef = useRef(null);
  const autoPlayActive = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  const [displayCards, setDisplayCards] = useState(originalCards);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveToIdx = (idx) => {
    if (animating || idx === currentIdx) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIdx(idx);
      setAnimating(false);
    }, 400);
  };

  // Toggle between images every 3 seconds for cards that have a second image
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(prev => {
        const newState = {};
        originalCards.forEach((card, i) => {
          if (card.img2) {
            newState[i] = !prev[i];
          }
        });
        return newState;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll functionality with stable card sizing
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!autoPlayActive.current || animating) return;
      setAnimating(true);
      
      setTimeout(() => {
        // Move the first card to the end to maintain smooth infinite scroll
        setDisplayCards(prevCards => {
          const [first, ...rest] = prevCards;
          return [...rest, first];
        });
        setAnimating(false);
      }, 400);
    }, 3000);
    
    return () => clearInterval(timerRef.current);
  }, [animating]);

  const handleMouseEnter = () => {
    autoPlayActive.current = false;
    // Force re-render to update animation state
    setDisplayCards([...displayCards]);
  };

  const handleMouseLeave = () => {
    autoPlayActive.current = true;
    // Force re-render to update animation state
    setDisplayCards([...displayCards]);
  };

  // Sizes: keep desktop original sizes but adjust to squares on mobile
  const getCardSize = (i) => {
    if (isMobile) {
      // Square sizes on mobile (cascading)
      if (i === 0) return { width: 220, height: 220 };
      if (i === 1) return { width: 170, height: 170 };
      if (i === 2) return { width: 140, height: 140 };
      return { width: 120, height: 120 };
    }
    // Desktop sizes (cascading)
    if (i === 0) return { width: 340, height: 420 };
    if (i === 1) return { width: 260, height: 340 };
    if (i === 2) return { width: 210, height: 280 };
    return { width: 180, height: 240 };
  };

  const getOffset = (index) => {
    if (isMobile) return 0;
    const offsets = [0, 30, 0, 30, 0, 30, 0, 30];
    return offsets[index % offsets.length];
  };

  const cards = displayCards;

  return (
    <section className="w-full bg-white relative flex flex-col pt-16 md:pt-32 pb-0">
      <style>{`
        [data-hide-scrollbar]::-webkit-scrollbar{display:none;}
        [data-hide-scrollbar]{-ms-overflow-style:none;scrollbar-width:none;}
        @keyframes journey-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .journey-marquee { animation: journey-marquee 40s linear infinite; will-change: transform; }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${glow})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.9,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-16 md:h-28"
        style={{ background: "linear-gradient(to bottom, white, rgba(255,255,255,0))" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 md:h-28"
        style={{ background: "linear-gradient(to top, white, rgba(255,255,255,0))" }}
      />
      <h2 className="font-instrumentSans font-semibold text-5xl md:text-7xl text-left text-black mb-6 md:mb-12 w-full px-6 md:px-32 relative z-10">
        Journey
      </h2>

      <div className="w-full relative z-10 overflow-hidden pt-24 md:pt-[8rem] pb-4 min-h-[400px] md:min-h-[820px] px-4 md:px-32">
        <div 
          className="journey-marquee flex items-start justify-start" 
          style={{ 
            width: 'max-content',
            animationPlayState: autoPlayActive.current ? 'running' : 'paused'
          }}
        >
          <div className="flex flex-nowrap items-start gap-8 md:gap-12">
            {originalCards.map(({ img, year }, j) => (
              <div
                key={year + "-a"}
                className="relative shrink-0"
                style={{ transform: `translateY(${getOffset(j)}px)` }}
              >
                <span className="font-inter text-base md:text-lg text-black absolute -top-8 left-1">{year}</span>

                <div 
                  className="bg-white rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] border-2 border-white ring-1 ring-black/5 p-1.5 md:p-2 w-[220px] md:w-[300px] flex-shrink-0 flex flex-col transition-all duration-300 hover:scale-150 hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:z-50"
                  onMouseEnter={() => {
                    autoPlayActive.current = false;
                    setDisplayCards([...displayCards]);
                  }}
                  onMouseLeave={() => {
                    autoPlayActive.current = true;
                    setDisplayCards([...displayCards]);
                  }}
                  style={{
                    transform: 'translateZ(0)' // Force hardware acceleration
                  }}
                >
                  <div className="relative w-full h-[150px] md:h-[200px] flex-shrink-0 overflow-hidden">
                    <img
                      src={img}
                      alt={`Journey ${year}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                      style={{
                        opacity: originalCards[j].img2 && activeImage[j] ? 0 : 1,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                      draggable={false}
                    />
                    {originalCards[j].img2 && (
                      <img
                        src={originalCards[j].img2}
                        alt={`Journey ${year} alternate`}
                        className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                        style={{
                          opacity: activeImage[j] ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="px-2 md:px-3 pt-2 md:pt-3 pb-2 md:pb-3 w-full z-10 mt-2 flex-grow">
                    <p className="m-0 text-[11px] leading-4 md:text-[13px] md:leading-[18px] text-gray-700 whitespace-normal break-words max-w-full">
                      {originalCards[j].caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dui in nunc aliquet porta."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-8 md:w-12" />
          </div>
          <div className="flex flex-nowrap items-start gap-8 md:gap-12">
            {originalCards.map(({ img, year }, j) => (
              <div
                key={year + "-b"}
                className="relative shrink-0"
                style={{ transform: `translateY(${getOffset(j)}px)` }}
              >
                <span className="font-inter text-base md:text-lg text-black absolute -top-8 left-1">{year}</span>

                <div 
                  className="bg-white rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] border-2 border-white ring-1 ring-black/5 p-1.5 md:p-2 w-[220px] md:w-[300px] flex-shrink-0 flex flex-col transition-all duration-300 hover:scale-150 hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:z-50"
                  onMouseEnter={() => {
                    autoPlayActive.current = false;
                    setDisplayCards([...displayCards]);
                  }}
                  onMouseLeave={() => {
                    autoPlayActive.current = true;
                    setDisplayCards([...displayCards]);
                  }}
                  style={{
                    transform: 'translateZ(0)' // Force hardware acceleration
                  }}
                >
                  <div className="relative w-full h-[150px] md:h-[200px] flex-shrink-0 overflow-hidden">
                    <img
                      src={img}
                      alt={`Journey ${year}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                      draggable={false}
                    />
                  </div>
                  <div className="px-2 md:px-3 pt-2 md:pt-3 pb-2 md:pb-3 w-full z-10 mt-2 flex-grow">
                    <p className="m-0 text-[11px] leading-4 md:text-[13px] md:leading-[18px] text-gray-700 whitespace-normal break-words max-w-full">
                      {originalCards[j].caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dui in nunc aliquet porta."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-8 md:w-12" />
          </div>
        </div>
      </div>

    </section>
  );
}
