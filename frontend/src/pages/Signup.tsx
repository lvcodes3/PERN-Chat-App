import { useState } from "react";
import { Link } from "react-router-dom";

import useSignup from "../hooks/useSignup.ts";

import { SignupInputsType } from "../types/global.ts";

import { GenderCheckbox } from "../components/GenderCheckbox.tsx";

const Signup = () => {
  const { loading, signup } = useSignup();

  const [inputs, setInputs] = useState<SignupInputsType>({
    username: "",
    fullname: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
  });

  const handleCheckboxChange = (gender: "male" | "female" | "other") => {
    setInputs({ ...inputs, gender });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signup(inputs);
  };

  return (
    <div className="min-w-96 mx-auto flex flex-col items-center justify-center">
      {/* Sign Up Container */}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* Header */}
        <div className="mb-2 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-3xl text-blue-500 font-semibold">
            PERN Chat App
          </h1>
          <h1 className="text-center text-3xl text-white font-semibold">
            Sign Up
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <div>
            <label className="label p-1">
              <span className="label-text text-base text-white">Full Name</span>
            </label>
            <input
              type="text"
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value });
              }}
              placeholder="John Doe"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label p-1">
              <span className="label-text text-base text-white">Username</span>
            </label>
            <input
              type="text"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
              placeholder="johndoe"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label p-1">
              <span className="label-text text-base text-white">Password</span>
            </label>
            <input
              type="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <div>
            <label className="label p-1">
              <span className="label-text text-base text-white">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              value={inputs.passwordConfirmation}
              onChange={(e) => {
                setInputs({ ...inputs, passwordConfirmation: e.target.value });
              }}
              placeholder="Confirm Password"
              className="input input-bordered w-full h-10"
            />
          </div>

          <GenderCheckbox
            selectedGender={inputs.gender}
            onCheckboxChange={handleCheckboxChange}
          />

          <Link
            to="/login"
            className="inline-block text-sm text-white hover:underline hover:text-blue-600"
          >
            Already have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 text-white border border-slate-700"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
