import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

import AnimationWrapper from "../../common/page-animation";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../App";

const ResetPassword = () => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        // console.log(sessionStorage);
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
    },
  });

  const onSubmit = data => {
    let { email } = data;

    if (!email.length) {
      return toast.error("Mohon isi email");
    }

    userAuthThroughServer(data);
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-12">Reset Password</h1>

          <div className="relative w-[100%] mb-4">
            <input
              className="input-box"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            <i className={"fi fi-rr-envelope input-icon"}></i>
          </div>

          <button
            className="btn-dark center w-full"
            type="submit"
          >
            Kirim
          </button>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default ResetPassword;
