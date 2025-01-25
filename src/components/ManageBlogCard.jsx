import axios from "axios";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Modal from "react-responsive-modal";

const BlogStats = ({ stats }) => {
  return (
    <div className="flex gap-2 max-lg:mb-6 max-lg:pb-6 border-grey max-lg:border-b">
      {Object.keys(stats).map((key, i) => {
        return key.includes("parent") ? (
          <div
            key={i}
            className={"flex flex-col items-center w-full h-full justify-center p-4 px-6 " + (i !== 0 ? " border-grey border-l " : "")}
          >
            <h1 className="text-xl lg:text-2xl mb-2">{stats[key].toLocaleString()}</h1>
            <p className="max-lg:text-dark-grey capitalize">{key.split("_")[1]}</p>
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export const ManagePublishedBlogCard = ({ blog }) => {
  let { banner, blog_id, title, publishedAt, activity } = blog;
  let [showStat, setShowStat] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  return (
    <>
      <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
        <img
          src={banner}
          alt={"banner-image"}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover rounded-xl"
        />

        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div>
            <Link
              to={`/blog/${blog_id}`}
              className="blog-title mb-4 hover:underline"
            >
              {title}
            </Link>

            <p className="line-clamp-1">Dipublish pada {getDay(publishedAt)}</p>
          </div>

          <div className="flex gap-6 mt-3">
            <Link
              to={`/editor/${blog_id}`}
              className="pr-4 py-2 underline"
            >
              Edit
            </Link>

            <button
              className="lg:hidden pr-4 py-2 underline"
              onClick={() => setShowStat(preVal => !preVal)}
            >
              Stats
            </button>

            <button
              className="pr-4 py-2 underline text-red"
              onClick={() => setShowDeleteOverlay(!showDeleteOverlay)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="max-lg:hidden">
          <BlogStats stats={activity} />
        </div>
      </div>

      {showStat ? (
        <div className="lg:hidden">
          <BlogStats stats={activity} />
        </div>
      ) : (
        <></>
      )}

      {showDeleteOverlay && (
        <Modal
          open={showDeleteOverlay}
          onClose={setShowDeleteOverlay}
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
            <p className={"font-semibold text-2xl"}>Anda yakin ingin menghapus artikel ini?</p>
            <p className={"text-center py-4 font-bold text-2xl bg-slate-100 rounded-full mt-6"}>{title}</p>
          </div>
          <div className={"flex flex-col gap-4"}>
            <button
              className={"px-6 py-3 border w-full rounded-xl bg-red text-white font-bold"}
              onClick={e => {
                deleteBlog(blog, access_token, e.target);
                setShowDeleteOverlay(false);
              }}
            >
              Hapus
            </button>
            <button
              className={"px-6 py-3 border w-full rounded-xl "}
              onClick={() => setShowDeleteOverlay(false)}
            >
              Batal
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const ManageDraftBlogPost = ({ blog }) => {
  let { title, des, blog_id, index } = blog;
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  index++;

  return (
    <>
      <div className="flex gap-5 lg:gap-10 pb-6 border-b mb-6 border-grey">
        <h1 className="blog-index text-center pl-4 md:pl-6 flex-none">{index < 10 ? "0" + index : index}</h1>
        <div>
          <h1 className="blog-title mb-3">{title}</h1>
          <p className="line-clamp-2 font-gelasio">{des.length ? des : "Tidak ada deskripsi"}</p>
          <div className="flex gap-6 mt-3">
            <Link
              to={`/editor/${blog_id}`}
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

      {showDeleteOverlay && (
        <Modal
          open={showDeleteOverlay}
          onClose={setShowDeleteOverlay}
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
            <p className={"font-semibold text-2xl dark:text-grey light:text-black"}>Anda yakin ingin menghapus draft artikel ini?</p>
            <p className={"text-center py-4 font-bold text-2xl bg-slate-100 rounded-full mt-6 dark:text-grey light:text-black"}>{title}</p>
          </div>
          <div className={"flex flex-col gap-4"}>
            <button
              className={"px-6 py-3 border w-full rounded-xl bg-red text-white font-bold dark:text-black light:text-grey"}
              onClick={e => {
                deleteBlog(blog, access_token, e.target);
                setShowDeleteOverlay(false);
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
      )}
    </>
  );
};

const deleteBlog = (blog, access_token, target) => {
  let { blog_id, setStateFunc } = blog;

  target.setAttribute("disabled", true);

  axios
    .post(
      import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog",
      { blog_id },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    .then(() => {
      target.removeAttribute("disabled");

      setStateFunc(preVal => {
        let { deletedDocCount, totalDocs, results } = preVal;

        const filteredResults = results.filter(result => {
          if (result.blog_id !== blog_id) {
            return result;
          }
        });

        if (!deletedDocCount) {
          deletedDocCount = 0;
        }

        if (!results.length && totalDocs - 1 > 0) {
          return null;
        }

        return {
          ...preVal,
          results: filteredResults,
          totalDocs: totalDocs - 1,
          deletedDocCount: deletedDocCount + 1,
        };
      });
    })
    .catch(err => {
      console.log(err);
    });
};
