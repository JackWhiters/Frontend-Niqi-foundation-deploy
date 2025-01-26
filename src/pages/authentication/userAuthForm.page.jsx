import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

import AnimationWrapper from "../../common/page-animation";
import googleIcon from "~src/assets/imgs/google.png";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../App";
import { authWithGoogle } from "../../common/firebase";

const UserAuthForm = ({ type }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
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
    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let { fullname, email, password } = data;

    // Form Validate
    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 letters long");
      }
    }

    if (!email.length) {
      return toast.error("Mohon isi email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email tidak valid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error("Kata sandi harus terdiri dari 6 hingga 20 karakter dengan angka, 1 huruf kecil, dan 1 huruf besar");
    }

    userAuthThroughServer(serverRoute, data);
  };

  const handleGoogleAuth = e => {
    e.preventDefault();

    authWithGoogle()
      .then(user => {
        // console.log(user);
        let serverRoute = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch(err => {
        toast.error("trouble login through");
        return console.log(err);
      });
  };

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Selamat Datang" : "Daftar sekarang"}
          </h1>

          {type !== "sign-in" ? (
            <div className="relative w-[100%] mb-4">
              <input
                className="input-box"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Nama Lengkap"
                {...register("fullname")}
              />
              <i className={"fi fi-rr-user input-icon"}></i>
            </div>
          ) : (
            ""
          )}

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

          <div className="relative w-[100%] mb-4">
            <input
              className="input-box"
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <i className={"fi fi-rr-key input-icon"}></i>

            <i
              className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
              onClick={() => setPasswordVisible(currentVal => !currentVal)}
            ></i>
          </div>
          {type == "sign-in" && (
            <p>
              Lupa Password?{" "}
              <Link
                to={"/reset-password"}
                className="text-blue-500 cursor-pointer"
              >
                Reset Disini!
              </Link>
            </p>
          )}

          <button
            className="btn-dark center mt-14"
            type="submit"
          >
            {type == "sign-in" ? "Masuk" : "Daftar"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>atau</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center "
            onClick={handleGoogleAuth}
          >
            <img
              src={googleIcon}
              className="w-5"
              alt={"google-icon"}
            />
            Lanjutkan dengan Google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Belum mempunyai akun ?
              <Link
                to="/signup"
                className="underline text-black text-xl ml-1"
              >
                Daftar disini!
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Sudah punya akun ?
              <Link
                to="/signin"
                className="underline text-black text-xl ml-1"
              >
                Masuk disini.
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
