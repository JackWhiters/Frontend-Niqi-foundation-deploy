import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InpageNavigation";
import { useEffect, useState, Suspense, lazy } from "react";
import Loader from "../components/Loader";
import MinimalBlogPost from "../components/NoBannerBlogPost";
import { activeTabRef } from "../components/InpageNavigation";
import NoDataMessage from "../components/NoData";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/LoadMore";
import Footer from "../components/Footer";

const BlogPostCard = lazy(() => import("../components/BlogPost"));

const HomePage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlog] = useState(null);
  let [pageState, setPageState] = useState("home");

  let categories = ["Kategori 1", "Kategori 2", "Kategori 3", "Kategori 4", "Kategori 5"];

  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });
        setBlog(formatData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async ({ data }) => {
        let formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlog(formatData);
        // setBlog(data.blogs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlog(data.blogs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadBlogByCategory = e => {
    let category = e.target.innerText.toLowerCase();
    setBlog(null);

    if (pageState === category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState === "home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogsByCategory({ page: 1 });
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* artikel terbaru */}
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {blogs == null ? (
                <Loader />
              ) : blogs.results.length ? (
                blogs.results.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="Tidak ada artikel di publish" />
              )}
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFun={pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory}
              />
            </Suspense>

            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost
                      blog={blog}
                      index={i}
                    />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="Tidak ada artikel trending" />
            )}
          </InPageNavigation>
        </div>

        {/* filter & trending artikel */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">Beberapa Kategori Artikel lainnya</h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadBlogByCategory}
                      className={"tag " + (pageState === category.toLowerCase() ? "bg-black text-white " : " ")}
                      key={i}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="font-medium text-xl mb-8">
                Trending <i className="fi fi-rr-arrow-trend-up"></i>
              </h1>

              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <MinimalBlogPost
                        blog={blog}
                        index={i}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="Tidak ada artikel trending" />
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </AnimationWrapper>
  );
};

export default HomePage;
