import { ScrollArea } from "@/components/ui/scroll-area";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";

const Home = () => {
  return (
    <main>
      <ScrollArea className="h-screen">
        <Header />
        <HeroSection />
      </ScrollArea>
    </main>
  );
};

export default Home;
