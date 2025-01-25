import axios from "axios";
import { Link } from "react-router-dom";
import { getDay } from "../common/date.jsx";
import { useContext, useState } from "react";
import { UserContext } from "../App.jsx";
import Modal from "react-responsive-modal";
import toast from "react-hot-toast";

export const ManagePublishedGalleryCard = ({ galleryData, onTriggerDelete }) => {
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
  const [showImgPreview, setShowImgPreview] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const onDeleteGallery = id => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_GALLERIES}/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        onTriggerDelete(1);
        toast.success("Berhasil Menghapus Gambar 👍");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
        <img
          src={galleryData.image_url}
          alt={"banner-image"}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover rounded-xl"
        />

        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div>
            <p
              onClick={() => setShowImgPreview(true)}
              className="blog-title mb-4 hover:underline hover:cursor-pointer"
            >
              {galleryData.title}
            </p>
            <p className="line-clamp-1">Dipublish pada {getDay(galleryData.createdAt)}</p>
          </div>

          <div className="flex gap-6 mt-3">
            <Link
              to={`/gallery/edit/${galleryData._id}`}
              className="pr-4 py-2 underline"
            >
              Edit
            </Link>

            <button
              className="pr-4 py-2 underline text-red"
              onClick={() => setShowDeleteOverlay(!showDeleteOverlay)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal
        open={showImgPreview}
        onClose={() => setShowImgPreview(false)}
        closeIcon={<></>}
        styles={{
          modal: {
            borderRadius: "12px",
            padding: "32px",
          },
        }}
        center
      >
        <div className={"flex flex-col justify-center gap-4 h-full w-full"}>
          <img src={galleryData.image_url} />
          <p className="font-semibold text-2xl dark:text-grey light:text-black">{galleryData.title}</p>
          <p className="dark:text-grey light:text-black">{galleryData.description}</p>
        </div>
      </Modal>

      {/* Image Delete Confirmation */}
      <Modal
        open={showDeleteOverlay}
        onClose={() => setShowDeleteOverlay(false)}
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
          <p className={"font-semibold text-2xl dark:text-grey light:text-black"}>Anda yakin ingin menghapus gambar ini?</p>
          {/* <p className={"text-center py-4 font-bold text-2xl bg-slate-100 rounded-full mt-6"}>{galleryData.title}</p> */}
          <img
            className="mt-5"
            src={galleryData.image_url}
          />
          <p className="font-semibold text-2xl dark:text-grey light:text-black my-4">{galleryData.title}</p>
          <p className="dark:text-grey light:text-black">{galleryData.description}</p>
        </div>
        <div className={"flex flex-col gap-4"}>
          <button
            className={"px-6 py-3 border w-full rounded-xl bg-red dark:text-black light:text-grey font-bold"}
            onClick={() => {
              setShowDeleteOverlay(false);
              onDeleteGallery(galleryData._id);
            }}
          >
            Hapus
          </button>
          <button
            className={"px-6 py-3 border w-full rounded-xl dark:text-grey light:text-black"}
            onClick={() => setShowDeleteOverlay(false)}
          >
            Batal
          </button>
        </div>
      </Modal>
    </>
  );
};

export const ManageDraftedGallery = ({ galleryData }) => {
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  // let {
  //   userAuth: { access_token },
  // } = useContext(UserContext);

  let index = 0;
  index++;

  return (
    <>
      <div className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-grey">
        <h1 className="blog-index text-center pl-4 md:pl-6 flex-none">{index < 10 ? "0" + index : index}</h1>
        <div>
          <h1 className="blog-title mb-3">{galleryData.title}</h1>
          <p className="line-clamp-2 font-gelasio">{galleryData.description.length ? galleryData.description : "Tidak ada deskripsi"}</p>
          <div className="flex gap-6 mt-3">
            <Link
              to={`/editor/${galleryData.id}`}
              className="pr-4 py-2 underline"
            >
              Edit
            </Link>
            <button
              className="pr-4 py-2 underline text-red"
              // onClick={(e) => deleteBlog(blog, access_token, e.target)}
              onClick={() => setShowDeleteOverlay(!showDeleteOverlay)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
