import { Link, useLocation } from 'react-router-dom';

export default function LetsTalk(bgColor = "transparent") {
  const location = useLocation();

  function handleLinkClick(e, id) {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  let bgColorStyle = "";
  if (bgColor !== "transparent") {
    // eslint-disable-next-line no-unused-vars
    bgColorStyle = bgColor;
  }
  return (
    

    <section className={`relative w-full overflow-x-hidden overflow-y-hidden flex flex-col items-center py-24 px-4 md:px-0`}style={{
    background: `
      radial-gradient(ellipse 70% 80% at 20% 40%, #fbe7e0 0%, transparent 50%),
      radial-gradient(ellipse 75% 65% at 75% 65%, #e7f8fe 0%, transparent 55%),
      radial-gradient(ellipse 120% 70% at 50% 90%, #fffbe8 0%, transparent 85%),
      linear-gradient(180deg, #fff 65%, #fffbe8 100%)
    `
  }}>
      {/* Full-width divider at the top, breaks out of any container */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-screen h-px bg-[#F0F0F0]" />
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center px-2 py-16 relative z-10">
        <span className="font-inter font-bold text-xl text-gray-800 mb-2">
          Have an idea?
        </span>
        <h2 className="font-poppins font-extrabold text-7xl md:text-8xl text-black text-center mb-7">
          Let’s talk
        </h2>
        <div className="flex gap-8 mt-2">
          <Link to="/about" className="font-inter text-xs md:text-base uppercase underline underline-offset-4 text-black hover:text-gray-600 transition font-medium tracking-tight">ABOUT ME</Link>
          <a
            href="/#pursuits"
            onClick={(e) => handleLinkClick(e, 'pursuits')}
            className="font-inter text-xs md:text-base uppercase underline underline-offset-4 text-black hover:text-gray-600 transition font-medium tracking-tight"
          >
            WORKS
          </a>
          <a
            href="/#awards"
            onClick={(e) => handleLinkClick(e, 'awards')}
            className="font-inter text-xs md:text-base uppercase underline underline-offset-4 text-black hover:text-gray-600 transition font-medium tracking-tight"
          >
            AWARDS
          </a>
        </div>
      </div>
    </section>
  );
}
