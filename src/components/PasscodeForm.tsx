import { InputBox } from "@/components";
import { useEffect, useState } from "react";
import { LoginSuccess, ResponseErrorForm } from "@/libs/sweetalert";
const PasscodeForm = () => {
  const [dataPasscode, setdataPasscode] = useState<string>("");
  useEffect(() => {
    if(localStorage.getItem("loginSettings") === "true") {
        location.href="/";
    }
  }, []);
  const handleSave = async () => {
    if (dataPasscode === import.meta.env.VITE_PASSCODE) {
     localStorage.setItem("loginSettings", "true");
      LoginSuccess();
      setTimeout(() => location.href="/", 3000);
    } else {
      ResponseErrorForm();
    }
  };

  return (
    <>
      <div className="flex w-screen">
        <div className="m-auto text-center w-2/3 lg:w-1/4">
          <div className="mt-5 border border-3 px-5 py-3 rounded-xl">
            {/* <form method="post"> */}
              <div className="flex flex-col">
                <p className="font-bold text-lg my-3">
                  Passcode | (Temporary login [WIP])
                </p>
                <div className="w-full">
                  <InputBox
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={dataPasscode}
                    obj={dataPasscode}
                    setObj={setdataPasscode}
                    required
                  />
                </div>
              </div>
              <button
                className="px-5 py-2 my-3 bg-slate-500 hover:bg-slate-700 text-white rounded-xl"
                type="submit"
                onClick={handleSave}
              >
                Login
              </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasscodeForm;
