import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";

export const LocationPage = () => {
    const { locationId } = useParams();
    const [location, setLocation] = useState(null);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const dummyLocation = {
            id: parseInt(locationId),
            name: `Location ${locationId}`,
            type: locationId % 2 === 0 ? "Planet" : "Space Station",
            dimension: ["C-137", "J-19 Zeta", "Replacement Dimension", "Unknown"][locationId % 4],
            created: new Date(2020, locationId - 1, 10).toISOString(),
            residents: Array.from({ length: locationId * 2 }).map(
                (_, j) => `https://rickandmortyapi.com/api/character/${j + 1}`
            ),
        };

        setLocation(dummyLocation);

        const dummyResidents = dummyLocation.residents.map((url) => {
            const id = url.split("/").pop();
            return {
                id,
                name: `Character ${id}`,
                status: ["Alive", "Dead", "unknown"][id % 3],
                location: { name: "Random Planet" },
                episode: new Array((id % 5) + 1).fill("episode"),
                image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
            };
        });

        setResidents(dummyResidents);
    }, [locationId]);

    if (!location) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-3 text-warning">{location.name}</h1>
            <div className="card bg-dark text-light border-info shadow-sm p-3 mb-4">
                <p><strong>Type:</strong> {location.type}</p>
                <p><strong>Dimension:</strong> {location.dimension}</p>
                <p><strong>Created:</strong> {new Date(location.created).toLocaleDateString()}</p>
                <p><strong>Residents:</strong> {residents.length}</p>
            </div>

            <h4 className="mb-3 text-info">Residents</h4>
            <div className="row">
                {residents.map((char) => (
                    <div key={char.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                        <CharacterCard character={char} />
                    </div>
                ))}
            </div>
        </div>
    );
};
