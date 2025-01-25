import { Link } from "react-router-dom";
import { numberFormat, topFunction, truncateString } from "../lib/utils";

const DonationCard = ({ data, key }) => {
  return (
    <div key={key}>
      <div className="rounded overflow-hidden shadow-lg border min-h-[680px]">
        <img
          className="w-full h-[400px]"
          src={data.thumbnail}
          alt={data.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-rose-500">{data.title}</div>
          <p className="">
            <p className="">{truncateString(data.description, 100)}</p>
          </p>

          <div className="flex justify-between mt-3">
            <div className="flex flex-col">
              <p className="text-xl">Terkumpul</p>
              <p className="font-bold">Rp {numberFormat(data.total_collected)}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl">Target</p>
              <p className="font-bold">Rp {numberFormat(data.target_amount)}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <p>Progress Berjalan</p>
              <p>{data.percentage_collected}%</p>
            </div>
            <div className="shadow-sm overflow-hidden bg-slate-100">
              <div className="relative h-6 flex items-center justify-center">
                {/* <div className={`absolute top-0 bottom-0 left-0 w-[8.22%] bg-red`}></div> */}
                <div
                  style={{ width: `${data.percentage_collected}%` }}
                  className={`absolute top-0 bottom-0 left-0 bg-red`}
                ></div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Link
              to={`/donation/detail/${data.donation_id}`}
              onClick={() => topFunction()}
              className="font-bold dark:text-black light:text-grey w-full text-center mt-5 inline-block rounded border-none bg-rose-900 px-12 py-3 text-base hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500"
            >
              Donasi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
