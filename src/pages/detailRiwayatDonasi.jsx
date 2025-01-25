import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import InvoiceCardDonation from "../components/InvoiceCardDonation";
import useGetDonationHistory from "../hooks/useGetDonationHistory";

const DetailRiwayatDonasi = () => {
  const { trx_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, donationData] = useGetDonationHistory(trx_id);

  return (
    <div className="-mt-12 sm:mt-0">
      <button
        onClick={() => navigate("/dashboard/riwayat-donasi")}
        className="px-6 py-3 border mb-3 text-center rounded-xl bg-rose-900 dark:text-black light:text-grey hover:bg-rose-600"
      >
        <div className="flex gap-1 justify-center">
          <i className="fi fi-rr-arrow-small-left"></i>
          <span>Kembali</span>
        </div>
      </button>
      {isLoading ? <Loader /> : <InvoiceCardDonation donationData={donationData} />}
    </div>
  );
};

export default DetailRiwayatDonasi;
