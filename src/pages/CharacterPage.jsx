import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterPage = () => {
  const { characterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const found = store.characters.find(
      (char) => String(char.id) === String(characterId)
    );

    if (found) {
      setCharacter(found);
    } else if (location.state?.character) {
      setCharacter(location.state.character);
    } else {
      navigate("/", { replace: true });
    }
  }, [characterId, store.characters, location.state, navigate]);

  if (!character) return null;

  const isLiked = store.favorites.some((favorite) => favorite.id === character.id);

  const handleLike = () => {
    dispatch({ type: "toggle_favorite", payload: character });
  };

  const getStatusColor = (status) => {
    if (status === "Alive") return "status-green";
    if (status === "Dead") return "status-red";
    return "status-orange";
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-warning">Character Info</h1>

      <div className="card bg-dark text-light border-info shadow-sm p-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid rounded border border-info"
            />
          </div>

          <div className="col-md-8">
            <h3 className="mb-3">{character.name}</h3>
            <div className="d-flex align-items-center mb-3">
              <span
                className={`status-dot me-2 ${getStatusColor(character.status)}`}
              ></span>
              <span className="fs-6 text-capitalize">{character.status}</span>
            </div>

            <p className="mb-2">
              <strong className="text-success">Species:</strong>{" "}
              {character.species || "Unknown"}
            </p>
            <p className="mb-2">
              <strong className="text-success">Origin:</strong>{" "}
              {character.origin?.name || "Unknown"}
            </p>
            <p className="mb-2">
              <strong className="text-success">Current location:</strong>{" "}
              {character.location?.name || "Unknown"}
            </p>
            <p className="mb-2">
              <strong className="text-success">Episodes:</strong>{" "}
              {character.episode?.length || 0}
            </p>

            <button className="btn btn-outline-success mt-3" onClick={handleLike}>
              {isLiked ? "❤️ Liked" : "🤍 Like"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
