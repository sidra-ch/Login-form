import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BackgroundGradient } from "./components/ui/background-gradient";
import { BackgroundLines } from "./components/ui/background-lines"; // Ensure this path is correct

const Formlogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const userDetail = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [data, setData] = useState(userDetail);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.email || !data.password || (!isLogin && !data.name)) {
      toast.error("Please enter all required details.");
      return;
    }

    if (!isLogin) {
      if (data.password !== data.confirmpassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const getData = JSON.parse(localStorage.getItem("user") || "[]");
      const arr = [...getData, data];
      localStorage.setItem("user", JSON.stringify(arr));

      toast.success("Signup Successful!");
      setIsLogin(true);
      setData(userDetail);
    } else {
      const users = JSON.parse(localStorage.getItem("user") || "[]");
      const validUser = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (validUser) {
        toast.success("Login Successful!");
        setData(userDetail);
      } else {
        toast.error("Invalid Credentials!");
      }
    }
  };

  return (
    <BackgroundLines className="flex items-center justify-center  w-full">
      <Toaster position="top-center" reverseOrder={false} />

      <BackgroundGradient className="rounded-[22px] p-6 sm:p-10 bg-white shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Login to Your Account" : "Create an Account"}
          </h2>
        </div>

        <div className="form-toggle flex justify-center gap-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              isLogin ? "bg-sky-700 text-white" : "bg-sky-700 text-white"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              !isLogin ? "bg-sky-700 text-white" : "bg-sky-800  text-white"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={data.confirmpassword}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white cursor-pointer py-2 rounded-lg hover:bg-gradient-to-r hover:from-rose-300 hover:to-slate-600"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Not a member?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </BackgroundGradient>
    </BackgroundLines>
  );
};

export default Formlogin;
