import React from "react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <div className="bg-white">
      <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-800 sm:text-4xl">
          <span className="block">Standout From Any Shortlists</span>
          <span className="block">&</span>

          <span className="block">Start Free</span>
        </h2>
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="signup"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-sm hover:opacity-80"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
