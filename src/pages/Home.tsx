// import { useQuery } from "@tanstack/react-query";
// import api from "./api";

import { useContext } from "react";

import "../App.css";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { TopPicks } from "../components/TopPicks";
import { BestSellers } from "../components/BestSellers";
import { RecyclingBanner } from "../components/RecyclingBanner";
import { Footer } from "../components/Footer";

import { shopContext } from "../Router";

export function Home() {
  const { state } = useContext(shopContext);
  return (
    <main className="md:w-[80%] flex flex-col justify-center items-center xxs:w-[95%]">
      <NavBar />
      <Hero />
      <TopPicks products={state.products} />
      <BestSellers products={state.products} />
      <RecyclingBanner />
      <Footer />
    </main>
  );
}
