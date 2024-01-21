import { PasscodeForm } from "@/components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="text-center">
            <PasscodeForm />
            <div className="mt-5">
              <Link
                to="/"
                className="text-white text-lg bg-slate-500 hover:bg-slate-700 px-3 py-1 rounded-2xl mx-2"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
