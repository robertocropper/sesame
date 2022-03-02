import React from "react";
import { CheckIcon } from "@heroicons/react/outline";

const features = [
  {
    name: "More Clients",
    type: "Why",
    description:
      "If You Need More Clients, Increase How Many People Want To Be Your Client.",
  },
  {
    name: "Big Clients",
    type: "Why",

    description:
      "Bigger Clients Have Bigger Budgets, But You Need Their Trust.",
  },
  {
    name: "Showcase Your Client-Jobs",
    type: "Why",

    description:
      "House All Your Client-Jobs In One Place, A Portfolio For Service Providers.",
  },
  {
    name: "Transparency & Context",
    type: "Why",

    description: "Show What To Expect And How You Work With Your Clients.",
  },
  {
    name: "Social Proof",
    type: "How",

    description:
      "They Can See People Work With You, Nobody Wants To Be Someone's First Client.",
  },
  {
    name: "Build Trust",
    type: "How",

    description: "Being Transparent, Showing Your Competence Builds Trust Fast",
  },
  {
    name: "Client Successes",
    type: "How",

    description: "Show Them What You've Achieved For Clients.",
  },
  {
    name: "Relevancy",
    type: "How",
    description:
      "People Are More Likely To Work With Someone Who Has Achieved A Result That Is Relevant To Their Situation.",
  },
];

export default function Features() {
  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Why & How?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Why You Should Use It And How It Achieves The Why
          </p>
        </div>

        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <CheckIcon
                  className="absolute w-6 h-6 text-green-500"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium tracking-wide text-left text-gray-400 uppercase ml-9">
                  {feature.type}
                </p>
                <p className="text-lg font-medium leading-6 text-gray-900 ml-9">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 text-base text-gray-500 ml-9">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
