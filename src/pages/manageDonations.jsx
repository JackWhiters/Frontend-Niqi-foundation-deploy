import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import InPageNavigation from "../components/InpageNavigation";
import Loader from "../components/Loader";
import NoDataMessage from "../components/NoData";
import AnimationWrapper from "../common/page-animation";
import { useNavigate } from "react-router-dom";
import filter from "lodash/filter";
import { ManageDonationCard } from "../components/ManageDonationCard";

const ManageDonations = () => {
  const [published, setPublished] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [currentTabs, setCurrentTabs] = useState("Sedang Berjalan");
  const [pageLimit, setPageLimit] = useState(10);
  const [totalData, setTotalData] = useState(0);

  const [refreshabs, setRefreshabs] = useState(0);
  const navigate = useNavigate();

  // let activeTab = useSearchParams()[0].get("tab");

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if (access_token) {
      const getDonations = ({ page, limit }) => {
        axios
          .get(import.meta.env.VITE_SERVER_DOMAIN + `/get-donation?page=${page}&limit=${limit}&draft=${currentTabs === "Drafts"}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(res => {
            setTotalData(res.data.totalDonations);
            switch (currentTabs) {
              case "Sedang Berjalan":
                setPublished(
                  filter(res.data.donations, {
                    status: "Open",
                    draft: false,
                  }),
                );
                break;

              // case "Selesai":
              //   console.log(2);
              //   setDonationData(
              //     filter(res.data.donations, {
              //       status: "Closed",
              //     }),
              //   );
              //   break;

              case "Drafts":
                setDrafts(
                  filter(res.data.donations, {
                    status: "Open",
                    draft: true,
                  }),
                );
                break;

              default:
                setPublished(
                  filter(res.data.donations, {
                    status: "Closed",
                  }),
                );
                break;
            }
          })
          .catch(err => {
            console.log(err);
          });
      };

      getDonations({ page: 1, limit: pageLimit });
    } else {
      navigate("/signin");
    }
  }, [refreshabs, currentTabs, pageLimit]);

  function onChangeNavigation(nav) {
    setCurrentTabs(nav);
    setPageLimit(10);
  }

  return (
    <>
      <h1 className="max-md:hidden">Manajemen Donasi</h1>

      <div className="my-8">
        <InPageNavigation
          onNavChange={onChangeNavigation}
          routes={["Sedang Berjalan", "Drafts"]}
        >
          {published === null ? (
            <Loader />
          ) : published.length ? (
            <>
              {published.map((data, i) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ManageDonationCard
                      onTriggerChange={setRefreshabs}
                      donation={data}
                    />
                  </AnimationWrapper>
                );
              })}

              {pageLimit < totalData && (
                <button
                  onClick={() => setPageLimit(pageLimit + 10)}
                  className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2 border mb-5"
                >
                  Tampilkan Lebih Banyak
                </button>
              )}
            </>
          ) : (
            <NoDataMessage message="Tidak ada Donasi dipublish" />
          )}

          {/* {completed === null ? (
          <Loader />
        ) : completed.length ? (
          <>
            {completed.map((data, i) => {
              return (
                <AnimationWrapper
                  key={i}
                  transition={{ delay: i * 0.04 }}
                >
                  <ManageDonationCard
                    onTriggerChange={setRefreshabs}
                    donation={data}
                  />
                </AnimationWrapper>
              );
            })}
          </>
        ) : (
          <NoDataMessage message="Tidak ada Donasi selesai" />
        )} */}

          {drafts === null ? (
            <Loader />
          ) : drafts.length ? (
            <>
              {drafts.map((data, i) => {
                return (
                  <AnimationWrapper
                    key={i}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ManageDonationCard
                      onTriggerChange={setRefreshabs}
                      donation={data}
                    />
                  </AnimationWrapper>
                );
              })}

              {pageLimit < totalData && (
                <button
                  onClick={() => setPageLimit(pageLimit + 10)}
                  className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2 border mb-5"
                >
                  Tampilkan Lebih Banyak
                </button>
              )}
            </>
          ) : (
            <NoDataMessage message="Tidak Ada Draft Donasi" />
          )}
        </InPageNavigation>
      </div>
    </>
  );
};

export default ManageDonations;
