import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../redux/actions/auth.actions";

const Register = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // window.location.href = "/login";
    const RegisterData = {
      FirstName: firstName,
      LastName: lastName,
      UserName: userName,
      Email: email,
      Password: password,
    };
    dispatch(authRegister(RegisterData));
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="flex flex-col items-center  md:flex-row">
            <div className="flex items-center justify-center w-full px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
              <div className="w-full p-10 bg-white">
                <h2 className="mt-1 text-2xl font-bold leading-tight md:text-2xl">
                  Sign Up
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mt-3">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="w-full px-2 py-2 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="w-full px-2 py-2 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      className="w-full px-2 py-2 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      minLength={6}
                      className="w-full px-2 py-2 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-gray-700">User Name</label>
                    <input
                      type="text"
                      placeholder="Enter User Name"
                      className="w-full px-2 py-2 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400"
                  >
                    Create Account
                  </button>
                </form>
                <hr className="w-full my-6 border-gray-300" />

                <p className="mt-8">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-blue-500 hover:text-blue-700"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
