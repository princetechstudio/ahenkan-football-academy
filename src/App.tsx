import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Training from "./pages/Training";
import Fixtures from "./pages/Fixtures";
import Blogs from "./pages/Blogs";
import Staff from "./pages/Staff";
import Contact from "./pages/Contact";
import Media from "./pages/Media";
import Players from "./pages/Players";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SiteChrome({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isCms = pathname === "/admin";
  if (isCms) return <>{children}</>;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-paper font-body text-ink">
        <div className="noise-overlay" aria-hidden="true" />
        <SiteChrome>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/training" element={<Training />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/media" element={<Media />} />
            <Route path="/players" element={<Players />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </SiteChrome>
      </div>
    </HashRouter>
  );
}
