import { motion } from 'framer-motion';

// Import all gallery images
import gal1 from '../assets/images/gallery/gal1.png';
import gal2 from '../assets/images/gallery/gal2.png';
import gal3 from '../assets/images/gallery/gal3.png';
import gal4 from '../assets/images/gallery/gal4.png';
import gal5 from '../assets/images/gallery/gal5.png';
import gal6 from '../assets/images/gallery/gal6.png';
import gal7 from '../assets/images/gallery/gal7.png';
import gal8 from '../assets/images/gallery/gal8.png';
import gal9 from '../assets/images/gallery/gal9.png';
import gal10 from '../assets/images/gallery/gal10.png';
import gal11 from '../assets/images/gallery/gal11.png';
import gal12 from '../assets/images/gallery/gal12.png';
import gal13 from '../assets/images/gallery/gal13.png';
import gal14 from '../assets/images/gallery/gal14.png';
import gal15 from '../assets/images/gallery/gal15.png';

const galleryImages = [
  gal1, gal2, gal3, gal4, gal5,
  gal6, gal7, gal8, gal9, gal10,
  gal11, gal12, gal13, gal14, gal15
];

// Assign vertical offset classes to just some images for "scattered" feel
const verticalOffsets = [
  '',          // gal1
  'mt-10',     // gal2 (spread down)
  '',          // gal3
  'mt-20',     // gal4
  '',          // gal5
  'mt-8',      // gal6
  '',          // gal7
  'mt-16',     // gal8
  '',          // gal9
  'mt-12',     // gal10
  '',          // gal11
  'mt-20',     // gal12
  '',          // gal13
  'mt-10',     // gal14
  '',          // gal15
];

export default function GallerySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[120rem] mx-auto">
        <div className="w-full px-4 md:px-8 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-instrumentSans font-semibold text-4xl md:text-6xl lg:text-7xl text-black mb-8 md:mb-12"
          >
            My Gallery
          </motion.h2>
        </div>
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className={`w-full ${verticalOffsets[index]}`}
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto max-w-full hover:opacity-90 transition-opacity rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
