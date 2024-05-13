// import { useQuery } from "@tanstack/react-query";
// import api from "../api";

import { useContext } from "react";

import "../App.css";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";
import { TopPicks } from "../components/TopPicks";
import { BestSellers } from "../components/BestSellers";
import { RecyclingBanner } from "../components/RecyclingBanner";
import { Footer } from "../components/Footer";

import { shopContext } from "../Router";
// import { Product } from "@/types";

export function Home() {
  const { state } = useContext(shopContext);

  console.log(state);

  // const getProducts = async () => {
  //   try {
  //     const res = await api.get("/products", {
  //       headers: {
  //         Authorization: `Bearer ${state.userTokens.admin}`,
  //       },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error(error);
  //     return Promise.reject(new Error("Something went wrong"));
  //   }
  // };

  // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });

  return (
    <main className="md:w-[80%] flex flex-col justify-center items-center xxs:w-[95%]">
      <NavBar userInfo={state.userInfo} />
      <Hero />
      <TopPicks products={state.products} />
      <BestSellers products={state.products} />
      <RecyclingBanner />
      <Footer />
    </main>
  );
}
