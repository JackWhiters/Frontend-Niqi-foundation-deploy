import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "/assets/imgs/logo-niqi.webp";

import lightBanner from "/assets/imgs/blog banner light.png";
import darkBanner from "/assets/imgs/blog banner dark.png";
import AnimationWrapper from "../common/page-animation";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, UserContext } from "../App";
import { toast } from "react-hot-toast";
import { uploadImage } from "../common/aws";
import axios from "axios";

const GalleryEditor = () => {
  let { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const isEdit = window.location.toString().includes("edit");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileSize, setImageFileSize] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleError = e => {
    let img = e.target;
    img.src = theme === "light" ? lightBanner : darkBanner;
  };

  const handleBannerUpload = e => {
    let img = e.target.files[0];

    if (img) {
      setIsLoading(true);
      setImageFileSize(img.size);

      let loadingToast = toast.loading("Uploading...");

      uploadImage(img)
        .then(url => {
          if (url) {
            console.log("Then of Upload Image: ", url);
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            setImageUrl(url);
          }
        })
        .catch(err => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const fetchDetailGallery = async id => {
    try {
      await axios.get(import.meta.env.VITE_SERVER_GALLERIES + `/gallery`).then(res => {
        const galleryItem = res.data.items.filter(item => item._id === id)[0];
        setTitle(galleryItem.title);
        setDescription(galleryItem.description);
        setImageUrl(galleryItem.image_url);
      });
    } catch (error) {
      console.error("Error fetching donation detail: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (isEdit, id, isDraft) => {
    if (title === "") {
      return toast.error("Mohon isi judul galeri");
    }

    if (description === "") {
      return toast.error("Mohon isi deskripsi galeri");
    }

    if (imageUrl === "") {
      return toast.error("Mohon upload gambar untuk galeri");
    }

    const payload = {
      title,
      description,
      image_url: imageUrl,
      draft: isDraft,
      fileSize: imageFileSize,
      category: "Default",
    };

    let loadingToast = toast.loading("Saving Gallery...");

    const createGallery = () => {
      axios
        .post(import.meta.env.VITE_SERVER_GALLERIES + "/gallery", payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(() => {
          toast.dismiss(loadingToast);

          if (isDraft) {
            toast.success("Save to Draft 👍");
          } else {
            toast.success("Published 👍");
          }

          setTimeout(() => {
            navigate("/galeri");
          }, 500);
        })
        .catch(({ response }) => {
          toast.dismiss(loadingToast);
          return toast.error(response?.data?.error);
        });
    };

    const updateGallery = id => {
      console.log("Update Donation Schedule: ", payload, id);

      axios
        .put(import.meta.env.VITE_SERVER_GALLERIES + `/gallery/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(() => {
          toast.dismiss(loadingToast);

          if (isDraft) {
            toast.success("Save to Draft 👍");
          } else {
            toast.success("Saved 👍");
          }

          setTimeout(() => {
            navigate("/galeri");
          }, 500);
        })
        .catch(({ response }) => {
          toast.dismiss(loadingToast);
          return toast.error(response?.data?.error);
        });
    };

    if (isEdit) {
      updateGallery(id);
      console.log("Updated Gallery");
    } else {
      createGallery();
      console.log("Created Gallery");
    }
  };

  useEffect(() => {
    fetchDetailGallery(id);
  }, [id]);

  return (
    <>
      {/* Navbar Donasi */}
      <nav className="navbar">
        <Link
          to="/"
          className="flex-none w-10"
        >
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">{isEdit ? `Edit ${title}` : "Buat Galeri Baru"}</p>

        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2"
            onClick={() => handleOnSubmit(isEdit, id, false)}
            disabled={isLoading}
          >
            {isEdit ? `Publish` : "Create Gallery"}
          </button>
          {/* <button
            className="btn-dark py-2"
            onClick={() => handleOnSubmit(isEdit, id, true)}
            disabled={isLoading}
          >
            Save to Draft
          </button> */}
        </div>
      </nav>

      <AnimationWrapper className="mb-24">
        <section>
          <div className="mx-auto max-w-[900px] w-full flex flex-col gap-8">
            {/* Upload Image */}
            {isEdit ? (
              <img
                src={imageUrl}
                onError={handleError}
              />
            ) : (
              <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
                <label htmlFor="uploadBanner">
                  <img
                    src={imageUrl}
                    className="z-20"
                    onError={handleError}
                  />
                  <input
                    id="uploadBanner"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                  />
                </label>
              </div>
            )}

            {/* Title Galeri */}
            <div>
              <textarea
                defaultValue={title}
                placeholder="Judul Galeri"
                className="text-4xl font-medium w-full h-20 outline-none resize-none leading-tight placeholder:opacity-40 bg-white"
                onKeyUp={e => setTitle(e.target.value)}
              />
              <hr className="w-full border-black border opacity-10 my-5" />
            </div>

            {/* Konten/Deskripsi Galeri */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold">Deskripsi Galeri</p>
              <textarea
                defaultValue={description}
                className="border rounded-xl w-full p-3"
                name="gallery_description"
                onChange={e => setDescription(e.target.value)}
                id="gallery_description"
                rows={6}
                maxLength={500}
              />
              <p>Batas Karakter {description?.length ?? 0}/500</p>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default GalleryEditor;
