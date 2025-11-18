import React from "react";
import Footer from "../components/Footer";
import LetsTalk from "../components/LetsTalk";
import Navbar from "../components/Navbar";
import glow from '../assets/images/Glow.png';

export default function ContactUs() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-[#fff6fa] to-[#e8f1fa] flex flex-col relative overflow-x-hidden">
      {/* Glow background image positioned behind form with adjusted size like landing */}
      <img
              src={glow}
              alt=""
              className="absolute top-24 left-1/2 -translate-x-1/2 w-[195vw] max-w-5xl h-auto z-0 pointer-events-none select-none"
              draggable={false}
            />

      <Navbar />

      <form className="flex-1 flex flex-col max-w-2xl mx-auto mt-20 px-6 gap-10 relative z-10">
        <label className="font-poppins font-bold text-base -mb-10">Your Name*</label>
        <input
          type="text"
          required
          className="w-full rounded-md border border-black px-4 py-3 font-inter shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        />

        <div className="flex flex-wrap gap-x-6 gap-y-4">
          <div className="flex-1 min-w-[150px]">
            <label className="font-poppins font-bold text-base mb-2">Email id*</label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-black px-4 py-3 font-inter shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="font-poppins font-bold text-base mb-2">Phone Number*</label>
            <input
              type="tel"
              required
              className="w-full rounded-md border border-black px-4 py-3 font-inter shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <label className="font-poppins font-bold text-base -mb-10">Message</label>
        <textarea
          className="w-full rounded-md border border-black px-4 py-3 font-inter shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          rows="5"
        ></textarea>

        <button
          type="submit"
          className="px-8 py-3 mb-12 rounded-[10px] border border-black bg-white text-black font-poppins text-lg shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:border-black transition"
        >
          Submit
        </button>
      </form>

      <LetsTalk />
      <Footer />
    </section>
  );
}
