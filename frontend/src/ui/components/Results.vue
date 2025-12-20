<template>
  <div class="border border-gray-300 p-8 sm:w-150 w-full mx-auto bg-white rounded-md flex flex-col justify-between h-fit">
   <div>
     <h2 class="text-xl font-bold mb-2">Results</h2>
    <hr class="border-gray-300 mb-4" />
    <div 
      class="text-center text-gray-500 h-fit min-h-100 flex flex-col"
      :class="{ 'justify-center': searchStore.loading || (!searchStore.loading && searchStore.results.length === 0), 'justify-start': !searchStore.loading && searchStore.results.length > 0 }"
    >
      <p v-if="searchStore.loading">Searching...</p>
      <div v-else-if="!searchStore.loading && searchStore.results.length === 0">
         <p>There are zero matches.</p>
         <p>Use the form to search for People or Movies.</p>
      </div>
      <div v-else class="max-h-[400px] h-auto overflow-auto">
        <ul class="w-full">
          <li
              v-for="(result, index) in searchStore.results"
              :key="index"
              class="flex justify-between items-center py-4 border-b border-gray-200 flex-col md:flex-row"
          >
            <p class="font-bold text-left text-lg text-gray-700 w-full md:w-fit">{{ result.name || result.title }}</p>
            <button
                @click="onClickItem(result)"
                class="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-3xl w-full md:w-fit my-2  md:mt-0"
            >
              SEE DETAILS
            </button>
          </li>
        </ul>
      </div>
   </div>
    <button
          v-if="isMobile"
          @click="searchStore.clearResults()"
          class="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-3xl w-full mt-4"
      >
          BACK TO SEARCH
      </button>
    </div>
  </div>
</template>

<script setup>
import {useSearchStore} from "../../store/search.store";
import { useResponsive } from "../../composables/useResponsive";
import {useRouter} from "vue-router";
const router = useRouter();
const searchStore = useSearchStore();
const { isMobile } = useResponsive();

const onClickItem = (item) => {
  const id = item.url.split('/').filter(Boolean).pop();
  if (searchStore.searchType === 'movies') {
    router.push(`/movie/${id}`)
  } else {
    router.push(`/people/${id}`)
  }
};

</script>

<style scoped>
</style>