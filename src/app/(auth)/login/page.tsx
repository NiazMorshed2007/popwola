import Image from "next/image";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full relative pt-20 h-full flex flex-col items-center justify-center">
        <div className="md:w-[440px] w-11/12">
          <h1 className="text-3xl text-center mb-2 font-semibold">
            Welcome Back!
          </h1>
          <p className="text-sm text-secondary text-center">
            Login to your account to continue scaling with popwola.
          </p>
          <LoginForm />
        </div>
      </div>
      <div className="right md:block hidden w-5/12 h-full">
        <Image
          src={"/popup-placeholder.png"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full shadow-2xl opacity-50 h-full object-cover"
          alt="sidebar image"
        />
      </div>
    </>
  );
};

export default Login;
