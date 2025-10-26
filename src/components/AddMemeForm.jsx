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
        className="rounded-md bg-gray-950/5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
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
                  className="text-gray-400 hover:text-gray-900 text-2xl font-bold"
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
                      className="block text-sm font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-900"
                    >
                      URL
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      required
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 text-sm"
                  >
                    Add Meme
                  </button>
                </form>
              </div>

              <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200"
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
