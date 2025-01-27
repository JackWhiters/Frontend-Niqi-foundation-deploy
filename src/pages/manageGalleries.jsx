import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Loader from "../components/Loader";
import NoDataMessage from "../components/NoData";
import AnimationWrapper from "../common/page-animation";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ManagePublishedGalleryCard } from "../components/ManageGalleryCard";
import reverse from "lodash/reverse";

const ManageGalleries = () => {
  const [galleries, setGalleries] = useState(null);
  const [onDeleteInc, setOnDeleteInc] = useState(0);
  const navigate = useNavigate();

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if (access_token) {
      const getGalleries = () => {
        axios
          .get(import.meta.env.VITE_SERVER_GALLERIES + "/gallery", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(res => {
            setGalleries(reverse(res.data.items));
          })
          .catch(err => {
            console.log(err);
          });
      };

      getGalleries({ page: 1, limit: 10 });
    } else {
      navigate("/signin");
    }
  }, [onDeleteInc]);

  return (
    <>
      <h1 className="w-full">Manajemen Galeri</h1>

      <div className="flex gap-6 my-8">
        <Link
          className="w-auto px-5 py-3 text-center text-black dark:text-white bg-slate-100 rounded-xl text-nowrap"
          to={"/gallery/create"}
        >
          Tambah Galeri
        </Link>
      </div>

      {galleries == null ? (
        <Loader />
      ) : galleries.length ? (
        <>
          {galleries.map((data, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ delay: i * 0.04 }}
              >
                <ManagePublishedGalleryCard
                  onTriggerDelete={setOnDeleteInc}
                  galleryData={data}
                />
              </AnimationWrapper>
            );
          })}
        </>
      ) : (
        <NoDataMessage message="Tidak ada Galeri dipublish" />
      )}
    </>
  );
};

export default ManageGalleries;
