import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Menu from "../../components/Menu/Menu";
import Perks from "../../components/Perks/Perks";
import Reviews from "../../components/Reviews/Reviews";
import Social from "../../components/Social/Social";


export default function Home() {

  return (
    <>
      <Header />
      <Hero />
      <Perks />
      <Reviews />
      <Menu />
      <Contact />
      <Social />
      <Footer />
    </>
  );

}