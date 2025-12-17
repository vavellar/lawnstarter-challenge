<template>
  <div class="border border-gray-300 p-4 max-w-4xl mx-auto bg-white rounded-md flex flex-col">
    <h1 class="font-bold text-2xl mb-4 text-gray-800">{{ character.name }}</h1>

    <div class="flex justify-between space-x-8">
      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Details</h2>
        <hr class="border-gray-300 mb-4" />
        <ul class="text-gray-600 space-y-2">
          <li><strong>Birth Year:</strong> {{ character.birth_year }}</li>
          <li><strong>Gender:</strong> {{ character.gender }}</li>
          <li><strong>Eye Color:</strong> {{ character.eye_color }}</li>
          <li><strong>Hair Color:</strong> {{ character.hair_color }}</li>
          <li><strong>Height:</strong> {{ character.height }}</li>
          <li><strong>Mass:</strong> {{ character.mass }}</li>
        </ul>
      </div>

      <div class="w-1/2">
        <h2 class="text-xl font-semibold mb-2 text-gray-700">Movies</h2>
        <hr class="border-gray-300 mb-4" />
        <ul class="text-gray-600 space-y-2">
          <li v-for="(film, index) in searchStore.movies" :key="index">
            <a class="text-blue-500 underline hover:cursor-pointer" @click="router.push(`/movie/${film.id}`)">{{ film.title }}</a>
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

import {useSearchStore} from "../store/search.store";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const searchStore = useSearchStore();
const router = useRouter()
const character = computed(() => searchStore.selectedResult)

onMounted(async () => {
  await searchStore.fetchMovieTitles(character.value.films);
});

</script>
