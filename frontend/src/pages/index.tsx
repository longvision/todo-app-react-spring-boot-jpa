import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Divider } from "@mui/material";
import { MainLayout } from "../components/main-layout";
import { HomeHero } from "../components/home/home-hero";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  );
};

export default Home;
