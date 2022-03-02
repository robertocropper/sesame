import React, { useContext, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Menu, Popover, Dialog, Transition } from "@headlessui/react";

import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function True() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { uid } = useParams();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  async function handleLogout() {
    try {
      setLoading(true);
      axios.post(`/api/auth/logout`);
      navigate(`/`);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <Popover>
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-md bg-zinc-50">
              <div className="grid grid-cols-2 space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="w-full bg-white border-b ">
        <div className="flex items-center justify-between h-16 px-6 py-6 mx-auto shadow-sm md:justify-start md:space-x-10">
          <div className="flex items-end justify-start lg:w-0 lg:flex-1">
            <Link to="/" href="">
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
            <Link
              to={`/showcase/${user.uid}`}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Showcase
            </Link>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none">
                  Me
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.displayname}
                    </p>

                    {/*
                    {user.status !== "active" ? (
                      <span>
                        <Link
                          to="/pricing"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Upgrade Plan
                        </Link>
                      </span>
                    ) : user.plan !== null ? (
                      <span>
                        <t className="text-sm font-medium text-blue-600">
                          Professional
                        </t>
                      </span>
                    ) : null}
                    */}
                  </div>
                  <div className="py-1">
                    {user.status === "active" ? (
                      <Menu.Item>
                        {({ active }) => (
                          <form
                            action="/api/stripe/create-portal-session"
                            method="POST"
                          >
                            <input
                              type="hidden"
                              name="customer"
                              value={`${user.stripeid}`}
                            />

                            <button
                              id="checkout-and-portal-button"
                              type="submit"
                              className={classNames(
                                active
                                  ? "flex justify-start w-full cursor-pointer bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "flex justify-start w-full block px-4 py-2 text-sm"
                              )}
                            >
                              Plan & Billing
                            </button>
                          </form>
                        )}
                      </Menu.Item>
                    ) : null}

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="support"
                          className={classNames(
                            active
                              ? "cursor-pointer bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Support
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          onClick={openModal}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full text-left px-4 py-2 text-sm"
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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
                  <h1 className="text-xl font-extrabold text-gray-900">
                    Sesame
                  </h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="px-5 py-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                <Link
                  to={`/showcase/${user.uid}`}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Showcase
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
