const PaymentSimulatorBtn = () => {
  return (
    <a
      className=" bg-black hover:bg-white hover:text-black border px-6 py-3.5 w-full text-white rounded-full text-center"
      target="_blank"
      href="https://simulator.sandbox.midtrans.com/v2/qris/index"
      rel="noreferrer"
    >
      Buka Simulator Pembayaran
    </a>
  );
};

export default PaymentSimulatorBtn;
