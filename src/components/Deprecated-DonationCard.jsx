import { useNavigate } from "react-router-dom";
import { numberFormat, truncateString } from "../lib/utils";
import { Link } from "react-router-dom";

const DonationCard = ({ title, description, collected, target, progress, thumbnail, donation_id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-lg p-4 border border-gray-200 h-full cursor-pointer"
      onClick={() => navigate(`/donation/detail/${donation_id}`)}
    >
      <img
        alt="thumbnail donasi"
        src={thumbnail}
        className="max-h-[250px] w-full rounded-md object-cover"
      />

      <div className="my-4">
        <dl>
          <div>
            <dd className="font-medium text-2xl text-rose-500">{title}</dd>
            <p>{truncateString(description, 100)}</p>
          </div>
        </dl>

        <div className="grid grid-cols-2 my-3">
          <div className="text-start">
            <p className="text-xl">Terkumpul</p>
            <p className="font-bold">Rp {numberFormat(collected)}</p>
          </div>
          <div className="text-end">
            <p className="text-xl">Target</p>
            <p className="font-bold">Rp {numberFormat(target)}</p>
          </div>
        </div>

        <span className="relative flex justify-center py-4">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
        </span>

        {/* <!-- Progress --> */}
        <div>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-base">Progress Berjalan</p>
            <span className="text-base">{progress}%</span>
          </div>
          <div
            className="flex w-full h-8 bg-gray-300 rounded-sm overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="flex flex-col justify-center bg-rose-500 rounded-sm overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* <!-- End Progress --> */}

        <div className="w-full">
          <Link
            to={`/donation/detail/${donation_id}`}
            className="w-full text-center mt-5 inline-block rounded border-none bg-rose-600 px-12 py-3 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500"
          >
            Donasi Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
