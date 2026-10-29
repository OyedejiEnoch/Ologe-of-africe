import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import CategoryFilmstrip from "@/components/CategoryFilmstrip";
import TheEdit from "@/components/TheEdit";
import AsWorn from "@/components/AsWorn";
import OriginStory from "@/components/OriginStory";
import GraceReveal from "@/components/GraceReveal";
import Lookbook from "@/components/Lookbook";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import JoinList from "@/components/JoinList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Everything below rides up over the sticky hero (z-10 on cream), so the
          hero appears to recede as this section rises — the Vero transition. */}
      <div className="relative z-10 bg-cream">
        <Manifesto />
        <CategoryFilmstrip />
        <TheEdit />
        <AsWorn />
        <OriginStory />
        <GraceReveal />
        <Lookbook />
        <HowToOrder />
        <Faq />
        <JoinList />
        <Footer />
      </div>
    </main>
  );
}
