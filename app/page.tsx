import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getTariffCatalog } from "@/lib/tariffs";

export default async function Home() {
  const tariffCatalog = await getTariffCatalog();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <div className="gold-divider mx-12 opacity-15" />
      <Portfolio />
      <div className="gold-divider mx-12 opacity-15" />
      <Pricing catalog={tariffCatalog} />
      <div className="gold-divider mx-12 opacity-15" />
      <Contact tariffCatalog={tariffCatalog} />
      <Footer />
    </>
  );
}
