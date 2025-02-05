import axios from "axios";

export const uploadImage = async img => {
  let imgUrl = null;

  // Validasi MIME type dan ukuran file sebelum melanjutkan upload
  const maxSize = 3 * 1024 * 1024; // 3MB dalam byte
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Tambahkan JPEG, JPG, PNG

  if (!allowedTypes.includes(img.type)) {
    throw new Error("File harus berformat JPEG, JPG, atau PNG!");
  }

  if (img.size > maxSize) {
    throw new Error("Ukuran file terlalu besar! Maksimal 3MB.");
  }

  // Ambil URL untuk upload dari server
  await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url", {
    params: {
      fileType: img.type, // Kirim MIME type
      fileSize: img.size, // Kirim ukuran file dalam byte
    }
  }).then(async ({ data: { uploadURL } }) => {
    // Upload gambar ke S3 menggunakan signed URL
    await axios({
      method: "PUT",
      url: uploadURL,
      headers: { "Content-Type": img.type },
      data: img,
    }).then(() => {
      // Ambil URL file setelah berhasil upload
      imgUrl = uploadURL.split("?")[0];
    });
  }).catch(error => {
    console.error("Upload failed:", error.message);
    throw new Error(error.message);
  });

  return imgUrl;
};
