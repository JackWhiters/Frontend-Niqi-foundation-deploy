import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import CustomPaymentInterface from "../../components/CustomPaymentInterface";
import SelectAmountCard from "../../components/SelectAmountCard";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { storeInSession } from "../../common/session";
import InvoiceCardDonation from "../../components/InvoiceCardDonation";
import useGetDonationHistory from "../../hooks/useGetDonationHistory";
import Loader from "../../components/Loader";

const DonatingPage = () => {
  const { id } = useParams();
  let { setTheme } = useContext(ThemeContext);
  const amountList = [10000, 25000, 50000, 100000];

  const [finalAmount, setFinalAmount] = useState(0);
  const [detailDonation, setDetailDonation] = useState({});
  const [currentScreen, setCurrentScreen] = useState("SELECT_AMOUNT"); // SELECT_AMOUNT, PAYMENT
  const [trxId, setTrxId] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);

  const [isLoadingDonation, donationData] = useGetDonationHistory(trxId);

  useEffect(() => {
    setTheme("light");
    storeInSession("theme", "light");
    document.body.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    setInvoiceData(donationData);
  }, [trxId, currentScreen]);

  const fetchDetailDonation = async id => {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}/details`);

      setDetailDonation(response.data);
    } catch (error) {
      console.error("Error fetching donation detail: ", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("midtrans") !== null) {
      setCurrentScreen("PAYMENT");
    }

    fetchDetailDonation(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center w-full">
        {currentScreen === "SELECT_AMOUNT" && (
          <SelectAmountCard
            donationData={detailDonation}
            amountList={amountList}
            setFinalAmount={setFinalAmount}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === "PAYMENT" && (
          <CustomPaymentInterface
            amountToBePaid={finalAmount}
            donation_id={id}
            title={detailDonation?.title}
            setCurrentScreen={setCurrentScreen}
            setTrxId={setTrxId}
          />
        )}
        {isLoadingDonation ? (
          <Loader />
        ) : (
          currentScreen === "INVOICING" && (
            <InvoiceCardDonation
              isPaymentScreen
              donationData={invoiceData}
            />
          )
        )}
      </section>

      <Footer />
    </>
  );
};

export default DonatingPage;
