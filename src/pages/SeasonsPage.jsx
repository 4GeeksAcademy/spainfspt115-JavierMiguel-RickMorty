import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SeasonsPage = () => {
  const { store } = useGlobalReducer();

  const episodesBySeason = store.episodes.reduce((acum, episode) => {
    const seasonCode = episode.episode.slice(0, 3); // "S01", "S02", etc.
    if (!acum[seasonCode]) acum[seasonCode] = [];
    acum[seasonCode].push(episode);
    return acum;
  }, {});

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-warning">Seasons</h1>
      <div className="row">
        {Object.entries(episodesBySeason).map(([seasonCode, episodes]) => (
          <div key={seasonCode} className="col-md-6 col-lg-4 mb-3">
            <div className="card bg-dark text-light border-info shadow-sm p-3 h-100">
              <h5 className="card-title text-info">
                Season {parseInt(seasonCode.slice(1))}
              </h5>
              <p className="card-text">{episodes.length} episodes</p>
              <Link
                to={`/seasons/${seasonCode}/episodes`}
                className="btn btn-outline-info mt-auto"
              >
                View Episodes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
