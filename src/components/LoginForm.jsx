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
      <button onClick={() => setIsOpen(true)} className="blue-btn">
        Login
      </button>

      {isOpen && (
        <div className="modal-div-1">
          <div className="modal-div-2">
            <div className="modal-div-3">
              <div className="modal-div-4">
                <h3 className="btn-header">Login</h3>
                <button onClick={() => setIsOpen(false)} className="x-btn">
                  ×
                </button>
              </div>

              <div className="p-4">
                <form
                  onSubmit={loginSubmitHandler}
                  className="flex flex-col space-y-4"
                >
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
