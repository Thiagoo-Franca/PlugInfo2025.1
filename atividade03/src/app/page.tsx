import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Perks from "@/components/Perks";
import Reviews from "@/components/Reviews";
import Social from "@/components/Social";
import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Perks />
      <Reviews />
      <Menu />
      <Social />
      <Footer />
    </>
  );
}
