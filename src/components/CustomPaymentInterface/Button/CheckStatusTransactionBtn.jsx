import axios from "axios";

const CheckStatusTransactionBtn = ({ transaction_id, access_token, setPaymentStatus, isLoading, setIsLoading, setCurrentScreen }) => {
  const fetchTransactionStatus = () => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + `/donation/status/${transaction_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(res => {
        setPaymentStatus(res.data.payment_status);

        if (res.data.payment_status === "settlement" || res.data.payment_status === "success") {
          console.log("Start Redirect in 5");
          setTimeout(() => {
            // navigate(`/donation/detail/${donation_id}`);
            setCurrentScreen("INVOICING");
            localStorage.clear();
          }, 5000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      className=" bg-rose-600 hover:bg-rose-900 px-6 py-3.5 w-full text-white rounded-full"
      onClick={fetchTransactionStatus}
      disabled={isLoading}
    >
      Cek Status
    </button>
  );
};

export default CheckStatusTransactionBtn;
