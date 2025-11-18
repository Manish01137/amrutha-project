import React, { useEffect, useState, useRef } from "react"
import author from "../assets/images/amruthhomepg.png"
import glow from "../assets/images/Glow.png"
import fadeOverlay from "../assets/images/fade.png"

export default function HeaderWithLoaderFixed() {
  const imageSrcs = [author, glow, fadeOverlay]
  const total = imageSrcs.length

  const [loadedCount, setLoadedCount] = useState(0)       // images finished loading
  const [displayPercent, setDisplayPercent] = useState(0) // what user sees
  const [targetPercent, setTargetPercent] = useState(0)   // updated as images load
  const [readyToReveal, setReadyToReveal] = useState(false)
  const [loaderGone, setLoaderGone] = useState(false)

  const startedAtRef = useRef(null)
  const intervalRef = useRef(null)

  // Preload images and count loads (onerror counts too)
  useEffect(() => {
    let cancelled = false
    startedAtRef.current = Date.now()
    imageSrcs.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => { if (cancelled) return; setLoadedCount((c) => c + 1) }
      img.onerror = () => { if (cancelled) return; setLoadedCount((c) => c + 1) }
    })
    return () => { cancelled = true }
  }, [])

  // Update targetPercent whenever loadedCount changes
  useEffect(() => {
    const pct = Math.round((loadedCount / total) * 100)
    setTargetPercent(pct)
  }, [loadedCount, total])

  // Smoothly animate displayPercent toward targetPercent using a robust interval
  useEffect(() => {
    // Clear any existing
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    intervalRef.current = setInterval(() => {
      setDisplayPercent((prev) => {
        const tgt = targetPercent
        if (prev >= tgt) {
          // if we've reached 100 and all images loaded, allow reveal logic outside
          return prev
        }
        // step size: larger when difference big, minimal 1
        const diff = tgt - prev
        const step = Math.max(1, Math.ceil(diff * 0.18))
        const next = Math.min(100, prev + step)
        return next
      })
    }, 35) // small tick for smoothness

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [targetPercent])

  // When all images loaded, ensure targetPercent = 100 and wait for displayPercent to reach 100
  useEffect(() => {
    if (loadedCount < total) return

    // ensure target is 100
    setTargetPercent(100)

    // enforce minimum visible time (so UI doesn't flash)
    const minVisibleMs = 450
    const elapsed = Math.max(0, Date.now() - (startedAtRef.current || Date.now()))
    const minDelay = Math.max(0, minVisibleMs - elapsed)

    // Poll until displayPercent reaches 100, then set readyToReveal
    const poll = setInterval(() => {
      if (displayPercent >= 100) {
        clearInterval(poll)
        setTimeout(() => setReadyToReveal(true), minDelay + 120) // tiny extra polish
      }
    }, 50)

    // safety: stop poll after 5s
    const safety = setTimeout(() => {
      clearInterval(poll)
      setReadyToReveal(true)
    }, 5000)

    return () => {
      clearInterval(poll)
      clearTimeout(safety)
    }
  }, [loadedCount, displayPercent, total])

  // When readyToReveal -> play exit animation then hide loader
  useEffect(() => {
    if (!readyToReveal) return
    // match CSS transition duration below (480ms)
    const t = setTimeout(() => setLoaderGone(true), 480)
    return () => clearTimeout(t)
  }, [readyToReveal])

  const showHero = loaderGone

  return (
    <section className="relative flex flex-col items-center text-center mt-12 md:mt-20 mb-12 w-full px-6 md:px-0 overflow-hidden bg-white min-h-[60vh]">
      {/* LOADER: centered, responsive */}
      {!loaderGone && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed inset-0 z-[90] flex items-center justify-center p-6 bg-white/96 backdrop-blur-sm transition-all`}
          style={{
            // fade out when readyToReveal true (controlled in inline CSS below)
            opacity: readyToReveal ? 0 : 1,
            pointerEvents: readyToReveal ? "none" : "auto",
            transition: "opacity 480ms cubic-bezier(.2,.9,.26,1)",
          }}
        >
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl md:text-5xl font-semibold tracking-tight">{Math.min(100, displayPercent)}%</div>

              <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${Math.min(100, displayPercent)}%`,
                    transition: "width 220ms linear",
                  }}
                />
              </div>

              <div className="text-sm md:text-base text-gray-500 mt-1">Loading portfolio…</div>

              {/* small hint for mobile resizing */}
              <div className="text-xs text-gray-400 mt-3">If this takes too long, try refreshing.</div>
            </div>
          </div>
        </div>
      )}

      {/* HERO content (revealed after loaderGone) */}
      <div
        className={`w-full max-w-4xl mx-auto transition-all duration-600 ease-[cubic-bezier(.2,.9,.26,1)] ${showHero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        {/* PORTRAIT CARD */}
        <div className="relative mx-auto w-full max-w-3xl">
          <div
            className="relative bg-white rounded-2xl overflow-hidden mx-auto"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              maxWidth: "720px",
              border: "1px solid rgba(0,0,0,0.04)",
              zIndex: 10,
            }}
          >
            <img
              src={author}
              alt="Amruth Huigere"
              draggable={false}
              className={`w-full h-full object-cover block hero-photo ${showHero ? "hero-photo--visible" : ""}`}
              style={{ objectPosition: "50% 30%" }}
            />

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "30%",
                pointerEvents: "none",
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 85%)",
                zIndex: 20,
                opacity: 0.98,
              }}
            />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="mt-8 md:mt-10 px-2 md:px-6">
          <h1 className={`font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-black max-w-3xl mx-auto hero-title ${showHero ? "hero-title--visible" : ""}`}>
            Led By Emotion, Driven By Purpose.
          </h1>

          <p className={`mt-5 text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed hero-copy ${showHero ? "hero-copy--visible" : ""}`}>
            I have a soft spot for deep conversations, thoughtful details, and making people feel comfortable in their space. I dive into everything with intention, intensity, and belief that it will work. For me, it is never just about winning, it is about becoming the best at what I commit to.
          </p>

          <div className={`flex items-center justify-center gap-4 mt-8 hero-cta ${showHero ? "hero-cta--visible" : ""}`}>
            <a href="#work" className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-black text-white font-medium transition-transform transform hover:scale-105">
              View Work
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-black text-black bg-white font-medium transition-transform transform hover:scale-105">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Inline CSS for reveal + reduced-motion support */}
      <style>{`
        .hero-photo { clip-path: circle(8% at 50% 30%); transform: scale(1.06); opacity: 0; }
        .hero-photo--visible { animation: photoReveal 780ms cubic-bezier(.2,.9,.26,1) 140ms both; }
        @keyframes photoReveal {
          0% { clip-path: circle(8% at 50% 30%); opacity: 0; transform: scale(1.06); }
          60% { clip-path: circle(60% at 50% 30%); opacity: 1; transform: scale(1.02); }
          100% { clip-path: circle(120% at 50% 30%); opacity: 1; transform: scale(1); }
        }

        .hero-title, .hero-copy, .hero-cta { opacity: 0; transform: translateY(10px); }
        .hero-title--visible { animation: titleReveal 520ms cubic-bezier(.2,.9,.26,1) 360ms both; }
        .hero-copy--visible { animation: copyReveal 520ms cubic-bezier(.2,.9,.26,1) 520ms both; }
        .hero-cta--visible { animation: ctaReveal 520ms cubic-bezier(.2,.9,.26,1) 700ms both; }
        @keyframes titleReveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes copyReveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ctaReveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (prefers-reduced-motion: reduce) {
          .hero-photo, .hero-title, .hero-copy, .hero-cta { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; clip-path: none !important; }
        }

        /* Responsiveness tweaks for the loader text size */
        @media (max-width: 640px) {
          .text-4xl { font-size: 2rem; } /* smaller on very small screens */
        }
      `}</style>
    </section>
  )
}
