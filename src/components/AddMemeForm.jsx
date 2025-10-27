import { useState } from "react";
import { api } from "../api";

export default function AddMemeForm({ setMemes, auth }) {
  const [isOpen, setIsOpen] = useState(false);

  const addMemeFormHandler = async (event) => {
    event.preventDefault();

    api
      .post(
        "/memes",
        {
          title: event.target.title.value,
          url: event.target.url.value,
        },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);

        setMemes((oldMemes) => [...oldMemes, response.data]);
        setIsOpen(false);
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
        Add a Meme
      </button>

      {isOpen && (
        <div className="modal-div-1">
          <div className="modal-div-2">
            <div className="modal-div-3">
              <div className="modal-div-4">
                <h3 className="btn-header">
                  Add a Meme
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="x-btn"
                >
                  ×
                </button>
              </div>

              <div className="p-4">
                <form
                  onSubmit={addMemeFormHandler}
                  className="flex flex-col space-y-4"
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="label-style"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="input-style"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="url"
                      className="label-style"
                    >
                      URL
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      required
                      className="input-style"
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Add Meme
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
