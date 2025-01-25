import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useContext } from "react";
import { UserContext } from "../App";
import { numberFormat } from "../lib/utils";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { upperCase } from "lodash";
import useDownloadInvoice from "../hooks/useDownloadInvoice";

const RiwayatDonasi = () => {
  const navigate = useNavigate();

  const [listDonation, setListDonation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoadingDownloadInvoice, onDownload] = useDownloadInvoice();

  let {
    userAuth: { username },
  } = useContext(UserContext);

  useEffect(() => {
    const fetchListDonation = async () => {
      try {
        setIsLoading(true);

        const limit = 99999;
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/user/${username}/transactions?page=${1}&limit=${limit}`);

        const transactions = response.data.transactions;

        const donorsWithTitles = transactions.flatMap(el =>
          el.donors.map(donor => ({
            ...donor,
            title: el.title,
            donation_id: el.donation_id,
          })),
        );

        const totalDonationAmount = transactions.reduce(
          (sum, trx) => sum + trx.donors.reduce((innerSum, d) => innerSum + d.donation_amount, 0),
          0,
        );

        setListDonation(donorsWithTitles);
        setTotalAmount(totalDonationAmount);
      } catch (error) {
        console.error("Error fetching donation list: ", error);
        toast.error("ERR SERVER: Failed While Fetching Donation History");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchListDonation();
    }
  }, [username]);

  return (
    <div className="w-full">
      <p className="mb-6">Riwayat Donasi</p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full bg-grey rounded-xl p-12">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p className="text-center">Total Donasi Anda</p>
              <p className="text-center font-bold text-2xl underline">Rp {numberFormat(totalAmount)}</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-scroll">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-[1000px] sm:w-full border-b mb-12">
            <thead>
              <tr>
                <th className="border-b p-2">Tanggal</th>
                <th className="border-b p-2">Nama Donasi</th>
                <th className="border-b p-2">ID Transaksi</th>
                <th className="border-b p-2">Jumlah Donasi</th>
                <th className="border-b p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {listDonation?.map((donation, i) => (
                <tr
                  className="hover:dark:bg-grey cursor-pointer"
                  key={i}
                >
                  <td
                    onClick={() => navigate(`/donation/detail/${donation.donation_id}`)}
                    className="border-b p-2 text-center"
                  >
                    {dayjs(donation.donation_date).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td
                    onClick={() => navigate(`/donation/detail/${donation.donation_id}`)}
                    className="border-b p-2 text-center"
                  >
                    {donation.title}
                  </td>
                  <td
                    onClick={() => navigate(`/donation/detail/${donation.donation_id}`)}
                    className="border-b p-2 text-center"
                  >
                    {donation.transaction_id}
                  </td>
                  <td
                    onClick={() => navigate(`/donation/detail/${donation.donation_id}`)}
                    className="border-b p-2 text-center"
                  >
                    Rp {numberFormat(donation.donation_amount)}
                  </td>
                  <td className="border-b p-2 text-center">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => navigate(`/dashboard/riwayat-donasi/${donation.transaction_id}`)}
                        className="px-4 py-2 rounded-lg z bg-blue-400 hover:bg-blue-500 dark:text-black light:text-grey"
                      >
                        Lihat
                      </button>
                      {/* <button
                        disabled={isLoadingDownloadInvoice}
                        onClick={() => {
                          onDownload({
                            trx_id: donation.transaction_id,
                            donation_datetime: dayjs(donation.donation_date).format("DD/MM/YYYY HH:mm:ss"),
                            donation_name: donation.title,
                            donation_method: upperCase(donation.payment_method),
                            donation_amount: numberFormat(donation.donation_amount),
                          });

                          toast.loading("Memproses Invoice", {
                            duration: 1200,
                          });
                        }}
                        className="flex px-4 py-2 rounded-lg z bg-green-50 hover:bg-green-200 text-[#699F4C]"
                      >
                        Unduh
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RiwayatDonasi;
