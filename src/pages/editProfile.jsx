import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { profileDataStructure } from "./profile";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import InputBox from "../components/Input";
import { uploadImage } from "../common/aws";
import { storeInSession } from "../common/session";

const EditProfile = () => {
  let {
    userAuth,
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  let bioLimit = 150;

  let profileImgEle = useRef();
  let editProfileForm = useRef();

  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [characterLeft, setCharacterLeft] = useState(bioLimit);
  const [updatedProfileImg, setUpdatedProfileImg] = useState(null);

  let {
    personal_info: { fullname, username: profile_username, profile_img, email, bio },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          toast.error("Gagal memuat data profil, coba lagi nanti.");
        });
    }
  }, [access_token]);

  const handleCharacterChange = e => {
    setCharacterLeft(bioLimit - e.target.value.length);
  };

  const handleImagePreview = e => {
    let img = e.target.files[0];
    profileImgEle.current.src = URL.createObjectURL(img);
    setUpdatedProfileImg(img);
  };

  const handleImageUpload = e => {
    e.preventDefault();

    if (updatedProfileImg) {
      let loadingToast = toast.loading("Mengupload gambar...");

      e.target.setAttribute("disabled", true);

      uploadImage(updatedProfileImg)
        .then(url => {
          if (url) {
            axios
              .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/update-profile-img",
                { url },
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              )
              .then(({ data }) => {
                let newUserAuth = {
                  ...userAuth,
                  profile_img: data.profile_img,
                };

                storeInSession("user", JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);

                setUpdatedProfileImg(null);

                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.success("Gambar berhasil diupload 👍");
              })
              .catch(({ response }) => {
                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.error("Gagal mengupload gambar Pastikan Gambar Tidak lebih dari 3 MB dan berformat JPEG/JPG/PNG" + response.data.error);
              });
          }
        })
        .catch(err => {
          console.log(err);
          toast.dismiss(loadingToast);
          e.target.removeAttribute("disabled");
          toast.error("Gagal mengupload gambar. Silakan coba lagi.");
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let form = new FormData(editProfileForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { username, bio, youtube, facebook, twitter, github, instagram, website } = formData;

    if (username.length < 3) {
      return toast.error("Username minimal 3 karakter");
    }
    if (bio.length > bioLimit) {
      return toast.error(`Bio tidak boleh lebih dari ${bioLimit} karakter`);
    }

    let loadingToast = toast.loading("Memperbarui profil...");

    e.target.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-profile",
        {
          username,
          bio,
          social_links: {
            youtube,
            facebook,
            twitter,
            github,
            instagram,
            website,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        if (userAuth.username !== data.username) {
          let newUserAuth = { ...userAuth, username: data.username };

          storeInSession("user", JSON.stringify(newUserAuth));
          setUserAuth(newUserAuth);
        }

        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.success("Profil berhasil diperbarui!");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.error("Gagal memperbarui profil: " + response.data.error);
      });
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form ref={editProfileForm}>
          <h1 className="max-md:hidden">Edit Profile</h1>

          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                id="profileImgLable"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Gambar
                </div>
                <img
                  ref={profileImgEle}
                  alt={"profile-img"}
                  src={profile_img}
                />
              </label>

              <input
                type="file"
                id="uploadImg"
                accept=".jpeg, .png, .jpg"
                hidden
                onChange={handleImagePreview}
              />

              <button
                className="btn-light mt-5 max-lg:center lg:w-full px-10"
                onClick={handleImageUpload}
              >
                Upload
              </button>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div>
                  <InputBox
                    name="fullname"
                    type="text"
                    value={fullname}
                    placeholder="Nama Lengkap"
                    disable={true}
                    icon="fi-rr-user"
                  />
                  <InputBox
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Alamat Email"
                    disable={true}
                    icon="fi-rr-envelope"
                  />
                </div>
              </div>

              <InputBox
                type="text"
                name="username"
                value={profile_username}
                placeholder="Username"
                icon="fi-rr-at"
              />

              <p className="text-dark-grey -mt-3">
                Username akan digunakan sebagai pencarian pengguna dan akan ditampilkan kepada semua pengguna.
              </p>

              <textarea
                name="bio"
                maxLength={bioLimit}
                defaultValue={bio}
                className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                placeholder="Bio"
                onChange={handleCharacterChange}
              ></textarea>

              <p className="mt-1 text-dark-grey">{characterLeft} karakter tersisa</p>

              <p className="my-6 text-dark-grey">Tambahkan Sosial Media Disini</p>

              <div className="md:grid md:grid-cols-2 gap-x-6">
                {Object.keys(social_links).map((key, i) => {
                  let link = social_links[key];

                  return (
                    <InputBox
                      key={i}
                      name={key}
                      type="text"
                      value={link}
                      placeholder="https://"
                      icon={"fi " + (key !== "website" ? "fi-brands-" + key : "fi-rr-globe")}
                    />
                  );
                })}
              </div>

              <button
                className="btn-dark w-auto px-10"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
