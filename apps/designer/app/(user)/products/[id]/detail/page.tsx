"use client";
import { useState } from "react";
import Image from "next/image";
import Infor from "./Infor";
import Rating from "./rating";

export default function DesignDetail() {
 

  return (
    <div className="min-h-screen bg-white">
      {/* Content */}
      <main className="flex flex-col md:flex-row max-w-5xl mx-auto p-10 gap-10">
        <Infor />
      </main>

      {/* Ratings */}
      <Rating />
    </div>
  );
}
