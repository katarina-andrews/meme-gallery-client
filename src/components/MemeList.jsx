import { useEffect, useState, useRef } from "react";
import { api } from "../api";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { MdDeleteForever, MdEditDocument } from "react-icons/md";


export default function MemeList({ memes, setMemes, auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editMeme, setEditMeme] = useState(null);

  useEffect(() => {
    api
      .get("/memes")
      .then(function (response) {
        // handle success
        console.log(response);
        setMemes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const gridRef = useRef(null);
  const msnryRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    msnryRef.current = new Masonry(gridRef.current, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-item",
      percentPosition: true,
      gutter: 10,
    });

    imagesLoaded(gridRef.current, () => {
      msnryRef.current.layout();
    });

  }, [memes]);

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

  const handleUpdateMeme = async (memeId, title, url) => {
    api
      .put(
        `/memes/${memeId}`,
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
          oldMemes.map((meme) => (meme.id === memeId ? response.data : meme))
        );
      });
  };

  return (
    <section className="grid" ref={gridRef}>
      {memes.map((meme) => {
        return (
          <div
            key={meme.id}
            className="grid-item m-3 relative overflow-hidden cursor-pointer"
          >
            <img
              src={meme.url}
              alt={meme.title}
              loading="lazy"
              className="w-54 transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm text-white">
              <h3 className="text-center break-words w-full max-w-[216px] mb-2">{meme.title}</h3>
              <div className="flex gap-2">
                {auth && auth.id === meme.userId && (
                  <button
                    onClick={() => handleDeleteMeme(meme.id)}
                    title="Delete meme"
                    className="cursor-pointer p-2 rounded hover:bg-opacity-50"
                  >
                    <MdDeleteForever />
                  </button>
                )}
                {auth && auth.id === meme.userId && (
                  <button
                    onClick={() => {
                      setEditMeme(meme);
                      setIsOpen(true);
                    }}
                    title="Update meme"
                    className="cursor-pointer p-2 rounded hover:bg-opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md p-4">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Meme
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
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleUpdateMeme(
                      editMeme.id,
                      event.target.title.value,
                      event.target.url.value
                    );
                    setIsOpen(false);
                  }}
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
                      id="title"
                      name="title"
                      defaultValue={editMeme.title}
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
                      id="url"
                      name="url"
                      defaultValue={editMeme.url}
                      className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 text-sm"
                  >
                    Save Changes
                  </button>
                </form>
              </div>

              <div className="flex justify-end p-4 border-t border-gray-200">
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
    </section>
  );
}
