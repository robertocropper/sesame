import axios from "axios";
import React from "react";
import { Demo } from "./demo";
import Features from "./features";
import { Pricing } from "./pricing";

export function LandingPage() {
  return (
    <>
      <div className="w-screen mx-auto">
        <div className="pt-20 text-center ">
          <h1 className="text-4xl font-extrabold text-zinc-800 xl:text-6xl">
            Make It Irrestiable For Your Prospects
          </h1>

          <h1 className="pt-6 font-mono text-md text-zinc-900 text-shadow-2xl shadow-blue-600 xl:pt-7 xl:text-2xl">
            By Showcasing Your Client-Jobs Thoroughly on Autopilot
          </h1>

          <span className="my-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            For Freelancers & Small, Medium-Sized Enterprises
          </span>
        </div>
      </div>

      <div id="demo" className="min-h-screen py-16 pb-40 mx-4 border-b ">
        <div className="max-w-5xl mx-auto text-left ">
          <Demo />
        </div>
      </div>
      <div className="py-16">
        <div className="mx-auto ">
          <Features />
        </div>
      </div>
      {/*
      <div className="py-16">
        <div className="max-w-5xl mx-auto text-left ">
          <Pricing />
        </div>
      </div>
      */}
    </>
  );
}
