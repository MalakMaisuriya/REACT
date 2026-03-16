import React, { useState, useRef } from "react";
import postImg from "../assets/image/post.jpeg";
import profileImg from "../assets/image/profileph.jpeg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Page() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(100);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const inputRef = useRef();

  const toggleLike = () => {
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
    setLiked(!liked);
  };

  const addComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: Date.now(),
      text: comment,
    };

    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <div className="container-fluid bg-black text-white min-vh-100">
      <div className="row justify-content-center">

        <div className="col-lg-3 d-none d-lg-block border-end border-secondary bg-black">
          <div className="p-4">
            <h4 className="fw-bold mb-4">Instagram</h4>
            <a href="https://www.instagram.com/malaking_07/" target="_blank" className="text-white text-decoration-none d-block mb-3">
              <i className="bi bi-house fs-5 me-2"></i> Home
            </a>
            <a href="https://www.instagram.com/malaking_07/" target="_blank" className="text-white text-decoration-none d-block mb-3">
              <i className="bi bi-search fs-5 me-2"></i> Search
            </a>
            <a href="https://www.instagram.com/malaking_07/" target="_blank" className="text-white text-decoration-none d-block mb-3">
              <i className="bi bi-play-circle fs-5 me-2"></i> Reels
            </a>
            <a href="https://www.instagram.com/malaking_07/" target="_blank" className="text-white text-decoration-none d-block mb-3">
              <i className="bi bi-chat fs-5 me-2"></i> Messages
            </a>
            <a href="https://www.instagram.com/malaking_07/" target="_blank" className="text-white text-decoration-none d-block">
              <i className="bi bi-heart fs-5 me-2"></i> Notifications
            </a>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-5 py-4">
          <div className="card shadow border-secondary bg-dark text-white">
            <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginRight: "10px",
                  }}
                >
                  <img
                    src={profileImg}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <strong>malaking_07</strong>
              </div>
              <i className="bi bi-three-dots fs-5"></i>
            </div>

            <img
              src={postImg}
              alt=""
              onDoubleClick={toggleLike}
              style={{
                width: "100%",
                maxHeight: "650px",
                objectFit: "cover",
              }}
            />

            <div className="p-3">
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <i
                    className={`bi ${liked ? "bi-heart-fill text-danger" : "bi-heart"} fs-4 me-3`}
                    style={{ cursor: "pointer" }}
                    onClick={toggleLike}
                  ></i>
                  <i
                    className="bi bi-chat fs-4 me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.focus()}
                  ></i>
                  <i className="bi bi-send fs-4"></i>
                </div>
                <i
                  className={`bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"} fs-4`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSaved(!saved)}
                ></i>
              </div>

              <strong>{likes.toLocaleString()} likes</strong>

              <div className="mt-1">
                <strong>malaking_07</strong> ꜱᴏᴍᴇ ᴛʀɪᴘꜱ ʜɪᴛ ᴅɪꜰꜰᴇʀᴇɴᴛ — ɴᴏ ᴏᴠᴇʀᴛʜɪɴᴋɪɴɢ, ɴᴏ ᴘʟᴀɴ, ᴊᴜꜱᴛ ᴀ ᴠɪʙᴇ. 🌄✨
              </div>

              <div className="mt-2">
                {comments.map((c) => (
                  <div key={c.id} className="d-flex justify-content-between">
                    <div>
                      <strong>user</strong> {c.text}
                    </div>
                    <i
                      className="bi bi-trash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setComments(comments.filter((x) => x.id !== c.id))
                      }
                    ></i>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-top border-secondary d-flex">
              <input
                ref={inputRef}
                type="text"
                className="form-control bg-dark text-white border-0"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
              />
              <button
                className="btn text-primary fw-bold"
                onClick={addComment}
              >
                Send
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Page;