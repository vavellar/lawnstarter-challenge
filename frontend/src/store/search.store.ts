import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { moviesService } from "../services/movies.service";
import { peopleService } from "../services/people.service";
import type { Movie, Person, SearchResult, SearchType } from "../types";

export const useSearchStore = defineStore("search", () => {
    const results: Ref<SearchResult[]> = ref([]);
    const personDetails: Ref<Person | null> = ref(null);
    const loading: Ref<boolean> = ref(false);
    const movies: Ref<Movie[]> = ref([]);
    const movieDetails: Ref<Movie | null> = ref(null);
    const searchType: Ref<SearchType> = ref("people");
    const error: Ref<boolean> = ref(false);


    watch(() => searchType.value, () => {
        clearResults()
    })

    const performSearch = async (searchTerm: string): Promise<void> => {
        loading.value = true;
        try {
            if (searchType.value === "movies") {
                const data = await moviesService.fetchAllMovies(searchTerm);
                results.value = (data.results || []) as SearchResult[];
            } else {
                const data = await peopleService.fetchAllPeople(searchTerm);
                results.value = (data.results || []) as SearchResult[];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            results.value = [];
        } finally {
            loading.value = false;
        }
    };


    const clearResults = (): void => {
        results.value = [];
        loading.value = false;
    };

    const resetError = (): void => {
        error.value = false;
    };


    const fetchMovieDetails = async (id: number): Promise<void> => {
        loading.value = true;
        try {
            movieDetails.value = await moviesService.fetchMovieById(id) as Movie;
        } catch (e) {
            movieDetails.value = null;
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    const fetchPersonDetails = async (id: number): Promise<void> => {
        loading.value = true;
        try {
            personDetails.value = await peopleService.fetchPersonById(id) as Person;
        } catch (e) {
            personDetails.value = null;
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    return {
        movies,
        results,
        error,
        movieDetails,
        searchType,
        fetchMovieDetails,
        fetchPersonDetails,
        loading,
        personDetails,
        resetError,
        performSearch,
        clearResults,
    };
});
