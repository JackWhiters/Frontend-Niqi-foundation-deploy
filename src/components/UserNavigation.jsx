import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { UserContext } from "../App";

const UserNavigationPanel = ({ showSignOutConfirmation }) => {
  const {
    userAuth: { username },
  } = useContext(UserContext);

  return (
    <>
      <AnimationWrapper
        className="absolute right-0 z-50"
        transition={{ duration: 0.2 }}
      >
        <div className="bg-white absolute right-0 border border-grey w-60 duration-200">
          <Link
            to={`/user/${username}`}
            className="link pl-8 py-4"
          >
            Profile
          </Link>

          <Link
            to={`/dashboard/blogs`}
            className="link pl-8 py-4"
          >
            Dashboard
          </Link>

          <Link
            to={`/settings/edit-profile`}
            className="link pl-8 py-4"
          >
            Settings
          </Link>

          <span className="absolute border-t border-grey w-[100%]"></span>

          <button
            className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
            onClick={() => {
              showSignOutConfirmation(true);
            }}
          >
            <h1 className="font-bold text-xl mg-1">Sign Out</h1>
            <p className="text-dark-grey">@{username}</p>
          </button>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default UserNavigationPanel;
