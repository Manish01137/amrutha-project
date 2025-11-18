import author from '../assets/images/amruthhomepg.png'
import glow from '../assets/images/Glow.png'
import fadeOverlay from '../assets/images/fade.png'

export default function Header() {
  return (
    <section className="relative flex flex-col items-center text-center mt-20 mb-12 w-full px-2 md:px-0 overflow-x-hidden overflow-y-hidden">

      <div className="relative flex flex-col items-center w-fit">
        {/* Name text with Instrument Sans and responsive scaling */}
        <h1
          className="font-instrumentSans font-semibold absolute left-1/2 leading-tight text-black"
          style={{
            fontFamily: '"Instrument Sans", sans-serif',
            fontSize: "clamp(4rem, 10vw, 10.5rem)", // responsive font size
            top: "clamp(-3%, -5%, -5%)", // responsive top offset
            transform: "translateX(-50%)",
            zIndex: 0,
            opacity: 1,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Amruth
        </h1>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={glow}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "clamp(300px, 60vw, 960px)",
              height: "clamp(300px, 60vw, 960px)",
              transform: "translate(-50%, -50%)",
              opacity: 0.7,
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 1,
              animation: "glowPulse 6s ease-in-out infinite",
            }}
          />

          <img
            src={author}
            alt="Amruth Huigere"
            draggable={false}
            className="relative rounded-xl z-10 object-cover"
            style={{
              width: "clamp(300px, 40vw, 800px)",
              height: "clamp(300px, 40vw, 800px)",
              background: "none",
            }}
          />

          <img
            src={fadeOverlay}
            alt=""
            draggable={false}
            className="absolute top-[65%] left-0 w-full h-full z-20 pointer-events-none scale-[1.5] md:scale-150"
            style={{ objectFit: "contain", opacity: 1, background: "none" }}
          />
        </div>
      </div>

      {/* Updated block: headline on top, then paragraph below */}
      <div className="w-full max-w-7xl text-center mx-auto mt-8 z-20">
        <div className="font-poppins font-bold text-base md:text-3xl text-black mb-1">
          Led By Emotion, Driven By Purpose.
        </div>
        <p className="font-poppins text-xs sm:text-sm md:text-base lg:text-xl text-black mt-6 leading-relaxed">
          I have a soft spot for deep conversations, thoughtful details, and making people feel comfortable in their space. I dive into everything with intention, intensity, and belief that it will work. For me, it is never just about winning, it is about becoming the best at what I commit to. It matters most when it elevates not only me but those around me too.
        </p>
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
