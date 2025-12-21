<template>
  <p v-if="searchStore.loading">Loading...</p>
  <div class="border border-gray-300 w-full p-4 min-w-1/2 max-w-4xl mx-auto bg-white rounded-md flex flex-col justify-between h-[94vh] sm:h-fit" v-else-if="character?.name">
    <div>
      <h1 class="font-bold text-2xl mb-4 text-gray-800">{{ character.name }}</h1>

      <div class="grid md:grid-cols-2 grid-rows-1 gap-x-[10px] gap-y-0 grid-cols-1">
        <div>
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

        <div>
          <h2 class="text-xl font-semibold mb-2 text-gray-700 mt-12 md:mt-0">Movies</h2>
          <hr class="border-gray-300 mb-4" />
          <ul class="text-gray-600 space-y-2">
            <li v-for="(film, index) in character.films_details" :key="index">
              <a class="text-blue-500 hover:cursor-pointer" @click="router.push(`/movie/${film.id}`)">{{ film.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-4">
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
import {computed, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import CustomButton from "../components/CustomButton.vue";
import { useResponsive } from "../../composables/useResponsive";
const { isMobile } = useResponsive();

const searchStore = useSearchStore();
const router = useRouter()
const route = useRoute()
const character = computed(() => searchStore.personDetails)

onMounted(async () => {
  await searchStore.fetchPersonDetails(route.params.id);
});

</script>
