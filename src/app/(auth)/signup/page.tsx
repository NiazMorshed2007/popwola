import { ScrollArea } from "@/components/ui/scroll-area";
import RegisterForm from "./components/RegisterForm";

const Signup = () => {
  return (
    <>
      <div className="left w-7/12 h-full p-6 flex flex-col items-center justify-center">
        <ScrollArea
          style={{
            width: "100%",
            height: "calc(100vh)",
          }}
        >
          <div className="pt-32 flex flex-col items-center">
            <h1 className="text-3xl text-center font-semibold">
              Create your popwola account!
            </h1>
            <p className="text-secondary text-center">
              Start boosting your business with popwola.
            </p>

            <RegisterForm />
          </div>
        </ScrollArea>
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

export default Signup;
