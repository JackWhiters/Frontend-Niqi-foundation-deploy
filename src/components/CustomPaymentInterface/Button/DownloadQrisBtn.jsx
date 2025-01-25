const DownloadQrisBtn = ({ url }) => {
  return (
    <a
      className="bg-rose-600 hover:bg-rose-900 px-6 py-3.5 w-full text-center text-white rounded-full"
      target="_blank"
      href={url}
      rel="noreferrer"
    >
      Download QRIS
    </a>
  );
};

export default DownloadQrisBtn;
