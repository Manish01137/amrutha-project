import '@fontsource/poppins';
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/inter'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage'
import ContactUs from './pages/ContactUs'
import VenturesPage from './pages/VenturesPage';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pursuits" element={<VenturesPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

