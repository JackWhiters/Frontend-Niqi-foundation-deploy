import { useEffect, useState } from "react";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader";
import NoDataMessage from "../components/NoData";
// import LoadMoreDataBtn from "../components/LoadMore";
import { Link } from "react-router-dom";
import CountUpNumber from "../components/CountUpNumber.jsx";
import { Modal } from "react-responsive-modal";
import Footer from "../components/Footer";
import reverse from "lodash/reverse.js";
import { topFunction } from "../lib/utils.js";
import beranda from "/assets/imgs/beranda.webp";
import berandaMobile from "/assets/imgs/beranda-small.webp";
import whatAreWeDoing from "/assets/imgs/what-are-we-doing.webp";
// import Hero from "../components/Hero.jsx";
import { lazy } from "react";
import { Suspense } from "react";
// import BlogPostCard from "../components/BlogPost";
// import DonationCard from "../components/DonationCard";

const BlogPostCard = lazy(() => import("../components/BlogPost"));
const DonationCard = lazy(() => import("../components/DonationCard"));

const Beranda = () => {
  const [blogs, setBlog] = useState(null);
  const [donationData, setDonationData] = useState([]);
  const [showImgPreview, setShowImgPreview] = useState(false);
  const [galleries, setGalleries] = useState();
  const [imgData, setImageData] = useState({});

  useEffect(() => {
    const getGalleries = () => {
      axios
        .get(import.meta.env.VITE_SERVER_GALLERIES + "/gallery")
        .then(res => {
          setGalleries(reverse(res.data.items).slice(0, 5));
        })
        .catch(err => {
          console.log(err);
        });
    };

    getGalleries({ page: 1, limit: 10 });
  }, []);

  useEffect(() => {
    const fetchLatestBlogs = async (page = 1) => {
      try {
        const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page });

        const slicedData = response.data.blogs.slice(0, 3);

        const result = {
          page: 1,
          results: slicedData,
          totalDocs: slicedData.length,
        };

        setBlog(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchDonation = async () => {
      try {
        const page = 1;
        const limit = 3;
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-donation?page=${page}&limit=${limit}&draft=false`);

        // Set data donasi yang diambil
        setDonationData(response.data.donations);
      } catch (error) {
        console.error("Error fetching donation list: ", error);
      }
    };

    fetchLatestBlogs();
    fetchDonation();
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

      <section className={`relative`}>
        <picture>
          <source
            srcSet={berandaMobile}
            media="(max-width: 450px)"
          />
          <img
            fetchPriority="auto"
            loading="eager"
            src={beranda}
            alt="halaman-utama"
            className="absolute top-0 left-0"
          />
        </picture>
        <div className="relative mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 flex h-[90vh] items-center lg:px-8">
          <div className="max-w-2xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-5xl font-extrabold leading-tight text-left text- sm:text-5xl light:text-white dark:text-black">
              Maju dan berkah bersama Niqi Foundation
            </h1>

            <p className="max-w-2xl mt-4 text-left light:text-white dark:text-black sm:text-xl/relaxed">
              Ulurkan tangan Anda untuk membantu anak-anak Yatim dan Dhu'afa mendapatkan kesempatan hidup yang lebih baik dan penuh harapan.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 text-center">
              <Link
                to={"/donation"}
                className="block w-full px-12 py-3 text-sm font-bold rounded shadow dark:text-black light:text-grey bg-rose-900 focus:outline-none focus:ring sm:w-auto"
                onClick={() => topFunction()}
              >
                Donasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full py-16 mx-auto">
          <div className="grid h-auto grid-cols-1 lg:grid-cols-2">
            <div className="lg:py-16">
              <div className="h-64 sm:h-80 lg:h-[400px]">
                <img
                  alt=""
                  src={whatAreWeDoing}
                  className="object-cover w-full h-full rounded-md "
                />
              </div>
            </div>

            <div className="relative flex items-center bg-grey">
              <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"></span>

              <div className="p-8 sm:p-16 lg:p-24">
                <h2 className="text-2xl font-bold text-gray-950">Apa yang kami lakukan?</h2>

                <p className="mt-4 text-gray-600">
                  Yayasan Nur Iqsan Ibrahim hadir sebagai jembatan kebaikan untuk umat. Dengan dukungan para dermawan, kami menjalankan berbagai program seperti penyaluran zakat, infaq, sedekah, dan wakaf, hingga santunan rutin untuk anak-anak yatim dan dhuafa. Melalui inisiatif seperti Program Sedekah Subuh, Kafil Yatim, dan pembangunan pondok pesantren, kami berkomitmen untuk menciptakan perubahan positif dan mencetak generasi yang berilmu serta berakhlak mulia. Bersama, kita bisa menghadirkan cahaya harapan bagi yang membutuhkan.
                </p>

                <Link
                  to={"/tentang-kami"}
                  className="inline-block px-12 py-3 mt-8 text-sm font-bold border border-none rounded dark:text-black light:text-grey bg-rose-900 focus:outline-none focus:ring"
                  onClick={() => topFunction()}
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full">
          <div className="w-full">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Bergabung Bersama Kami</h2>

              <p className="mt-4 text-xl text-grey-dark">
                Bergabung bersama kami dalam mengembangkan Yayasan Nur Iqsan Ibrahim agar dapat membantu anak-anak Yatim dan Dhu'afa lebih baik lagi.
              </p>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="grid grid-cols-1 gap-4 py-10 text-center lg:grid-cols-4 lg:gap-8 bg-grey">
              <div className="py-8">
                <CountUpNumber
                  style={"text-5xl font-bold text-rose-900"}
                  n={1200}
                />
                <p className="text-xl font-medium">Anggota</p>
              </div>
              <div className="py-8">
                <CountUpNumber
                  style={"text-5xl font-bold text-rose-900"}
                  postfix={"Juta"}
                  n={200}
                />

                <p className="text-xl font-medium">Donasi Terkumpul</p>
              </div>
              <div className="py-8">
                <CountUpNumber
                  style={"text-5xl font-bold text-rose-900"}
                  prefix={"+"}
                  n={500}
                />
                <p className="text-xl font-medium">Proyek Dijalankan</p>
              </div>
              <div className="py-8">
                <CountUpNumber
                  style={"text-5xl font-bold text-rose-900"}
                  n={30}
                />
                <p className="text-xl font-medium">Asrama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-full py-16">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="w-full mx-auto">
              <h2 className="text-3xl font-bold sm:text-4xl">Donasi Yang Sedang Berjalan</h2>

              <p className="mt-4 text-xl text-grey-dark">
              Ulurkan infaq dan sedekah terbaik Anda untuk membantu kami mewujudkan program donasi yang sedang berjalan. Setiap kebaikan Anda membawa harapan bagi yang membutuhkan.
              </p>
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full h-full mt-10">
              <div className="grid h-full grid-cols-1 gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {donationData.length >= 1 &&
                  donationData.map((item, i) => {
                    return (
                      <DonationCard
                        data={item}
                        key={i}
                      />
                    );
                  })}
              </div>
              {donationData.length === 0 && <NoDataMessage message="Saat ini belum ada donasi yang berjalan" />}
            </div>
          </Suspense>
        </div>
      </section>

      <section className="py-16">
        <div className="w-full pb-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Artikel Terbaru</h2>
              <p className="mt-4 text-xl text-grey-dark">
                Temukan berbagai artikel terbaru dari kami yang, insyaallah, penuh dengan informasi bermanfaat.
              </p>
            </div>
            <Link
              to={"/artikel"}
              className="mt-4 w-full sm:w-[12rem] h-full px-4 py-2 text-center bg-rose-900 font-bold dark:text-black light:text-grey rounded"
              onClick={() => topFunction()}
            >
              Lihat Semua
            </Link>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="pt-8">
            {blogs == null ? (
              <Loader />
            ) : blogs.results.length >= 1 ? (
              blogs.results.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <BlogPostCard
                      content={blog}
                      author={blog?.author?.personal_info}
                    />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="Tidak ada artikel di publish" />
            )}
          </div>
        </Suspense>
      </section>

      <section className="py-16">
        <div className="w-full">
          <div className="w-full pb-10">
            <div className="flex flex-col items-center justify-between w-full gap-6 sm:flex-row">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Galeri Kegiatan</h2>
                <p className="mt-4 text-xl text-grey-dark">
                  Lihat dokumentasi kegiatan kami yang penuh inspirasi dan dedikasi dalam berbagai program kebaikan.
                </p>
              </div>
              <Link
                to={"/galeri"}
                className="px-4 py-3 w-full sm:w-[12rem] bg-rose-900 text-center font-bold dark:text-black light:text-grey rounded "
                onClick={() => topFunction()}
              >
                Lihat Semua
              </Link>
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

export default Beranda;
