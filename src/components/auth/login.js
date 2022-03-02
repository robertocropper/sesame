import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "Invalid email";
    }

    if (!email) {
      emailError = "Please complete field";
    }

    if (!password) {
      passwordError = "Please complete field";
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      const valid = validate();
      if (!valid) return false;
      const body = { email, password };
      setLoading(true);
      const res = await axios.post(`/api/auth/login`, body);
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
    <div className="h-screen max-w-4xl mx-auto mt-32 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Login
        </h2>
      </div>

      <div className="px-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white border border-gray-300 rounded-md sm:px-10">
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
                  className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                />
                {emailError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                    <p className="mt-4 text-sm text-red-600" id="email-error">
                      {emailError}
                    </p>
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
                  className="block w-full px-4 py-2 border rounded-md sm:text-sm focus:outline-none focus:ring-gray-900 focus:border-blue-600"
                />
                {passwordError ? (
                  <div className="flex">
                    <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                    <p className="mt-4 text-sm text-red-600" id="email-error">
                      {passwordError}
                    </p>
                  </div>
                ) : null}
              </div>
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
                  Login
                </button>
              )}
              {error ? (
                <div className="flex">
                  <ExclamationCircleIcon className="w-5 h-5 mt-4 mr-1 text-red-500" />
                  <p className="mt-4 text-sm text-red-600" id="email-error">
                    {error}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
