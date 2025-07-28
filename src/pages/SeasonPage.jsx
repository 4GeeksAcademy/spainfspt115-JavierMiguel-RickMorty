import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";

const getDummyEpisodes = () => {
    const dummy = Array.from({ length: 31 }).map((_, index) => {
        const season = index < 11 ? "S01" : index < 21 ? "S02" : "S03";
        const number = (index % 10) + 1;
        return {
            id: index + 1,
            name: `Episode ${index + 1}`,
            air_date: `2023-${(index % 12) + 1}-15`,
            episode: `${season}E${number.toString().padStart(2, "0")}`,
            characters: Array.from({ length: 4 }).map((__, i) =>
                `https://rickandmortyapi.com/api/character/${(index * 4 + i + 1) % 671}`
            ),
        };
    });
    return dummy;
};

const getDummyCharacterById = async (id) => {
    return {
        id,
        name: `Character ${id}`,
        status: ["Alive", "Dead", "unknown"][id % 3],
        location: { name: `Planet ${id}` },
        episode: new Array((id % 5) + 1).fill("episode"),
        image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    };
};

export const SeasonPage = () => {
    const { seasonCode } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [openEpisode, setOpenEpisode] = useState(null);

    useEffect(() => {
        async function load() {
            const allEpisodes = getDummyEpisodes();
            const filtered = allEpisodes.filter((ep) =>
                ep.episode.startsWith(seasonCode)
            );
            setEpisodes(filtered);
        }
        load();
    }, [seasonCode]);

    return (
        <div className="container mt-4">
            <h1 className="text-warning mb-3">
                Season {parseInt(seasonCode.slice(1))}
            </h1>
            <div className="accordion" id="episodesAccordion">
                {episodes.map((ep) => (
                    <div className="accordion-item bg-dark text-light mb-2" key={ep.id}>
                        <h2 className="accordion-header" id={`heading${ep.id}`}>
                            <button
                                className="accordion-button bg-secondary text-light collapsed"
                                type="button"
                                onClick={() =>
                                    setOpenEpisode(openEpisode === ep.id ? null : ep.id)
                                }
                            >
                                {ep.episode} – {ep.name} ({ep.air_date})
                            </button>
                        </h2>
                        <div
                            className={`accordion-collapse collapse ${openEpisode === ep.id ? "show" : ""
                                }`}
                        >
                            <div className="accordion-body bg-dark">
                                <h6>Characters:</h6>
                                <div className="row">
                                    {ep.characters.map((charUrl, idx) => (
                                        <EpisodeCharacterLoader url={charUrl} key={idx} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EpisodeCharacterLoader = ({ url }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function loadChar() {
            const id = url.split("/").pop();
            const data = await getDummyCharacterById(id);
            setCharacter(data);
        }
        loadChar();
    }, [url]);

    return (
        <div className="col-6 col-md-4 col-lg-3 mb-3">
            {character && <CharacterCard character={character} />}
        </div>
    );
};
