import React, { Fragment } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

export default function False() {
  /*function handleKeyDown(event) {
    if (event.key === "a") {
      console.log("Enter key pressed");
    }
  }*/

  const location = useLocation();

  return (
    <Popover>
      <div className="w-full bg-white border-b">
        <div className="flex items-center justify-between h-16 px-6 py-6 mx-auto md:justify-start md:space-x-10">
          <div className="flex items-center justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="flex items-start">
                <h1 className="text-2xl font-extrabold underline text-zinc-900">
                  S
                </h1>
                <h1 className="text-2xl font-extrabold text-zinc-900">esame</h1>
                <span className=" ml-1 px-1 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                  beta
                </span>
              </span>
            </Link>
          </div>
          {/*
          {location.pathname === "/" ? (
            <>
              <div className="mx-4 ">
                <a href="#why">
                  <h1 className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 rounded-md text-md hover:bg-gray-50">
                    How & Why
                  </h1>
                </a>
              </div>

              <div className="mx-4 ">
                <a href="#demo">
                  <h1 className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 rounded-md text-md hover:bg-gray-50">
                    Example
                  </h1>
                </a>
              </div>

              <div className="mx-4 ">
                <a href="#pricing">
                  <h1 className="flex items-center justify-center px-4 py-2 font-medium text-gray-700 rounded-md text-md hover:bg-gray-50">
                    Pricing
                  </h1>
                </a>
              </div>
            </>
          ) : null}
          */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 ">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden space-x-10 md:flex"
          ></Popover.Group>
          <div className="items-center justify-end hidden gap-4 md:flex md:flex-1 lg:w-0">
            {/*
            <div className="relative flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                onKeyDown={handleKeyDown}
                className="flex items-center justify-start px-4 py-3 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm bg-gray-50 w-80 hover:bg-gray-50 focus:outline-none focus:bg-white"
                placeholder="Search Case Studies & Projects"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center px-2.5 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded focus:outline-none">
                  /
                </kbd>
              </div>
            </div>
            */}
            <Link
              to="/login"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 "
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-extrabold text-zinc-900">
                    Sesame
                  </h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 bg-white rounded-md text-zinc-400 hover:text-zinc-500 hover:bg-gray-100">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

            <div className="px-5 py-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link to="/signup" href="">
                  <h1 className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-zinc-700 hover:bg-gray-50">
                    Signup
                  </h1>
                </Link>
                <Link to="/login" href="">
                  <h1 className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-zinc-700 hover:bg-gray-50">
                    Login
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
