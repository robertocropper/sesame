import React from 'react';
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="p-4 mx-auto md:max-w-5xl ">
        <div className="py-10 md:flex md:items-center md:justify-between ">
          <div className="flex gap-4 mt-8 md:mt-0 md:order-1">
            <p className="text-base text-gray-400">&copy; Sesame</p>

            <Link
              to="support"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Support
            </Link>
            {/* <Link
              to="login"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Login
            </Link>
            <Link
              to="signup"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Signup
            </Link>
            <Link
              to="terms"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Terms
            </Link>
            <Link
              to="privacy"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Privacy
            </Link>
            <Link
              to="founder"
              className="text-base text-gray-400 hover:text-gray-900 hover:underline "
            >
              Founder's Letter
            </Link>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
}
