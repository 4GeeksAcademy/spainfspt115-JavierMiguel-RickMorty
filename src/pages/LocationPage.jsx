import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchCharactersByIds } from "../services/ApiService";

export const LocationPage = () => {
  const { locationId } = useParams();
  const { store } = useGlobalReducer();
  const [residents, setResidents] = useState([]);
  const [residentIds, setResidentIds] = useState([]);

  const location = store.locations.find(location => location.id === parseInt(locationId));

  useEffect(() => {
    if (!location) return;

    const ids = location.residents.map(url => url.split('/').pop());

    if (ids.join(',') !== residentIds.join(',')) {
      setResidentIds(ids);
    }
  }, [location, residentIds]);

  useEffect(() => {
    if (!residentIds.length) return;

    fetchCharactersByIds(residentIds).then(characters => setResidents(characters));
  }, [residentIds]);

  if (!location)
    return (
      <div className="container mt-4">
        <p className="text-warning">Loading location data...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-warning">{location.name}</h1>
      <div className="card bg-dark text-light border-info shadow-sm p-3 mb-4">
        <p><strong>Type:</strong> {location.type}</p>
        <p><strong>Dimension:</strong> {location.dimension}</p>
        <p><strong>Created:</strong> {location.created ? new Date(location.created).toLocaleDateString() : "Unknown"}</p>
        <p><strong>Residents:</strong> {residents.length}</p>
      </div>

      <h4 className="mb-3 text-info">Residents</h4>
      <div className="row">
        {residents.map(character => (
          <div key={character.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  );
};
