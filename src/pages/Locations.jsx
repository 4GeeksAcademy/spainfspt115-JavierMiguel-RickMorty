import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Locations = () => {
  const { store } = useGlobalReducer();
  const locations = store.locations || [];

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-warning">Locations</h1>
      <div className="row">
        {locations.length === 0 && (
          <p className="text-light">No locations available.</p>
        )}
        {locations.map((location) => (
          <div key={location.id} className="col-md-6 col-lg-4 mb-3">
            <Link to={`/location/${location.id}`} className="text-decoration-none">
              <div className="card bg-dark text-light border-info shadow-sm p-3 h-100">
                <h5 className="card-title">{location.name}</h5>
                <p className="card-text"><strong>Type:</strong> {location.type}</p>
                <p className="card-text"><strong>Dimension:</strong> {location.dimension}</p>
                <p className="card-text"><strong>Residents:</strong> {location.residents?.length || 0}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
