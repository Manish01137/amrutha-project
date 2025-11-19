import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-8 font-poppins">
      <div className="
        flex items-center justify-evenly
        bg-white
        rounded-xl
        px-4 sm:px-6 md:px-10 lg:px-12
        py-2 sm:py-2.5 md:py-3
        shadow-[4px_3px_0_0_rgba(0,0,0,1)]
        border border-black
        text-sm sm:text-base
        max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
        space-x-4 sm:space-x-8 md:space-x-10 lg:space-x-12
      ">
        <Link to="/" className="mx-2 sm:mx-4 text-black hover:text-black font-bold hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-black" style={{ textDecoration: 'none' }}>Home</Link>
        <Link to="/about" className="mx-2 sm:mx-4 text-black hover:text-black font-bold hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-black" style={{ textDecoration: 'none' }}>About me</Link>
        <Link to="/pursuits" className="mx-2 sm:mx-4 text-black hover:text-black font-bold hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-black" style={{ textDecoration: 'none' }}>Portfolio</Link>
        <Link to="/contact" className="mx-2 sm:mx-4 text-black hover:text-black font-bold hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-black" style={{ textDecoration: 'none' }}>Contact me</Link>
      </div>
    </nav>
  );
}
