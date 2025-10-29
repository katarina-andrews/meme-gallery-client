import { useState } from "react";

import { api } from "../api";

export default function RegisterForm({ setAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const registerSubmitHandler = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username.length < 3 || !/^[a-zA-Z0-9]+$/.test(username)) {
      setError(
        "Username must only contain alphanumeric characters and be at least 3 characters long"
      );
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");

    api
      .post("/auth/register", {
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
        onClick={() => {
          setError("");
          setIsOpen(true);
        }}
        className="blue-btn"
      >
        Sign Up
      </button>

      {isOpen && (
        <div className="modal-div-1">
          <div className="modal-div-2">
            <div className="modal-div-3">
              <div className="modal-div-4">
                <h3 className="btn-header">Sign Up</h3>
                <button onClick={() => setIsOpen(false)} className="x-btn">
                  ×
                </button>
              </div>

              <div className="p-4">
                <form
                  onSubmit={registerSubmitHandler}
                  className="flex flex-col space-y-4"
                >
                  {error && <div className="text-red-500">{error}</div>}{" "}
                  <div>
                    <label htmlFor="username" className="label-style">
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
                    <label htmlFor="password" className="label-style">
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
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </form>
              </div>

              <div className="cancel-div">
                <button onClick={() => setIsOpen(false)} className="cancel-btn">
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
