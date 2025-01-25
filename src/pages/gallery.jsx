import { useState } from "react";
import Footer from "../components/Footer";
import Modal from "react-responsive-modal";
import { useEffect } from "react";
import axios from "axios";
import reverse from "lodash/reverse.js";

const Gallery = () => {
  const [showImgPreview, setShowImgPreview] = useState(false);
  const [galleries, setGalleries] = useState();
  const [imgData, setImageData] = useState({});

  useEffect(() => {
    const getGalleries = () => {
      axios
        .get(import.meta.env.VITE_SERVER_GALLERIES + "/gallery")
        .then(res => {
          setGalleries(reverse(res.data.items));
        })
        .catch(err => {
          console.log(err);
        });
    };

    getGalleries({ page: 1, limit: 10 });
  }, []);

  return (
    <>
      {/* Image Preview */}
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
          <img src={imgData?.image_url} />
          <p className="text-2xl font-semibold dark:text-grey light:text-black">{imgData?.title}</p>
          <p className="dark:text-grey light:text-black">{imgData?.description}</p>
        </div>
      </Modal>

      <section className="py-10 h-cover">
        <div className="w-full">
          <div className="w-full">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Galeri Kegiatan Niqi Foundation</h2>

              <p className="w-auto mt-4 text-xl text-grey-dark">Temukan berbagai momen berharga dalam dokumentasi kegiatan yang dilaksanakan oleh Niqi Foundation, yang berfokus pada pendidikan, kesehatan, dan pemberdayaan sosial.</p>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="w-full mb-8 overflow-hidden rounded-lg aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/videoseries?si=pTTokC847ZuzgLBu&amp;list=PLOcktHLnQSpyBxuXkJLJVdhsspp7JAnFH"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
              {galleries !== undefined ? (
                galleries.map(gallery => (
                  <img
                    key={gallery._id}
                    src={gallery.image_url}
                    className="bg-gray-200 rounded-lg h-52"
                    onClick={() => {
                      setShowImgPreview(true);
                      setImageData(gallery);
                    }}
                    alt={"yayasan-img"}
                  />
                ))
              ) : (
                <p>Saat Ini Belum Ada Galeri Yang Ditampilkan.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
