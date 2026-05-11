import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import WebinarForm from "./pages/WebinarForm";
import "./styles/globals.css";

// Renders the background page + modal layered on top
function SiteWithModal() {
  const location = useLocation();
  const isFormOpen = location.pathname === "/webinar-form";

  return (
    <div className="dark min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <div className="noise-bg"></div>
      <ScrollToTop />
      <Navbar />

      {/* Always render the site routes underneath */}
      <Routes location={isFormOpen ? { pathname: "/webinar" } : location}>
        <Route path="/"        element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/ads"     element={<Ads />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms"   element={<TermsConditions />} />
        <Route path="/refund"  element={<RefundPolicy />} />
      </Routes>

      <Footer />

      {/* Modal overlaid on top when /webinar-form */}
      {isFormOpen && <WebinarForm />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone locked page — no Navbar/Footer */}
        <Route path="/webinar-registration" element={<WebinarRegistration />} />

        {/* All site pages + modal overlay */}
        <Route path="/*" element={<SiteWithModal />} />
      </Routes>
    </BrowserRouter>
  );
}