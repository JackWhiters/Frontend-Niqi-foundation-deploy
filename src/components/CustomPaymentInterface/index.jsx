import qris from "~src/assets/imgs/qris/qris.png";
import dana from "~src/assets/imgs/qris/dana.png";
import ovo from "~src/assets/imgs/qris/ovo.png";
import linkaja from "~src/assets/imgs/qris/linkaja.png";
import bca from "~src/assets/imgs/Bank/bca.png";
import bni from "~src/assets/imgs/Bank/bni.png";
import permata from "~src/assets/imgs/Bank/permata.png";
import bri from "~src/assets/imgs/Bank/bri.png";
import cimb from "~src/assets/imgs/Bank/cimbniaga.png";
import gopay from "~src/assets/imgs/gopay/gopay.png";
import axios from "axios";
import CountdownTimer from "../CountdownTimer";
import { UserContext } from "../../App";
import Loader from "../Loader";
import toast from "react-hot-toast";
import DownloadQrisBtn from "./Button/DownloadQrisBtn";
import PaymentSimulatorBtn from "./Button/PaymentSimulatorBtn";
import CheckStatusTransactionBtn from "./Button/CheckStatusTransactionBtn";
import BanksGuideAccordion from "./Guides/BanksGuideAccordion";
import { useContext, useEffect, useState } from "react";

const CustomPaymentInterface = ({ amountToBePaid, donation_id, title, setCurrentScreen, setTrxId }) => {
  const [paymentStatus, setPaymentStatus] = useState(null); // settlement, expire, pending
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedBankImgSrc, setSelectedBankImgSrc] = useState("");
  const [paymentData, setPaymentData] = useState(null);

  // Local Data
  const localDataPayment = localStorage.getItem("midtrans") !== null ? JSON.parse(localStorage.getItem("midtrans")) : {};
  const totalPaid =
    amountToBePaid !== 0
      ? amountToBePaid.toLocaleString("id-ID")
      : parseFloat(localDataPayment?.midtrans_response?.gross_amount).toLocaleString("Id-ID");

  let {
    userAuth: { access_token, fullname, username },
  } = useContext(UserContext);

  useEffect(() => {
    if (
      (localStorage.getItem("midtrans") !== null && localStorage.getItem("selected_payment") !== null) ||
      localStorage.getItem("selected_bank") !== null
    ) {
      setSelectedPayment(localStorage.getItem("selected_payment"));
      setSelectedBank(localStorage.getItem("selected_bank"));
      setSelectedBankImgSrc(localStorage.getItem("selected_bank_img"));
      setPaymentData(JSON.parse(localStorage.getItem("midtrans")));
    }
  }, []);

  const handlePaymentClick = method => {
    setSelectedPayment(method);
    localStorage.setItem("selected_payment", method);
  };

  const closeDetails = () => {
    setSelectedPayment(null);
  };

  const toggleOrderDetails = () => {
    setShowOrderDetails(!showOrderDetails);
  };

  const handleQrisOutletBankTransferPayment = async (payment_method, id, bank) => {
    try {
      if (localStorage.getItem("midtrans") !== null) {
        setPaymentData(JSON.parse(localStorage.getItem("midtrans")));
      } else {
        let payload = {
          amount: amountToBePaid,
          name: localStorage.getItem("anonymous") === "true" ? "Hamba Allah" : fullname,
          username,
          payment_method,
        };

        if (bank) {
          payload = {
            ...payload,
            bank,
          };
        }

        setIsLoading(true);
        const response = await axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}/pay`, payload)
          .finally(() => setIsLoading(false));

        localStorage.setItem("midtrans", JSON.stringify(response.data));
        setPaymentData(response.data);
        setTrxId(response.data?.midtrans_response?.transaction_id);
      }
    } catch (e) {
      console.error("Catch Handle Payment: ", e);
    }
  };

  // Structure For Payment Details
  const renderProps = (paymentMethod, bank, bankImgSrc) => {
    return {
      qris: {
        header: (
          <div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{paymentMethod}</p>
              <div className="flex gap-3 items-center">
                <img
                  src={qris}
                  alt="QRIS"
                  className="h-4 w-auto"
                />
                <img
                  src={dana}
                  alt="Dana"
                  className="h-4 w-auto"
                />
                <img
                  src={ovo}
                  alt="Ovo"
                  className="h-4 w-auto"
                />
                <img
                  src={linkaja}
                  alt="Link Aja"
                  className="h-4 w-auto"
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex justify-center gap-2 px-6 py-3 w-2/3 bg-slate-100 rounded-full">
                <p>Bayar Dalam</p>
                {paymentData?.midtrans_response?.expiry_time && (
                  <CountdownTimer
                    targetDate={paymentData?.midtrans_response?.expiry_time}
                    setIsExpired={setPaymentStatus}
                  />
                )}
              </div>
            </div>
          </div>
        ),
        payment_data: isLoading ? (
          <Loader />
        ) : (
          <div className="flex justify-center">
            <img
              style={{
                width: "256px",
                height: "256px",
              }}
              src={paymentData?.midtrans_response?.actions != undefined ? paymentData?.midtrans_response?.actions[0]?.url : ""}
              alt="qrcode"
            />
          </div>
        ),
        guide: (
          <div>
            <div className="flex gap-1 items-center mb-2">
              <i className="fi fi-sr-comment-info text-blue-500"></i>
              <p className="font-bold text-blue-500 ">Cara Bayar</p>
            </div>

            <div className="bg-slate-200 rounded-lg p-5">
              <p>1. Buka aplikasi Gojek, GoPay atau e-wallet lain Anda.</p>
              <p>2. Download atau pindai QRIS pada layar.</p>
              <p>3. Konfirmasi pembayaran pada aplikasi.</p>
              <p>4. Pembayaran berhasil.</p>
            </div>
          </div>
        ),
        actions: (
          <div className="flex flex-col gap-3 mt-5">
            <DownloadQrisBtn
              url={paymentData?.midtrans_response?.actions != undefined ? paymentData?.midtrans_response?.actions[0]?.url : ""}
            />
            <CheckStatusTransactionBtn
              transaction_id={paymentData?.midtrans_response?.transaction_id}
              access_token={access_token}
              setPaymentStatus={setPaymentStatus}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentScreen={setCurrentScreen}
            />
            {/* <PaymentSimulatorBtn /> */}
          </div>
        ),
      },
      gopay: {
        header: (
          <div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">{paymentMethod}</p>
              <div className="flex gap-3 items-center">
                <img
                  src={gopay}
                  alt="GOPAY"
                  className="h-4 w-auto"
                />
                <img
                  src={qris}
                  alt="QRIS"
                  className="h-4 w-auto"
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex justify-center gap-2 px-6 py-3 w-2/3 bg-slate-100 rounded-full">
                <p>Bayar Dalam</p>
                <CountdownTimer
                  targetDate={paymentData?.midtrans_response?.expiry_time}
                  setIsExpired={setPaymentStatus}
                />
              </div>
            </div>
          </div>
        ),
        payment_data: isLoading ? (
          <Loader />
        ) : (
          <div className="flex justify-center">
            <img
              style={{
                width: "256px",
                height: "256px",
              }}
              src={paymentData?.midtrans_response?.actions != undefined ? paymentData?.midtrans_response?.actions[0]?.url : ""}
              alt="qrcode"
            />
          </div>
        ),
        guide: (
          <div>
            <div className="flex gap-1 items-center mb-2">
              <i className="fi fi-sr-comment-info text-blue-500"></i>
              <p className="font-bold text-blue-500 ">Cara Bayar</p>
            </div>

            <div className="bg-slate-200 rounded-lg p-5">
              <p>1. Buka aplikasi Gojek, GoPay atau e-wallet lain Anda.</p>
              <p>2. Download atau pindai QRIS pada layar.</p>
              <p>3. Konfirmasi pembayaran pada aplikasi.</p>
              <p>4. Pembayaran berhasil.</p>
            </div>
          </div>
        ),
        actions: (
          <div className="flex flex-col gap-3 mt-5">
            <DownloadQrisBtn
              url={paymentData?.midtrans_response?.actions != undefined ? paymentData?.midtrans_response?.actions[0]?.url : ""}
            />
            <CheckStatusTransactionBtn
              transaction_id={paymentData?.midtrans_response?.transaction_id}
              access_token={access_token}
              setPaymentStatus={setPaymentStatus}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentScreen={setCurrentScreen}
            />
            {/* <PaymentSimulatorBtn /> */}
          </div>
        ),
      },
      indomaret: {
        header: {},
        payment_data: {},
        guide: {},
        actions: {},
      },
      virtual_account: {
        header: (
          <div className="flex justify-between">
            <p className="font-bold">Bank {bank}</p>
            <img
              src={bankImgSrc}
              alt={bank}
              className="h-4 w-auto"
            />
          </div>
        ),
        payment_data: isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-6  my-5">
            <div className="flex justify-center mt-4">
              <div className="flex justify-center gap-2 px-6 py-3 w-2/3 bg-slate-100 rounded-full">
                <p>Bayar Dalam</p>
                <CountdownTimer
                  targetDate={paymentData?.midtrans_response?.expiry_time}
                  setIsExpired={setPaymentStatus}
                />
              </div>
            </div>
            <p>Lakukan pembayaran dari rekening Bank {bank} ke nomor virtual account di bawah ini.</p>
            <div className="flex justify-between items-center">
              <div>
                <p>Nomor virtual account</p>
                <p className="font-semibold text-xl">
                  {paymentData?.midtrans_response?.va_numbers != undefined
                    ? paymentData?.midtrans_response?.va_numbers[0]?.va_number
                    : paymentData?.midtrans_response?.permata_va_number}
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      paymentData?.midtrans_response?.va_numbers != undefined
                        ? paymentData?.midtrans_response?.va_numbers[0]?.va_number
                        : paymentData?.midtrans_response?.permata_va_number,
                    );
                    toast.success("Disalin");
                  } catch (err) {
                    console.error("Failed to copy: ", err);
                  }
                }}
                className="px-6 py-2 rounded-full bg-black text-white hover:bg-white border hover:text-black"
              >
                Salin
              </button>
            </div>
          </div>
        ),
        guide: (
          <div className="my-4">
            <div className="flex gap-1 items-center mb-2">
              <i className="fi fi-sr-comment-info text-blue-500"></i>
              <p className="font-bold text-blue-500 ">Cara Bayar</p>
            </div>
            <BanksGuideAccordion bank={bank} />
          </div>
        ),
        actions: (
          <div className="flex flex-col gap-3 mt-5">
            <CheckStatusTransactionBtn
              transaction_id={paymentData?.midtrans_response?.transaction_id}
              access_token={access_token}
              setPaymentStatus={setPaymentStatus}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentScreen={setCurrentScreen}
            />
            {/* <PaymentSimulatorBtn /> */}
          </div>
        ),
      },
      success_screen: (
        <div className="w-full h-[520px] flex justify-center items-center bg-green-100 p-12">
          <div className="flex flex-col justify-center items-center gap-6">
            <i className="fi fi-rr-badge-check text-5xl"></i>
            <p className="text-2xl">Pembayaran Berhasil</p>
            <hr className="w-1/4 border border-black h-[6px] bg-black" />
            <p className="text-2xl font-bold">Rp {totalPaid}</p>
            <p className="font-semibold">Redirect in 5 Seconds</p>
          </div>
        </div>
      ),
      expired_screen: (
        <div className="w-full h-[520px] flex justify-center items-center bg-slate-100 p-12">
          <div className="flex flex-col justify-center items-center gap-6">
            <i className="fi fi-ss-time-delete text-5xl"></i>
            <p className="text-2xl">Pembayaran Kadaluarsa</p>
            <hr className="w-1/4 border border-black h-[6px] bg-black" />
            <button
              onClick={() => {
                setSelectedPayment(null);
                setPaymentStatus(null);
                localStorage.clear();
              }}
              className="px-6 py-3 rounded-full bg-black text-white border hover:bg-white hover:text-black"
            >
              Kembali Ke Tipe Pembayaran
            </button>
          </div>
        </div>
      ),
    };
  };

  const PaymentDetails = ({ paymentMethod, bank, bankImgSrc }) => {
    const paymentMethodAsComponentRender = renderProps(paymentMethod, bank, bankImgSrc)[paymentMethod.toLowerCase()];

    return (
      <div className="overflow-hidden">
        {paymentStatus === "settlement" ? (
          renderProps("")["success_screen"]
        ) : paymentStatus === "expire" ? (
          renderProps("")["expired_screen"]
        ) : (
          <div className="p-6">
            <button
              className="mb-4 flex items-center gap-1 hover:text-blue-500"
              onClick={() => {
                localStorage.clear();
                closeDetails();
              }}
            >
              <i className="fi fi-rr-arrow-small-left"></i> Kembali Ke Tipe Pembayaran
            </button>
            {paymentMethodAsComponentRender.header}
            {paymentMethodAsComponentRender.payment_data}
            {paymentMethodAsComponentRender.guide}
            {paymentMethodAsComponentRender.actions}
          </div>
        )}
      </div>
    );
  };

  const OrderDetailsPopup = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <p className="border p-3">
            Order ID: <b>{paymentData?.midtrans_response?.order_id}</b>
          </p>
          <p className="border p-3">
            Transaction ID: <b>{paymentData?.midtrans_response?.transaction_id}</b>
          </p>
          <p className="border p-3">
            Name: <b>{fullname}</b>
          </p>
          <p className="border p-3">
            Username: <b>{username}</b>
          </p>
          <p className="border p-3">
            Total Pembayaran: <b>Rp {totalPaid}</b>
          </p>
          <button
            className="mt-4 inline-block bg-rose-600 hover:bg-rose-700 px-6 py-2 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-xl my-24">
        {/* <div className="flex justify-center gap-2 items-center border bg-orange-200 p-3">
          <p className="text-center">Ini Merupakan Simulasi Pembayaran</p>
        </div> */}
        <div className="rounded-lg border border-gray-200 mb-3">
          {/* Header */}
          <div className="px-4 py-4 border-b flex justify-between items-center">
            <p className="font-medium text-2xl text-rose-500">Niqi Foundation</p>
            {paymentData != null && (
              <button
                className="text-blue-500 underline"
                onClick={toggleOrderDetails}
              >
                Detail Transaksi
              </button>
            )}
          </div>

          {/* Total */}
          <div className="p-4 bg-gray-50">
            <p className="text-2xl">
              Donasi Untuk: <b className="text-2xl">{title}</b>
            </p>
            <hr className={"my-3"} />
            <div className=" items-center  flex gap-3 ">
              <p className="text-2xl">Jumlah:</p>
              <p className="text-2xl font-bold">Rp {totalPaid}</p>
            </div>
          </div>

          <div className="border-b border-gray-300 max-h-[520px] overflow-y-auto">
            {!selectedPayment && <p className="p-4 ml-2.5">Pilih Tipe Pembayaran</p>}
            {selectedPayment ? (
              <PaymentDetails
                paymentMethod={selectedPayment}
                bank={selectedBank}
                bankImgSrc={selectedBankImgSrc}
                onClose={closeDetails}
              />
            ) : (
              <>
                {/* Payment Options */}
                <div className="border-gray-300 border-b">
                  <div
                    className="p-6 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                    onClick={() => setShowBankList(!showBankList)}
                  >
                    <div>
                      <p className="text-xl font-bold pb-4">Virtual Account</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={bca}
                          alt="BCA"
                          className="h-4 w-auto"
                        />
                        <img
                          src={bni}
                          alt="BNI"
                          className="h-4 w-auto"
                        />
                        <img
                          src={permata}
                          alt="PERMATA"
                          className="h-4 w-auto"
                        />
                        <img
                          src={bri}
                          alt="BRI"
                          className="h-4 w-auto"
                        />
                        <p>+1</p>
                      </div>
                    </div>
                    <span>
                      <i className="fi fi-rr-angle-small-right"></i>
                    </span>
                  </div>
                  {showBankList && (
                    <div className="flex flex-wrap p-3 justify-center w-full gap-4 mb-3">
                      <button
                        onClick={() => {
                          handlePaymentClick("virtual_account");
                          setSelectedBank("BCA");
                          setSelectedBankImgSrc(bca);
                          localStorage.setItem("selected_bank", "BCA");
                          localStorage.setItem("selected_bank_img", bca);
                          handleQrisOutletBankTransferPayment("bank_transfer", donation_id, "bca");
                        }}
                        className="w-[140px] flex justify-center py-3 border rounded-full hover:bg-slate-100"
                      >
                        <img
                          src={bca}
                          alt="BCA"
                          className="h-4 w-auto"
                        />
                      </button>
                      <button
                        onClick={() => {
                          handlePaymentClick("virtual_account");
                          setSelectedBank("BNI");
                          setSelectedBankImgSrc(bni);
                          localStorage.setItem("selected_bank", "BNI");
                          localStorage.setItem("selected_bank_img", bni);
                          handleQrisOutletBankTransferPayment("bank_transfer", donation_id, "bni");
                        }}
                        className="w-[140px] flex justify-center py-3 border rounded-full hover:bg-slate-100"
                      >
                        <img
                          src={bni}
                          alt="BNI"
                          className="h-4 w-auto"
                        />
                      </button>
                      <button
                        onClick={() => {
                          handlePaymentClick("virtual_account");
                          setSelectedBank("BRI");
                          setSelectedBankImgSrc(bri);
                          localStorage.setItem("selected_bank", "BRI");
                          localStorage.setItem("selected_bank_img", bri);
                          handleQrisOutletBankTransferPayment("bank_transfer", donation_id, "bri");
                        }}
                        className="w-[140px] flex justify-center py-3 border rounded-full hover:bg-slate-100"
                      >
                        <img
                          src={bri}
                          alt="BRI"
                          className="h-4 w-auto"
                        />
                      </button>
                      <button
                        onClick={() => {
                          handlePaymentClick("virtual_account");
                          setSelectedBank("Permata");
                          setSelectedBankImgSrc(permata);
                          localStorage.setItem("selected_bank", "Permata");
                          localStorage.setItem("selected_bank_img", permata);
                          handleQrisOutletBankTransferPayment("bank_transfer", donation_id, "permata");
                        }}
                        className="w-[140px] flex justify-center py-3 border rounded-full hover:bg-slate-100"
                      >
                        <img
                          src={permata}
                          alt="permata"
                          className="h-4 w-auto"
                        />
                      </button>
                      <button
                        onClick={() => {
                          handlePaymentClick("virtual_account");
                          setSelectedBank("CIMB");
                          setSelectedBankImgSrc(cimb);
                          localStorage.setItem("selected_bank", "CIMB");
                          localStorage.setItem("selected_bank_img", cimb);
                          handleQrisOutletBankTransferPayment("bank_transfer", donation_id, "cimb");
                        }}
                        className="w-[140px] flex justify-center py-3 border rounded-full hover:bg-slate-100"
                      >
                        <img
                          src={cimb}
                          alt="cimb"
                          className="h-4 w-auto"
                        />
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="p-6 border-b border-gray-300 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    handlePaymentClick("QRIS");
                    handleQrisOutletBankTransferPayment("qris", donation_id);
                  }}
                >
                  <div>
                    <p className="text-xl font-bold pb-4">QRIS</p>
                    <div className="flex space-x-4">
                      <img
                        src={qris}
                        alt="QRIS"
                        className="h-4 w-auto"
                      />
                      <img
                        src={dana}
                        alt="DANA"
                        className="h-4 w-auto"
                      />
                      <img
                        src={ovo}
                        alt="OVO"
                        className="h-4 w-auto"
                      />
                      <img
                        src={linkaja}
                        alt="LinkAja"
                        className="h-4 w-auto"
                      />
                    </div>
                  </div>
                  <span>
                    <i className="fi fi-rr-angle-small-right"></i>
                  </span>
                </div>

                <div
                  className="p-6 border-b border-gray-300 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                  onClick={() => {
                    handleQrisOutletBankTransferPayment("gopay", donation_id);
                    handlePaymentClick("Gopay");
                  }}
                >
                  <div>
                    <p className="text-xl font-bold pb-4">Gopay</p>
                    <div className="flex space-x-4">
                      <img
                        src={gopay}
                        alt="GOPAY"
                        className="h-4 w-auto"
                      />
                      <img
                        src={qris}
                        alt="QRIS"
                        className="h-4 w-auto"
                      />
                    </div>
                  </div>
                  <span>
                    <i className="fi fi-rr-angle-small-right"></i>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Order Details Popup */}
      {showOrderDetails && <OrderDetailsPopup onClose={toggleOrderDetails} />}
    </>
  );
};

export default CustomPaymentInterface;
