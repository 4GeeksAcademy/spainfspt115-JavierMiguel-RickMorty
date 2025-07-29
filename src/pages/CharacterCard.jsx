import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import "../index.css";

export const CharacterCard = ({ character }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favorites.some((favorite) => favorite.id === character.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    dispatch({ type: "toggle_favorite", payload: character });
  };

  const getStatusColor = (status) => {
    return status === "Alive"
      ? "status-green"
      : status === "Dead"
        ? "status-red"
        : "status-orange";
  };

  return (
    <div className="card bg-dark text-light border-info position-relative shadow-sm h-100">
      <Link to={`/character/${character.id}`} state={{ character }}>
        <img
          src={character.image}
          className="card-img-top"
          alt={character.name}
        />
      </Link>

      <div className="card-body">
        <h5 className="card-title mb-2 d-flex justify-content-between align-items-center">
          {character.name}
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={toggleFavorite}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </h5>

        <div className="d-flex align-items-center mb-2">
          <span className={`status-dot ${getStatusColor(character.status)}`} />
          <small className="ms-2 text-capitalize">{character.status}</small>
        </div>

        <p className="card-text mb-0">
          <small>📍 {character.location?.name || "Unknown Location"}</small>
        </p>
      </div>

      <div className="position-absolute bottom-0 end-0 m-2">
        <span className="badge bg-secondary">
          {character.episode?.length || 0} eps
        </span>
      </div>
    </div>
  );
};
