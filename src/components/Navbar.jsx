import axios from "axios";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
// import logo from "~src/assets/imgs/logo-niqi.webp";
import logo from "~src/assets/imgs/logo-niqi-nav.webp";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, UserContext } from "../App";
import UserNavigationPanel from "./UserNavigation";
import { removeFromSession, storeInSession } from "../common/session";
import Drawer from "react-modern-drawer";
import { topFunction } from "../lib/utils";
import Modal from "react-responsive-modal";

const Navbar = () => {
  const [userNavPanel, setUserNavPanel] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  let { theme, setTheme } = useContext(ThemeContext);
  let navigate = useNavigate();
  const match = useMatch(window.location.pathname);
  const isDonatingPage = window.location.toString().includes("donate");

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const {
    userAuth,
    userAuth: { access_token, profile_img, new_notification_available, isAdmin },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  useEffect(() => {
    if (access_token) {
      axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(({ data }) => {
          setUserAuth({ ...userAuth, ...data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [access_token]);

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal);
  };

  const handleSearch = e => {
    let query = e.target.value;

    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
      setIsOpen(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const changeTheme = () => {
    let newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    storeInSession("theme", newTheme);
  };

  return (
    <>
      {showSignOutConfirm && (
        <Modal
          open={showSignOutConfirm}
          onClose={setShowSignOutConfirm}
          closeIcon={<></>}
          center
          styles={{
            modal: {
              borderRadius: "12px",
              padding: "32px",
            },
          }}
        >
          <div className={"mb-6"}>
            <p className={"font-semibold text-2xl"}>Anda yakin ingin keluar?</p>
          </div>
          <div className={"flex flex-col gap-4"}>
            <button
              className={"px-6 py-3 border w-full rounded-xl bg-red text-white font-bold"}
              onClick={() => {
                signOutUser();
                setShowSignOutConfirm(false);
              }}
            >
              Keluar
            </button>
            <button
              className={"px-6 py-3 border w-full rounded-xl "}
              onClick={() => setShowSignOutConfirm(false)}
            >
              Batal
            </button>
          </div>
        </Modal>
      )}

      <nav className="navbar z-50">
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="flex items-center gap-2 md:py-2"
            onClick={() => topFunction()}
          >
            <img
              src={logo}
              className="w-14 h-14"
              alt={"logo-img"}
            />
          </Link>
          <div
            className={
              "hidden min-[780px]:block bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:relative md:p-0 md:w-auto"
            }
          >
            <input
              type="text"
              placeholder="Pencarian"
              className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
              onKeyDown={handleSearch}
            />
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
          </div>
        </div>

        <div className="hidden min-[1450px]:flex justify-center gap-6 ">
          <Link
            className={`${match.pathname === "/" && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/"}
          >
            Beranda
          </Link>
          <Link
            className={`${match.pathname.includes("kontak") && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 hover:text-grey light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/kontak"}
          >
            Kontak
          </Link>
          <Link
            className={`${match.pathname.includes("tentang-kami") && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 hover:text-grey light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/tentang-kami"}
          >
            Tentang Kami
          </Link>
          <Link
            className={`${match.pathname.includes("galeri") && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 hover:text-grey light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/galeri"}
          >
            Galeri
          </Link>
          <Link
            className={`${match.pathname.includes("donation") && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 hover:text-grey light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/donation"}
          >
            Donasi
          </Link>
          <Link
            className={`${match.pathname.includes("artikel") && "bg-slate-100 dark:text-grey"} hover:bg-slate-200 hover:text-grey light:text-black rounded-xl px-5 py-2`}
            onClick={() => topFunction()}
            to={"/artikel"}
          >
            Artikel
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden min-[1000px]:flex">
            {isAdmin ? (
              <>
                <Link
                  to="/editor"
                  className="hidden md:flex gap-2 link rounded-xl"
                >
                  <i className="fi fi-rr-file-edit"></i>
                  <p>Tulis Artikel</p>
                </Link>
                <Link
                  to="/donation/create"
                  className="hidden md:flex gap-2 link rounded-xl"
                >
                  <i className="fi fi-rr-file-edit"></i>
                  <p>Buat Donasi</p>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>

          {!isDonatingPage && (
            <button
              className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10"
              onClick={changeTheme}
              aria-label="ubah tema"
            >
              <i className={"text-2xl block mt-1 fi fi-rr-" + (theme === "light" ? "moon-stars" : "sun") + ""}></i>
            </button>
          )}

          {access_token ? (
            <>
              <Link to="/dashboard/notifications">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                  {new_notification_available ? <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span> : ""}
                </button>
              </Link>

              <button
                className="rounded-full bg-grey relative hover:bg-black/10 p-4 block min-[1450px]:hidden"
                onClick={toggleDrawer}
              >
                <svg
                  className="block h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    alt={"profile-image"}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {userNavPanel ? <UserNavigationPanel showSignOutConfirmation={setShowSignOutConfirm} /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link
                className="btn-dark py-2 hidden min-[1450px]:block"
                to="/signin"
              >
                Masuk
              </Link>

              <button
                className="rounded-full bg-grey relative hover:bg-black/10 p-4 block min-[1450px]:hidden"
                onClick={toggleDrawer}
              >
                <svg
                  className="block h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>

              <Link
                className="btn-light py-2 hidden min-[1450px]:block"
                to="/signup"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </nav>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="bg-black"
        duration={0}
      >
        <>
          <div className="flex gap-3 p-5 justify-center items-center">
            <img
              src={logo}
              className="w-10 h-10"
              alt={"logo-img"}
            />
            <p className="font-semibold text-xl light:text-black dark:text-grey">Niqi Foundation</p>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              className={`${match?.pathname === "/" && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/"}
            >
              Beranda
            </Link>
            <Link
              className={`${match?.pathname.includes("kontak") && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/kontak"}
            >
              Kontak
            </Link>
            <Link
              className={`${match?.pathname.includes("tentang-kami") && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/tentang-kami"}
            >
              Tentang Kami
            </Link>
            <Link
              className={`${match?.pathname.includes("galeri") && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/galeri"}
            >
              Galeri
            </Link>
            <Link
              className={`${match?.pathname.includes("donation") && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/donation"}
            >
              Donasi
            </Link>
            <Link
              className={`${match?.pathname.includes("artikel") && "bg-slate-100"} hover:bg-slate-200 px-5 py-5 light:text-black dark:text-grey`}
              onClick={toggleDrawer}
              to={"/artikel"}
            >
              Artikel
            </Link>
          </div>
          <div className="flex flex-col gap-3 p-3 mt-3">
            {isAdmin ? (
              <>
                <Link
                  to="/editor"
                  className="flex light:text-black dark:text-grey gap-2 link rounded-xl"
                >
                  <i className="fi fi-rr-file-edit"></i>
                  <p>Tulis Artikel</p>
                </Link>
                <Link
                  to="/donation/create"
                  className="flex light:text-black dark:text-grey gap-2 link rounded-xl"
                >
                  <i className="fi fi-rr-file-edit"></i>
                  <p>Buat Donasi</p>
                </Link>
              </>
            ) : (
              <></>
            )}
            {!access_token ? (
              <>
                <Link
                  to={"/signup"}
                  className="btn-dark w-full text-center"
                  onClick={() => toggleDrawer()}
                >
                  Daftar
                </Link>
                <Link
                  to={"/signin"}
                  className="btn-dark w-full text-center"
                  onClick={() => toggleDrawer()}
                >
                  Masuk
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn-dark bg-red dark:text-black light:text-white w-full text-center"
                  onClick={() => {
                    toggleDrawer();
                    setShowSignOutConfirm(true);
                  }}
                >
                  <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                </button>
              </>
            )}
            <div className={"w-full left-0 top-full mt-2 border-t py-4 relative "}>
              <input
                type="text"
                placeholder="Pencarian"
                className="w-full p-4 pl-6 pr-[12%] border rounded-full light:text-black dark:text-grey md:pl-12"
                onKeyDown={handleSearch}
              />
              <i className="fi fi-rr-search absolute right-[10%] bottom-[32%] md:pointer-events-none md:left-5 text-xl text-dark-grey"></i>
            </div>
          </div>
        </>
      </Drawer>

      <Outlet />
    </>
  );
};

export default Navbar;
