import { numberFormat } from "../lib/utils";
import dayjs from "dayjs";

const DonorItem = ({ name, amount, donated_at }) => {
  return (
    <div className="flex max-sm:flex-col justify-between my-6">
      <div className="flex gap-5 items-start">
        {/* <img
          src="https://images.unsplash.com/photo-1499353966104-ec5c73302e82?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-12 w-12 rounded-full"
        /> */}

        <p className="max-sm:flex max-sm:gap-2">
          {name}
          <p className="underline">Rp {numberFormat(amount)}</p>
        </p>
      </div>
      <p className="max-sm:flex max-sm:gap-2 text-dark-grey opacity-75">
        <p>Tanggal Donasi: </p>
        {dayjs(donated_at).format("YYYY-MM-DD HH:mm")}
        <hr />
      </p>
    </div>
  );
};

export default DonorItem;
