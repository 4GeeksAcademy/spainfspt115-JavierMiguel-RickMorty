import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ backgroundColor: "#001f1f" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand text-warning fw-bold">
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
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/episodes" className="nav-link text-info">
                Episodes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/locations" className="nav-link text-primary">
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
              className={`dropdown-menu dropdown-menu-end bg-dark text-light mt-2 ${openDropdown ? "show" : ""
                }`}
              aria-labelledby="favoritesDropdown"
            >
              <li className="dropdown-item text-light">
                There are no favorites yet
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
