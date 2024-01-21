import { InputBox } from '@/components';
import { FillOutForm, ResponseErrorForm, SuccessForm } from "@/libs/sweetalert";
import { UserLogin } from "@/libs/api";
import { UserLoginType } from "@/types/user.types";
import { useState } from "react";

const LoginForm = () => {
  const [dataUser, setdataUser] = useState<UserLoginType>({
    username: "",
    password: "",
  });

  const handleSave = async () => {
    let hasEmptyString = false;
    for (const key in dataUser) {
      if (Object.prototype.hasOwnProperty.call(dataUser, key)) {
        if (dataUser[key as keyof UserLoginType] === "") {
          hasEmptyString = true;
          break;
        }
      }
    }

    if (hasEmptyString) {
      FillOutForm();
      return;
    }
    const res = await UserLogin(dataUser);
    if (res.status == 200) {
      SuccessForm();
      setTimeout(() => window.location.reload(), 3000);
    } else {
      ResponseErrorForm();
    }
  };

  return (
    <>
      <div className="flex w-screen">
        <div className="m-auto text-center w-2/3 lg:w-1/4">
          <div className="mt-5 border border-3 px-5 py-3 rounded-xl">
            <div className="flex flex-col">
              <p className="font-bold text-lg my-3">Login</p>
              <div className="w-full">
                <InputBox
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={dataUser.username}
                  obj={dataUser}
                  setObj={setdataUser}
                  required
                />
                <InputBox
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={dataUser.password}
                  obj={dataUser}
                  setObj={setdataUser}
                  required
                />
              </div>
            </div>
            <button
              className="px-5 py-2 my-3 bg-slate-500 hover:bg-slate-700 text-white rounded-xl"
              onClick={handleSave}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
