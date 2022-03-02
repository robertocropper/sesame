import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Pricing() {
  const { user } = useContext(UserContext);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mx-auto xl:py-4">
      <div className="max-w-5xl pb-10 mx-auto text-left ">
        <h1 className="py-10 text-4xl font-extrabold ml-9 text-zinc-900 text-shadow-2xl xl:text-6xl">
          Uplevel Your Client Options.
        </h1>

        <div className="px-4 m-2 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold ml-9 text-zinc-900 sm:text-4xl sm:leading-none sm:tracking-tight lg:text-4xl">
            Pays for itself and 10 fold
          </h2>

          <div className="flex items-center mt-6">
            <p className="max-w-xl font-mono text-xl ml-9 text-zinc-900">
              Here's To Closing Easier
            </p>
            <p className="text-3xl ">🥂</p>
          </div>

          <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div className="relative flex flex-col p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900">Free</h3>

                <p className="flex items-baseline mt-4 text-zinc-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    $0
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-zinc-500">
                  A Sample, Tastes Great, But You May Need More
                </p>

                <ul role="list" className="mt-6 space-y-6">
                  <li className="flex">
                    <CheckIcon
                      className="flex-shrink-0 w-6 h-6 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-zinc-500">2 Case Studies</span>
                  </li>
                </ul>
              </div>
              {user ? (
                <button
                  disabled
                  className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm opacity-70 text-zinc-900"
                >
                  Current Plan
                </button>
              ) : (
                <Link to="/signup">
                  <button className="block w-full px-6 py-3 mt-8 text-sm font-medium text-center bg-white border border-gray-300 rounded-md shadow-sm text-zinc-900 hover:bg-gray-50">
                    Signup
                  </button>
                </Link>
              )}
            </div>
            {enabled === false ? (
              <div className="relative flex flex-col p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900">
                    Freelancer | Incorporated Entity
                  </h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                    Most popular
                  </p>
                  <p className="flex items-baseline mt-4 text-zinc-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      $24
                    </span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
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
                        <span className="text-sm font-medium text-zinc-900">
                          Annual billing
                        </span>
                        <span className="text-sm text-zinc-500">(30% OFF)</span>
                      </Switch.Label>
                    </Switch.Group>
                  </p>
                  <p className="mt-6 text-zinc-500">A Professional's Plan.</p>

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
                    <input type="hidden" name="lookup_key" value="monthly" />
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
              <div className="relative flex flex-col p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900">
                    Freelancer | Incorporated Entity
                  </h3>
                  <p className="absolute top-0 py-1.5 px-4 bg-blue-600 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                    Most popular
                  </p>
                  <div className="flex items-baseline mt-4 text-zinc-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      $16
                    </span>
                    <span className="ml-1 text-xl font-semibold">/month</span>
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
                  <p className="mt-6 text-zinc-500">A Professional's Plan.</p>

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
                    <input type="hidden" name="lookup_key" value="annually" />
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
    </div>
  );
}
