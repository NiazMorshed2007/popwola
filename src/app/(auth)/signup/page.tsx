import { ScrollArea } from "@/components/ui/scroll-area";
import RegisterForm from "./components/RegisterForm";
import Image from "next/image";

const Signup = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full h-full p-6 flex flex-col items-center justify-center">
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

export default Signup;
