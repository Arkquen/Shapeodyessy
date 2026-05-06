import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Webinar from "./pages/Webinar";
import Ads from "./pages/Ads";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import "./styles/globals.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
        <div className="noise-bg"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/webinar" element={<Webinar />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}