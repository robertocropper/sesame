import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [error, setError] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState();

  const validate = () => {
    let displayNameError = "";
    let emailError = "";
    let passwordError = "";
    let termsError = "";

    if (!displayName) {
      displayNameError = "Please complete field";
    }

    if (!/^.+@.+\..+$/.test(email)) {
      emailError = "Invalid email";
    }

    if (!email) {
      emailError = "Please complete field";
    }

    if (!password) {
      passwordError = "Please complete field";
    }

    if (terms !== true) {
      termsError = "Please Agree To Our Terms";
    }

    if (displayNameError || emailError || passwordError || termsError) {
      setDisplayNameError(displayNameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setTermsError(termsError);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      const valid = validate();
      if (!valid) return false;
      console.log(terms);
      const body = { displayName, email, password };
      setLoading(true);
      const res = await axios.post(`/api/auth/signup`, body);
      console.log(res);
      setUser(res.data.user);
      navigate(`/showcase/${res.data.user.uid}`);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto mt-10  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Signup
        </h2>
      </div>

      <div className="px-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white border border-gray-300 rounded-md sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <div className="mt-1">
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  values={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="block w-full mx-auto px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                />
                {displayNameError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                    <p className="mt-4 text-sm text-red-600">
                      {displayNameError}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    values={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mx-auto px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  {emailError ? (
                    <div className="flex">
                      <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                      <p className="mt-4 text-sm text-red-600">{emailError}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    values={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mx-auto px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-blue-600 focus:border-blue-600 sm:max-w-xs sm:text-sm"
                  />
                  {passwordError ? (
                    <div className="flex">
                      <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                      <p className="mt-4 text-sm text-red-600">
                        {passwordError}
                      </p>
                    </div>
                  ) : null}
                </div>
                <fieldset className="my-5">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        onChange={(e) => setTerms(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                      />
                    </div>
                    <div className="flex ml-3 text-sm">
                      <span id="terms" className="font-medium text-gray-700">
                        Agree
                      </span>
                      <Link
                        to="/terms"
                        className="ml-1 font-medium text-gray-700 text-blue-600 hover:underline"
                      >
                        Terms & Conditions
                      </Link>
                    </div>
                  </div>
                </fieldset>
                {termsError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                    <p className="mt-4 text-sm text-red-600">{termsError}</p>
                  </div>
                ) : null}
              </div>

              <div>
                {loading ? (
                  <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    Signup
                  </button>
                )}
                {error ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                    <p className="mt-4 text-sm text-red-600">{error}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
