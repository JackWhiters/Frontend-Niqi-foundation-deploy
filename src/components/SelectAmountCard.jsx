import { useState } from "react";

const SelectAmountCard = ({ donationData, amountList, setFinalAmount, setCurrentScreen }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(() => {
    const value = localStorage.getItem("anonymous");
    return value === "true"; // Check explicitly for "true"
  });

  const handleAmountClick = amount => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toLocaleString("id-ID"));
    setError("");
  };

  const handleCustomAmountChange = e => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Hapus karakter non-numeric

    // Cek apakah input kosong
    if (rawValue === "") {
      setCustomAmount(""); // Kosongkan input
      setSelectedAmount(null); // Reset selected amount
      setError(""); // Hapus pesan kesalahan
      return;
    }

    // Cek apakah karakter pertama adalah '0' dan input lebih dari 1 karakter
    if (rawValue.length > 0 && rawValue[0] === "0") {
      setCustomAmount(""); // Kosongkan input jika dimulai dengan '0'
      return;
    }

    const value = parseInt(rawValue, 10);

    // Set pesan kesalahan untuk nilai kurang dari 10.000
    if (value < 10000) {
      setError("Donasi tidak boleh kurang dari 10.000 rupiah");
    } else if (value <= donationData.remaining_amount) {
      setError(`Donasi tidak boleh lebih dari ${donationData?.remaining_amount?.toLocaleString("Id-ID")} rupiah`);
    } else {
      setError(""); // Hapus kesalahan untuk input yang valid
    }

    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format angka dengan titik

    setCustomAmount(formattedValue);
    setSelectedAmount(null); // Reset pemilihan jika menggunakan input manual
  };

  const handleSubmit = () => {
    const rawValue = customAmount.replace(/\D/g, "");
    const value = parseInt(rawValue, 10);

    // Periksa nilai sebelum melanjutkan
    if (isNaN(value) || value < 10000) {
      alert("Minimal Donasi Rp 10.000"); // Gunakan alert jika kurang dari minimum
    } else {
      // Lanjutkan dengan donasi
      setFinalAmount(value);
      setCurrentScreen("PAYMENT");
    }
  };

  const isButtonDisabled = () => {
    // Periksa apakah selectedAmount atau customAmount valid
    const rawCustomAmount = customAmount?.replace(/\D/g, ""); // Hapus karakter non-numeric
    const value = parseInt(rawCustomAmount, 10);

    // Nonaktifkan tombol jika custom amount kosong atau kurang dari 10.000
    return isNaN(value) || value < 10000 || value > donationData.remaining_amount;
  };

  const handleAnonymous = () => {
    setIsAnonymous(prevState => {
      localStorage.setItem("anonymous", !prevState);
      return !prevState;
    });
  };

  return (
    <div className="w-full max-w-xl">
      <div className="block rounded-lg p-4 border border-gray-200 mb-8">
        <img
          alt="thumbnail donasi"
          src={donationData.thumbnail ?? "https://picsum.photos/1280/720"}
          className="h-auto w-full rounded-md object-cover"
        />

        <div className="mt-4">
          <dl>
            <div>
              <dd className="font-medium text-2xl text-rose-500 text-center">{donationData.title}</dd>
            </div>
          </dl>

          {/* <div className="mt-4 flex justify-center space-x-2"> */}
          <p className="mt-4 text-center">Pilih Nominal Atau Input Nominal Dibawah.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {amountList.map(amount => (
              <button
                key={amount}
                className={`py-2 px-4 w-full rounded border ${selectedAmount === amount ? "border-rose-500" : "border-gray-300"}`}
                onClick={() => handleAmountClick(amount)}
              >
                {amount.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center border rounded bg-grey">
            <span className="px-3 text-dark-grey">Rp</span>
            <input
              type="text"
              className={`flex-1 p-2 border-0 rounded-r bg-grey placeholder:text-dark-grey ${error ? "border-red-500" : "border-gray-300"}`}
              placeholder="0"
              value={customAmount}
              onChange={handleCustomAmountChange}
            />
          </div>

          {/* Pesan kesalahan ditampilkan setiap saat */}
          <p className="text-red-500 text-sm mt-2 sm:px-24 text-center">
            {error ||
              `Donasi tidak boleh kurang dari 10.000 rupiah dan lebih dari ${donationData?.remaining_amount?.toLocaleString(
                "Id-ID",
              )} rupiah (Target Donasi)`}
          </p>

          <div className="w-full text-center">
            <button
              onClick={handleSubmit}
              disabled={isButtonDisabled()} // Panggil fungsi untuk menentukan keadaan disabled
              className={`w-full mt-5 inline-block rounded border-none ${
                isButtonDisabled() ? "bg-gray-400" : "bg-rose-600 hover:bg-rose-700"
              } px-12 py-3 text-base font-medium text-gray-50 focus:outline-none focus:ring active:bg-rose-500`}
            >
              Selanjutnya
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <input
              type="checkbox"
              name="anonymous"
              onChange={handleAnonymous}
              className="size-8"
              checked={isAnonymous}
            />
            <p className="font-bold text-xl">Donasi Sebagai Anonim</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAmountCard;
