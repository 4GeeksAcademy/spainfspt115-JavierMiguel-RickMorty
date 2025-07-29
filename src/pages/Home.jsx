import { useEffect, useState } from "react";
import { CharacterCard } from "./CharacterCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store } = useGlobalReducer();
  const [randomCharacters, setRandomCharacters] = useState([]);

  useEffect(() => {
    if (store.characters?.length >= 8) {
      const shuffledCharacters  = [...store.characters].sort(() => Math.random() - 0.5);
      setRandomCharacters(shuffledCharacters .slice(0, 8));
    }
  }, [store.characters]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-warning">Random Characters</h1>
      <div className="row">
        {randomCharacters.map((character) => (
          <div key={character.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  );
};
