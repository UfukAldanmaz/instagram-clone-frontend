import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/instagram-logo.png";
import React, { useState } from "react";
import { Popup } from "./Popup";
import { useAuth } from "../hooks/useAuth";
import openSidebar from "../assets/open-sidebar.svg";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import discover from "../assets/discover.svg";
import reels from "../assets/reels.svg";
import message from "../assets/message.svg";
import notification from "../assets/notification.svg";
import create from "../assets/create.svg";
import profile from "../assets/profile.svg";
import logOut from "../assets/logout.svg";
import CreateContent from "./CreateContent";

const Sidebar: React.FC = (_props): React.JSX.Element => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [popUp, setPopUp] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex absolute right-2 top-2 items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <img className="w-6 h-6" src={openSidebar} alt="open-sidebar" />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform duration-[0.3s] ease-[ease-in-out] border-r-2 border-gray-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className=" h-full px-3  py-4 overflow-y-auto bg-white border-r-red-500 dark:bg-gray-800">
          <ul className="space-y-2 text-justify font-normal active:font-bold text-lg mt-4 p-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group"
              >
                <img className="w-28 ml-3" src={logo} alt="instagram_logo" />
              </a>
            </li>
            <li>
              <Link
                to={"/"}
                type="button"
                className="flex items-center  p-2  text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <img src={home} alt="home" />
                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={search} alt="search" />
                <span className="flex-1 ml-3 whitespace-nowrap">Search</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={discover} alt="discover" />
                <span className="flex-1 ml-3 whitespace-nowrap">Discover</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={reels} alt="reels" />
                <span className="flex-1 ml-3 whitespace-nowrap">Reels</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={message} alt="message" />
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={notification} alt="notification" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Notifications
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={() => setPopUp(true)}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img src={create} alt="create" />
                <span className="flex-1 ml-3 whitespace-nowrap">Create</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/profile")}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img src={profile} alt="profile" />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </a>
            </li>
            <li className="absolute bottom-8">
              <a
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img src={logOut} alt="logOut" />
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <Popup trigger={popUp} setTrigger={setPopUp}>
        <CreateContent trigger={popUp} setTrigger={setPopUp} />
      </Popup>
    </div>
  );
};

export default Sidebar;
