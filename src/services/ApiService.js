const BASE_URL = "https://rickandmortyapi.com/api";

const fetchAndValidate = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`${errorMessage}: ${url}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`${errorMessage}: ${error.message}`);
    return null;
  }
};

export const fetchAllCharacters = async () => {
  let allCharacters = [];
  let url = `${BASE_URL}/character`;

  while (url) {
    const data = await fetchAndValidate(url, "Failed to fetch characters");
    if (!data) break;
    allCharacters = [...allCharacters, ...data.results];
    url = data.info.next;
  }

  return allCharacters;
};

export const fetchCharactersPage = async () => {
  const firstPage = await fetchAndValidate(`${BASE_URL}/character`, "Failed to fetch first character page");
  if (!firstPage) return null;

  const totalPages = firstPage.info.pages;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  const randomPageUrl = `${BASE_URL}/character?page=${randomPage}`;

  return await fetchAndValidate(randomPageUrl, `Failed to fetch characters page ${randomPage}`);
};

export const fetchCharactersByIds = async (ids = []) => {
  if (!ids.length) return [];

  const idString = Array.isArray(ids) ? ids.join(",") : ids;
  const data = await fetchAndValidate(`${BASE_URL}/character/${idString}`, `Failed to fetch characters with ids ${idString}`);

  if (!data) return [];
  return Array.isArray(data) ? data : [data]; // Normalize to array
};

export const fetchCharacterById = async (id) => {
  return await fetchAndValidate(`${BASE_URL}/character/${id}`, `Failed to fetch character with id ${id}`);
};

export const fetchAllEpisodes = async () => {
  let allEpisodes = [];
  let url = `${BASE_URL}/episode`;

  while (url) {
    const data = await fetchAndValidate(url, "Failed to fetch episodes");
    if (!data) break;
    allEpisodes = [...allEpisodes, ...data.results];
    url = data.info.next;
  }

  return allEpisodes;
};

export const fetchEpisodesPage = async (page = 1) => {
  const url = `${BASE_URL}/episode?page=${page}`;
  return await fetchAndValidate(url, `Failed to fetch episodes page ${page}`);
};

export const fetchEpisodeById = async (id) => {
  return await fetchAndValidate(`${BASE_URL}/episode/${id}`, `Failed to fetch episode with id ${id}`);
};

export const fetchAllLocations = async () => {
  let allLocations = [];
  let url = `${BASE_URL}/location`;

  while (url) {
    const data = await fetchAndValidate(url, "Failed to fetch locations");
    if (!data) break;
    allLocations = [...allLocations, ...data.results];
    url = data.info.next;
  }

  return allLocations;
};

export const fetchLocationsPage = async (page = 1) => {
  const url = `${BASE_URL}/location?page=${page}`;
  return await fetchAndValidate(url, `Failed to fetch locations page ${page}`);
};

export const fetchLocationById = async (id) => {
  return await fetchAndValidate(`${BASE_URL}/location/${id}`, `Failed to fetch location with id ${id}`);
};
