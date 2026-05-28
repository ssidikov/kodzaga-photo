import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="gold-divider mx-12 opacity-15" />
      <About />
      <div className="gold-divider mx-12 opacity-15" />
      <Portfolio />
      <div className="gold-divider mx-12 opacity-15" />
      <Pricing />
      <div className="gold-divider mx-12 opacity-15" />
      <Contact />
      <Footer />
    </>
  );
}
