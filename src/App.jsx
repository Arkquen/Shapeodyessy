import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Webinar from "./pages/Webinar";
import Ads from "./pages/Ads";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import WebinarRegistration from "./pages/WebinarRegistration";
import "./styles/globals.css";

// Layout wrapper — Navbar + Footer — used for all main site pages
function SiteLayout({ children }) {
  return (
    <div className="dark min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <div className="noise-bg"></div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* ── STANDALONE LOCKED PAGE — no Navbar/Footer, no site navigation ── */}
        <Route path="/webinar-registration" element={<WebinarRegistration />} />

        {/* ── ALL MAIN SITE PAGES — wrapped in Navbar + Footer ── */}
        <Route
          path="/*"
          element={
            <SiteLayout>
              <Routes>
                <Route path="/"       element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/webinar" element={<Webinar />} />
                <Route path="/ads"     element={<Ads />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms"   element={<TermsConditions />} />
                <Route path="/refund"  element={<RefundPolicy />} />
              </Routes>
            </SiteLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}