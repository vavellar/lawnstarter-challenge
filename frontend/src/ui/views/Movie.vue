<template>
  <p v-if="searchStore.loading">Loading...</p>
  <div class="movie-container" v-else-if="movie?.title">
    <div>
      <h1 class="movie-title">{{ movie.title }}</h1>

      <div class="movie-grid">
        <div>
          <h2 class="movie-section-title">Opening Crawl </h2>
          <hr class="movie-divider" />
          <div class="movie-content">
            <p v-for="(paragraph, index) in openingCrawlParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div>
          <h2 class="movie-section-title movie-section-title--characters">Characters</h2>
          <hr class="movie-divider" />
          <ul class="movie-characters-list">
            <li v-for="(char, index) in movie.characters_details" :key="index">
              <a class="movie-character-link" @click="router.push(`/people/${char.id}`)">{{ char.name }}{{ index < movie.characters_details.length - 1 ? ', ' : '' }}</a>
            </li> 
          </ul>
        </div>
      </div>
    </div>

    <div class="movie-footer">
      <CustomButton 
          @click="router.push('/')" 
          :text="'BACK TO SEARCH'" 
          :full="isMobile"
      />
    </div>
  </div>
</template>

<script setup>

import {useSearchStore} from "../../store/search.store";
import { computed, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import CustomButton from "../components/CustomButton.vue";
import { useResponsive } from "../../composables/useResponsive";
const { isMobile } = useResponsive();

const searchStore = useSearchStore();
const router = useRouter()
const route = useRoute()

const movie = computed(() => searchStore.movieDetails)
const openingCrawlParagraphs = computed(() => movie.value?.opening_crawl?.split('.') || [])

onMounted(async () => {
  await searchStore.fetchMovieDetails(route.params.id);
});
</script>

<style>
@import "tailwindcss";
.movie-container {
  @apply border border-gray-300 p-4 max-w-4xl min-w-1/2 mx-auto bg-white rounded-md flex flex-col justify-between h-[94vh] sm:h-fit w-full;
}

.movie-title {
  @apply font-bold text-2xl mb-4 text-gray-800;
}

.movie-grid {
  @apply grid md:grid-cols-2 grid-rows-1 gap-x-10 gap-y-0 grid-cols-1 mt-4;
}

.movie-section-title {
  @apply text-xl font-semibold mb-2 text-gray-700;
}

.movie-section-title--characters {
  @apply mt-12 md:mt-0;
}

.movie-divider {
  @apply border-gray-300 mb-4;
}

.movie-content {
  @apply text-gray-600 space-y-2 py-4;
}

.movie-characters-list {
  @apply text-gray-600 flex flex-wrap;
}

.movie-character-link {
  @apply text-blue-500 mr-2 hover:cursor-pointer;
}

.movie-footer {
  @apply mt-32;
}
</style>
