import Footer from "../components/Footer";
import about from "@/assets/imgs/about-4.webp";

const AboutPage = () => {
  return (
    <>
      <section className="pt-10 h-cover">
        <div className="w-full">
          {/* <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"> */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Tentang Niqi Foundation</h2>

            <p className="mt-4 text-2xl font-semibold text-grey-dark">Sejarah dan Visi Misi Niqi Foundation</p>
          </div>

          <div className="w-full py-10">
            {/* <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"> */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <img
                  alt=""
                  src={about}
                  // src="https://images.unsplash.com/photo-1571909552531-1601eaec8f79?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>

              <div className="py-auto">
                {/* <div className="lg:py-24"> */}
                <p className="mb-4 text-xl text-justify text-grey-dark">
                  Berdiri sejak 10 Oktober 2018, Yayasan Nur Iqsan Ibrahim hadir dengan visi mulia untuk memberikan harapan dan masa depan
                  yang lebih baik bagi anak-anak yatim dan dhuafa. Yayasan ini berdedikasi pada penyediaan pendidikan dan layanan kesehatan
                  gratis, dengan keyakinan bahwa setiap anak berhak mendapatkan kesempatan yang sama untuk tumbuh dan berkembang menjadi
                  generasi yang cerdas, mandiri, dan berakhlak mulia.
                </p>
                <p className="mb-4 text-xl text-justify text-grey-dark">
                  Saat ini, Yayasan Nur Iqsan Ibrahim membina kurang lebih terdiri dari 350 santri mukim dan binaan yang tersebar di
                  berbagai program kami. Dengan pusat kegiatan di Kota Bekasi, yayasan ini mengelola Asrama Putra dan Putri serta Pondok
                  Pesantren yang berada di Jonggol, menjadikannya sebagai rumah kedua bagi para santri yang penuh semangat dalam menuntut
                  ilmu agama dan pengetahuan umum.
                </p>
                <p className="mb-4 text-xl text-justify text-grey-dark">
                  Melalui berbagai program pendidikan berkualitas, kegiatan sosial, dan spiritual, Yayasan Nur Iqsan Ibrahim terus berupaya
                  menjadi pelita bagi anak-anak yatim dan dhuafa, membantu mereka untuk meraih cita-cita dan masa depan yang cerah. Kami
                  percaya, dengan pendidikan yang memadai dan lingkungan yang mendukung, kami dapat mencetak generasi penerus yang mampu
                  berkontribusi dengan baik Kepada Agama, Nusa dan Bangsa.
                </p>
                <h2 className="my-4 text-3xl font-bold sm:text-4xl">Visi dan Misi</h2>

                <p className="text-2xl font-semibold text-grey-dark">Visi :</p>
                <div className="my-4 text-grey-dark">
                  <p className="text-xl">
                    Menjadi Lembaga Sosial Yang berkontribusi dalam bidane pendidikan dan kesehatan bagi anak-anak bangsa khususnya yatim
                    dan Dhu’afa
                  </p>
                  {/* <p className="text-xl">
                    2. Sed sollicitudin dictum varius. Nullam vitae augue enim. Ut malesuada vitae nisi nec molestie.
                  </p>
                  <p className="text-xl">3. Fusce vel diam tristique, varius lacus vel, tincidunt purus.</p>
                  <p className="text-xl">4. Sed sollicitudin dictum varius. Nullam vitae augue enim.</p>
                  <p className="text-xl">5. consectetur adipiscing elit. Sed et dolor rutrum, dictum nunc vel.</p> */}
                </div>

                <p className="text-2xl font-semibold text-grey-dark">Misi :</p>
                {/* <div className="my-4 text-grey-dark">
                  <p className="text-xl">
                    1. Memberikan Kesehatan dan pendidikan gratis bagi yatim dan Dhu’afa.
                  </p>
                  <p className="text-xl">
                    2. Menyelenggarakan Seminar-seminar pendidikan kesehatan, ekonomi, kemandirian bagi masyarakat luas khususnya yatim dan Dhu’afa.
                    </p>
                </div> */}
                <div className="my-4 text-grey-dark">
                  <ul className="pl-6 text-xl list-decimal">
                    <li className="text-xl">Memberikan Kesehatan dan pendidikan gratis bagi yatim dan Dhu’afa.</li>
                    <li className="text-xl">
                      Menyelenggarakan Seminar-seminar pendidikan kesehatan, ekonomi, kemandirian bagi masyarakat luas khususnya yatim dan
                      Dhu’afa.
                    </li>
                  </ul>
                </div>

                {/* <p className="text-xl text-grey-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et dolor rutrum, dictum nunc vel, malesuada tortor. Sed
                  sollicitudin dictum varius. Nullam vitae augue enim. Ut malesuada vitae nisi nec molestie. Vestibulum vel nibh nisi. Fusce
                  vel diam tristique, varius lacus vel, tincidunt purus.
                </p> */}

                {/* <a
                                href="#"
                                className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                                >
                                Get Started Today
                                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
