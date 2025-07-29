import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { id } = useParams();
  const { store } = useGlobalReducer();
  const favorites = store.favorites || [];
  const navigate = useNavigate();

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [id, store.characters]);

  const closeNavbarCollapse = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
    setOpenDropdown(false);
  };

  const handleFavoriteClick = (character) => {
    navigate(`/character/${character.id}`, { state: { character: character } });
    closeNavbarCollapse();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#001f1f" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand text-warning fw-bold" onClick={closeNavbarCollapse}>
          Rick & Morty Wiki
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenDropdown(false)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/seasons" className="nav-link text-info" onClick={closeNavbarCollapse}>
                Seasons
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/locations" className="nav-link text-primary" onClick={closeNavbarCollapse}>
                Locations
              </Link>
            </li>
          </ul>

          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn btn-outline-success dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={openDropdown}
              aria-haspopup="true"
              id="favoritesDropdown"
            >
              ❤️ Favorites
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end bg-dark text-light mt-2 ${openDropdown ? "show" : ""}`}
              aria-labelledby="favoritesDropdown"
            >
              {favorites.length === 0 ? (
                <li className="dropdown-item text-light">
                  There are no favorites yet
                </li>
              ) : (
                favorites.map((character) => (
                  <li
                    key={character.id}
                    className="dropdown-item text-light"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFavoriteClick(character)}
                  >
                    {character.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
