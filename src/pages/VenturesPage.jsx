/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LetsTalk from "../components/LetsTalk";
import venture1 from "../assets/images/venture/venture1.png";
import venture2 from "../assets/images/venture/venture2.png";
import venture3 from "../assets/images/venture/venture3.png";
import venture4 from "../assets/images/venture/venture4.png";
import venture5 from "../assets/images/venture/venture5.png";
import venture6 from "../assets/images/venture/venture6.png";
import spot from "../assets/images/about/spotlight.png";
import asso1 from "../assets/images/about/bull.jpg";
import asso2 from "../assets/images/about/noscreo.jpg";
import noscreo1 from "../assets/images/about/noscreo1.jpg";
import asso3 from "../assets/images/about/tradebull.jpg";
import asso4 from "../assets/images/about/phodeo.png";
import phodologo12 from "../assets/images/about/phodologo12.png";
import nosocologo from "../assets/images/about/nosocologo.png";
import digitaltina from "../assets/images/about/digitallogog12.png";

import tagglogo22 from "../assets/images/about/taggglogo22.png";

import glow from "../assets/images/Glow.png";

const ventures = [
  {
    slug: "manjunath-sindhu-enterprise-pvt-ltd",
    img: venture1,
    title: "Manjunath Sindhu Enterprise Pvt Ltd",
    description:
      "MSEPL is an organisation in business for the last 3 decades, established in 1998 with a dream and vision of making logistics accessible and affordable to everyone. Today the company stands tall with presence in India & UAE, with a network coverage of 123 countries. Your one stop for anything logistics and supply chain.",
    tags: [
      { title: "Founded: 1996", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Mission", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Vision", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Core Values", subtitle: '"Built on the idea of combining innovation with trust."' },
    ],
  },
  {
    slug: "highlighter-stationer",
    img: venture2,
    title: "Highlighter Stationer",
    description:
      "Launched in 2018 in a basement in Bangalore with the sole aim of bridging the gap between fine writing instruments and consumers, A unique concept of a stationery supermarket where customers can try and feel the products before purchase.",
    tags: [
      { title: "Founded: 2018", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Mission", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Vision", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Core Values", subtitle: '"Built on the idea of combining innovation with trust."' },
    ],
  },
  {
    slug: "amroya",
    img: venture4,
    title: "Amroya",
    description:
      "A pre-launch exclusive beauty brand, a means to supplement skincare with natural extracts, proprietary methods of non-inavsive skincare crafted to nurture and support healthy skin.",
    tags: [
      { title: "Founded: 2016", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Mission", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Vision", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Core Values", subtitle: '"Built on the idea of combining innovation with trust."' },
    ],
  },
  {
    slug: "heart-of-it-with-amruth",
    img: venture3,
    title: "Heart of it with Amruth",
    description:
      "A platform for people from all walks of life to share their journey, in a world where emotions are edited out, we invite them in. Raw & unfiltered, the show does not follow a fixed structure rather just two people caught in conversation.",
    tags: [
      { title: "Founded: 2025", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Mission", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Vision", subtitle: '"Built on the idea of combining innovation with trust."' },
      { title: "Core Values", subtitle: '"Built on the idea of combining innovation with trust."' },
    ],
  }
];

const associatedVentures = [
  {
    img: phodologo12,
    title: "Tag Unlimited",
    description:
      'Premier apparel manufacturers who are pioneers in the industry relating to fabric and textiles, an enterprise by Mr.Rahul Raj Singh, a dear friend and a go getter who has an always can do attitude. This is a well oiled machine that delivers consistently since time immemorial, no order too low, no order too high. Highly recommended for anything apparel, be it a T-shirt , a sock or 100k hoodies they\'re ones to rely on. Famously known as the "T-shirt" guy for the past two decades, Rahul is your genie.',
    isCarousel: false
  },
  {
    img: nosocologo,
    title: "Noscreo (formerly SociaBull)",
    description:
      'Spearheaded and founded by Mr.Karthik Amar and curated and designed by Mr.Harshith, this is an enterprise that breathes and practices "Design", it could be a signpost, a letter, a business card, or even a BRAND. All of Amruth\'s projects are designed and branded by the creative geniuses at Noscreo. Teachers of the modern world helping global businesses and people alike communicate their vision and purpose through interactive design language',
    isCarousel: true
  },
  {
    img: digitaltina,
    title: "Digital Tenali",
    description:
      'The powerhouse of marketing and content, churning ways to draw attention through campaigns that captivate out of the box. The brainchild of Mr.Poojesh, a man who can sell anything under the sun, a charmer & the synonym for opulence. Creators at Digital Tenali are the quirkiest and most jovial people across the industry, each adding a layer of proprietary idea, innovation and excellence in their own way bringing a whole new meaning to Marketing. Anything to market across all media platforms is churned by the house of Digital Tenali.',
    isCarousel: false
  },
  {
    img:tagglogo22 ,
    title: "Phodeo by Dharshan",
    description:
      'Freezing moments in time to cherish and reminisce, Mr.Dharshan the director of all things visual. A photographer by profession but an absolute artist behind the camera. His eyes see beyond just the ordinary, capturing a picture worth a thousand words.',
    isCarousel: false
  },
];

export default function Ventures() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const focusSlug = params.get('venture');
  const ventureRefs = useRef({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Auto-scroll effect for carousel
  useEffect(() => {
    const noscreoVenture = associatedVentures.find(v => v.title === "Noscreo (formerly SociaBull)");
    if (!noscreoVenture?.isCarousel || !Array.isArray(noscreoVenture.img)) return;

    const startAutoScroll = () => {
      return setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % noscreoVenture.img.length);
      }, 5000);
    };

    intervalRef.current = startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [associatedVentures]);

  // Handle window resize to reset carousel on mobile
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (focusSlug && ventureRefs.current[focusSlug]) {
      const element = ventureRefs.current[focusSlug];
      const yOffset = -100; // pixel offset:
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [focusSlug]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-white via-[#fff6fa] to-[#e8f1fa] flex flex-col pb-0 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full py-10 px-2 md:px-20">
        <div className="max-w-7xl mx-auto mt-10 md:mt-16 mb-14 md:mb-28">
          <h1 className="text-center font-instrumentSans font-semibold text-3xl md:text-7xl">Portfolio</h1>
        </div>
        {ventures.map((venture, idx) => (
          <div
            key={venture.title}
            ref={(el) => (ventureRefs.current[venture.slug] = el)}
            className="mb-10 md:mb-20 w-full"
          >
            <div className="max-w-7xl mx-auto">
              {/* Venture Content */}
              <div
                className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-4 md:gap-8 items-start md:items-start`} // align top
              >
                {/* Image with responsive size */}
                <div className="relative w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
                  {/* Blur overlay for desktop */}
                  <img
                    src={glow}
                    alt=""
                    className="hidden md:block absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                    style={{ filter: "blur(60px)", zIndex: 0 }}
                  />
                  {/* Image container with increased size on mobile */}
                  <div className="relative w-full max-w-sm sm:max-w-sm md:max-w-full">
                    <img
                      src={venture.img}
                      alt={venture.title}
                      className="rounded-xl border border-black object-cover w-full h-auto max-h-80 md:max-h-none md:h-full relative z-10"
                    />
                  </div>
                </div>
                {/* Text Content */}
                <div className="w-full md:w-[55%] flex flex-col justify-start px-4 md:px-0 py-0"> {/* aligned top */ }
                  <h2 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-4">
                    {venture.title}
                  </h2>
                  <p className="font-inter text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {venture.description}
                  </p>
                </div>
              </div>
              {/* Chips */}
              <div className="mt-8 md:mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
                  {venture.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center font-inter rounded-xl border border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] aspect-square p-4"
                    >
                      <span className="font-poppins font-bold text-xs md:text-sm lg:text-2xl text-center mb-2">
                        {tag.title}
                      </span>
                      <span className="text-[10px] md:text-xs lg:text-xl text-black font-poppins text-center">
                        {tag.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Spacing */}
              <div className="mt-8 md:mt-32" />
            </div>
          </div>
        ))}
        {/* Associated Ventures */}
        <section className="w-full max-w-5xl mx-auto mt-32 mb-24">
          <h2 className="text-center font-poppins font-extrabold text-3xl md:text-5xl mb-2">
            Associated Ventures
          </h2>
          <div className="text-center font-inter text-base text-gray-700 mb-10">
            Lorem ipsum dolor sit amet consectetur. At cras ultrices bibendum et nulla vitae dignissim.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {associatedVentures.map((venture, index) => (
              <div
                key={venture.title}
                className="rounded-xl border border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white flex flex-col p-5 min-h-[350px]"
              >
                <div className="w-full mb-4 overflow-hidden" style={{ height: '220px' }}>
                  {venture.isCarousel && Array.isArray(venture.img) ? (
                    <div 
                      className="relative w-full h-full rounded-lg overflow-hidden"
                      onMouseEnter={() => {
                        if (intervalRef.current) {
                          clearInterval(intervalRef.current);
                        }
                      }}
                      onMouseLeave={() => {
                        if (intervalRef.current) {
                          clearInterval(intervalRef.current);
                        }
                        intervalRef.current = setInterval(() => {
                          setCurrentSlide(prev => (prev + 1) % venture.img.length);
                        }, 5000);
                      }}
                    >
                      <div 
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {venture.img.map((imgSrc, imgIndex) => (
                          <div key={imgIndex} className="flex-shrink-0 w-full h-full">
                            <img
                              src={imgSrc}
                              alt={`${venture.title} ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      {/* Mobile touch controls */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {venture.img.map((_, i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <img
                      src={venture.img}
                      alt={venture.title}
                      className={`w-full h-full object-cover rounded-lg ${index === 2 ? 'object-[center_top]' : ''}`}
                    />
                  )}
                </div>
                <div className="font-poppins font-extrabold text-lg md:text-xl mb-2">
                  {venture.title}
                </div>
                <div className="font-inter text-xs sm:text-sm md:text-base text-gray-700">
                  {venture.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <LetsTalk />
      <Footer />
    </section>
  );
}
