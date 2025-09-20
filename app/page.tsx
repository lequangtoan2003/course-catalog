"use client";

import { CourseCatalog } from "../app/_components/CourseCatalog";
import Banner from "./_components/Banner";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1512px] mx-auto">
      <Header />
      <Banner />
      <main className="flex-grow">
        <CourseCatalog />
      </main>
      <Footer />
    </div>
  );
}
