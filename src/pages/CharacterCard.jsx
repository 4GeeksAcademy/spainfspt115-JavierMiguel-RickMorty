import { Link } from "react-router-dom";
import "../index.css";

export const CharacterCard = ({ character }) => {
  const getStatusColor = (status) => {
    if (status === "Alive") return "status-green";
    if (status === "Dead") return "status-red";
    return "status-orange";
  };

  return (
    <div className="card bg-dark text-light border-info position-relative shadow-sm h-100">
      <img src={character.image} className="card-img-top" alt={character.name} />
      <div className="card-body">
        <h5 className="card-title mb-2">{character.name}</h5>
        <div className="d-flex align-items-center mb-2">
          <span className={`status-dot ${getStatusColor(character.status)}`}></span>
          <small className="ms-2 text-capitalize">{character.status}</small>
        </div>
        <p className="card-text mb-0">
          <small>📍 {character.location.name || "Unknown Location !!"}</small>
        </p>
      </div>

      <div className="position-absolute bottom-0 end-0 m-2">
        <span className="badge bg-secondary">{character.episode.length} eps</span>
      </div>
      
      <Link
        to={`/character/${character.id}`}
        state={{ character }}
        className="stretched-link"
      ></Link>
    </div>
  );
};
