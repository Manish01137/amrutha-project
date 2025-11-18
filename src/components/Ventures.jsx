import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LetsTalk from "../components/LetsTalk";
import venture1 from "../assets/images/venture/venture1.png";
import venture2 from "../assets/images/venture/venture2.png";
import venture3 from "../assets/images/venture/venture3.png";
import venture4 from "../assets/images/venture/venture4.png";
import venture5 from "../assets/images/venture/venture5.png";
import venture6 from "../assets/images/venture/venture6.png";
import spot from "../assets/images/about/spotlight.png";

const ventures = [
  {
    slug: "manjunath-sindhu-enterprise-pvt-ltd",
    img: venture1,
    title: "Manjunath Sindhu Enterprise Pvt Ltd",
    description: "MSEPL is an organisation in business for the last 3 decades, established in 1998 with a dream and vision of making logistics accessible and affordable to everyone. Today the company stands tall with presence in India & UAE, with a network coverage of 123 countries. Your one stop for anything logistics and supply chain.",
  },
  {
    slug: "highlighter-stationer",
    img: venture2,
    title: "Highlighter Stationer",
    description: "Launched in 2018 in a basement in Bangalore with the sole aim of bridging the gap between fine writing instruments and consumers, A unique concept of a stationery supermarket where customers can try and feel the products before purchase.",
  },
  {
    slug: "amroya",
    img: venture4,
    title: "Amroya",
    description: "A pre-launch exclusive beauty brand, a means to supplement skincare with natural extracts, proprietary methods of non-inavsive skincare crafted to nurture and support healthy skin.",
  },
  {
    slug: "heart-of-it-with-amruth",
    img: venture3,
    title: "Heart of it with Amruth",
    description: "A platform for people from all walks of life to share their journey, in a world where emotions are edited out, we invite them in. Raw & unfiltered, the show does not follow a fixed structure rather just two people caught in conversation.",
  },
];

const associatedVentures = [
  {
    img: [spot, venture1], // Array of images
    title: "Tag Unlimited",
    description: "Premier apparel manufacturers ... no order too low, no order too high...",
  },
  {
    img: [spot, venture2, venture3], // Multiple images for the second card
    title: "Noscreo (formerly SociaBull)",
    description: "Spearheaded and founded by Mr.Karthik Amar ... communicate their vision and purpose...",
  },
  {
    img: [spot, venture4], // Other cards with images
    title: "Digital Tenali",
    description: "Powerhouse of marketing and content ... adding a layer of proprietary idea, innovation and excellence",
  },
  {
    img: [spot], // Single image
    title: "Phodeo by Dharshan",
    description: "Freezing moments in time ... absolute artist behind the camera.",
  },
];

export default function Ventures() {
  const [selected, setSelected] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const navigate = useNavigate();

  // Initialize active image index for each venture
  useEffect(() => {
    const initialIndexes = {};
    associatedVentures.forEach((_, index) => {
      initialIndexes[index] = 0; // Start with first image
    });
    setActiveImageIndex(initialIndexes);
  }, []);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(prevIndexes => {
        const newIndexes = {...prevIndexes};
        Object.keys(newIndexes).forEach(key => {
          const idx = parseInt(key);
          if (associatedVentures[idx]?.img.length > 1) {
            newIndexes[idx] = (prevIndexes[idx] + 1) % associatedVentures[idx].img.length;
          }
        });
        return newIndexes;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (ventureIndex, imageIndex, e) => {
    e.stopPropagation();
    setActiveImageIndex(prev => ({
      ...prev,
      [ventureIndex]: imageIndex
    }));
  };

  return (
    <section id="pursuits" className="min-h-screen w-full bg-white flex flex-col pb-0 overflow-x-hidden">
      <div className="w-full px-6 md:px-32 pt-16">
        <h2 className="font-instrumentSans font-semibold text-5xl md:text-7xl text-left text-black mb-6 md:mb-12 w-full">
          My Pursuits
        </h2>
      </div>
      
      {/* Main Ventures */}
      <main className="flex-1 w-full pb-10">
        <div className="w-full">
          {ventures.map((venture, idx) => (
            <div
              key={venture.title}
              className={`w-full transition duration-200 border-t border-b border-gray-200 
                ${selected === idx ? "bg-black" : "bg-white"} 
                hover:bg-black cursor-pointer flex flex-col sm:flex-row items-stretch group`}
              style={{ minHeight: "auto" }}
              onMouseEnter={() => setSelected(idx)}
              onMouseLeave={() => setSelected(null)}
              onClick={() => navigate(`/pursuits?venture=${venture.slug}`)}
            >
              <div className={`flex flex-col justify-start items-center sm:items-start pl-0 sm:pl-24 py-6 sm:py-8 w-full sm:w-2/5 text-center sm:text-left
                ${selected === idx ? "text-white" : "text-black"} group-hover:text-white transition-colors duration-200`}>
                <span className="font-poppins font-bold text-lg sm:text-3xl mb-2">
                  {venture.title}
                </span>
              </div>
              <div className="flex justify-center md:justify-left items-start py-6 sm:py-8 w-full sm:w-1/2">
                <img
                  src={venture.img}
                  alt={venture.title}
                  className="object-contain max-w-full max-h-[250px] sm:max-h-[355px]"
                  style={{ width: "auto", height: "auto", maxWidth: "475px" }}
                />
              </div>
              <div className={`flex flex-col justify-start items-start px-4 py-6 sm:py-8 w-full sm:w-1/2
                ${selected === idx ? "text-white" : "text-gray-900"} group-hover:text-white transition-colors duration-200`}>
                <span className="font-inter text-base sm:text-xl">{venture.description}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}