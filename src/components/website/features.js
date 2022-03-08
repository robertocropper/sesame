import React from "react";
import { CheckIcon } from "@heroicons/react/outline";

const features = [
  {
    name: "Close More Clients",
    type: "Why",
    description:
      "If You Need More Clients, Increase How Many People Want To Be Your Client.",
  },

  {
    name: "Build Credibility",
    type: "Why",
    description:
      "Go Direct, Show You Know What You're Talking About In Digestable Case Studies",
  },
  {
    name: "Show Off, Humbly",
    type: "Why",
    description:
      "Go Direct, Show You Know What You're Talking About In Digestable Case Studies",
  },
  {
    name: "Close Big Clients",
    type: "Why",

    description: "Show What You Can Do, Let Prospects Decide.",
  },
];

export default function Features() {
  return (
    <div className="bg-white">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
        {/*}
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl font-extrabold text-gray-900">Why & How?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Why You Should Use It And How It Achieves The Why
          </p>
  </div>*/}

        <dl className="mx-auto space-y-10 text-left w-96 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-1 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <CheckIcon
                  className="absolute w-6 h-6 text-blue-600"
                  aria-hidden="true"
                />

                <p className="text-4xl font-bold leading-6 text-zinc-800 ml-9">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 text-zinc-500 text-md ml-9">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
