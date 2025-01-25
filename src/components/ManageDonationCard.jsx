import { Link } from "react-router-dom";
import { getDay } from "../common/date.jsx";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App.jsx";
import { onSetDonationToDraft } from "../lib/utils.js";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ManageDonationCard = ({ donation, onTriggerChange }) => {
  const [donationToDraftOverlay, setDonationToDraftOverlay] = useState(false);
  const navigate = useNavigate();
  const isDonationDrafted = donation.draft && donation.status === "Open";

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleOnSetDonationToDraft = () => {
    onSetDonationToDraft(
      donation,
      donation.donation_id,
      access_token,
      navigate,
      toast.success,
      isDonationDrafted ? "Donasi Terpublish" : "Donasi Terdraft",
      onTriggerChange,
    ).then(() => {
      setDonationToDraftOverlay(false);
    });
  };

  return (
    <>
      {/* Move Donation to Draft */}
      <Modal
        open={donationToDraftOverlay}
        onClose={setDonationToDraftOverlay}
        closeIcon={<></>}
        styles={{
          modal: {
            borderRadius: "12px",
            padding: "32px",
          },
        }}
        center
      >
        <p className={"mb-12 font-semibold text-2xl dark:text-grey light:text-black"}>Anda yakin ingin memindahkan donasi ini ke draft?</p>
        <div className={"flex flex-col gap-4"}>
          <button
            className={"px-6 py-3 border w-full rounded-xl bg-red text-white font-bold dark:text-black light:text-grey"}
            onClick={handleOnSetDonationToDraft}
          >
            Pindahkan
          </button>
          <button
            className={"px-6 py-3 border w-full rounded-xl dark:text-grey light:text-black"}
            onClick={() => setDonationToDraftOverlay(false)}
          >
            Batal
          </button>
        </div>
      </Modal>

      <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">
        <img
          src={donation.thumbnail}
          alt={"banner-image"}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover rounded-xl"
        />

        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div>
            <Link
              to={`/donation/detail/${donation.donation_id}`}
              className="blog-title mb-4 hover:underline"
            >
              {donation.title}
            </Link>

            <p className="line-clamp-1">Dibuat pada {getDay(donation.created_at)}</p>
          </div>

          <div className="flex gap-6 mt-3">
            <Link
              to={`/donation/edit/${donation.donation_id}`}
              className="pr-4 py-2 underline"
            >
              Edit
            </Link>

            {donation.status !== "Closed" && (
              <button
                className="pr-4 py-2 underline text-red"
                onClick={() => setDonationToDraftOverlay(!donationToDraftOverlay)}
              >
                {isDonationDrafted ? "Publish" : "Pindahkan Ke Draft"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
