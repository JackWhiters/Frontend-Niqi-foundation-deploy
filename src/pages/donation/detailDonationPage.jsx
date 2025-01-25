import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { numberFormat, onSetDonationToDraft, topFunction } from "../../lib/utils";
import DonorItem from "../../components/DonorItem";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar.jsx";
import toast from "react-hot-toast";
import { UserContext } from "../../App";
import Modal from "react-responsive-modal";
import Loader from "../../components/Loader.jsx";

const DetailDonationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("Deskripsi");
  const [detailDonation, setDetailDonation] = useState({});
  const [linkToDonation, setLinkToDonation] = useState("");
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [showShareOverlay, setShowShareOverlay] = useState(false);
  const [donationToDraftOverlay, setDonationToDraftOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    userAuth: { access_token, isAdmin },
  } = useContext(UserContext);

  const fetchDetailDonation = async id => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}/details`);
      setDetailDonation(response.data);
    } catch (error) {
      console.error("Error fetching donation detail: ", error);
    }
  };

  const fetchShareLinkDonation = async () => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + `/donation/detail/${id}/share`)
      .then(res => {
        console.log("Sharelink: ", res.data);
        setLinkToDonation(res.data.link);
        setQrCodeBase64(res.data.qrCodeImageUrl);
      })
      .catch(err => {
        toast.error(`Server Error: ${err}`);
        console.error("Server Error: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnSetDonationToDraft = () => {
    onSetDonationToDraft(detailDonation, id, access_token, navigate, toast.success, "Donasi Terdraft");
  };

  useEffect(() => {
    fetchDetailDonation(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="h-cover pt-10">
        {/* Share Overlay */}
        <Modal
          open={showShareOverlay}
          onClose={setShowShareOverlay}
          closeIcon={<></>}
          styles={{
            modal: {
              borderRadius: "12px",
              padding: "32px",
            },
          }}
          center
        >
          <p className={"text-center dark:text-grey light:text-black"}>Scan QR Code Berikut</p>
          {isLoading ? (
            <Loader />
          ) : (
            <img
              src={qrCodeBase64}
              alt="qrcode donasi"
              className="w-[256px]"
            />
          )}
          <div className={"flex flex-col gap-4 justify-center"}>
            <p className="dark:text-grey light:text-black text-center">Atau Bagikan Link Donasi </p>
            <button
              className={
                "px-12 py-3 rounded-xl dark:text-black light:text-grey font-semibold bg-rose-600 hover:bg-rose-900 border hover:text-black"
              }
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(linkToDonation);
                  toast.success("Disalin");
                } catch (err) {
                  console.error("Failed to copy: ", err);
                }
              }}
            >
              Salin
            </button>
          </div>
        </Modal>

        {/* Move Donation to Draft */}
        <Modal
          open={donationToDraftOverlay}
          onClose={setDonationToDraftOverlay}
          closeIcon={<></>}
          styles={{
            modal: {
              borderRadius: "12px",
              padding: "32px",
            },
          }}
          center
        >
          <p className={"mb-12 font-semibold text-2xl dark:text-grey light:text-black"}>
            Anda yakin ingin memindahkan donasi ini ke draft?
          </p>
          <div className={"flex flex-col gap-4"}>
            <button
              className={"px-6 py-3 border w-full rounded-xl bg-rose-600 hover:bg-rose-900 dark:text-black light:text-grey font-bold"}
              onClick={handleOnSetDonationToDraft}
            >
              Pindahkan
            </button>
            <button
              className={"px-6 py-3 border w-full rounded-xl dark:text-grey light:text-black"}
              onClick={() => setDonationToDraftOverlay(false)}
            >
              Batal
            </button>
          </div>
        </Modal>

        <div className="w-full mb-14">
          {/* <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"> */}
          <div className="w-full">
            <div className="flex w-full flex-col min-[950px]:flex-row justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Detail Donasi Berjalan</h2>

                <p className="mt-4 text-gray-600 text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et dolor rutrum, dictum nunc vel.
                </p>
              </div>
              {isAdmin ? (
                <div className="flex flex-col min-[950px]:flex-row sm:justify-end gap-4 mt-4 min-md:mt-0 w-full">
                  <Link
                    to={`/donation/edit/${detailDonation.donation_id}`}
                    className="px-6 py-3 border text-center rounded-xl bg-black text-white hover:bg-white hover:text-black"
                  >
                    Edit Donasi
                  </Link>
                  {detailDonation.status !== "Closed" && (
                    <button
                      onClick={() => setDonationToDraftOverlay(!donationToDraftOverlay)}
                      className="px-6 py-3 border text-center rounded-xl bg-rose-900 dark:text-black light:text-grey hover:bg-rose-600"
                    >
                      Pindahkan Ke Draft
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 overflow-hidden">
            <div className="rounded-lg lg:col-span-2 h-auto">
              <div className="mt-4">
                <div className="block rounded-lg p-4 border border-gray-200">
                  <img
                    alt="thumbnail donasi"
                    src={detailDonation.thumbnail}
                    className="h-auto w-full rounded-md object-cover"
                  />

                  <div className="my-4">
                    {/* Tabs start */}
                    <div>
                      <div className="sm:hidden">
                        <label
                          htmlFor="Tab"
                          className="sr-only"
                        >
                          Tab
                        </label>
                        <select
                          id="Tab"
                          className="w-full rounded-md border-gray-200"
                          onChange={e => setActiveTab(e.target.value)}
                          value={activeTab}
                        >
                          <option value="Deskripsi">Deskripsi</option>
                          {/* <option value="Info Terbaru">Info Terbaru</option> */}
                        </select>
                      </div>

                      <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                          <nav
                            className="-mb-px flex gap-6"
                            aria-label="Tabs"
                          >
                            <button
                              onClick={() => setActiveTab("Deskripsi")}
                              className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 font-medium ${
                                activeTab === "Deskripsi"
                                  ? "border-sky-500 text-sky-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              <i className="fi fi-rr-info"></i>
                              Deskripsi
                            </button>
                            {/* <button
                              onClick={() => setActiveTab("Info Terbaru")}
                              className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 font-medium ${
                                activeTab === "Info Terbaru"
                                  ? "border-sky-500 text-sky-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              <i className="fi fi-rr-bell"></i>
                              Info Terbaru
                            </button> */}
                          </nav>
                        </div>
                      </div>
                    </div>
                    {/* Tabs end */}

                    {/* Tab Content */}
                    <div className="my-4">
                      {activeTab === "Deskripsi" && (
                        <dl>
                          <div>
                            <h3 className="font-bold text-2xl text-rose-500">{detailDonation.title}</h3>
                          </div>
                          <div className="w-full py-4">
                            <p className="text-xl">{detailDonation.content}</p>
                          </div>
                        </dl>
                      )}

                      {/* {activeTab === "Info Terbaru" && <div>{detailDonation.newest_info}</div>} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Donasi */}
            <div className="mt-4">
              <div className="rounded-lg border border-gray-300 h-fit p-5">
                <div className="text-left">
                  <p className="font-semibold text-dark-grey">Dana Terkumpul</p>
                  <p className="text-3xl font-bold text-rose-600">Rp {numberFormat(detailDonation.total_collected)}</p>
                </div>
                <div className="py-2 text-left">
                  <p className="text-xl font-medium text-gray-400">Target Donasi : Rp {numberFormat(detailDonation.target_amount)}</p>
                </div>
                <hr className="border-gray-200 my-5" />
                <div>
                  <div className="mb-2 flex justify-between items-center">
                    <p className="text-base">Progress Berjalan</p>
                    <span className="text-base">{detailDonation.percentage_collected}%</span>
                  </div>
                  <div
                    className="flex w-full h-8 bg-gray-300 rounded-sm overflow-hidden"
                    role="progressbar"
                    aria-valuenow={detailDonation.percentage_collected}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="flex flex-col justify-center rounded-sm overflow-hidden bg-rose-500 text-xs text-white text-center whitespace-nowrap transition duration-500"
                      style={{
                        width: `${detailDonation.percentage_collected ? detailDonation.percentage_collected : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-full">
                  {detailDonation.status === "Closed" ? (
                    <button className="w-full mt-5 inline-block rounded border-none bg-rose-950 px-12 py-3 text-base font-medium text-white  focus:outline-none focus:ring active:bg-rose-500 text-center">
                      Donasi Telah Selesai
                    </button>
                  ) : !access_token ? (
                    <Link
                      to={`/signin`}
                      className="w-full mt-5 inline-block rounded border-none bg-rose-900 hover:bg-rose-600 px-12 py-3 text-base font-medium dark:text-black light:text-grey focus:outline-none focus:ring active:bg-rose-500 text-center"
                    >
                      Masuk Untuk Donasi
                    </Link>
                  ) : (
                    <Link
                      to={`donate`}
                      onClick={() => {
                        if (localStorage.getItem("donation_id") !== detailDonation.donation_id) {
                          localStorage.removeItem("midtrans");
                          localStorage.removeItem("selected_payment");
                          localStorage.removeItem("selected_bank");
                          localStorage.removeItem("selected_bank_img");
                          localStorage.setItem("donation_id", detailDonation.donation_id);
                        } else {
                          localStorage.setItem("donation_id", detailDonation.donation_id);
                        }

                        topFunction();
                      }}
                      className="w-full mt-5 inline-block rounded border-none bg-rose-900 hover:bg-rose-600 px-12 py-3 text-base font-medium dark:text-black light:text-grey focus:outline-none focus:ring active:bg-rose-500 text-center"
                    >
                      Donasi Sekarang
                    </Link>
                  )}
                </div>
                <div className="w-full">
                  <button
                    onClick={() => {
                      setShowShareOverlay(true);
                      fetchShareLinkDonation();
                    }}
                    className="w-full mt-5 inline-block rounded border btn-light px-12 py-3 text-base font-medium hover:border-red focus:outline-none focus:ring text-center"
                  >
                    Bagikan Donasi
                  </button>
                </div>
                <hr className="border-gray-200 my-5" />

                {/* Donasi Terbaru */}
                <div className="w-full">
                  <p className="text-2xl font-medium">Donasi Terbaru</p>
                  {detailDonation?.successful_donors_details?.map((item, i) => (
                    <DonorItem
                      name={item.name}
                      donated_at={item.donation_date}
                      amount={item.donation_amount}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* End Card Donasi */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DetailDonationPage;
