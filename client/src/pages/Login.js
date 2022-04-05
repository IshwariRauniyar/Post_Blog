import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "../redux/actions/auth.actions";
// import { Form } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      Email: email,
      Password: password,
    };
    dispatch(
      authLogin(loginData)
      // .then((res) => {
      //   if (res.payload.loginSuccess) {
      //     setLoading(false);
      //     setError("");
      //   } else {
      //     setLoading(false);
      //     setError(res.payload.loginError);
      //   }
      // })
    );
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="flex flex-col items-center h-full md:flex-row">
            <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
              <div className="w-full p-10 bg-white h-100">
                <h2 className="mt-1 text-2xl font-bold leading-tight md:text-2xl">
                  Log in to your account
                </h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name
                      id
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      autofocus
                      autoComplete
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      name
                      id
                      placeholder="Enter Password"
                      minLength={6}
                      className="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <a
                      href="#"
                      className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400"
                  >
                    Log In
                  </button>
                </form>
                <hr className="w-full my-6 border-gray-300" />

                <p className="mt-8">
                  Need an account?{" "}
                  <a
                    href
                    className="font-semibold text-blue-500 hover:text-blue-700"
                  >
                    Create an account
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

export default Login;
