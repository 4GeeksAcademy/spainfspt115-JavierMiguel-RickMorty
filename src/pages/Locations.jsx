import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const dummyLocations = Array.from({ length: 5 }).map((_, index) => ({
      id: index + 1,
      name: `Location ${i + 1}`,
      type: index % 2 === 0 ? "Planet" : "Citadel",
      dimension: ["C-137", "J-19 Zeta", "Replacement Dimension"][index % 3],
      residents: new Array((index + 1) * 3).fill(null).map((_, idx2) => `Resident ${idx2 + 1}`),
    }));

    setLocations(dummyLocations);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-warning">Locations</h1>
      <div className="row">
        {locations.map((location) => (
          <div key={location.id} className="col-md-6 col-lg-4 mb-3">
            <Link to={`/location/${location.id}`} className="text-decoration-none">
              <div className="card bg-dark text-light border-info shadow-sm p-3 h-100">
                <h5 className="card-title">{location.name}</h5>
                <p className="card-text"><strong>Type:</strong> {location.type}</p>
                <p className="card-text"><strong>Dimension:</strong> {location.dimension}</p>
                <p className="card-text"><strong>Residents:</strong> {location.residents.length}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
