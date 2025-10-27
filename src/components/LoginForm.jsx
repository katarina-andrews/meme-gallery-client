import { useState } from "react";
import { api } from "../api";

export default function LoginForm({ setAuth }) {
  const [isOpen, setIsOpen] = useState(false);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    api
      .post("/auth/login", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        console.log(response);
        setAuth(response.data);
        localStorage.setItem("auth", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="blue-btn"
      >
        Login
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md p-4">
            <div className="relative bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Login</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="x-btn"
                >
                  ×
                </button>
              </div>

              <div className="p-4">
                <form
                  onSubmit={loginSubmitHandler}
                  className="flex flex-col space-y-4"
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="label-style"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      required
                      className="input-style"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="label-style"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="input-style"
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="cancel-div">
                <button
                  onClick={() => setIsOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
