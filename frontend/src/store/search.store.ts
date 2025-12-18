import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { moviesService } from "../services/movies.service";
import { peopleService } from "../services/people.service";

export const useSearchStore = defineStore("search", () => {
    const results = ref([]);
    const personDetails = ref(null);
    const loading = ref(false);
    const movies = ref([]);
    const movieDetails = ref(null)
    const searchType = ref("people");

    watch(() => searchType.value, () => {
        results.value = [];
    })

    const performSearch = async (searchTerm: string) => {
        loading.value = true;
        try {
            if (searchType.value === "movies") {
                const data = await moviesService.fetchAllMovies(searchTerm);
                console.log(data);
                results.value = data.results || [];
            } else {
                const data = await peopleService.fetchAllPeople(searchTerm);
                results.value = data.results || [];
            }
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


    const fetchMovieDetails = async (id: number) => {
        loading.value = true
        try {
            movieDetails.value  = await moviesService.fetchMovieById(id);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            movieDetails.value = null;
        } finally {
            loading.value = false;
        }
    };

    const fetchPersonDetails = async (id: number) => {
        loading.value = true;
        try {
            personDetails.value  = await peopleService.fetchPersonById(id);
        } catch (error) {
            console.error("Error fetching person details:", error);
            personDetails.value = null;
        } finally {
            loading.value = false;
        }
    }

    return {
        movies,
        results,
        movieDetails,
        searchType,
        fetchMovieDetails,
        fetchPersonDetails,
        loading,
        personDetails,
        performSearch,
        clearResults,
    };
});
