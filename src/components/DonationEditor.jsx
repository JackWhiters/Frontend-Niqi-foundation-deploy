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
import dayjs from "dayjs";

const DonationEditor = () => {
  let { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const isEdit = window.location.toString().includes("edit");
  const navigate = useNavigate();

  const [targetAmount, setTargetAmount] = useState(0);
  const [targetPlaceholder, setTargetPlaceholder] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [donationExpiration, setDonationExpiration] = useState("");
  const [error, setError] = useState("");
  const [donationDescription, setDonationDescription] = useState();
  const [donationNewestInfo, setDonationNewestInfo] = useState();
  const [detailDonation, setDetailDonation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleCustomAmountChange = e => {
    const rawValue = Object.hasOwn(e, "target") ? e?.target?.value?.replace(/\D/g, "") : String(e); // Hapus karakter non-numeric

    // Cek apakah input kosong
    if (rawValue === "") {
      setTargetAmount(""); // Kosongkan input
      setError(""); // Hapus pesan kesalahan
      return;
    }

    // Cek apakah karakter pertama adalah '0' dan input lebih dari 1 karakter
    if (rawValue.length > 0 && rawValue[0] === "0") {
      setTargetAmount(""); // Kosongkan input jika dimulai dengan '0'
      return;
    }

    const value = parseInt(rawValue, 10);

    // Set pesan kesalahan untuk nilai kurang dari 10.000
    if (value < 10000) {
      setError("Donasi tidak boleh kurang dari 10.000 rupiah");
    } else {
      setError(""); // Hapus kesalahan untuk input yang valid
    }

    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format angka dengan titik
    setTargetPlaceholder(formattedValue);
    setTargetAmount(Number(rawValue));

    return {
      formatted: formattedValue,
      raw: Number(rawValue),
    };
  };

  const handleError = e => {
    let img = e.target;
    img.src = theme === "light" ? lightBanner : darkBanner;
  };

  const handleBannerUpload = e => {
    let img = e.target.files[0];

    if (img) {
      setIsLoading(true);
      let loadingToast = toast.loading("Uploading...");

      uploadImage(img)
        .then(url => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍");
            setThumbnailUrl(url);
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

  const fetchDetailDonation = async id => {
    try {
      await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}/details`).then(res => {
        console.log("handleCustomAmountChange: ", handleCustomAmountChange(res.data.target_amount).raw);
        setDetailDonation(res.data);
        setTitle(res.data.title);
        setThumbnailUrl(res.data.thumbnail);
        setDonationDescription(res.data.description);
        setDonationNewestInfo(res.data.content);
        setTargetAmount(handleCustomAmountChange(res.data.target_amount).raw);
      });
    } catch (error) {
      console.error("ERR SERVER: failed to fetching donation detail: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnCreateOrUpdate = (isEdit, id) => {
    if (title === "") {
      return toast.error("Mohon isi judul donasi");
    }

    if (targetAmount === 0) {
      return toast.error("Mohon isi target donasi");
    }

    if (donationExpiration === "") {
      return toast.error("Mohon isi tanggal kadaluarsa donasi");
    }

    if (thumbnailUrl === "") {
      return toast.error("Mohon upload thumbnail donasi");
    }

    const payload = {
      title,
      description: donationDescription,
      target_amount: targetAmount,
      thumbnail: thumbnailUrl,
      expiry_time: donationExpiration,
      content: donationNewestInfo,
    };

    let loadingToast = toast.loading("Saving Donation...");

    const createDonation = () => {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/donation", payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(() => {
          toast.dismiss(loadingToast);
          toast.success("Published 👍");

          setTimeout(() => {
            navigate("/donation");
          }, 500);
        })
        .catch(({ response }) => {
          toast.dismiss(loadingToast);
          return toast.error("ERR SERVER: " + response?.data?.error);
        });
    };

    const updateDonation = id => {
      console.log("Update Donation Schedule: ", payload, id);

      axios
        .put(import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(() => {
          toast.dismiss(loadingToast);
          toast.success("Saved 👍");

          setTimeout(() => {
            navigate("/donation");
          }, 500);
        })
        .catch(({ response }) => {
          toast.dismiss(loadingToast);
          return toast.error(response?.data?.error);
        });
    };

    if (isEdit) {
      updateDonation(id);
      console.log("Updated Donation");
    } else {
      createDonation();
      console.log("Created Donation");
    }
  };

  useEffect(() => {
    fetchDetailDonation(id);
  }, []);

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
        <p className="max-md:hidden text-black line-clamp-1 w-full">{isEdit ? `Edit ${detailDonation.title}` : "Buat Donasi Baru"}</p>

        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2"
            onClick={() => handleOnCreateOrUpdate(isEdit, id)}
            disabled={isLoading}
          >
            {isEdit ? `Save Donation` : "Create Donation"}
          </button>
        </div>
      </nav>

      {/* <section id="debug" className="flex gap-3">
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() =>
                        console.log("donationDescription: ", donationDescription)
                      }
                    >
                      Donation Description
                    </button>
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() =>
                        console.log("donationNewestInfo: ", donationNewestInfo)
                      }
                    >
                      Donation Newest Info
                    </button>
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() =>
                        console.log(
                          "Moment End of Day: ",
                          new Date(
                            new Date(donationExpiration).setUTCHours(23, 59, 59, 999)
                          ).toISOString()
                        )
                      }
                    >
                      Moment
                    </button>
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() =>
                        console.log(
                          "Image Title Amount Date: ",
                          thumbnailUrl,
                          title,
                          targetAmount,
                          donationExpiration
                        )
                      }
                    >
                      Image Title Amount Date
                    </button>
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() => console.log("Param ID: ", id)}
                    >
                      Check Param
                    </button>
                    <button
                      className="p-3 border rounded-xl"
                      onClick={() => console.log("Detail Donation: ", detailDonation)}
                    >
                      Detail Donation
                    </button>
                  </section> */}

      <AnimationWrapper className="mb-24">
        <section>
          <div className="mx-auto max-w-[900px] w-full flex flex-col gap-8">
            {/* Upload Thumbnail */}
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={thumbnailUrl}
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

            {/* Title Donasi */}
            <div>
              <textarea
                defaultValue={title}
                placeholder="Judul Donasi"
                className="text-4xl font-medium w-full h-20 outline-none resize-none leading-tight placeholder:opacity-40 bg-white"
                onKeyUp={e => setTitle(e.target.value)}
              />
              <hr className="w-full border-black border opacity-10 my-5" />
            </div>

            {/* Target Donasi */}
            <div className="flex items-center w-full gap-4">
              <p className="text-xl">Isi Target Donasi</p>
              <div className=" flex items-center border rounded bg-grey">
                <span className="px-3 text-dark-grey">Rp</span>
                <input
                  type="text"
                  className={`flex-1 p-2 border-0 rounded-r bg-grey placeholder:text-dark-grey ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                  value={targetPlaceholder}
                  onChange={handleCustomAmountChange}
                />
              </div>
            </div>

            {/* Tanggal Berakhir Donasi */}
            <div className="flex gap-4 items-center ">
              <p className="text-xl">Pilih Tanggal Berakhir Donasi</p>
              <input
                className="px-3 py-2 border rounded-lg bg-grey"
                type="date"
                onChange={e => setDonationExpiration(new Date(new Date(e.target.value).setUTCHours(23, 59, 59, 999)).toISOString())}
                min={dayjs(new Date()).format("YYYY-MM-DD")}
                name="donation_expiration"
                id="donation_expiration"
              />
            </div>
            <hr className="w-full border-black border opacity-10 my-5" />

            {/* Konten/Deskripsi Donasi */}
            {/* <div>
                              <p className="text-2xl font-bold">Deskripsi Donasi</p>
                              <EditorField
                                setValue={setDonationDescription}
                                unique_id={"donation_description"}
                              />
                            </div> */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold">Deskripsi Donasi (Untuk Preview Card Donasi)</p>
              <textarea
                defaultValue={donationDescription}
                className="border rounded-xl w-full p-3 bg-grey"
                name="donation_description"
                onChange={e => setDonationDescription(e.target.value)}
                id="donation_description"
                rows={6}
                maxLength={500}
              />
              <p>Batas Karakter {donationDescription?.length ?? 0}/500</p>
            </div>

            <hr className="w-full border-black border opacity-10 my-5" />

            {/* Info Terbaru Donasi */}
            {/* <div>
                              <p className="text-2xl font-bold">Info Donasi</p>
                              <EditorField
                                setValue={setDonationNewestInfo}
                                unique_id={"donation_newest_info"}
                              />
                            </div> */}
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-bold">Isi Konten Donasi</p>
              <textarea
                defaultValue={donationNewestInfo}
                className="border rounded-xl w-full p-3 bg-grey"
                name="donation_newest_info"
                onChange={e => setDonationNewestInfo(e.target.value)}
                id="donation_newest_info"
                rows={6}
                maxLength={500}
              />
              <p>Batas Karakter {donationNewestInfo?.length ?? 0}/500</p>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default DonationEditor;
