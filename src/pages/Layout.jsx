import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import {
    fetchEpisodesPage,
    fetchLocationsPage,
    fetchCharactersPage
} from "../services/ApiService"

import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

    const { store, dispatch } = useGlobalReducer();


    const loadData = async () => {
        const charactersData = await fetchCharactersPage();
        if (charactersData?.results?.length) {
            dispatch({ type: "set_characters", payload: charactersData.results });
        } else {
            console.log("Failed to load characters");
        }

        const episodesData = await fetchEpisodesPage();
        if (episodesData?.results?.length) {
            dispatch({ type: "set_episodes", payload: episodesData.results });
        } else {
            console.log("Failed to load episodes");
        }

        const locationsData = await fetchLocationsPage();
        if (locationsData?.results?.length) {
            dispatch({ type: "set_locations", payload: locationsData.results });
        } else {
            console.log("Failed to load locations");
        }
    };

    useEffect(() => {
        loadData();
    }, [dispatch]);



    return (
        <ScrollToTop>
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}