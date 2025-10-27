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
  const masonRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    masonRef.current = new Masonry(gridRef.current, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-item",
      percentPosition: true,
      gutter: 10,
    });

    imagesLoaded(gridRef.current, () => {
      masonRef.current.layout();
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
          <div key={meme.id} className="grid-item m-3 relative overflow-hidden">
            <img
              src={meme.url}
              alt={meme.title}
              loading="lazy"
              className="w-54 transition-transform duration-300 hover:scale-105"
            />
            <div className="img-hover-style">
              <h3 className="text-center w-full max-w-[216px] mb-2">
                {meme.title}
              </h3>
              <div className="flex gap-2">
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
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="btn-header">Update Meme</h3>
                <button onClick={() => setIsOpen(false)} className="x-btn">
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
                <button onClick={() => setIsOpen(false)} className="cancel-btn">
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
