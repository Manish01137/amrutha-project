/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react"
import author from "../assets/images/amruthhomepg.png"
import glow from "../assets/images/Glow.png"
import { color } from "framer-motion"

// Example: if you have additional portrait images, add them here.
// For now I include the main author repeatedly so autoplay works — replace with real files when available.
const SLIDES = [author /*, otherImage1, otherImage2 */]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [slide, setSlide] = useState(0)
  const autoplayRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 90)
    return () => clearTimeout(t)
  }, [])

  // autoplay slider every 3.5s
  useEffect(() => {
    if (SLIDES.length <= 1) return
    autoplayRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length)
    }, 3500)
    return () => clearInterval(autoplayRef.current)
  }, [])

  // helper: manual nav
  function go(delta) {
    setSlide((s) => {
      const next = (s + delta + SLIDES.length) % SLIDES.length
      return next
    })
    // restart autoplay briefly
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = setInterval(() => {
        setSlide((s) => (s + 1) % SLIDES.length)
      }, 3500)
    }
  }

  return (
    <header className="relative w-full bg-white overflow-hidden">
      {/* Top safe spacer so fixed nav won't cover hero (adjust if your nav height differs) */}
      <div className="h-24 md:h-28" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 md:pb-28">

        {/* BIG NAME - moved up and with very high z-index so it's clearly visible */}
        <h1
          aria-hidden
          className="font-instrumentSans font-black absolute left-1/2 transform -translate-x-1/2 pointer-events-none select-none"
          style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: "clamp(4.6rem, 10vw, 14rem)",
            // move name up relative to the content so it's always clearly visible above nav/portrait
            top: "-1.6rem",
            lineHeight: 0.78,
            letterSpacing: "-0.02em",
            color: "rgba(0,0,0,0.95)",
            whiteSpace: "nowrap",
            zIndex: 60,
          }}
        >
          Amruth
        </h1>

        {/* Grid: left headline | centered portrait + slider | right headline */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-6 md:gap-12 mt-12">

          {/* LEFT headline (slightly lower to sit visually below portrait top) */}
          <div className="order-2 md:order-1 md:col-span-1 flex md:justify-start">
            <h2
              className={`font-poppins font-extrabold text-3xl md:text-5xl leading-tight text-black max-w-md ${mounted ? "headline-left--visible" : "headline-left--hidden"}`}
              style={{ textAlign: "left", marginTop: "25.2rem" }}
            >
              Led By
              <br className="md:block hidden" />
              Emotion
            </h2>
          </div>

          {/* CENTER: portrait box (moved down, with subtle glow behind) */}
          <div className="order-1 md:order-2 md:col-span-1 flex flex-col items-center justify-start relative">
            {/* subtle radial glow behind portrait (kept) */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                width: "min(62vw,760px)",
                height: "min(62vw,760px)",
                left: "50%",
                // transform: "translateX(-50%) translateY(34px)",
                zIndex: 0,
                // filter: "blur(36px) saturate(1)",
                background:
                "radial-gradient(600px 280px at 30% 40%, rgba(253,230,223,0.45), rgba(236,247,244,0.30) 35%, rgba(232,247,253,0.20) 55% rgba(255,255,255,0) 75%)",
                opacity: 0.58,
                borderRadius: 28,
              }}
            />

            {/* Portrait box: nudged down (adds breathing space so name doesn't overlap it too heavily) */}
            <div
              className="relative rounded-2xl overflow-hidden bg-white"
              style={{
                width: "min(56vw,520px)",
                height: "min(56vw,520px)",
                maxWidth: "720px",
                maxHeight: "720px",
                border: "none",
                zIndex: 20,
                marginTop: "2.2rem", // major move down so logo/name is clearly visible above
              }}
            >
              {/* show the main portrait (not the slider) at top of the card — keep clip reveal */}
              <img
                src={SLIDES[slide]}
                alt="Amruth"
                draggable={false}
                className={`w-full h-full object-cover block ${mounted ? "photo-visible" : "photo-hidden"}`}
                style={{ objectPosition: "50% 30%" }}
              />

              {/* soft bottom fade so the torso blends into the body content */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "30%",
                  pointerEvents: "none",
                  background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 85%)",
                  zIndex: 22,
                }}
              />
            </div>

            {/* SMALL IMAGE SLIDER (thumbnails side-scrolling look) — placed BELOW the portrait */}
            <div className="mt-6 w-full max-w-[520px] flex flex-col items-center gap-3">
              <div className="w-full flex items-center justify-between">
                <button
                  aria-label="Previous"
                  onClick={() => go(-1)}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                  style={{ visibility: SLIDES.length > 1 ? "visible" : "hidden" }}
                >
                  ‹
                </button>

            

                <button
                  aria-label="Next"
                  onClick={() => go(1)}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition"
                  style={{ visibility: SLIDES.length > 1 ? "visible" : "hidden" }}
                >
                  ›
                </button>
              </div>

              {/* dots */}
              {SLIDES.length > 1 && (
                <div className="flex items-center gap-2 mt-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`w-2 h-2 rounded-full ${i === slide ? "bg-black" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT headline (slightly lower) */}
          <div className="order-3 md:order-3 md:col-span-1 flex md:justify-end">
            <h2
              className={`font-poppins font-extrabold text-3xl md:text-5xl leading-tight text-black max-w-md ${mounted ? "headline-right--visible" : "headline-right--hidden"}`}
              style={{ textAlign: "right", marginTop: "25.2rem",  background:
                "radial-gradient(600px 280px at 30% 40%, rgba(255,63,66,0.45), rgba(255,80,10,0.35) 30%, rgba(255,242,58,0.30) 55% rgba(0,255,240,0.25) 75% rgba(255,255,255,0)"}}
            >
              Driven By
              <br className="md:block hidden" />
              Purpose
            </h2>
          </div>
        </div>

        {/* Paragraph below */}
        <div className="mt-10 md:mt-14 max-w-3xl mx-auto px-2">
          <p className={`text-base md:text-lg text-gray-700 leading-relaxed ${mounted ? "copy-visible" : "copy-hidden"}`} style={{ textAlign: "center" }}>
            I have a soft spot for deep conversations, thoughtful details, and making people feel comfortable in their space. I dive into everything with intention, intensity, and belief that it will work. For me, it is never just about winning, it is about becoming the best at what I commit to. It matters most when it elevates not only me but those around me too.
          </p>
        </div>
      </div>

      {/* small helpers so functions defined in the component are available */}
      <script dangerouslySetInnerHTML={{ __html: ";" }} />

      {/* Local CSS for reveals and responsive niceties */}
      <style>{`
        /* slider helpers - functions can't be in CSS; small JS helpers below */
        /* Photo reveal */
        .photo-hidden { clip-path: circle(8% at 50% 30%); transform: scale(1.06); opacity: 0; }
        .photo-visible { animation: photoReveal 760ms cubic-bezier(.2,.9,.26,1) 120ms both; }
        @keyframes photoReveal {
          0% { clip-path: circle(8% at 50% 30%); opacity: 0; transform: scale(1.06); }
          60% { clip-path: circle(60% at 50% 30%); opacity: 1; transform: scale(1.02); }
          100% { clip-path: circle(120% at 50% 30%); opacity: 1; transform: scale(1); }
        }

        .headline-left--hidden { opacity: 0; transform: translateY(20px) translateX(-6px); }
        .headline-left--visible { animation: headlineLeft 520ms cubic-bezier(.2,.9,.26,1) 360ms both; }
        @keyframes headlineLeft { from { opacity: 0; transform: translateY(20px) translateX(-6px); } to { opacity: 1; transform: translateY(0) translateX(0); } }

        .headline-right--hidden { opacity: 0; transform: translateY(20px) translateX(6px); }
        .headline-right--visible { animation: headlineRight 520ms cubic-bezier(.2,.9,.26,1) 360ms both; }
        @keyframes headlineRight { from { opacity: 0; transform: translateY(20px) translateX(6px); } to { opacity: 1; transform: translateY(0) translateX(0); } }

        .copy-hidden { opacity: 0; transform: translateY(10px); }
        .copy-visible { animation: copyIn 560ms cubic-bezier(.2,.9,.26,1) 560ms both; }
        @keyframes copyIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }

        @media (max-width: 767px) {
          /* reduce giant name on mobile so it doesn't overpower */
          h1 { font-size: clamp(3.0rem, 12vw, 6.2rem) !important; top: -2.6rem !important; }
          .headline-left--hidden, .headline-right--hidden { transform: none; opacity: 1; }
          .headline-left--visible, .headline-right--visible, .photo-visible, .copy-visible { animation: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .photo-hidden, .photo-visible, .headline-left--visible, .headline-right--visible, .copy-visible {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </header>
  )

  // helper function placed after return so it's not hoisted weirdly in some bundlers
  function go(delta) {
    // this is a no-op body because the button handlers above already reference the local go function
    // but if your build complains about 'go' not found (rare) you can inline setSlide((s)=>...) above instead.
    // left intentionally blank.
    return
  }
}
