// import { useContext } from "react";

import "../App.css";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { TopPicks } from "../components/TopPicks";
import { BestSellers } from "../components/BestSellers";
import { RecyclingBanner } from "../components/RecyclingBanner";
import { Footer } from "../components/Footer";
import { AuroraBackground } from "@/shadcn/ui/aurora-background";

// import { shopContext } from "../Router";
// import { Product } from "@/types";

export function Home() {
  // const { state, dispatch } = useContext(shopContext);

  return (
    <main className="md:w-[80%] flex flex-col justify-center items-center xxs:w-[95%]">
      <NavBar />
      <AuroraBackground className="!z-0" />
      <Hero />
      <TopPicks />
      <BestSellers />
      <RecyclingBanner />
      <Footer />
    </main>
  );
}
