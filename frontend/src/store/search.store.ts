import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
    const results = ref([]);
    const selectedResult = ref(null);
    const loading = ref(false);
    const movies = ref([]);
    const movieDetails = ref(null)
    const searchType = ref("people");
    const performSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            results.value = [];
            return;
        }

        loading.value = true;

        try {
            const endpoint =
                searchType.value === "people" ? "https://swapi.dev/api/people/" : "https://swapi.dev/api/films/";

            const response = await axios.get(endpoint, {
                params: { search: searchTerm },
            });

            results.value = response.data.results;
        } catch (error) {
            console.error("Error fetching data:", error);
            results.value = [];
        } finally {
            loading.value = false;
        }
    };


    const clearResults = () => {
        results.value = [];
        loading.value = false;
    };



    const fetchMovieDetails = async (id) => {
        try {
            const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
            movieDetails.value = response.data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            movieDetails.value = null;
        }
    };

  
    return {
        movies,
        results,
        movieDetails,
        searchType,
        fetchMovieDetails,
        loading,
        selectedResult,
        performSearch,
        clearResults,
    };
});
