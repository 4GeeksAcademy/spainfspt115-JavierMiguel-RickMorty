import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CharacterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const character = location.state?.character;

  if (!character) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-warning">Character Info</h1>

      <div className="card bg-dark text-light border-info shadow-sm p-4">
        <div className="card-body">
          <p className="mb-2"><strong className="text-success">Name:</strong> {character.name}</p>
          <p className="mb-2"><strong className="text-success">Status:</strong> {character.status}</p>
          <p className="mb-2"><strong className="text-success">Species:</strong> [Especie]</p>
          <p className="mb-2"><strong className="text-success">Origin:</strong> {character.location.name}</p>
          <p className="mb-2"><strong className="text-success">Current location:</strong> {character.location.name}</p>
          <p className="mb-2"><strong className="text-success">Episodes:</strong> {character.episode.length}</p>

          <button className="btn btn-outline-success mt-3">❤️ Like</button>
        </div>
      </div>
    </div>
  );
};
