import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Switch, Disclosure } from "@headlessui/react";
import { ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const projects = [
  {
    pid: "1",
    clientObjective: "Scale FB Ads to £20k PM Ad Spend",
    service: "Managing & Scaling Ads",
    keyInfo: "2 Ad Campaigns",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "4",
    durationUnit: "mo",
    costAmount: 25000,
    costCurrency: "USD",
    dateCompleted: "February 10th 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: [],
    type: "Media buyer",
  },
  {
    pid: "2",
    clientObjective: "Relieve Social Anxiety",
    service: "CBT",
    keyInfo: "Adolescent",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "7",
    durationUnit: "mo",
    costAmount: 4000,
    costCurrency: "EUR",
    dateCompleted: "January 7th 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: [],
    type: "Psychologist",
  },
  {
    pid: "3",
    clientObjective: "Lose 24lbs with Sustainable Diet Plan",
    service: "Diet Plan",
    keyInfo: "Paleo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "7",
    durationUnit: "w",
    costAmount: 120,
    costCurrency: "GBP",
    dateCompleted: "January 7th 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: [],
    type: "Nutrionist",
  },
  {
    pid: "4",
    clientObjective: "24 Pages of Russian To French",
    service: "Translation",
    keyInfo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "1",
    durationUnit: "w",
    costAmount: 120,
    costCurrency: "GBP",
    dateCompleted: "January 7th 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: [],
    type: "Translator",
  },
  {
    pid: "3",
    clientObjective: "Optimised Product Fulfilment Chain",
    service: "Consulting",
    keyInfo: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "2",
    durationUnit: "w",
    costAmount: 120,
    costCurrency: "GBP",
    dateCompleted: "January 7th 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: [],
    type: "Fulfilment Consultant",
  },
  /*
   // Architect
  {/*
  {
    pid: "1",
    clientObjective: "Lengthen Ground Floor with Open Plan Extension",
    service: "Floorplan & Design",
    keyInfo: "Modern Brick",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Ongoing",
    duration: "6",
    durationUnit: "w",
    costAmount: 20000,
    costCurrency: "GBP",
    dateCompleted: null,
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: ["architect"],
    type: "Architect",
  },
  
   {
    pid: "3",
    clientObjective: "Cater to 12 at Private Home Dinner",
    service: "Catering",
    keyInfo: "Seafood & Red Meat",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Completed",
    duration: "12",
    durationUnit: "hr",
    costAmount: 1200,
    costCurrency: "USD",
    dateCompleted: "January 2nd 2022",
    clientName: "",
    clientIndustry: "",
    clientNiche: "",
    clientWords: "",
    filenames: ["chef"],
    type: "Chef",
  },  
  */
];

export function Demo() {
  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [imageLength, setImageLength] = useState();

  const projectsCount = projects.length;

  function closeProjectModal() {
    setProjectIsOpen(false);
  }

  function openProjectModal() {
    setProjectIsOpen(true);
  }

  useEffect(() => {
    toggle();
  }, [enabled]);

  const toggle = () => {
    let result = [];
    if (enabled === true) {
      result = projects.filter((project) => {
        return project.filenames.length >= 1;
      });
      setFilteredProjects(result);
    }
    if (enabled === false) {
      result = projects;
    }
    setFilteredProjects(result);
  };

  return (
    <>
      <div
        className="max-w-5xl px-2 py-2 mx-auto"
        projectsCount={projectsCount}
      >
        <Transition appear show={projectIsOpen} as={Fragment}>
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
                  imageLength >= 1
                    ? "fixed relative inline-block w-full md:w-3/5 m-4 text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl"
                    : "fixed relative inline-block w-full md:w-2/5 m-4 text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl"
                }
              >
                <div className="border-b divide-y">
                  <div className="flex items-center justify-between">
                    <th className="px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase ">
                      Client's Objective
                    </th>
                    <div className="flex justify-end ml-4">
                      <div className="relative flex justify-end text-left">
                        <button
                          onClick={closeProjectModal}
                          className="flex items-center justify-start px-4 py-2 border-none focus:ring-0 hover:bg-gray-100"
                        >
                          <XIcon className="w-6 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 ">
                  <div className="flex items-center px-6 py-10 border-b">
                    <h3 className="text-4xl font-bold text-zinc-700">
                      {id.clientObjective}
                    </h3>
                  </div>
                </div>
                <div
                  className={
                    imageLength >= 1 ? "grid grid-cols-2" : "grid grid-cols-1"
                  }
                >
                  <div className="px-6 py-4 overflow-y-auto border-b divide-y max-h-96">
                    <div className="py-4 ">
                      <Disclosure defaultOpen>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-zinc-600 focus:outline-none focus-visible:ring">
                              <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Description of Job
                              </p>

                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 text-zinc-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 text-md">
                              {id.description}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      {/*
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-zinc-600 focus:outline-none focus-visible:ring">
                              <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Problem
                              </p>

                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 text-zinc-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 text-md">
                              If you're unhappy with your purchase for any
                              reason, email us within 90 days and we'll refund
                              you in full, no questions asked.
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className="py-4 ">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-zinc-600 focus:outline-none focus-visible:ring">
                              <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Approach
                              </p>

                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 text-zinc-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 text-md">
                              If you're unhappy with your purchase for any
                              reason, email us within 90 days and we'll refund
                              you in full, no questions asked.
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                    <div className="py-4 ">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-zinc-600 focus:outline-none focus-visible:ring">
                              <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                Outcome & Results
                              </p>

                              <ChevronUpIcon
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-5 h-5 text-zinc-500`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 text-md">
                              If you're unhappy with your purchase for any
                              reason, email us within 90 days and we'll refund
                              you in full, no questions asked.
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                              </div>*/}
                    </div>
                    <div className="px-6 py-4 text-right border-b divide-y">
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Service
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.service}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Key Info
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.keyInfo}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Cost
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.costAmount} {id.costCurrency}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Duration
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.duration}
                          {id.durationUnit}
                        </span>
                      </div>
                      {id.dateCompleted ? (
                        <div className="py-4 ">
                          <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Date Completed
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            {id.dateCompleted}
                          </span>
                        </div>
                      ) : null}
                      {id.clientNiche ? (
                        <div className="py-4 ">
                          <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Client Niche
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            {id.clientNiche}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {imageLength >= 1 ? (
                    <div className="fixed relative self-center p-10 mx-auto align-middle">
                      <img
                        src={`${process.env.APP_URL}/assets/demo/${id.filenames}`}
                        className="rounded-sm"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition
          appear={true}
          show={true}
          enter="transition ease-in-out duration-700 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-700 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="max-w-5xl py-10 bg-white ">
            <div className="flex items-center justify-between h-16 py-6">
              <div className="flex items-center justify-start lg:w-0 lg:flex-1">
                <div className="py-10">
                  <div className="pb-2 space-x-4 border-b">
                    <h3 className="text-4xl font-bold text-zinc-700">
                      Acme Inc.
                    </h3>
                  </div>
                  <div className="p-1 max-w-18">
                    <p className="pt-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase break-words">
                      Example Use Cases From A Range Of Industries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 md:flex">
                <div className="px-5 py-4 overflow-hidden border shadow-md">
                  <div className="flex items-center">
                    <h3 className="text-4xl font-bold text-gray-700">0</h3>
                    <h3 className="pl-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Client-Jobs This Month
                    </h3>
                  </div>
                </div>
                <div className="px-5 py-4 border shadow-md">
                  <div className="flex items-center">
                    <h3 className="text-4xl font-bold text-gray-700">
                      {projects.length}
                    </h3>
                    <h3 className="pl-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Client-Jobs in total
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center pt-4 pb-3 space-x-4">
              {/*

              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={classNames(
                    enabled ? "bg-blue-600" : "bg-gray-200",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none "
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform  transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">
                    Photos Only
                  </span>
                </Switch.Label>
              </Switch.Group>
                    */}
            </div>
          </div>
          <div className="flex flex-col w-full shadow-2xl ">
            <div className="-my-9 ">
              <div className="inline-block w-full py-2 align-middle ">
                <div className="overflow-x-auto">
                  <table className="w-full border divide-y ">
                    {enabled ? (
                      <thead className="bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          ></th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Client's Objective
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Service & Duration
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Stands
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            <span className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Open
                            </span>
                          </th>
                        </tr>
                      </thead>
                    ) : (
                      <thead className="bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Client's Objective
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Service & Duration
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Stands
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            <span className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Open
                            </span>
                          </th>
                        </tr>
                      </thead>
                    )}
                    <tbody className="bg-white divide-y">
                      {filteredProjects.map((project) => (
                        <tr key={project.pid}>
                          {enabled && project.filenames.length >= 1 ? (
                            <div className="overflow-hidden h-fit w-72">
                              <img
                                src={`${process.env.APP_URL}/assets/demo/${project.filenames[0]}`}
                              />
                            </div>
                          ) : null}
                          {enabled && project.filenames.length >= 1 ? (
                            <td className="px-6 py-4 min-h-96">
                              <>
                                <t className="font-medium text-gray-900 break-normal max-w-24 text-md">
                                  {project.clientObjective}
                                </t>
                                <span className="p-1 ml-2 text-xs text-sm uppercase border rounded-full text-zinc-400">
                                  {project.type}
                                </span>
                              </>
                            </td>
                          ) : (
                            <td className="px-6 py-4 min-h-96">
                              <>
                                <t className="font-medium text-gray-900 break-normal max-w-24 text-md">
                                  {project.clientObjective}
                                </t>
                                <span className="p-1 ml-2 text-xs text-sm uppercase border rounded-full text-zinc-400">
                                  {project.type}
                                </span>
                              </>
                            </td>
                          )}

                          <td className="px-6 py-4 ">
                            <p className="text-gray-900 break-normal max-w-16 text-md">
                              {project.service}
                            </p>
                            <t className="text-gray-500 text-md">
                              {project.duration}
                              {project.durationUnit}
                            </t>
                          </td>
                          {project.status === "Completed" ? (
                            <td className="px-6 py-4 ">
                              <span className="p-1 text-sm font-medium text-green-800 bg-green-100 rounded-md">
                                {project.status}
                              </span>
                            </td>
                          ) : (
                            <td className="px-6 py-4 ">
                              <span className="p-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-md">
                                {project.status}
                              </span>
                            </td>
                          )}

                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setId(project);
                                setImageLength(project.filenames.length);
                                openProjectModal();
                              }}
                              className="flex items-center px-2 py-1 my-4 rounded-md hover:bg-gray-100"
                            >
                              <ChevronUpIcon className="w-6 h-5 text-gray-700" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
