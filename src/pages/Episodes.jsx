import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Episodes = () => {
    const [episodesBySeason, setEpisodesBySeason] = useState({});

    useEffect(() => {

        const dummyEpisodes = Array.from({ length: 31 }).map((_, index) => {
            const season = index < 11 ? "S01" : index < 21 ? "S02" : "S03";
            const number = (index % 10) + 1;
            return {
                id: index + 1,
                name: `Episode ${index + 1}`,
                episode: `${season}E${number.toString().padStart(2, "0")}`,
            };
        });

        const grouped = dummyEpisodes.reduce((ssList, epi) => {
            const seasonCode = epi.episode.slice(0, 3); // "S01"
            if (!ssList[seasonCode]) ssList[seasonCode] = [];
            ssList[seasonCode].push(epi);
            return ssList;
        }, {});

        setEpisodesBySeason(grouped);
    }, []);

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
                            <Link to={`/season/${seasonCode}`} className="btn btn-outline-info mt-auto">
                                View Episodes
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
