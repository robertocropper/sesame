import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const projects = [
  {
    // Architect
    pid: "1",
    clientObjective: "Lengthen Ground Floor with Open Plan Extension",
    objectiveOption: "Yes",
    service: "Floorplan & Design",
    niche: "Modern Brick",
    duration: 2,
    unitOption: "mo",
    to_char: "February 10th 2022",
    cost: "20,000.00",
    currencyOption: "GBP",
    specifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Architect",
    filenames: ["architect"],
  },
  {
    // Media buyer
    pid: "2",
    clientObjective: "Scale FB Ads to £20k PM Ad Spend",
    objectiveOption: "Yes",
    service: "Managing & Scaling Ads",
    niche: "2 CBOs, 17 Ad Sets",
    duration: 4,
    unitOption: "w",
    to_char: "January 7th 2022",
    cost: "2,700",
    currencyOption: "USD",
    specifications: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Ad Agency",
    filenames: [],
  },
  {
    // Private Chef
    pid: "3",
    clientObjective: "Cater to 12 at Private Home Dinner",
    objectiveOption: "Yes",
    service: "Catering",
    niche: "Seafood & Red Meat",
    duration: 2,
    unitOption: "mo",
    to_char: "January 2nd 2022",
    cost: "20,000.00",
    currencyOption: "GBP",
    specifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Chef",
    filenames: ["chef"],
  },
  {
    // Psychologist
    pid: "4",
    clientObjective: "Relieve Social Anxiety",
    objectiveOption: "Yes",
    service: "CBT",
    niche: "24 Year Old Girl",
    duration: 4,
    unitOption: "mo",
    to_char: "December 27th 2021",
    cost: "700.00",
    currencyOption: "GBP",
    specifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Psychologist",
    filenames: [],
  },
  {
    // Nutritionist
    pid: "5",
    clientObjective: "Lose 24lbs with Sustainable Diet Plan",
    objectiveOption: "Yes",
    service: "Custom 12 Week Meal Plan",
    niche: "Paleo Foods",
    duration: 2,
    unitOption: "d",
    to_char: "November 4th 2021",
    cost: "100",
    currencyOption: "USD",
    specifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Nutritionist",
    filenames: [],
  },
  {
    // Interior Designer
    pid: "6",
    clientObjective: "Design Mediterranean Living Room",
    objectiveOption: "Yes",
    service: "Sourcing & Design",
    niche: "Mediterranean",
    duration: 7,
    unitOption: "d",
    to_char: "November 1st 2021",
    cost: "700",
    currencyOption: "USD",
    specifications:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    process:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "Interior Designer",
    filenames: ["interior"],
  },
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
                    ? "fixed relative inline-block w-full md:w-2/4 m-4 text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl"
                    : "fixed relative inline-block w-full md:w-1/3 m-4 text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl"
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
                          className="flex items-center justify-start px-4 py-2 hover:bg-gray-100"
                        >
                          <XIcon className="w-6 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center px-6 py-10 border-b">
                  <h3 className="text-4xl font-bold text-zinc-700">
                    {id.clientObjective}
                  </h3>
                </div>
                <div
                  className={
                    imageLength >= 1
                      ? "md:grid grid-cols-2 divide-x "
                      : "grid grid-cols-1"
                  }
                >
                  <div className="px-6 py-4 overflow-y-auto border-b divide-y max-h-96">
                    <div className="py-4 ">
                      <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Job Specifications
                      </dt>
                      <h3 className="text-xl font-light text-zinc-700">
                        {id.specifications}
                      </h3>
                    </div>
                    <div className="py-4 ">
                      <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Process & Approach to Job
                      </dt>
                      <h3 className="text-xl font-light text-zinc-700">
                        {id.process}
                      </h3>
                    </div>
                    <div className="py-4 ">
                      <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Outcome & Results
                      </dt>
                      <h3 className="text-xl font-light text-zinc-700">
                        {id.outcome}
                      </h3>
                    </div>
                  </div>
                  <div>
                    {imageLength >= 1 ? (
                      <div className="grid grid-flow-col grid-rows-1 px-6 mt-4 overflow-x-auto max-h-76">
                        <img
                          src={`https://sesame-d9wj8.ondigitalocean.app/assets/demo/${id.filenames[0]}`}
                          className="object-scale-down rounded-sm max-w-72 max-h-72"
                        />
                      </div>
                    ) : null}
                    <div className="grid grid-cols-2 px-6 py-4 overflow-y-auto ">
                      <div className="py-4">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Service
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.service}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Niched Info
                        </dt>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.niche}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Job Completed On
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.to_char}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Duration
                        </dt>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.duration}
                          {id.unitOption}
                        </span>
                      </div>

                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Cost
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.cost} {id.currencyOption}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Objective Completed
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.objectiveOption}
                        </span>
                      </div>
                    </div>
                  </div>
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
                            Completed On
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
                            Completed On
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
                            <>
                              <div className="overflow-hidden h-fit w-72">
                                <img
                                  src={`https://sesame-d9wj8.ondigitalocean.app/assets/demo/${project.filenames[0]}`}
                                />
                              </div>
                            </>
                          ) : null}
                          {enabled && imageLength >= 1 ? (
                            <td className="px-6 py-4 min-h-96">
                              <>
                                <t className="font-medium text-gray-900 break-normal max-w-24 text-md">
                                  {project.clientObjective}
                                </t>

                                <span className="px-2 py-1 ml-2 text-xs uppercase border rounded-full text-zinc-400">
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

                                <span className="px-2 py-1 ml-2 text-xs uppercase border rounded-full text-zinc-400">
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
                              {project.unitOption}
                            </t>
                          </td>

                          <td className="px-6 py-4 text-gray-500 text-md">
                            {project.to_char}
                          </td>
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
