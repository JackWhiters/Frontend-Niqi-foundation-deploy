import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "@/assets/imgs/logo-niqi.webp";
import AnimationWrapper from "../common/page-animation";
import lightBanner from "@/assets/imgs/blog banner light.png";
import darkBanner from "@/assets/imgs/blog banner dark.png";
import { uploadImage } from "../common/aws";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";
import EditorField from "./EditorField";

const BlogEditor = () => {
  let { theme } = useContext(ThemeContext);
  let { blog_id } = useParams();
  let navigate = useNavigate();
  const [bannerUrl, setBannerUrl] = useState("");

  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleBannerUpload = e => {
    let img = e.target.files[0];
    if (img) {
      let loadingToast = toast.loading("Uploading...");

      uploadImage(img)
        .then(url => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            setBannerUrl(url);
            setBlog({ ...blog, banner: url });
          }
        })
        .catch(err => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  const handleTitleKeyDown = e => {
    if (e.keyCode === 13) {
      // Enter key
      e.preventDefault();
    }
  };

  const handleTitleChange = e => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handleError = e => {
    let img = e.target;
    img.src = theme === "light" ? lightBanner : darkBanner;
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("Upload a blog banner to publish it.");
    }

    if (!title.length) {
      return toast.error("Write blog title to publish it.");
    }

    if (blog?.content?.blocks?.length <= 0) {
      return toast.error("Write something in your blog to publish it.");
    }

    setEditorState("publish");
  };

  const handleSaveDraft = e => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title?.length) {
      return toast.error("Isi judul artikel sebelum disimpan sebagai draft");
    }

    let loadingToast = toast.loading("Menyimpan Sebagai Draft...");

    e.target.classList.add("disable");

    let blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: true,
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
        { ...blogObj, id: blog_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(() => {
        e.target.classList.remove("disable");

        toast.dismiss(loadingToast);
        toast.success("Tersimpan 👍");

        setTimeout(() => {
          navigate("/dashboard/blogs?tab=draft");
        }, 500);
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response.data.error);
      });
  };

  return (
    <>
      <nav className="navbar">
        <Link
          to="/"
          className="flex-none w-10"
        >
          <img
            src={logo}
            alt={"logo"}
          />
          {/* <img src={ theme == "light" ? darkLogo : lightLogo } /> */}
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">{title?.length ? title : "New Blog"}</p>

        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2"
            onClick={handlePublishEvent}
          >
            Publish
          </button>
          <button
            className="btn-light py-2"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>
        </div>
      </nav>

      <AnimationWrapper>
        {/*<div id={'debug'}>
                    <button onClick={() => console.log("Blog Data: ", blog)}>
                        Check Blog
                    </button>
                </div>*/}

        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={banner !== "" ? banner : bannerUrl}
                  className="z-20"
                  onError={handleError}
                  alt={"banner-image"}
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

            <textarea
              defaultValue={title}
              placeholder="Judul Artikel"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className="w-full border-black border opacity-10 my-5" />

            <EditorField
              setValue={setBlog}
              additionalValue={blog}
              initialValue={blog?.content[0]}
              unique_id={"blog"}
              type={"blog"}
              className="h-72"
            />
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
