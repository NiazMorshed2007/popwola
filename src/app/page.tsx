import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export const metadata = {
  title: "Popwola",
  description: "Your only lead gen app for your business",
};

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
