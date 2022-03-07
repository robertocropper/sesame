import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../App";
import {
  Dialog,
  Transition,
  Switch,
  Menu,
  Disclosure,
} from "@headlessui/react";
import {
  ChevronUpIcon,
  PencilIcon,
  PlusIcon,
  DotsHorizontalIcon,
  XIcon,
} from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/outline";
import { Edit } from "./edit";
import { EditProfile } from "./edit-profile";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Showcase() {
  const [loading, setLoading] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { uid } = useParams();
  const [userProfile, setUserProfile] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [copy, setCopy] = useState("Copy Showcase");
  const [id, setId] = useState("");
  const [imageLength, setImageLength] = useState();

  useEffect(() => {
    getUserProfile();
    getUserProjects();
  }, [uid, axios]);

  useEffect(() => {
    toggle();
  }, [enabled]);

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopy("Copied");
    } catch (err) {
      setCopy("Failed to copy!");
    }
  };

  const projectsCount = projects.length;

  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  let [editIsOpen, setEditIsOpen] = useState(false);

  function closeProfileEditModal() {
    setProfileEditModal(false);
  }

  function openProfileEditModal() {
    setProfileEditModal(true);
  }

  function closeProjectModal() {
    setProjectIsOpen(false);
  }

  function openProjectModal() {
    setProjectIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setEditIsOpen(false);
  }

  function openEditModal() {
    setEditIsOpen(true);
  }

  function getUserProjects() {
    setLoading(true);
    axios
      .get(`/api/user/${uid}/projects`)
      .then((res) => {
        console.log(res);
        setProjects(res.data.projects);
        setFilteredProjects(res.data.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUserProfile() {
    setLoading(true);
    axios
      .get(`/api/user/${uid}/profile`)
      .then((res) => {
        console.log(res);
        setUserProfile(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  async function handleDelete() {
    try {
      setLoading(true);
      axios.delete(`/api/user/${uid}/${id.pid}/delete`);
      closeModal();
      navigate(`/showcase/${user.uid}`);
      //window.location.reload();
      setShowDeleteNotification(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading === true) {
    return (
      <div class="min-h-screen text-center mt-80">
        <svg
          role="status"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (loading === false) {
    return (
      <>
        <Transition appear show={profileEditModal} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 mx-auto overflow-y-auto"
            onClose={closeProfileEditModal}
          >
            <div className="min-h-screen px-4 text-center ">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="fixed relative inline-block w-1/3 m-4 overflow-y-auto text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl">
                <EditProfile
                  user={user}
                  closeProfileEditModal={closeProfileEditModal}
                />
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-md bg-zinc-50">
                <div className="grid grid-cols-2 space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={editIsOpen} as={Fragment}>
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

              <div className="fixed relative inline-block w-3/4 min-h-screen m-4 overflow-y-auto text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl">
                <Edit id={id} closeEditModal={closeEditModal} />
              </div>
            </div>
          </Dialog>
        </Transition>
        <div className="flex items-center max-w-5xl gap-2 mx-auto my-2">
          {user && user.uid === uid ? (
            <>
              {user.status !== "active" && projects.length >= 2 ? (
                <button
                  disabled
                  className="flex items-center justify-start px-2 py-1 my-4 rounded-md hover:bg-gray-100"
                >
                  <p className="text-xs font-medium text-gray-700 uppercase">
                    {/*Upgrade Plan To Create More*/}Beta Allows 2 Projects Only
                    :(
                  </p>
                  <PlusIcon className="w-6 h-5 ml-2 text-gray-700" />
                </button>
              ) : (
                <Link
                  to="create"
                  /*onClick={openCreateModal}
                type="button"*/
                  className="flex items-center justify-start px-2 py-1 my-4 rounded-md hover:bg-gray-100"
                >
                  <p className="text-xs font-medium text-gray-700 uppercase">
                    Create
                  </p>
                  <PlusIcon className="w-6 h-5 ml-2 text-gray-700" />
                </Link>
              )}

              <div>
                <button
                  onClick={openProfileEditModal}
                  type="button"
                  className="flex items-center justify-start px-2 py-1 my-4 rounded-md hover:bg-gray-100"
                >
                  <p className="text-xs font-medium text-gray-700 uppercase">
                    Edit Showcase
                  </p>
                  <PencilIcon className="w-6 h-5 ml-2 text-gray-700" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => copyToClipBoard(window.location.href)}
                  type="button"
                  className="flex items-center justify-start px-2 py-1 my-4 rounded-md hover:bg-gray-100"
                >
                  <p className="text-xs font-medium text-gray-700 uppercase">
                    {copy}
                  </p>
                  <LinkIcon className="w-6 h-5 ml-2 text-gray-700" />
                </button>
              </div>
            </>
          ) : null}
        </div>
        <div
          className="max-w-5xl min-h-screen px-2 mx-auto "
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
                        {user && user.uid === uid ? (
                          <Menu
                            as="div"
                            className="relative flex justify-end text-left"
                          >
                            <div>
                              <Menu.Button
                                onClick={() => navigate(-1)}
                                type="button"
                                className="flex items-center justify-start px-4 py-2 border-none hover:bg-gray-100 focus:ring-0"
                              >
                                <DotsHorizontalIcon className="w-6 h-5 text-gray-700" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 w-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg mt-9 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={openEditModal}
                                        className={classNames(
                                          active
                                            ? "w-full bg-gray-100 text-gray-900"
                                            : "w-full text-gray-700",
                                          "block px-4 text-left py-2 text-sm"
                                        )}
                                      >
                                        Edit
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>

                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={openModal}
                                        className={classNames(
                                          active
                                            ? "w-full bg-gray-100 text-gray-900"
                                            : "w-full text-gray-700",
                                          "block px-4 text-left py-2 text-sm"
                                        )}
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : null}
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
                        {id.clientobjective}{" "}
                      </h3>
                      <span className="ml-4 px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        {id.status}
                      </span>
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
                                  The Job Specifications
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
                      </div>

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
                                */}
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
                            {id.keyinfo}
                          </span>
                        </div>
                        <div className="py-4 ">
                          <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Cost
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            {id.costamount} {id.costcurrency}
                          </span>
                        </div>
                        <div className="py-4 ">
                          <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                            Duration
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                            {id.duration}
                            {id.durationunit}
                          </span>
                        </div>
                        {id.dateCompleted ? (
                          <div className="py-4 ">
                            <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Date Completed
                            </p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                              {id.datecompleted}
                            </span>
                          </div>
                        ) : null}
                        {id.clientNiche ? (
                          <div className="py-4 ">
                            <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                              Client Niche
                            </p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                              {id.clientniche}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {imageLength >= 1 ? (
                      <div className="fixed relative self-center p-10 mx-auto align-middle">
                        <img
                          src={`http://localhost:3000/assets/${id.filenames}`}
                          className="rounded-sm"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition>
          {/*  <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg mt-9 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={openEditModal}
                                      //to={`${id.pid}/edit`}
                                      className={classNames(
                                        active
                                          ? "w-full bg-gray-100 text-gray-900"
                                          : "w-full text-gray-700",
                                        "block px-4 text-left py-2 text-sm"
                                      )}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>

                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={openModal}
                                      className={classNames(
                                        active
                                          ? "w-full bg-gray-100 text-gray-900"
                                          : "w-full text-gray-700",
                                        "block px-4 text-left py-2 text-sm"
                                      )}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : null}
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
                <div className="col-span-2 ">
                  <div className="flex items-center px-6 py-10 border-b">
                    <h3 className="text-4xl font-bold text-zinc-700">
                      {id.clientobjective}
                    </h3>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="px-6 py-4 overflow-y-auto border-b divide-y max-h-96">
                    <div className="py-4 ">
                      <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        About & Outcome
                      </p>
                      <p className="text-xl font-light text-zinc-700">
                        {id.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 overflow-y-auto text-right border-b divide-y max-h-96">
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
                        {id.service}
                      </span>
                    </div>
                    <div className="py-4 ">
                      <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Status
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        {id.status}
                      </span>
                    </div>
                    <div className="py-4 ">
                      <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Cost
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        {id.costamount} {id.costcurrency}
                      </span>
                    </div>
                    <div className="py-4 ">
                      <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Duration
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                        {id.duration}
                        {id.durationunit}
                      </span>
                    </div>
                    {id.dateCompleted ? (
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Date Completed
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.datecompleted}
                        </span>
                      </div>
                    ) : null}
                    {id.clientNiche ? (
                      <div className="py-4 ">
                        <p className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Client Niche
                        </p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.clientniche}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="self-center mx-auto align-middle rounded-sm shadow-sm h-fit">
                    <img
                      src={`https://sesame-d9wj8.ondigitalocean.app/assets/demo/architect`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
        {/*  <Transition appear show={projectIsOpen} as={Fragment}>
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
                      {user && user.uid === uid ? (
                        <Menu
                          as="div"
                          className="relative flex justify-end text-left"
                        >
                          <div>
                            <Menu.Button
                              onClick={() => navigate(-1)}
                              type="button"
                              className="flex items-center justify-start px-4 py-2 hover:bg-gray-100"
                            >
                              <DotsHorizontalIcon className="w-6 h-5 text-gray-700" />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-24 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg mt-9 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={openEditModal}
                                      className={classNames(
                                        active
                                          ? "w-full bg-gray-100 text-gray-900"
                                          : "w-full text-gray-700",
                                        "block px-4 text-left py-2 text-sm"
                                      )}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>

                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={openModal}
                                      className={classNames(
                                        active
                                          ? "w-full bg-gray-100 text-gray-900"
                                          : "w-full text-gray-700",
                                        "block px-4 text-left py-2 text-sm"
                                      )}
                                    >
                                      Delete
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : null}
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
                    {id.clientobjective}
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
                          src={`${process.env.STORAGE}/${id.filenames}`}
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
                          {id.unitoption}
                        </span>
                      </div>

                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Cost
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.cost} {id.currencyoption}
                        </span>
                      </div>
                      <div className="py-4 ">
                        <dt className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Objective Completed
                        </dt>

                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {id.objectiveoption}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
                    </Transition>*/}
          <div className="py-10 bg-white ">
            <div className="flex items-center justify-between h-16 max-w-5xl py-6 mx-auto md:justify-start md:space-x-10">
              <div className="flex items-center justify-start lg:w-0 lg:flex-1">
                {userProfile.map((profile) => (
                  <div className="py-10">
                    <div className="flex items-center pb-2 space-x-4 border-b">
                      <h3 className="text-4xl font-bold text-zinc-700">
                        {profile.displayname}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="px-5 py-4 overflow-hidden border shadow-md ">
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
                      {projectsCount}
                    </h3>
                    <h3 className="pl-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Client-Jobs in total
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {userProfile.map((profile) => (
              <div className="max-w-18">
                <p className="mt-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase break-words ">
                  {profile.type}
                </p>
              </div>
            ))}

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
                    Only with Photos
                  </span>
                </Switch.Label>
              </Switch.Group>
            </div>
          </div>
          <div className="flex flex-col w-full mb-20 shadow-2xl">
            <div className="-my-9 ">
              <div className="inline-block w-full py-2 align-middle ">
                <div className="overflow-hidden">
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
                            Status
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
                            Status
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
                                src={`http://localhost:3000/assets/${project.filenames[0]}`}
                              />
                            </div>
                          ) : null}
                          {enabled && project.filenames.length >= 1 ? (
                            <td className="px-6 py-4 min-h-96">
                              <>
                                <t className="font-medium text-gray-900 break-normal max-w-24 text-md">
                                  {project.clientobjective}
                                </t>
                              </>
                            </td>
                          ) : (
                            <td className="px-6 py-4 min-h-96">
                              <>
                                <t className="font-medium text-gray-900 break-normal max-w-24 text-md">
                                  {project.clientobjective}
                                </t>
                              </>
                            </td>
                          )}

                          <td className="px-6 py-4 ">
                            <p className="text-gray-900 break-normal max-w-16 text-md">
                              {project.service}
                            </p>
                            <t className="text-gray-500 text-md">
                              {project.duration}
                              {project.durationunit}
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
        </div>
      </>
    );
  }
}
