<template>
  <p v-if="searchStore.loading">Loading...</p>
  <div class="border border-gray-300 p-4 max-w-4xl min-w-1/2 mx-auto bg-white rounded-md flex flex-col justify-between h-[94vh] sm:h-fit w-full" v-else-if="movie?.title">
    <div>
      <h1 class="font-bold text-2xl mb-4 text-gray-800">{{ movie.title }}</h1>

      <div class="grid md:grid-cols-2 grid-rows-1 gap-x-10 gap-y-0 grid-cols-1 mt-4">
        <div class="">
          <h2 class="text-xl font-semibold mb-2 text-gray-700">Opening Crawl </h2>
          <hr class="border-gray-300 mb-4" />
          <div class="text-gray-600 space-y-2 py-4">
            <p v-for="(paragraph, index) in openingCrawlParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-2 text-gray-700 mt-12 md:mt-0">Characters</h2>
          <hr class="border-gray-300 mb-4" />
          <ul class="text-gray-600 flex flex-wrap">
            <li v-for="(char, index) in movie.characters_details" :key="index">
              <a class="text-blue-500  mr-2 hover:cursor-pointer" @click="router.push(`/people/${char.id}`)">{{ char.name }}{{ index < movie.characters_details.length - 1 ? ', ' : '' }}</a>
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
