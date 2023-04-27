import React, { useState, useEffect } from "react";
import {
  HiOutlineSearch,
  HiCog,
  HiLogout,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Dropdown, Avatar, Button, Modal } from "flowbite-react";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { menuItems } from "./MenuItems";
import { getSearchMoviesData } from "../../api/IMDB";
import { auth, logout } from "../../../firebase";
import profilePic from "../../assets/profilePic.png";

import "./style.scss";

const Header = () => {
  const [apiData, setApiData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    getSearchMoviesData(setApiData, "search/movie", 1, query);
    // console.log("search",searchItem);
  }, [query]);

  const changeColor = ({ isActive }) => {
    return {
      color: isActive ? "red" : "white",
    };
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/searchresult/${query}`);
      setTimeout(() => {
        setShowSearch(false);
        setQuery("");
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
    setQuery("");
  };

  const searchIconOpenClose = () => {
    setShowSearch(!showSearch);
    setQuery("");
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      {/* <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="" />
      </div> */}
      <div className="contentWrapper">
        <ul className="menuItems">
          {menuItems.map((item) => (
            <li key={item.id} className="menuItem">
              <NavLink to={item.url} style={changeColor}>
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="menuItem">
            <HiOutlineSearch
              className="text-white"
              onClick={searchIconOpenClose}
            />
          </li>
        </ul>

        {user ? ( //
          <>
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img={user.photoURL || profilePic}
                  rounded={true}
                />
              }
              arrowIcon={false}
              inline={true}
            >
              {/* <img src={user.photoURL} alt="" /> */}
              <Dropdown.Header>
                <span className="block text-sm">{user.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={CgProfile}>Profile</Dropdown.Item>
              <Link to="/wishlist">
                <Dropdown.Item icon={MdOutlinePlaylistAddCheck}>
                  Wishlist
                </Dropdown.Item>
              </Link>
              <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                icon={HiLogout}
                onClick={() => setSignOutModal(!signOutModal)}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>

            <Modal
              show={signOutModal}
              size="md"
              popup={true}
              onClose={() => setSignOutModal(!signOutModal)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to Sign Out?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => {
                        logout();
                        setSignOutModal(!signOutModal);
                      }}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setSignOutModal(!signOutModal)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/login">
              <Button outline={true} gradientDuoTone="purpleToBlue">
                Log In
              </Button>
            </Link>

            <Link to="/signup">
              <Button outline={true} gradientDuoTone="purpleToBlue">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
        {showSearch && (
          <div className="searchBar">
            <div className="searchInput">
              <input
                type="text"
                className="text-gray-900"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose className="mr-2" onClick={searchIconOpenClose} />
            </div>
          </div>
        )}

        {query !== "" && (
          <div
            className={
              "w-[22rem] h-[26rem]  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-x-auto absolute top-[7.5rem] z-10"
            }
          >
            <ul className="z-20 ">
              {apiData.map((item) => (
                // console.log(item)
                <li
                  key={item.id}
                  className="py-1 bg-slate-700 hover:bg-slate-900 text-white pl-8"
                >
                  <NavLink>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
