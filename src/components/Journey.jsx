/* eslint-disable no-unused-vars */
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
import journey12 from "../assets/images/journey/journey12.png";
import glow from "../assets/images/Glow.png";

const baseCards = [
  { id: 0, img: journey1, year: "2013", caption: "I began my career in 2013 at the age of 15 — delivering courier packages on a bicycle through the streets of Bangalore to understand logistics from the ground up. " },
  { id: 1, img: journey2, year: "2016", caption: "Rose up the ranks, promoted to Asst. Manager in 2016." },
  { id: 2, img: journey3, img2: journey3_2, year: "2018", caption: "With the support of my father and family, launched Highlighter Stationer in 2018.A beginning into the world of business, submerged in building the brand." },
  { id: 3, img: journey4, year: "2019", caption: "Promoted to branch manager 2019, working with a team of 8 to expand network pan India." },
  { id: 4, img: journey5, year: "2020", caption: "Kept the business alive throughout the pandemic, pivoted to delivering essential products during 2020." },
  { id: 5, img: journey6, year: "2021", caption: "Dove head first into a new line of business in 2021 dealing strictly with domestic transport." },
  { id: 6, img: journey7, img2: journey7_2, year: "2024", caption: "Launched MSEPL, a comprehensive logistical solutions provider in 2024, with a dream team of 60 like minded professionals." },
  { id: 7, img: journey8, img2: journey8_2, year: "2025", caption: "Expanded MSEPL to six locations in two countries, India & UAE. Operations began in UAE 2025." },
  { id: 8, img: journey12, year: "2024", caption: "I stand today on the shoulders and foundation built by my father & more, evrything I am today, I owe it all to them."}
];

export default function Journey() {
  const [animating, setAnimating] = useState(false);
  const [activeImage, setActiveImage] = useState({}); // keyed by card.id (toggles img2)
  const autoPlayActive = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  const [displayCards, setDisplayCards] = useState(baseCards);

  // timers / refs
  const autoToggleRef = useRef(null); // toggles img2
  const autoScrollRef = useRef(null); // marquee movement interval
  const resumeTimeoutRef = useRef(null); // resume autoplay after manual interaction

  // screen detect
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Toggle between images every 3 seconds for cards that have a second image
  useEffect(() => {
    autoToggleRef.current = setInterval(() => {
      setActiveImage(prev => {
        const newState = { ...prev };
        baseCards.forEach((card) => {
          if (card.img2) newState[card.id] = !prev[card.id];
        });
        return newState;
      });
    }, 3000);
    return () => clearInterval(autoToggleRef.current);
  }, []);

  // Auto-scroll functionality (moves first card to end every 3s)
  useEffect(() => {
    const step = () => {
      if (!autoPlayActive.current) return;
      setAnimating(true);
      setTimeout(() => {
        setDisplayCards(prevCards => {
          const [first, ...rest] = prevCards;
          return [...rest, first];
        });
        setAnimating(false);
      }, 400);
    };

    autoScrollRef.current = setInterval(step, 3000);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  // helper to pause autoplay temporarily (e.g., when user clicks prev/next or hovers)
  const pauseAutoplay = (ms = 5000) => {
    autoPlayActive.current = false;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      autoPlayActive.current = true;
    }, ms);
  };

  const nextSlide = () => {
    pauseAutoplay(6000);
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayCards(prev => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      setAnimating(false);
    }, 200);
  };

  const prevSlide = () => {
    pauseAutoplay(6000);
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayCards(prev => {
        const last = prev[prev.length - 1];
        const rest = prev.slice(0, prev.length - 1);
        return [last, ...rest];
      });
      setAnimating(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    autoPlayActive.current = false;
    setDisplayCards(prev => [...prev]); // force rerender if needed
  };

  const handleMouseLeave = () => {
    autoPlayActive.current = true;
    setDisplayCards(prev => [...prev]);
  };

  // Sizes: keep desktop original sizes but adjust to squares on mobile
  const getCardSize = (i) => {
    if (isMobile) {
      if (i === 0) return { width: 220, height: 220 };
      if (i === 1) return { width: 170, height: 170 };
      if (i === 2) return { width: 140, height: 140 };
      return { width: 120, height: 120 };
    }
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

  // Calculate caption font-size so each card is slightly larger than the next.
  // Leading card (index 0) is largest, index 1 slightly smaller, etc.
  const getCaptionStyle = (posIndex) => {
    // posIndex is the position in the visible order (0 = first/leading)
    // Tune sizes here:
    if (isMobile) {
      if (posIndex === 0) return { fontSize: 14, lineHeight: "20px" };
      if (posIndex === 1) return { fontSize: 13, lineHeight: "19px" };
      if (posIndex === 2) return { fontSize: 12, lineHeight: "18px" };
      return { fontSize: 11, lineHeight: "16px" };
    } else {
      if (posIndex === 0) return { fontSize: 15, lineHeight: "22px" };
      if (posIndex === 1) return { fontSize: 14, lineHeight: "20px" };
      if (posIndex === 2) return { fontSize: 13, lineHeight: "19px" };
      return { fontSize: 12, lineHeight: "18px" };
    }
  };

  // When a year is clicked, rotate the displayCards so the clicked card becomes first
  const handleYearClick = (posIndex) => {
    pauseAutoplay(8000); // give user time to see
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayCards(prev => {
        // rotate by posIndex (move first posIndex elements to end)
        if (posIndex === 0) return prev;
        const moved = prev.slice(posIndex);
        const rest = prev.slice(0, posIndex);
        return [...moved, ...rest];
      });
      setAnimating(false);
    }, 200);
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

      {/* Make this container overflow-visible so chevrons aren't clipped */}
      <div className="w-full relative z-10 overflow-visible pt-24 md:pt-[8rem] pb-4 min-h-[400px] md:min-h-[820px] px-4 md:px-32">
        {/* Prev / Next buttons (visible, high-contrast SVG chevrons) */}
        <button
          aria-label="Previous"
          onClick={prevSlide}
          className="absolute left-2 md:left-10 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto bg-white/95 hover:bg-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-2xl border border-black/5 text-black"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ backdropFilter: 'blur(6px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          aria-label="Next"
          onClick={nextSlide}
          className="absolute right-2 md:right-10 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto bg-white/95 hover:bg-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-2xl border border-black/5 text-black"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ backdropFilter: 'blur(6px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div 
          className="journey-marquee flex items-start justify-start" 
          style={{ 
            width: 'max-content',
            animationPlayState: autoPlayActive.current ? 'running' : 'paused'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-nowrap items-start gap-8 md:gap-12">
            {cards.map((card, j) => (
              <div
                key={card.id + "-a"}
                className="relative shrink-0"
                style={{ transform: `translateY(${getOffset(j)}px)` }}
              >
                {/* Year as clickable control */}
                <button
                  onClick={() => handleYearClick(j)}
                  className="font-inter text-base md:text-lg text-black absolute -top-8 left-1 hover:text-blue-600 focus:outline-none"
                  aria-label={`Jump to ${card.year}`}
                  style={{ background: "transparent" }}
                >
                  {card.year}
                </button>

                <div 
                  className="bg-white rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] border-2 border-white ring-1 ring-black/5 p-1.5 md:p-2 w-[220px] md:w-[300px] flex-shrink-0 flex flex-col transition-all duration-300 hover:scale-150 hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:z-50"
                  onMouseEnter={() => {
                    autoPlayActive.current = false;
                    setDisplayCards(prev => [...prev]);
                  }}
                  onMouseLeave={() => {
                    autoPlayActive.current = true;
                    setDisplayCards(prev => [...prev]);
                  }}
                  style={{
                    transform: 'translateZ(0)' // Force hardware acceleration
                  }}
                >
                  <div className="relative w-full h-[150px] md:h-[200px] flex-shrink-0 overflow-hidden">
                    <img
                      src={card.img}
                      alt={`Journey ${card.year}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                      style={{
                        opacity: card.img2 && activeImage[card.id] ? 0 : 1,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                      draggable={false}
                    />
                    {card.img2 && (
                      <img
                        src={card.img2}
                        alt={`Journey ${card.year} alternate`}
                        className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                        style={{
                          opacity: activeImage[card.id] ? 1 : 0,
                          transition: 'opacity 0.5s ease-in-out'
                        }}
                        draggable={false}
                      />
                    )}
                  </div>

                  <div className="px-2 md:px-3 pt-2 md:pt-3 pb-2 md:pb-3 w-full z-10 mt-2 flex-grow">
                    <p
                      className="m-0 text-gray-700 whitespace-normal break-words max-w-full"
                      style={getCaptionStyle(j)}
                    >
                      {card.caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dui in nunc aliquet porta."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="shrink-0 w-8 md:w-12" />
          </div>

          {/* Duplicate set for smooth infinite scrolling look */}
          <div className="flex flex-nowrap items-start gap-8 md:gap-12">
            {cards.map((card, j) => (
              <div
                key={card.id + "-b"}
                className="relative shrink-0"
                style={{ transform: `translateY(${getOffset(j)}px)` }}
              >
                <button
                  onClick={() => handleYearClick(j)}
                  className="font-inter text-base md:text-lg text-black absolute -top-8 left-1 hover:text-blue-600 focus:outline-none"
                  aria-label={`Jump to ${card.year}`}
                  style={{ background: "transparent" }}
                >
                  {card.year}
                </button>

                <div 
                  className="bg-white rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] border-2 border-white ring-1 ring-black/5 p-1.5 md:p-2 w-[220px] md:w-[300px] flex-shrink-0 flex flex-col transition-all duration-300 hover:scale-150 hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:z-50"
                  onMouseEnter={() => {
                    autoPlayActive.current = false;
                    setDisplayCards(prev => [...prev]);
                  }}
                  onMouseLeave={() => {
                    autoPlayActive.current = true;
                    setDisplayCards(prev => [...prev]);
                  }}
                  style={{
                    transform: 'translateZ(0)' // Force hardware acceleration
                  }}
                >
                  <div className="relative w-full h-[150px] md:h-[200px] flex-shrink-0 overflow-hidden">
                    <img
                      src={card.img}
                      alt={`Journey ${card.year}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-white"
                      draggable={false}
                    />
                  </div>
                  <div className="px-2 md:px-3 pt-2 md:pt-3 pb-2 md:pb-3 w-full z-10 mt-2 flex-grow">
                    <p
                      className="m-0 text-gray-700 whitespace-normal break-words max-w-full"
                      style={getCaptionStyle(j)}
                    >
                      {card.caption || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non dui in nunc aliquet porta."}
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
