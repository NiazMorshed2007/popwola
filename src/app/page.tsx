import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Technologies from "./components/Technologies";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <main>
      <ScrollArea className="h-screen">
        <Header />
        <HeroSection />
        <Features />
        <Technologies />
        <Footer />
      </ScrollArea>
    </main>
  );
};

export default Home;
