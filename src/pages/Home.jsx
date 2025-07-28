import { useEffect, useState } from "react";
import { CharacterCard } from "./CharacterCard";

export const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const dummyCharacters = Array.from({ length: 8 }).map((_, index) => ({
      id: index + 1,
      name: `Personaje ${index + 1}`,
      status: ["Alive", "Dead", "unknown"][index % 3],
      location: { name: `Planeta ${index + 1}` },
      episode: new Array((index % 5) + 1).fill("episode"),
      image: `https://rickandmortyapi.com/api/character/avatar/${(index % 671) + 1}.jpeg`,
    }));

    setCharacters(dummyCharacters);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-warning">Random Characters</h1>
      <div className="row">
        {characters.map((character) => (
          <div key={character.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  );
};
