import React, { useContext, useState, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  ChevronDownIcon,
  MenuIcon,
  XIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { Menu, Popover, Dialog, Transition, Switch } from "@headlessui/react";

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
  const [enabled, setEnabled] = useState(true);

  let [isOpen, setIsOpen] = useState(false);
  let [pricingIsOpen, setPricingIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closePricingModal() {
    setPricingIsOpen(false);
  }

  function openPricingModal() {
    setPricingIsOpen(true);
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
      <Transition appear show={pricingIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 mx-auto overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center ">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className={
                "fixed relative inline-block w-full md:w-2/5 m-4 text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl"
              }
            >
              <div className="border-b divide-y">
                <div className="flex items-center justify-between">
                  <th className="px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase "></th>
                  <div className="flex justify-end ml-4">
                    <div className="relative flex justify-end text-left">
                      <button
                        onClick={closePricingModal}
                        className="flex items-center justify-start px-4 py-2 border-none focus:ring-0 hover:bg-gray-100"
                      >
                        <XIcon className="w-6 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                {enabled === false ? (
                  <div className="fixed relative w-full p-8 mx-auto align-middle">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-zinc-900">
                        A Professional's Plan
                      </h3>
                      <p className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                        Most popular
                      </p>
                      <p className="flex items-baseline mt-4 text-zinc-900">
                        <span className="text-5xl font-extrabold tracking-tight">
                          £17
                        </span>
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                        <Switch.Group
                          as="div"
                          className="flex items-center mt-2 ml-4"
                        >
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={classNames(
                              enabled ? "bg-blue-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                enabled ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                          <Switch.Label as="span" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">
                              Annual billing
                            </span>
                            <span className="text-sm text-zinc-500">
                              {" "}
                              (30% OFF)
                            </span>
                          </Switch.Label>
                        </Switch.Group>
                      </p>

                      <ul role="list" className="mt-6 space-y-6">
                        <div className="flex">
                          <CheckIcon
                            className="flex-shrink-0 w-6 h-6 text-blue-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-zinc-500">
                            Unlimited Case Studies
                          </span>
                        </div>
                        {/*
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Discoverable via Search Bar
                  </span>
                </div>
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Uploading Photos & Files
                  </span>
                </div>
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Add Case Study Specific Metrics & KPIs
                  </span>
                </div>
                */}
                      </ul>
                    </div>
                    {user ? (
                      <form
                        action="/api/stripe/create-checkout-session"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="lookup_key"
                          value="monthly"
                        />
                        <button
                          type="submit"
                          className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50"
                        >
                          Pay Monthly
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <Link to="/signup">
                          <button className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50">
                            Signup
                          </button>
                        </Link>
                        <Link to="/login">
                          <button className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50">
                            Login
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="fixed relative w-full p-8 mx-auto align-middle">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-zinc-900">
                        A Professional's Plan
                      </h3>
                      <p className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                        Most popular
                      </p>
                      <div className="flex items-baseline mt-4 text-zinc-900">
                        <span className="text-5xl font-extrabold tracking-tight">
                          £12
                        </span>
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                        <Switch.Group
                          as="div"
                          className="flex items-center mt-2 ml-4"
                        >
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={classNames(
                              enabled ? "bg-blue-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                enabled ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                          <Switch.Label as="span" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">
                              Annual billing
                            </span>
                            <span className="text-sm text-zinc-500">
                              {" "}
                              (30% OFF)
                            </span>
                          </Switch.Label>
                        </Switch.Group>
                      </div>
                      <ul role="list" className="mt-6 space-y-6">
                        <div className="flex">
                          <CheckIcon
                            className="flex-shrink-0 w-6 h-6 text-blue-600"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-zinc-500">
                            Unlimited Case Studies
                          </span>
                        </div>
                        {/*
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Discoverable via Search Bar
                  </span>
                </div>
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Uploading Photos & Files
                  </span>
                </div>
                <div className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="ml-3 text-gray-500">
                    Add Case Study Specific Metrics & KPIs
                  </span>
                </div>
                */}
                      </ul>
                    </div>
                    {user ? (
                      <form
                        action="/api/stripe/create-checkout-session"
                        method="POST"
                      >
                        <input
                          type="hidden"
                          name="lookup_key"
                          value="annually"
                        />
                        <button
                          id="checkout-and-portal-button"
                          type="submit"
                          className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50"
                        >
                          Pay Annually
                        </button>
                      </form>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <Link to="/signup">
                          <button className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50">
                            Signup
                          </button>
                        </Link>
                        <Link to="/login">
                          <button className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50">
                            Login
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
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
                {/*}  <span className=" ml-1 px-1 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                  beta
                  </span>*/}
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
                    {/*}
                    {user.status !== "active" ? (
                      <span>
                        <button
                          onClick={openPricingModal}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Upgrade Plan
                        </button>
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
