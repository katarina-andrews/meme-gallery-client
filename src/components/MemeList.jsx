import { useEffect, useState } from "react";
import { api } from "../api";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";

export default function MemeList({ memes, setMemes, auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editMeme, setEditMeme] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/memes")
      .then(function (response) {
        // handle success
        console.log(response);
        setMemes(response.data);
        setError("");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setError(
          error.response?.data?.message ||
            (error.response?.status === 429
              ? "Too many requests. Please try again later."
              : "An unexpected error occurred")
        );
      });
  }, []);

  const handleDeleteMeme = async (memeId) => {
    api
      .delete(`/memes/${memeId}`, {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        setMemes((oldMemes) => {
          return oldMemes.filter((meme) => {
            return meme.id != memeId;
          });
        });
      });
  };

  const handleUpdateMeme = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const url = event.target.url.value;

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    if (title.length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }

    setError("");

    api
      .put(
        `/memes/${editMeme.id}`,
        { title, url },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setMemes((oldMemes) =>
          oldMemes.map((meme) =>
            meme.id === editMeme.id ? response.data : meme
          )
        );
        setIsOpen(false);
      });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <div className="list-div-1">
        {memes.map((meme) => {
          return (
            <div key={meme.id} className="list-div-2">
              <img
                src={meme.url}
                alt={meme.title}
                loading="lazy"
                className="w-full rounded-xl transition-transform duration-300 hover:scale-105"
              />
              <div className="list-div-3">
                <h3 className="text-center w-full max-w-[216px] mb-2 px-2 wrap-break-words">
                  {meme.title}
                </h3>
                <div className="flex gap-3">
                  {auth && auth.id === meme.userId && (
                    <button
                      onClick={() => handleDeleteMeme(meme.id)}
                      title="Delete meme"
                      className="cursor-pointer"
                    >
                      <MdDeleteForever />
                    </button>
                  )}
                  {auth && auth.id === meme.userId && (
                    <button
                      onClick={() => {
                        setError("");
                        setEditMeme(meme);
                        setIsOpen(true);
                      }}
                      title="Update meme"
                      className="cursor-pointer"
                    >
                      <MdEditDocument />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isOpen && editMeme && (
          <div className="modal-div-1">
            <div className="modal-div-2">
              <div className="modal-div-3">
                <div className="modal-div-4">
                  <h3 className="btn-header">Update Meme</h3>
                  <button onClick={() => setIsOpen(false)} className="x-btn">
                    ×
                  </button>
                </div>

                <div className="p-4">
                  <form
                    onSubmit={handleUpdateMeme}
                    className="flex flex-col space-y-4"
                  >
                    {error && <div className="text-red-500">{error}</div>}
                    <div></div>
                    <div>
                      <label htmlFor="title" className="label-style">
                        Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        required
                        defaultValue={editMeme.title}
                        className="input-style"
                      />
                    </div>

                    <div>
                      <label htmlFor="url" className="label-style">
                        URL
                      </label>
                      <input
                        id="url"
                        name="url"
                        required
                        defaultValue={editMeme.url}
                        className="input-style"
                      />
                    </div>

                    <button type="submit" className="submit-btn">
                      Save Changes
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
      </div>
    </section>
  );
}
