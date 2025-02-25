import axios from "axios";
import { createContext, useEffect, useState, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/Loader";
import { getDay } from "../common/date";
import BlogInteraction from "../components/BlogInteraction";
import BlogContent from "../components/BlogContent";
import CommentsContainer, { fetchComments } from "../components/Comments";

const BlogPostCard = lazy(() => import("../components/BlogPost"));

export const blogStructure = {
  title: "",
  des: "",
  content: [],
  // tags: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
};

export const BlogContext = createContext({});

const BlogPage = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [loading, setLoading] = useState(true);
  const [similarBlogs, setSimilarBlogs] = useState(null);
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);
  // const [ commentsWrapper, setCommentsWrapper ] = useState(true);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

  let {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
    },
    publishedAt,
  } = blog;

  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(async ({ data: { blog } }) => {
        blog.comments = await fetchComments({
          blog_id: blog._id,
          setParentCommentCountFun: setTotalParentCommentsLoaded,
        });
        setBlog(blog);

        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
            tag: blog.tags[0],
            limit: 6,
            eliminate_blog: blog_id,
          })
          .then(({ data }) => {
            setSimilarBlogs(data.blogs);
            // console.log(data.blogs);
          });

        setBlog(blog);
        setLoading(false);
        // console.log(blog);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    resetStates();

    fetchBlog();
  }, [blog_id]);

  const resetStates = () => {
    setBlog(blogStructure);
    setSimilarBlogs(null);
    setLoading(true);
    setLikedByUser(false);
    setCommentsWrapper(false);
    setTotalParentCommentsLoaded(0);
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider
          value={{
            blog,
            setBlog,
            isLikedByUser,
            setLikedByUser,
            commentsWrapper,
            setCommentsWrapper,
            totalParentCommentsLoaded,
            setTotalParentCommentsLoaded,
          }}
        >
          <CommentsContainer />

          <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
            <img
              src={banner}
              alt={"banner-image"}
              className="aspect-video"
            />

            <div className="mt-12">
              <h2>{title}</h2>

              <div className="flex max-sm:flex-col justify-between my-8">
                <div className="flex gap-5 items-start">
                  <img
                    src={profile_img}
                    alt={"profile-img"}
                    className="h-12 w-12 rounded-full"
                  />

                  <p>
                    {fullname}
                    <br />@
                    <Link
                      to={`/user/${author_username}`}
                      className="underline"
                    >
                      {author_username}
                    </Link>
                  </p>
                </div>
                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Dipublish pada {getDay(publishedAt)}</p>
              </div>
            </div>

            <BlogInteraction />

            {/* Artikel Konten Disini */}
            <div className="my-12 font-gelasio blog-page-content">
              {
                // here
                content[0].blocks.map((block, i) => {
                  return (
                    <div
                      key={i}
                      className="my-4 md:my-8"
                    >
                      <BlogContent block={block} />
                    </div>
                  );
                })
              }
            </div>

            <BlogInteraction />

            <Suspense fallback={<div>Loading...</div>}>
              {similarBlogs != null && similarBlogs.length ? (
                <>
                  <h1 className="text-2xl mt-14 mb-10 font-medium">Artikel Terkait</h1>

                  {similarBlogs.map((blog, i) => {
                    let {
                      author: { personal_info },
                    } = blog;

                    return (
                      <AnimationWrapper
                        key={i}
                        transition={{ duration: 1, delay: i * 0.08 }}
                      >
                        <BlogPostCard
                          content={blog}
                          author={personal_info}
                        />
                      </AnimationWrapper>
                    );
                  })}
                </>
              ) : (
                " "
              )}
            </Suspense>
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
