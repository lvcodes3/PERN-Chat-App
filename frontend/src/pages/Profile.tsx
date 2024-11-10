import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext.tsx";

import useUpdateUser from "../hooks/useUpdateUser.ts";

import { ProfileInputsType } from "../types/global.ts";

import { GenderCheckbox } from "../components/GenderCheckbox.tsx";

const Profile = () => {
  const { authUser } = useAuthContext();

  const { loading, update } = useUpdateUser();

  const [inputs, setInputs] = useState<ProfileInputsType>({
    username: authUser?.username ?? "",
    fullname: authUser?.fullname ?? "",
    gender: authUser?.gender ?? "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (gender: "male" | "female" | "other") => {
    setInputs((prev) => ({ ...prev, gender }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(inputs);
  };

  if (!authUser) {
    return;
  }

  return (
    <div className="w-full md:max-w-screen-sm h-[80vh] md:h-[400px] flex flex-col gap-1 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* avatar */}
      <div className="avatar online mx-auto mt-2">
        <div className="w-12 rounded-full">
          <img src={authUser!.profile_picture} alt="user avatar" />
        </div>
      </div>

      {/* form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div>
          <label className="label p-1">
            <span className="label-text text-base text-white">Username:</span>
          </label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleInputChange}
            className="input input-bordered w-full h-10"
          />
        </div>

        <div>
          <label className="label p-1">
            <span className="label-text text-base text-white">Full Name:</span>
          </label>
          <input
            type="text"
            name="fullname"
            value={inputs.fullname}
            onChange={handleInputChange}
            className="input input-bordered w-full h-10"
          />
        </div>

        <GenderCheckbox
          selectedGender={inputs.gender}
          onCheckboxChange={handleCheckboxChange}
        />

        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-block btn-sm mt-2 text-white border border-slate-700"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>

        <div>
          <button
            type="button"
            disabled={loading}
            onClick={() => navigate("/changePassword")}
            className="btn btn-block btn-sm mt-2 text-white border border-slate-700"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
