import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="left w-7/12 relative pt-20 h-full flex flex-col items-center justify-center">
        <div className="w-[440px]">
          <h1 className="text-3xl text-center mb-2 font-semibold">
            Welcome Back!
          </h1>
          <p className="text-sm text-secondary text-center">
            Login to your account to continue scaling with popwola.
          </p>
          <LoginForm />
        </div>
      </div>
      <div className="right w-5/12 h-full">
        <img
          className="w-full shadow-2xl opacity-50 h-full object-cover"
          src="https://cdn.dribbble.com/userupload/4160413/file/original-7f17f8eb041c03c556033cf057a648f9.png?compress=1&resize=1024x768"
          alt=""
        />
      </div>
    </>
  );
};

export default Login;
