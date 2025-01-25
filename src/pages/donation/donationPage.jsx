import { useEffect, useState, Suspense, lazy } from "react";
import Footer from "../../components/Footer";
import axios from "axios";
import { topFunction } from "../../lib/utils";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import * as _ from "lodash";

const DonationCard = lazy(() => import("../../components/DonationCard"));

function DonationPage() {
  const [onGoingDonationData, setOnGoingDonation] = useState(null);
  const [onCompleteDonationData, setOnCompleteDonationData] = useState(null);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [tabContent, setTabContent] = useState("Sedang Berjalan");

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        setIsLoading(true);
        const limit = 9;

        const onGoingDonation = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/get-donation?page=${page}&limit=${limit}&draft=false`,
        );
        const onCompleteDonation = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/get-donation?page=${page}&limit=${limit}&draft=true`,
        );

        setOnGoingDonation(onGoingDonation.data);
        setOnCompleteDonationData(onCompleteDonation.data);
      } catch (error) {
        console.error("Error fetching donation list: ", error);
        toast.error("Server Error While Fetching Donation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonation();
  }, [page]);

  const renderProps = () => {
    return {
      onGoingDonationContent: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {onGoingDonationData?.donations?.length >= 1 &&
              onGoingDonationData?.donations?.map((item, i) => {
                return (
                  <>
                    <DonationCard
                      data={item}
                      key={i}
                    />
                  </>
                );
              })}
          </div>

          {isLoading ? (
            <div className="h-screen">
              <Loader />
            </div>
          ) : onGoingDonationData?.donations?.length === 0 ? (
            <div className="h-screen">
              <div className="flex justify-center">
                <p className="text-center w-1/4 px-6 py-2 bg-slate-100 rounded-full dark:text-grey light:text-black">
                  Saat Ini Belum Ada Donasi Yang Berjalan
                </p>
              </div>
            </div>
          ) : onGoingDonationData === null ? (
            <div className="h-screen">
              <div className="flex justify-center">
                <p className="text-center w-1/4 px-6 py-2 bg-slate-100 rounded-full dark:text-grey light:text-black">
                  Server Error While Fetching Donation
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {onGoingDonationData?.donations?.length !== 0 && onGoingDonationData?.donations !== undefined && (
            <div className="flex justify-center items-center gap-4 mt-5">
              {onGoingDonationData?.currentPage !== 1 && (
                <button
                  onClick={() => {
                    topFunction();
                    setPage(page - 1);
                  }}
                  className="text-dark-grey border bg-white p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
                >
                  Sebelumnya
                </button>
              )}
              <p>
                Halaman {onGoingDonationData?.currentPage} Dari {onGoingDonationData?.totalPages}
              </p>
              {onGoingDonationData?.currentPage !== onGoingDonationData?.totalPages && (
                <button
                  onClick={() => {
                    setPage(page + 1);
                    topFunction();
                  }}
                  className="text-dark-grey border bg-white p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
                >
                  Selanjutnya
                </button>
              )}
            </div>
          )}
        </>
      ),
      onCompleteDonationContent: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {_.filter(onCompleteDonationData?.donations, { status: "Closed" })?.length >= 1 &&
              _.filter(onCompleteDonationData?.donations, { status: "Closed" })?.map((item, i) => {
                return (
                  <>
                    <DonationCard
                      data={item}
                      key={i}
                    />
                  </>
                );
              })}
          </div>

          {isLoading ? (
            <div className="h-screen">
              <Loader />
            </div>
          ) : _.filter(onCompleteDonationData?.donations, { status: "Closed" })?.length === 0 ? (
            <div className="h-screen">
              <div className="flex justify-center">
                <p className="text-center w-1/4 px-6 py-2 bg-slate-100 rounded-full dark:text-grey light:text-black">
                  Saat Ini Belum Ada Donasi Yang Berjalan
                </p>
              </div>
            </div>
          ) : onCompleteDonationData === null ? (
            <div className="h-screen">
              <div className="flex justify-center">
                <p className="text-center w-1/4 px-6 py-2 bg-slate-100 rounded-full dark:text-grey light:text-black">
                  Server Error While Fetching Donation
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {_.filter(onCompleteDonationData?.donations, { status: "Closed" })?.length !== 0 &&
            _.filter(onCompleteDonationData?.donations, { status: "Closed" }) !== undefined && (
              <div className="flex justify-center items-center gap-4 mt-5">
                {onCompleteDonationData?.currentPage !== 1 && (
                  <button
                    onClick={() => {
                      topFunction();
                      setPage(page - 1);
                    }}
                    className="text-dark-grey border bg-white p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
                  >
                    Sebelumnya
                  </button>
                )}
                <p>
                  Halaman {onCompleteDonationData?.currentPage} Dari {onCompleteDonationData?.totalPages}
                </p>
                {onCompleteDonationData?.currentPage !== onCompleteDonationData?.totalPages && (
                  <button
                    onClick={() => {
                      setPage(page + 1);
                      topFunction();
                    }}
                    className="text-dark-grey border bg-white p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
                  >
                    Selanjutnya
                  </button>
                )}
              </div>
            )}
        </>
      ),
    };
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="p-12">
          <div className="flex flex-col justify-center items-center w-full gap-4 mb-12">
            <h1 className="text-4xl font-bold">Donasi Yang {tabContent === "Sedang Berjalan" ? "Sedang Berjalan" : "Sudah Selesai"}</h1>
            <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
              {/* text-gray-500 */}
              <button
                onClick={() => setTabContent("Sedang Berjalan")}
                className={`${tabContent === "Sedang Berjalan" ? "bg-white text-grey-dark shadow-sm" : "text-gray-500"} inline-block rounded-md px-4 py-2 text-sm  hover:text-gray-700 focus:relative`}
              >
                Sedang Berjalan
              </button>
              <button
                onClick={() => setTabContent("Sudah Selesai")}
                className={`${tabContent === "Sudah Selesai" ? "bg-white text-grey-dark shadow-sm" : "text-gray-500"} inline-block rounded-md px-4 py-2 text-sm focus:relative`}
              >
                Selesai
              </button>
            </div>
          </div>
          {tabContent === "Sedang Berjalan" ? renderProps().onGoingDonationContent : renderProps().onCompleteDonationContent}
        </div>
      </Suspense>

      <Footer />
    </>
  );
}

export default DonationPage;
