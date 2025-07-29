import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchCharactersByIds } from "../services/ApiService";
import { CharacterCard } from "./CharacterCard";

export const Episodes = () => {
  const { store } = useGlobalReducer();
  const { seasonCode } = useParams();

  const [expandedEpisodes, setExpandedEpisodes] = useState({});
  const [episodeCharacters, setEpisodeCharacters] = useState({});
  const [loadingEpisodes, setLoadingEpisodes] = useState({});

  const episodes = store.episodes
    .filter((episode) => episode.episode.startsWith(seasonCode))
    .sort((firstEpi, secondEpi) => firstEpi.episode.localeCompare(secondEpi.episode));

  const toggleEpisode = async (episode) => {
    setExpandedEpisodes((prev) => ({
      ...prev,
      [episode.id]: !prev[episode.id],
    }));

    const shouldExpand = !expandedEpisodes[episode.id];

    if (shouldExpand && !episodeCharacters[episode.id]) {
      setLoadingEpisodes((prev) => ({ ...prev, [episode.id]: true }));

      const charIds = episode.characters.map((url) => url.split("/").pop());
      const chars = await fetchCharactersByIds(charIds);

      setEpisodeCharacters((prev) => ({ ...prev, [episode.id]: chars }));
      setLoadingEpisodes((prev) => ({ ...prev, [episode.id]: false }));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-warning">
        Season {parseInt(seasonCode.slice(1))} – Episodes
      </h1>

      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="card bg-dark text-light border-info mb-3 shadow-sm"
        >
          <div
            className="card-body"
            style={{ cursor: "pointer" }}
            onClick={() => toggleEpisode(episode)}
          >
            <h5 className="card-title">
              {episode.name} <small>({episode.episode})</small>
            </h5>
            <p className="card-text">{episode.air_date}</p>
            <small>
              {expandedEpisodes[episode.id]
                ? "▼ Hide Characters"
                : "▶ Show Characters"}
            </small>
          </div>

          {expandedEpisodes[episode.id] && (
            <div className="card-body bg-secondary">
              {loadingEpisodes[episode.id] ? (
                <p className="text-light">Loading characters...</p>
              ) : (
                <div className="row">
                  {episodeCharacters[episode.id]?.map((char) => (
                    <div
                      className="col-6 col-md-4 col-lg-3 mb-3"
                      key={char.id}
                    >
                      <CharacterCard character={char} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
