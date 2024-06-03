import { ScrollRestoration } from "react-router-dom";
import { AuroraBackground } from "@/shadcn/ui/aurora-background";

import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { TopPicks } from "../components/TopPicks";
import { BestSellers } from "../components/BestSellers";
import { RecyclingBanner } from "../components/RecyclingBanner";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <main className="w-screen md:w-[80%] flex flex-col justify-start items-center xxs:w-full  ">
      <NavBar />
      <AuroraBackground className="!z-0" />
      <Hero />
      <TopPicks />
      <BestSellers />
      <RecyclingBanner />
      <Footer />
      <ScrollRestoration />
    </main>
  );
}
