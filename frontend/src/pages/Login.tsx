import { useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../hooks/useLogin.ts";

import { LoginInputsType } from "../types/global.ts";

const Login = () => {
  const { loading, login } = useLogin();

  const [inputs, setInputs] = useState<LoginInputsType>({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(inputs);
  };

  return (
    <div className="min-w-96 mx-auto flex flex-col items-center justify-center">
      {/* Login Container */}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/* Header */}
        <div className="mb-2 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-3xl text-blue-500 font-semibold">
            PERN Chat App
          </h1>
          <h1 className="text-center text-3xl text-white font-semibold">
            Login
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
              placeholder="Enter Username"
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

          <Link
            to="/signup"
            className="mt-1 inline-block text-sm text-white hover:underline hover:text-blue-600"
          >
            Don't have an account?
          </Link>

          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm text-white mt-2"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
