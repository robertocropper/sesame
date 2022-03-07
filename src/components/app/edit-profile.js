import React, { useState } from "react";
import axios from "axios";
import { ExclamationCircleIcon, XIcon } from "@heroicons/react/solid";

export function EditProfile({ user, closeProfileEditModal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState(user.displayname);
  const [type, setType] = useState(user.type);
  const [displayNameError, setDisplayNameError] = useState("");
  const [typeError, setTypeError] = useState("");

  const validate = () => {
    let displayNameError = "";
    let typeError = "";

    if (!displayName) {
      displayNameError = "Please complete field";
    }
    if (!type) {
      typeError = "Please complete field";
    }

    if (displayNameError || typeError) {
      setDisplayNameError(displayNameError);
      setTypeError(typeError);
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
        displayName,
        type,
      };
      axios.put(`/api/profile/${user.uid}/edit`, body);
      console.log(body);
      window.location.reload();
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
          onClick={closeProfileEditModal}
          className="flex items-center justify-start px-4 py-2 hover:bg-gray-100"
        >
          <XIcon className="w-6 h-5 text-gray-700" />
        </button>
      </div>
      <div className="mx-6 my-4 ">
        <div className="flex pb-6 space-x-4">
          <h1 className="text-4xl font-bold">Edit Profile</h1>
        </div>

        <div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              Display Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                values={displayName}
                value={displayName}
                autofocus={false}
                onChange={(e) => setDisplayName(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
              />

              {displayNameError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {displayNameError}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="pb-8">
            <label className="block mt-4 font-medium text-gray-700 text-1xl">
              What are you?
            </label>
            <div className="mt-1">
              <input
                type="text"
                values={type}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
              />
              {typeError ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />

                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {typeError}
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
                onClick={closeProfileEditModal}
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
