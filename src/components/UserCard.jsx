import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  let {
    personal_info: { fullname, username, profile_img },
  } = user;

  console.log("profile_img: ", profile_img);

  return (
    <Link
      to={`/user/${username}`}
      className="flex gap-5 items-center mb-5"
    >
      <i className="fi fi-rr-portrait text-3xl -mb-2"></i>

      <div>
        <h1 className="font-medium text-xl line-clamp-2">{fullname}</h1>
        <p className="text-dark-grey">@{username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
