import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/authentication/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import PageNotFound from "./pages/404";
import ProfilePage from "./pages/profile";
import BlogPage from "./pages/blog";
import SideNav from "./components/SideNavbar";
import ChangePassword from "./pages/changePassword";
import EditProfile from "./pages/editProfile";
import Notifications from "./pages/notifications";
import ManageBlogs from "./pages/manageBlogs";
import Contact from "./pages/contact";
import AboutPage from "./pages/about";
import Gallery from "./pages/gallery";
import Beranda from "./pages/beranda";
import DetailDonation from "./pages/donation/detailDonationPage";
import DonationPage from "./pages/donation/donationPage";
import BaseLayout from "./components/layouts/BaseLayout";
import DonationEditorPage from "./pages/donation/donationEditorPage";
import DonatingPage from "./pages/donation/donatingPage";
import CleanLayout from "./components/layouts/CleanLayout";
import ManageDonations from "./pages/manageDonations";
import ManageGalleries from "./pages/manageGalleries";
import GalleryEditorPage from "./pages/galleryEditor";
import RiwayatDonasi from "./pages/riwayatDonasi";
import DetailRiwayatDonasi from "./pages/detailRiwayatDonasi";
import ResetPasswordPage from "./pages/authentication/resetPassword";
import ResetPassword from "./pages/authentication/resetPassword";

export const UserContext = createContext({});
export const ThemeContext = createContext({});

// const darkThemePreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  // const [theme, setTheme] = useState(() => (darkThemePreference() ? "dark" : "light"));
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let userInSession = lookInSession("user");

    let themeInSession = lookInSession("theme");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });

    if (themeInSession) {
      setTheme(() => {
        document.body.setAttribute("data-theme", themeInSession);

        return themeInSession;
      });
    } else {
      document.body.setAttribute("data-theme", theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route
            path="/editor"
            element={<Editor />}
          />
          <Route
            path="/editor/:blog_id"
            element={<Editor />}
          />
          <Route
            path="/"
            element={<Navbar />}
          >
            {/* Common Routes */}
            <Route
              index
              element={<Beranda />}
            />
            <Route
              path="artikel"
              element={<HomePage />}
            />
            <Route
              path="galeri"
              element={<Gallery />}
            />
            <Route
              path="tentang-kami"
              element={<AboutPage />}
            />
            <Route
              path="kontak"
              element={<Contact />}
            />
            <Route
              path="donation"
              element={<DonationPage />}
            />

            {/* Authentication Routes */}
            <Route
              path="signin"
              element={<UserAuthForm type="sign-in" />}
            />
            <Route
              path="signup"
              element={<UserAuthForm type="sign-up" />}
            />
            <Route
              path="reset-password"
              element={<ResetPassword />}
            />

            {/* User Role Based Routes */}
            <Route
              path="dashboard"
              element={<SideNav />}
            >
              <Route
                path="galleries"
                element={<ManageGalleries />}
              />
              <Route
                path="donations"
                element={<ManageDonations />}
              />
              <Route
                path="blogs"
                element={<ManageBlogs />}
              />
              <Route
                path="notifications"
                element={<Notifications />}
              />
              <Route
                path="riwayat-donasi"
                element={<RiwayatDonasi />}
              />
              <Route
                path="riwayat-donasi/:trx_id"
                element={<DetailRiwayatDonasi />}
              />
            </Route>

            <Route
              path="settings"
              element={<SideNav />}
            >
              <Route
                path="edit-profile"
                element={<EditProfile />}
              />
              <Route
                path="change-password"
                element={<ChangePassword />}
              />
            </Route>

            <Route
              path="search/:query"
              element={<SearchPage />}
            />
            <Route
              path="user/:id"
              element={<ProfilePage />}
            />
            <Route
              path="blog/:blog_id"
              element={<BlogPage />}
            />

            {/* Try Catch Routes */}
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Route>

          {/* Donation Route */}
          <Route
            path="donation"
            element={<BaseLayout />}
          >
            <Route
              path="create"
              element={<DonationEditorPage />}
            />
            <Route
              path="edit/:id"
              element={<DonationEditorPage />}
            />
            <Route
              path="detail/:id"
              element={<DetailDonation />}
            />
            <Route
              path="detail/:id/donate"
              element={<DonatingPage />}
            />
          </Route>

          {/* Donation Route */}
          <Route
            path="gallery"
            element={<BaseLayout />}
          >
            <Route
              path="create"
              element={<GalleryEditorPage />}
            />
            <Route
              path="edit/:id"
              element={<GalleryEditorPage />}
            />
          </Route>

          {/* Test Route */}
          <Route
            path="/clean"
            element={<CleanLayout />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
