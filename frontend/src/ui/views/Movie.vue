<template>
  <p v-if="searchStore.loading">Loading...</p>
  <div class="border border-gray-300 p-4 max-w-4xl min-w-1/2 mx-auto bg-white rounded-md flex flex-col" v-else-if="movie?.title">
    <h1 class="font-bold text-2xl mb-4 text-gray-800">{{ movie.title }}</h1>

    <div class="flex justify-between space-x-8">
      <div class="w-1/2 y">
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Opening Crawl </h2>
        <hr class="border-gray-300 mb-4" />
        <div class="text-gray-600 space-y-2 py-4">
          <p v-for="(paragraph, index) in openingCrawlParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Characters</h2>
        <hr class="border-gray-300 mb-4" />
        <ul class="text-gray-600 flex flex-wrap">
          <li v-for="(char, index) in movie.characters_details" :key="index">
            <a class="text-blue-500 underline mr-2 hover:cursor-pointer" @click="router.push(`/people/${char.id}`)">{{ char.name }}{{ index < movie.characters_details.length - 1 ? ', ' : '' }}</a>
          </li> 
        </ul>
      </div>
    </div>

    <div class="mt-4">
      <button
          @click="router.push('/')"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
      >
        BACK TO SEARCH
      </button>
    </div>
  </div>
</template>

<script setup>

import {useSearchStore} from "../../store/search.store";
import { computed, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";

const searchStore = useSearchStore();
const router = useRouter()
const route = useRoute()

const movie = computed(() => searchStore.movieDetails)
const openingCrawlParagraphs = computed(() => movie.value?.opening_crawl?.split('.') || [])

onMounted(async () => {
  await searchStore.fetchMovieDetails(route.params.id);
});
</script>
