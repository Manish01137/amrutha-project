import Awards from '../components/Awards'
import Header from '../components/Header'
import Journey from '../components/Journey'
import LetsTalk from '../components/LetsTalk'
import Navbar from '../components/Navbar'
import Ventures from '../components/Ventures'
import Footer from '../components/Footer'
import GallerySection from '../components/GallerySection'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    let tries = 0
    const maxTries = 24

    const attempt = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      tries += 1
      if (tries < maxTries) requestAnimationFrame(attempt)
    }

    // Defer to the next frame so DOM can paint first
    requestAnimationFrame(attempt)
  }, [location.hash])

  const controls = useAnimation()
  const refs = {
    header: useRef(null),
    journey: useRef(null),
    ventures: useRef(null),
    awards: useRef(null),
    gallery: useRef(null),
    letsTalk: useRef(null)
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  }

  const item = (delay = 0) => ({
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: 'blur(4px)'
    },
    show: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0)',
      transition: {
        duration: 0.8,
        delay: delay * 0.1,
        ease: [0.16, 0.77, 0.3, 0.95],
        filter: {
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1]
        }
      }
    }
  })

  // Check if elements are in view
  const isInView = {
    header: useInView(refs.header, { once: true, margin: "-20% 0px -20% 0px" }),
    journey: useInView(refs.journey, { once: true, margin: "-10% 0px -10% 0px" }),
    ventures: useInView(refs.ventures, { once: true, margin: "-10% 0px -10% 0px" }),
    awards: useInView(refs.awards, { once: true, margin: "-10% 0px -10% 0px" }),
    gallery: useInView(refs.gallery, { once: true, margin: "-10% 0px -10% 0px" }),
    letsTalk: useInView(refs.letsTalk, { once: true, margin: "-10% 0px -10% 0px" })
  }

  // Trigger animations when elements come into view
  useEffect(() => {
    Object.entries(isInView).forEach(([key, inView]) => {
      if (inView) {
        controls.start(key)
      }
    })
  }, [isInView, controls])

  return (
    <motion.main 
      className="flex flex-col items-center font-inter bg-white min-h-screen overflow-x-hidden"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <Navbar />
      <motion.div 
        ref={refs.header}
        variants={item(0)}
        initial="hidden"
        animate={isInView.header ? "show" : "hidden"}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      >
        <Header />
      </motion.div>
      
      <motion.div 
        ref={refs.journey}
        variants={item(1)}
        initial="hidden"
        animate={isInView.journey ? "show" : "hidden"}
        className="w-full"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      >
        <Journey />
      </motion.div>
      
      <motion.div 
        ref={refs.ventures}
        variants={item(2)}
        initial="hidden"
        animate={isInView.ventures ? "show" : "hidden"}
        className="w-full"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      >
        <Ventures />
      </motion.div>
      
      <motion.div 
        ref={refs.awards}
        variants={item(3)}
        initial="hidden"
        animate={isInView.awards ? "show" : "hidden"}
        className="w-full"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      >
        <Awards />
      </motion.div>
      
      <motion.div 
        ref={refs.gallery}
        variants={item(4)}
        initial="hidden"
        animate={isInView.gallery ? "show" : "hidden"}
        className="w-full"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      >
        <GallerySection />
      </motion.div>
      
      <motion.div 
        ref={refs.letsTalk}
        variants={item(5)}
        initial="hidden"
        animate={isInView.letsTalk ? "show" : "hidden"}
        className="w-full"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      >
        <LetsTalk />
      </motion.div>
      
      <Footer />
    </motion.main>
  )
}
