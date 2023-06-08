import { ScrollArea } from "@/components/ui/scroll-area";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Technologies from "./components/Technologies";

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
