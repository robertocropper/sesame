import React, { Fragment, useState } from "react";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  SelectorIcon,
  XIcon,
} from "@heroicons/react/solid";

const objectiveOptions = [
  "Yes",
  "No",
  "Expectations Were Too High",
  "Read To Understand The Context",
];

const unitOptions = ["hr", "d", "mo", "yr"];

const currencyOptions = ["USD", "GBP", "EUR"];

export function Edit({ id, closeEditModal, setShowEditNotification }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientObjective, setClientObjective] = useState(id.clientobjective);
  const [niche, setNiche] = useState(id.niche);
  const [service, setService] = useState(id.service);
  const [duration, setDuration] = useState(id.duration);
  const [cost, setCost] = useState(id.cost);
  const [specifications, setSpecifications] = useState(id.specifications);
  const [process, setProcess] = useState(id.process);
  const [outcome, setOutcome] = useState(id.outcome);
  const [dateCompleted, setDateCompleted] = useState(id.to_char);
  const [objectiveOption, setObjectiveOption] = useState(id.objectiveoption);
  const [unitOption, setUnitOption] = useState(id.unitoption);
  const [currencyOption, setCurrencyOption] = useState(id.currencyoption);

  const [clientNameError, setClientNameError] = useState("");
  const [clientObjectiveError, setClientObjectiveError] = useState("");
  const [nicheError, setNicheError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [costError, setCostError] = useState("");
  const [specificationsError, setSpecificationsError] = useState("");
  const [processError, setProcessError] = useState("");
  const [outcomeError, setOutcomeError] = useState("");
  const [dateCompletedError, setDateCompletedError] = useState("");

  const validate = () => {
    let clientObjectiveError = "";
    let clientNameError = "";
    let nicheError = "";
    let serviceError = "";
    let durationError = "";
    let costError = "";
    let specificationsError = "";
    let processError = "";
    let outcomeError = "";
    let dateCompletedError = "";

    if (!clientObjective) {
      clientObjectiveError = "Please complete field";
    }

    if (!niche) {
      nicheError = "Please complete field";
    }

    if (!service) {
      serviceError = "Please complete field";
    }

    if (!duration) {
      durationError = "Please complete field";
    }

    if (!cost) {
      costError = "Please complete field";
    }

    if (!specifications) {
      specificationsError = "Please complete field";
    }

    if (!process) {
      processError = "Please complete field";
    }

    if (!outcome) {
      outcomeError = "Please complete field";
    }

    if (!dateCompleted) {
      dateCompletedError = "Please complete field";
    }

    if (
      clientObjectiveError ||
      clientNameError ||
      nicheError ||
      serviceError ||
      durationError ||
      costError ||
      specificationsError ||
      processError ||
      outcomeError ||
      dateCompletedError
    ) {
      setClientObjectiveError(clientObjectiveError);
      setClientNameError(clientNameError);
      setNicheError(nicheError);
      setServiceError(serviceError);
      setDurationError(durationError);
      setCostError(costError);
      setSpecificationsError(specificationsError);
      setProcessError(processError);
      setOutcomeError(outcomeError);
      setDateCompletedError(dateCompletedError);
      return false;
    }
    return true;
  };

  async function handlePublish() {
    try {
      const valid = validate();
      if (!valid) return false;
      setLoading(true);
      const body = {
        clientObjective,
        niche,
        service,
        duration,
        cost,
        specifications,
        process,
        outcome,
        dateCompleted,
        objectiveOption,
        unitOption,
        currencyOption,
      };
      axios.put(`/api/user/${id.pid}/edit`, body);
      console.log(id.pid);
      //window.location.reload(true);
      closeEditModal(true);
      console.log(body);
      setShowEditNotification(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-end text-left border-b ">
        <button
          onClick={closeEditModal}
          className="flex items-center justify-start px-4 py-2 hover:bg-gray-100"
        >
          <XIcon className="w-6 h-5 text-gray-700" />
        </button>
      </div>
      <div className="mx-6 my-8">
        <div className="flex pb-6 space-x-4">
          <h1 className="text-2xl font-bold text-zinc-700">Edit</h1>
        </div>

        <div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Client's Objective
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="clientObjective"
                values={clientObjective}
                value={clientObjective}
                autofocus={false}
                onChange={(e) => setClientObjective(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
              />
              {clientObjectiveError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {clientObjectiveError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Objective Completed
            </label>
            <div className="w-72">
              <Listbox
                values={objectiveOption}
                value={objectiveOption}
                onChange={setObjectiveOption}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{objectiveOption}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400 cursor-pointer"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-sm bg-white border rounded-md max-h-60 sm:text-sm">
                      {objectiveOptions.map(
                        (selectObjective, selectObjectiveIdx) => (
                          <Listbox.Option
                            key={selectObjectiveIdx}
                            className={({ active }) =>
                              `${active ? "text-gray-900" : "text-gray-900"}
                          cursor-pointer select-none relative py-2 px-4`
                            }
                            value={selectObjective}
                          >
                            {({ objectiveOption, active }) => (
                              <>
                                <span
                                  className={`${
                                    objectiveOption
                                      ? "font-medium"
                                      : "font-normal"
                                  } block truncate`}
                                >
                                  {selectObjective}
                                </span>
                                {selectObjective ? (
                                  <span
                                    className={`${
                                      active ? "text-gray-900" : "text-gray-900"
                                    }
                                absolute flex items-center`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        )
                      )}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Service
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="service"
                values={service}
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
              />
              {serviceError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {serviceError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
            Niched Info (Any extra info you want highlighted)
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="niche"
                values={niche}
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
              />
              {nicheError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {nicheError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className="block mt-4 font-medium text-gray-700 w-18 text-1xl">
                Duration
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="duration"
                  values={duration}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                />
                {durationError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                    <p className="mt-4 text-sm text-red-600" id="email-error">
                      {durationError}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label className="block mt-4 font-medium text-gray-700 text-1xl">
                Unit
              </label>
              <div>
                <Listbox
                  values={unitOption}
                  value={unitOption}
                  onChange={setUnitOption}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate ">{unitOption}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400 cursor-pointer"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-sm border rounded-md max-h-60 sm:text-sm">
                        {unitOptions.map((selectUnit, selectUnitIdx) => (
                          <Listbox.Option
                            key={selectUnitIdx}
                            className={({ active }) =>
                              `${active ? "text-gray-900" : "text-gray-900"}
                          cursor-pointer select-none relative py-2 px-3`
                            }
                            value={selectUnit}
                          >
                            {({ unitOption, active }) => (
                              <>
                                <span
                                  className={`${
                                    unitOption ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {selectUnit}
                                </span>
                                {selectUnit ? (
                                  <span
                                    className={`${
                                      active ? "text-gray-900" : "text-gray-900"
                                    }
                                absolute flex items-center`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className="pb-8">
              <label className="block w-full mt-4 font-medium text-gray-700 text-1xl">
                Date Completed
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="date"
                  values={dateCompleted}
                  value={dateCompleted}
                  onChange={(e) => setDateCompleted(e.target.value)}
                  className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:border-blue-600"
                />
                {dateCompletedError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                    <p className="mt-4 text-sm text-red-600" id="email-error">
                      {dateCompletedError}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-96">
            <div className="col-span-3 pb-8">
              <label className="block mt-4 font-medium text-gray-700 text-1xl">
                Cost
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="cost"
                  values={cost}
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                  placeholder="20000"
                />
                {costError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                    <p className="mt-4 text-sm text-red-600" id="email-error">
                      {costError}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label className="block mt-4 font-medium text-gray-700 text-1xl">
                Currency
              </label>
              <div>
                <Listbox
                  values={currencyOption}
                  value={currencyOption}
                  onChange={setCurrencyOption}
                >
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border rounded-md cursor-pointer focus:outline-none sm:text-sm">
                      <span className="block truncate ">{currencyOption}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400 cursor-pointer"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-sm bg-white border rounded-md max-h-60 sm:text-sm">
                        {currencyOptions.map(
                          (selectCurrency, selectCurrencyIdx) => (
                            <Listbox.Option
                              key={selectCurrencyIdx}
                              className={({ active }) =>
                                `${active ? "text-gray-900" : "text-gray-900"}
                          cursor-pointer select-none relative py-2 px-3`
                              }
                              value={selectCurrency}
                            >
                              {({ currencyOption, active }) => (
                                <>
                                  <span
                                    className={`${
                                      currencyOption
                                        ? "font-medium"
                                        : "font-normal"
                                    } block truncate`}
                                  >
                                    {selectCurrency}
                                  </span>
                                  {selectCurrency ? (
                                    <span
                                      className={`${
                                        active
                                          ? "text-gray-900"
                                          : "text-gray-900"
                                      }
                                absolute flex items-center `}
                                    ></span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          )
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Specifications of Job
            </label>
            <div className="mt-1">
              <textarea
                type="text"
                name="intro"
                values={specifications}
                value={specifications}
                onChange={(e) => setSpecifications(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                rows={10}
              />
              {specificationsError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {specificationsError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Process & Approach To Job
            </label>
            <div className="mt-1">
              <textarea
                type="text"
                name="process"
                values={process}
                value={process}
                onChange={(e) => setProcess(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                rows={10}
              />
              {processError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {processError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              The Outcome & Results
            </label>
            <div className="mt-1">
              <textarea
                type="text"
                name="results"
                values={outcome}
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                rows={10}
              />
              {outcomeError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {outcomeError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex items-center justify-end">
            {error ? (
              <>
                <h2
                  onClick={handlePublish}
                  className="mr-2 text-sm text-red-600"
                >
                  Not so fast, fix those errors first.
                </h2>
                <ExclamationCircleIcon className="w-5 h-5 mr-4 text-red-500" />
              </>
            ) : null}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={closeEditModal}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              {loading ? (
                <button
                  onClick={handlePublish}
                  className="flex items-center px-5 py-2 text-sm font-medium text-left text-gray-700 text-gray-900 bg-white border border-b-4 border-r-4 border-gray-900 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Loading
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
