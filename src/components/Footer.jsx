import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  function handleWorksClick(e) {
    e.preventDefault();
    const targetId = 'pursuits';
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/#${targetId}`);
    }
  }
  return (
    <footer className="w-screen overflow-x-hidden min-h-[400px] bg-black text-white flex flex-col justify-between overflow-x-hidden px-4 sm:px-6 md:px-0">
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full mt-10">
        {/* Top tagline */}
        <div className="mb-6 sm:mb-8">
          <p className="font-inter text-lg text-[#ECECEC] text-left">
            Building comfort, clarity, and connection in every detail
          </p>
        </div>
        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          {['Podcast', 'heartofit_', 'amruth_hm'].map((platform) => (
            <a
              key={platform}
              href={
                platform === 'Podcast'
                  ? 'https://open.spotify.com/show/6AWOMzqEdELr4PY6UH20nJ?si=a922a170c096421e'
                  : platform === 'Podcast Instagram'
                  ? 'https://www.instagram.com/heartofit_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                  : 'https://www.instagram.com/amruth_hm/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins min-w-[140px] max-w-xs flex-1 text-base px-4 py-2 rounded-full border border-[#ECECEC] bg-transparent text-white hover:text-white hover:underline hover:decoration-white text-center focus:outline-none hover:bg-[#121212]/30 transition"
            >
              {platform}
            </a>
          ))}
        </div>
        {/* Main Links & Newsletter grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-12">
          {/* Page List */}
          <div>
            <div className="font-poppins font-semibold text-lg text-[#888FA1] mb-3 text-left">
              Page List
            </div>
            <div className="flex flex-wrap gap-6 font-inter text-base font-normal text-white">
              <a href="/" className="hover:underline hover:text-white hover:decoration-white text-white">Home</a>
              <a href="/about" className="hover:underline hover:text-white hover:decoration-white text-white">About</a>
              <a href="/#pursuits" onClick={handleWorksClick} className="hover:underline hover:text-white hover:decoration-white text-white">Pursuits</a>
              <a href="/contact" className="hover:underline hover:text-white hover:decoration-white text-white">Contact Me</a>
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <div className="font-poppins font-semibold text-lg text-[#888FA1] mb-3 text-left">
              Stay connected w/ me.
            </div>
            <form className="flex items-center border-b border-[#888FA1] pb-1 max-w-sm">
              <input
                type="email"
                className="bg-transparent outline-none border-none font-inter text-base text-white placeholder:text-[#888FA1] flex-1 mr-2 py-2"
                placeholder="Enter your email"
              />
              {/* Trailing arrow - rotated */}
              <button type="submit" className="flex items-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* Footer copyright */}
        <div className="font-inter text-center text-sm text-[#888FA1] mt-8 mb-4">
          ©2025 All Rights Reserved. Designed by <span className="underline">we2design</span>
        </div>
      </div>
    </footer>
  );
}
