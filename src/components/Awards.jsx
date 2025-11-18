/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import trophyOutline from "../assets/images/award1.png"; 

const adventures = [
  {
    title: "President Rotaract Club of Vidyaranyapura",
    year: "2023",
    description:
      "Successfully distributed free school supplies to 2000 primary school students through a community fundraiser.",
  },

  {
    title: "President BNI Kingfishers 2025",
    year: "2025",
  },
];

function TrophyEmojiCircle() {
  return (
    <span className="relative flex items-center justify-center w-28 h-28 mr-8">
      <svg
        viewBox="0 0 112 112"
        fill="none"
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
      >
        
      </svg>
      <span className="relative z-10 flex items-center justify-center border-2 border-black bg-white w-16 sm:w-20 h-20 sm: h-26 rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-[2rem] sm:text-[2.4rem] select-none">
        <img
          src={trophyOutline}
          alt="Trophy Outline"
          className="w-14 h-12 object-contain"
        />
      </span>
    </span>
  );
}

export default function AdventuresLore() {
  return (
    <section id="awards" className="w-full min-h-screen bg-white flex flex-col">
      <div className="w-full px-6 md:px-32 pt-16">
        <h2 className="font-instrumentSans font-semibold text-5xl md:text-7xl text-left text-black mb-6 md:mb-12 w-full">
          Adventures and Lore
        </h2>
        <div className="flex flex-col gap-16 w-full">
          {adventures.map((a, i) => (
            <div className="flex items-start w-full" key={a.title}>
              <TrophyEmojiCircle />
              <div className="flex flex-col pt-3">
                <span className="font-instrumentSans font-semibold text-3xl text-black leading-snug">
                  {a.title}
                </span>
                <span className="text-xl text-gray-500 font-semibold mb-1">
                  {a.year}
                </span>
                <span className="font-inter text-xl text-gray-400">
                  {a.description}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center mt-16 mb-24 px-6 md:px-32">
          <Link to="/about">
            <button
              className="px-10 py-4 rounded-xl bg-white border border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] text-black font-inter text-xl font-medium transition hover:bg-black hover:text-white"
              style={{
                fontWeight: 400,
                minWidth: 220,
                boxShadow: "0px 8px 0 0 black",
              }}
            >
              Know More
            </button>
          </Link>
        </div>
        <div className="block sm:hidden mb-24" />
      </div>
    </section>
  );
}
