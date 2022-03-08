import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export function Edit({ id, closeEditModal }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [update, setUpdate] = useState(false);

  const { uid, pid } = useParams();
  /*
  useEffect(() => {
    getUserProject();
  }, []);

  function getUserProject() {
    setLoading(true);
    axios
      .get(`/api/user/${uid}/${pid}`)
      .then((res) => {
        console.log(res);
        setProject(res.data.project);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
*/

  const [clientObjective, setClientObjective] = useState(id.clientobjective);
  const [service, setService] = useState(id.service);
  const [keyInfo, setKeyInfo] = useState(id.keyinfo);

  const [description, setDescription] = useState(id.description);
  const [selectedFile, setSelectedFile] = useState(id.filenames);

  const [status, setStatus] = useState(id.status);
  const [duration, setDuration] = useState(id.duration);
  const [durationUnit, setDurationUnit] = useState(id.durationunit);
  const [costAmount, setCostAmount] = useState(id.costamount);
  const [costCurrency, setCostCurrency] = useState(id.costcurrency);
  const [dateCompleted, setDateCompleted] = useState(id.dateCompleted);

  const [clientName, setClientName] = useState(id.clientname);
  const [clientIndustry, setClientIndustry] = useState(id.clientindustry);
  const [clientNiche, setClientNiche] = useState(id.clientniche);
  const [clientWords, setClientWords] = useState(id.clientwords);

  // errors

  const [clientObjectiveError, setClientObjectiveError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [keyInfoError, setKeyInfoError] = useState("");

  const [descriptionError, setDescriptionError] = useState("");

  const [statusError, setStatusError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [costError, setCostError] = useState("");

  const [error, setError] = useState(false);

  const validate = () => {
    let clientObjectiveError = "";
    let serviceError = "";
    let keyInfoError = "";
    let descriptionError = "";
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
      setKeyInfoError(keyInfoError);
      setDescriptionError(descriptionError);
      setStatusError(statusError);
      setDurationError(durationError);
      setCostError(costError);
      return false;
    }
    return true;
  };

  async function handlePublish() {
    try {
      const valid = validate();
      if (!valid) return false;

      setLoading(true);
      const form = new FormData();
      form.append("clientObjective", clientObjective);
      form.append("service", service);
      form.append("keyInfo", keyInfo);
      form.append("description", description);

      /*
      for (let i = 0; i < selectedFile.length; i++) {
        form.append("selectedFile", selectedFile[i]);
      }*/
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
      axios.put(`/api/user/${id.pid}/edit`, form, {
        headers: {
          type: "multipart/form-data",
        },
      });
      console.log(id.pid);
      window.location.reload(true);
      closeEditModal(true);
      console.log(body);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setUpdate(true);
    }
  }

  useEffect(() => {}, [status, update]);

  return (
    <div className="max-w-5xl px-2 mx-auto my-10 ">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              {project.map((project) => (
                <>
                  <h3 className="text-2xl font-bold leading-6 text-zinc-700">
                    Editing "{project.clientobjective}"
                  </h3>
                  <p className="max-w-2xl mt-1 text-sm text-gray-500">
                    Showcase A Job You Did For A Client.
                  </p>
                </>
              ))}
            </div>

            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block font-medium text-gray-700 text-md sm:mt-px sm:pt-2">
                  Client's Objective*
                </label>
                <div className="flex items-center mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="clientObjective"
                    values={clientObjective}
                    value={clientObjective}
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
                    name="service"
                    values={service}
                    value={service}
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
                    name="description"
                    values={description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  />
                  {descriptionError ? (
                    <ExclamationCircleIcon className="ml-1 text-red-500 h-7 w-7" />
                  ) : null}
                </div>
              </div>
              {/*
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block font-medium text-gray-700 text-mmd sm:mt-px sm:pt-2"
                >
                  Visual Results?
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                  */}
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
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  >
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
                    value={costAmount}
                    onChange={(e) => setCostAmount(e.target.value)}
                    autoComplete="off"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  <select
                    type="text"
                    values={costCurrency}
                    value={costCurrency}
                    onChange={costCurrency}
                    autoComplete="off"
                    className="block max-w-lg pr-10 border-gray-300 rounded-md shadow-sm w-18 focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  >
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
                    value={duration}
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
                    value={dateCompleted}
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
                Client Details
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
                    value={clientName}
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
                    value={clientIndustry}
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
                    value={clientNiche}
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
                    value={clientWords}
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
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
              <span className="flex items-center">
                <h3 className="text-2xl font-bold leading-6 opacity-40 text-zinc-700">
                  Images
                </h3>
                <span className=" ml-1 px-1 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                  Coming Soon
                </span>
              </span>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                {selectedFile ? (
                  <div className="flex justify-center max-w-lg">
                    <img />
                  </div>
                ) : null}
                <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 text-center border-2 border-gray-300 border-dashed rounded-md opacity-40">
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
            <button
              onClick={closeEditModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none "
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
