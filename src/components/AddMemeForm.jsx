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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md p-4">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
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
