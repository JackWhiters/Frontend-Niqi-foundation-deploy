import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <section className="py-10 h-cover">
        <div className="w-full">
          {/* <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"> */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Hubungi Kami</h2>

            <p className="mt-4 text-2xl text-gray-600">
              Jangan ragu untuk menghubungi kami melalui media sosial atau berkunjung langsung ke tempat yayasan kami.
            </p>
          </div>

          <div className="w-full pt-10">
            {/* <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16"> */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16">
              <div className="relative grid w-full h-64 grid-cols-1 gap-8 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full sm:grid-cols-1 md:grid-cols-1 lg:col-span-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4315049720553!2d107.00663431151924!3d-6.206674660774331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69897d5c0f574d%3A0x1a69933329fb6b3b!2sAsrama%20Putri%20Niqi%20Foundation!5e0!3m2!1sid!2sid!4v1727771349460!5m2!1sid!2sid"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>

              {/* <div className="relative grid w-full h-64 grid-cols-1 gap-8 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full sm:grid-cols-2 md:grid-cols-2 lg:col-span-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4315049720553!2d107.00663431151924!3d-6.206674660774331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69897d5c0f574d%3A0x1a69933329fb6b3b!2sAsrama%20Putri%20Niqi%20Foundation!5e0!3m2!1sid!2sid!4v1727771349460!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div> */}

              <div className="grid grid-cols-1 gap-8 lg:py-24 sm:grid-cols-1 md:grid-cols-1 lg:col-span-1">
                <div className="flex gap-4">
                  <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                    <i className="block mt-1 text-2xl fi fi-rr-envelope"></i>
                  </button>
                  {/* <span className="p-4 bg-gray-800 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 bg-gray-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span> */}
                  <div>
                    <p className="text-3xl font-bold">Email</p>
                    <p className="mt-1 text-2xl text-gray-600">Email@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                    <i className="block mt-1 text-2xl fi fi-rr-phone-call"></i>
                  </button>
                  <div>
                    <p className="text-3xl font-bold">Telepon</p>
                    <p className="mt-1 text-2xl text-gray-600">012345678910</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                    <i className="block mt-1 text-2xl fi fi-rr-link-alt"></i>
                  </button>
                  <div>
                    <p className="text-3xl font-bold">Sosial Media</p>
                    <div className="flex gap-6 mt-1">
                      <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                        <a href="https://www.facebook.com/">
                          <i className="block mt-1 text-2xl fi fi-brands-facebook"></i>
                        </a>
                      </button>
                      <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                        <i className="block mt-1 text-2xl fi fi-brands-twitter"></i>
                      </button>
                      <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                        <i className="block mt-1 text-2xl fi-brands-instagram"></i>
                      </button>
                      <button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
                        <i className="block mt-1 text-2xl fi fi-brands-tik-tok"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
