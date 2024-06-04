'use client'
import React, { useRef } from "react";
import { useProductContext } from "@/app/context/ProductContext/ProductContext";

const Index = () => {
  const { products } = useProductContext()
  return (
    <div className="py-20">
      <h1 className="text-center text-4xl md:text-70px font-bold mb-4">
        {products.length} + Free & Premium Tailwind Templates
      </h1>
      <h5 className="text-center opacity-75 mb-5">
        Find the Perfect Starting Point for Your Project, it has a vast
        collection of <br />
        free and premium Tailwind admin / templates / dashboards.
      </h5>
      <div className="text-center">
        <button
          className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white transition hover:bg-dark dark:bg-primary dark:hover:bg-primary/80"

        >
          Browse Templates
        </button>

      </div>
    </div>
  );
};

export default Index;
