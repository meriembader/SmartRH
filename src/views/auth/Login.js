import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
export default function Login() {
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [checked, setChecked] = useState();

  const history = useHistory();

  useEffect(() => {
    const checkRememberMe = async () => {
      let usernameStorage = localStorage.getItem("username");
      let passwordStorage = localStorage.getItem("password");
      let checkboxStorage = localStorage.getItem("checkbox");

      if (
        usernameStorage !== "" &&
        passwordStorage !== "" &&
        checkboxStorage !== ""
      ) {
        setUsername(usernameStorage);
        setPassword(passwordStorage);
        setChecked(checkboxStorage);
      }
    };
    checkRememberMe();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        username,
        password,
      };
      const headers = {
        "Content-Type": "text/plain",
      };
      const { data } = await Axios.post(
        "http://localhost:5000/login",
        loginUser
      );

      await localStorage.setItem("user-token", data.accessToken);
      history.push("/admin/dashboard");

      if (checked && username !== "" && password !== "") {
        localStorage.username = username;
        localStorage.password = password;
        localStorage.checkbox = checked;
      }
    } catch (err) {
      console.log(" tayyy!");
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={submit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        checked={checked}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <span className="noAcc">Don't have an account ?</span>{" "}
                  <a
                    href="/auth/register"
                    className="authRef"
                    style={{ color: "white" }}
                  >
                    Register
                  </a>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
