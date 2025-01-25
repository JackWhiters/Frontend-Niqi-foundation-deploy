import axios from "axios";

export const numberFormat = value =>
  new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
    //  currencyDisplay: "none",
  })
    .format(value)
    .replace("Rp", "")
    .trim();

export const truncateString = (str, num) => {
  if (!str) {
    return "";
  }

  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + "...";
};

export const onSetDonationToDraft = async (data, id, access_token, func_navigate, func_toast_success, toast_message, onTriggerChange) => {
  axios
    .put(
      import.meta.env.VITE_SERVER_DOMAIN + `/donation/${id}`,
      {
        ...data,
        draft: !data.draft,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    .then(() => {
      func_toast_success(toast_message);
      func_navigate("/dashboard/donations", {
        replace: true
      });

      // Shitty Way to re-Render Component
      onTriggerChange(new Date());
    });
};

export function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export function getImageUrl(basePath, format = 'webp') {
  return `${basePath}.${format}`
}

