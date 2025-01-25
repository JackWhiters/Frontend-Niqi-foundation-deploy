import { getFullDay } from "../common/date";
import { numberFormat } from "../lib/utils";
import logo_full from "/assets/imgs/full-logo-niqi.webp";
import check_icon from "/assets/imgs/check-circle.svg";
import useDownloadInvoice from "../hooks/useDownloadInvoice";
import { upperCase } from "lodash";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InvoiceCardDonation = ({ donationData, isPaymentScreen = false }) => {
  const navigate = useNavigate();
  const [isLoadingDownloadInvoice, onDownload] = useDownloadInvoice();
  return (
    <div className="p-5 mb-12 rounded-3xl border">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <img
            className="w-[200px] text-center"
            src={logo_full}
            alt=""
          />
        </div>
        <p className="text-3xl font-bold text-center">
          Detail Riwayat <br /> Pembayaran Donasi
        </p>
        <div className="p-5 bg-green-50 flex gap-3 justify-center items-center rounded-xl">
          <img
            src={check_icon}
            alt="check_icon"
            className="w-10"
          />
          <p className="text-center font-bold text-[#699F4C] text-2xl">Transaksi Berhasil</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="font-semibold w-full">ID Transaksi</p>
          <p className="font-bold">{donationData?.transaction_id}</p>
        </div>
        <hr />
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="font-semibold">Tanggal Donasi</p>
            <p className="font-bold">{getFullDay(donationData?.donation_date)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Nama Donasi</p>
            <p className="font-bold">{donationData?.title}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Metode Pembayaran</p>
            <p className="font-bold uppercase">{donationData?.payment_method}</p>
          </div>
        </div>
        <hr />
        <div>
          <p className="font-bold text-2xl mb-3">Rincian Pembayaran</p>
          <div className="flex justify-between gap-3 items-center">
            <p>
              Pembayaran Donasi - <span className="font-bold">{donationData?.title}</span>
            </p>
            <p className="font-bold">Rp {numberFormat(donationData?.donation_amount)}</p>
          </div>
        </div>
        <hr />
        <p className="text-center">Alhamdulillah, Terima Kasih Telah Berdonasi</p>
        {isPaymentScreen && (
          <div className="flex justify-center gap-4">
            {/* <button
              className={`${isLoadingDownloadInvoice ? "bg-slate-500" : "bg-rose-900 hover:bg-rose-600"} px-6 py-3 border mb-3 text-center rounded-xl font-semibold  dark:text-black light:text-grey`}
              disabled={isLoadingDownloadInvoice}
              onClick={() => {
                onDownload({
                  trx_id: donationData?.transaction_id,
                  donation_datetime: getFullDay(donationData?.donation_date),
                  donation_name: donationData?.title,
                  donation_method: upperCase(donationData?.payment_method),
                  donation_amount: numberFormat(donationData?.donation_amount),
                });

                toast.loading("Memproses Invoice", {
                  duration: 1200,
                });
              }}
            >
              Unduh Riwayat
            </button> */}
            <button
              onClick={() => navigate(`/donation/detail/${donationData?.donation_id}`)}
              className="px-6 py-3 border mb-3 text-center rounded-xl bg-green-50 text-[#699F4C] font-bold hover:bg-green-100"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceCardDonation;
