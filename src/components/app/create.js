import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export function Create() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [preview, setPreview] = useState([]);

  // inputs

  const [clientObjective, setClientObjective] = useState("");
  const [service, setService] = useState("");
  const [keyInfo, setKeyInfo] = useState("");

  const [description, setDescription] = useState("");
  /*
  const [specifications, setSpecifications] = useState("");
  const [approach, setApproach] = useState("");
  const [outcome, setOutcome] = useState("");
  */

  const [selectedFile, setSelectedFile] = useState([]);

  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("");
  const [costAmount, setCostAmount] = useState("");
  const [costCurrency, setCostCurrency] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientIndustry, setClientIndustry] = useState("");
  const [clientNiche, setClientNiche] = useState("");
  const [clientWords, setClientWords] = useState("");

  // errors

  const [clientObjectiveError, setClientObjectiveError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [keyInfoError, setKeyInfoError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  /*
  const [specificationsError, setSpecificationsError ] = useState("")
  const [approachError, setApproachError ] = useState("")
  const [outcomeError, setOutcomeError ] = useState("")
  */

  const [statusError, setStatusError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [costError, setCostError] = useState("");

  const [error, setError] = useState(false);

  const validate = () => {
    let clientObjectiveError = "";
    let serviceError = "";
    let keyInfoError = "";
    let descriptionError = "";
    /*
    let specificationsError = "";
    let approachError = "";
    let outcomeError = "";
    */
    let statusError = "";
    let durationError = "";
    let costError = "";

    if (!clientObjective) {
      clientObjectiveError = "Please complete field";
    }

    if (!service) {
      serviceError = "Please complete field";
    }

    if (!keyInfo) {
      keyInfoError = "Please complete field";
    }

    if (!description) {
      descriptionError = "Please complete field";
    }

    /*
    
    if (!specifications) {
      specificationsError = "Please complete field";
    }

    if (!approach) {
      approachError = "Please complete field";
    }

    if (!outcome) {
      outcomeError = "Please complete field";
    }
*/
    if (!status) {
      statusError = "Please complete both fields";
    }

    if (!duration || !durationUnit) {
      durationError = "Please complete both fields";
    }

    if (!costAmount || !costCurrency) {
      costError = "Please complete field";
    }

    if (
      clientObjectiveError ||
      serviceError ||
      keyInfoError ||
      descriptionError ||
      statusError ||
      durationError ||
      costError
    ) {
      setClientObjectiveError(clientObjectiveError);
      setServiceError(serviceError);
      setDescriptionError(descriptionError);
      setStatusError(statusError);
      setDurationError(durationError);
      setCostError(costError);
      return false;
    }
    return true;
  };

  const datecompleted = null;
  async function handlePublish() {
    try {
      const valid = validate();
      if (!valid) setError(true);
      if (!valid) return false;
      setLoading(true);
      const form = new FormData();
      form.append("clientObjective", clientObjective);
      form.append("service", service);
      form.append("keyInfo", keyInfo);

      form.append("description", description);
      //form.append("specifications", specifications);
      //form.append("approach", approach);
      //form.append("outcome", outcome);
      for (let i = 0; i < selectedFile.length; i++) {
        form.append("selectedFile", selectedFile[i]);
      }
      form.append("status", status);
      form.append("duration", duration);
      form.append("durationUnit", durationUnit);
      form.append("costAmount", costAmount);
      form.append("costCurrency", costCurrency);
      form.append("dateCompleted", dateCompleted);
      form.append("clientName", clientName);
      form.append("clientIndustry", clientIndustry);
      form.append("clientNiche", clientNiche);
      form.append("clientWords", clientWords);
      axios.post(`/api/user/create`, form, {
        headers: {
          type: "multipart/form-data",
        },
      });
      console.log(form);
      navigate(`/showcase/${user.uid}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUpdate(true);
    }
  }

  useEffect(() => {}, [status, update]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result === 2) {
        setPreview(reader.result.name[0]);
      }
      reader.readAsDataURL(e.target.files[0]);
    };
    console.log(preview);
  }, [selectedFile]);

  return (
    <div className="max-w-5xl px-2 mx-auto my-10 ">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-2xl font-bold leading-6 text-zinc-700">
                Create A Project
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                Showcase A Job You Did For A Client.
              </p>
            </div>

            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Client's Objective*
                </label>
                <div className="flex items-center mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={clientObjective}
                    onChange={(e) => setClientObjective(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  {clientObjectiveError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Service*
                </label>
                <div className="flex items-center mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={service}
                    onChange={(e) => setService(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  {serviceError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Key Info*
                </label>
                <div className="flex items-center mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={keyInfo}
                    onChange={(e) => setKeyInfo(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  {keyInfoError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  About The Project & Outcome*
                </label>
                <div className="flex items-center mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    type="text"
                    values={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  />
                  {descriptionError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block font-medium text-gray-700 text-mmd sm:mt-px sm:pt-2"
                >
                  Visual Results?
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {selectedFile ? (
                    <div className="flex justify-center max-w-lg">
                      <img src={preview} />
                    </div>
                  ) : null}
                  <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 text-center border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:underline">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files)}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-2xl font-bold leading-6 text-zinc-700">
                Job Details
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Status*
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    type="text"
                    values={status}
                    onChange={(e) => setStatus(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option>Completed</option>
                    <option>Ongoing</option>
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Cost*
                </label>
                <div className="flex items-center mt-1 space-x-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    values={costAmount}
                    onChange={(e) => setCostAmount(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  <select
                    type="text"
                    values={costCurrency}
                    onChange={(e) => setCostCurrency(e.target.value)}
                    autoComplete="off"
                    className="block max-w-lg pr-10 border-gray-300 rounded-md shadow-sm w-18 focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>

                    <option>USD</option>
                    <option>GBP</option>
                    <option>EUR</option>
                    <option>YEN</option>
                  </select>
                  {costError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Duration*
                </label>
                <div className="flex items-center mt-1 space-x-2 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    values={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  <select
                    type="text"
                    values={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value)}
                    autoComplete="off"
                    className="block max-w-lg pr-10 border-gray-300 rounded-md shadow-sm w-18 focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option>min</option>
                    <option>hr</option>
                    <option>d</option>
                    <option>w</option>
                    <option>mo</option>
                    <option>y</option>
                  </select>
                  {durationError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>
            </div>
            {status === "Completed" ? (
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Date Completed
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    values={dateCompleted}
                    onChange={(e) => setDateCompleted(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-2xl font-bold leading-6 text-zinc-700">
                Client Details (optional)
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                We recommend confirming if the client is ok with the info
                published.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Client Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="state"
                  className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2"
                >
                  Client Industry
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={clientIndustry}
                    onChange={(e) => setClientIndustry(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Client Niche
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    values={clientNiche}
                    onChange={(e) => setClientNiche(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Client Words
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    type="text"
                    values={clientWords}
                    onChange={(e) => setClientWords(e.target.value)}
                    autoComplete="off"
                    rows={3}
                    className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    What did the client have to say?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <span className="flex items-center">
                <h3 className="text-2xl font-bold leading-6 opacity-40 text-zinc-700">
                  KPIs
                </h3>
                <span className=" ml-1 px-1 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                  Coming Soon
                </span>
              </span>
              <p className="max-w-2xl mt-1 text-sm text-gray-500 opacity-40">
                Add Your Own Job Specific KPIs For Your Industry
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-center justify-end space-x-2">
            {error ? (
              <>
                <h2 className="text-sm text-red-600">
                  Woah...Not So Fast, Fix Those Errors First
                </h2>
                <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              </>
            ) : null}
            <Link
              to={`/showcase/${user.uid}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Go Back
            </Link>
            <button
              onClick={handlePublish}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
