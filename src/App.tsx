import Header from "./components/Header";
import Hero from "./components/Hero";
import { Academy, Steps } from "./components/Sections";
import { Programs, Schedule } from "./components/Programs";
import { Community, Leadership } from "./components/People";
import { Gallery, News, Testimonials } from "./components/News";
import Trials from "./components/Trials";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-pitch-950 font-body text-bone-50">
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Academy />
        <Programs />
        <Schedule />
        <Steps />
        <Leadership />
        <Community />
        <Testimonials />
        <News />
        <Gallery />
        <Trials />
      </main>
      <Footer />
    </div>
  );
}
