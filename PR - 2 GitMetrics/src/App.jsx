import { useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchGitHubUser = async () => {
    if (!username) return;

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUserData(data);
      setError("");
    } catch {
      setError("GitHub user not found!");
      setUserData(null);
    }
  };

  const downloadCard = async () => {
    const card = document.querySelector(".download-card");

    card.style.display = "block";

    const canvas = await html2canvas(card, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = `${username}_github_card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    card.style.display = "none";
  };

  return (
    <div className="container">
      <h1>GitMetrics</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGitHubUser}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {userData && (
        <>
          {/* SCREEN CARD (Stylish UI) */}
          <div className="card">
            <img src={userData.avatar_url} alt="avatar" crossOrigin="anonymous" />
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.location || "Location not available"}</p>
            <p className="created">
              Joined: {new Date(userData.created_at).toLocaleDateString()}
            </p>

            <div className="stats">
              <div>
                <h3>{userData.followers}</h3>
                <p>Followers</p>
              </div>
              <div>
                <h3>{userData.following}</h3>
                <p>Following</p>
              </div>
              <div>
                <h3>{userData.public_repos}</h3>
                <p>Repos</p>
              </div>
            </div>

            <a href={userData.html_url} target="_blank" rel="noreferrer">
              <button>Visit Profile</button>
            </a>
            
          </div>

          <button className="download-btn" onClick={downloadCard}>
            Download Card
          </button>

          {/* HIDDEN DOWNLOAD CARD (Clean UI for Image) */}
          <div className="card download-card">
            <img src={userData.avatar_url} alt="avatar" crossOrigin="anonymous" />
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.location || "Location not available"}</p>
            <p className="created">
              Joined: {new Date(userData.created_at).toLocaleDateString()}
            </p>

            <div className="stats">
              <div>
                <h3>{userData.followers}</h3>
                <p>Followers</p>
              </div>
              <div>
                <h3>{userData.following}</h3>
                <p>Following</p>
              </div>
              <div>
                <h3>{userData.public_repos}</h3>
                <p>Repos</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;