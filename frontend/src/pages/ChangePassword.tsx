import { useState } from "react";

import useUpdatePassword from "../hooks/useUpdatePassword.ts";

import { ChangePasswordInputsType } from "../types/global.ts";

const ChangePassword = () => {
  const { loading, updatePassword } = useUpdatePassword();

  const [inputs, setInputs] = useState<ChangePasswordInputsType>({
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updatePassword(inputs);

    setInputs({
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
    });
  };

  return (
    <div className="w-full md:max-w-screen-sm h-[80vh] md:h-[400px] flex flex-col gap-1 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="mt-2 text-center text-3xl text-white">Change Password</h1>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div>
          <label className="label p-1">
            <span className="label-text text-base text-white">Password:</span>
          </label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            className="input input-bordered w-full h-10"
          />
        </div>

        <div>
          <label className="label p-1">
            <span className="label-text text-base text-white">
              New Password:
            </span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={inputs.newPassword}
            onChange={handleInputChange}
            className="input input-bordered w-full h-10"
          />
        </div>

        <div>
          <label className="label p-1">
            <span className="label-text text-base text-white">
              New Password Confirmation:
            </span>
          </label>
          <input
            type="password"
            name="newPasswordConfirmation"
            value={inputs.newPasswordConfirmation}
            onChange={handleInputChange}
            className="input input-bordered w-full h-10"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-block btn-sm mt-2 text-white border border-slate-700"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
