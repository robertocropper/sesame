import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../App";
import { Dialog, Transition, Switch, Menu } from "@headlessui/react";
import {
  ChevronUpIcon,
  PencilIcon,
  PlusIcon,
  DotsHorizontalIcon,
  XIcon,
} from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/outline";
import { Create } from "./create";
import { Edit } from "./edit";
import { EditProfile } from "./edit-profile";
import { Notification } from "./notification";

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
  const [showNotification, setShowNotification] = useState(false);
  const [showEditNotification, setShowEditNotification] = useState(false);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  useEffect(() => {
    getUserProfile();
    getUserProjects();
  }, [uid, showNotification, showEditNotification, showDeleteNotification]);

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

  function closeCreateModal() {
    setCreateIsOpen(false);
  }

  function openCreateModal() {
    setCreateIsOpen(true);
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

  return (
    <>
      <Notification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        showEditNotification={showEditNotification}
        setShowEditNotification={setShowEditNotification}
        showDeleteNotification={showDeleteNotification}
        setShowDeleteNotification={setShowDeleteNotification}
      />
      <Transition appear show={createIsOpen} as={Fragment}>
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

            <div className="fixed relative inline-block w-2/5 m-4 overflow-y-auto text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl h-96">
              <Create
                user={user}
                closeCreateModal={closeCreateModal}
                showNotification={showNotification}
                setShowNotification={setShowNotification}
              />
            </div>
          </div>
        </Dialog>
      </Transition>
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

            <div className="fixed relative inline-block w-2/5 m-4 overflow-y-auto text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl h-96">
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
          className="fixed inset-0 z-10 min-h-screen mx-auto overflow-y-auto"
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

            <div className="fixed relative inline-block w-2/5 m-4 overflow-y-auto text-left align-middle transition-all transform bg-white border rounded-sm shadow-xl h-96">
              <Edit
                id={id}
                editIsOpen={openEditModal}
                closeEditModal={closeEditModal}
                showEditNotification={showEditNotification}
                setShowEditNotification={setShowEditNotification}
              />
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
              <button
                onClick={openCreateModal}
                type="button"
                className="flex items-center justify-start px-2 py-1 my-4 rounded-md hover:bg-gray-100"
              >
                <p className="text-xs font-medium text-gray-700 uppercase">
                  Create
                </p>
                <PlusIcon className="w-6 h-5 ml-2 text-gray-700" />
              </button>
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
        </Transition>
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
                          <div className="overflow-hidden h-fit w-72">
                            <img
                              src={`${process.env.STORAGE}/${project.filenames[0]}`}
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
                            {project.unitoption}
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
      </div>
    </>
  );
}
