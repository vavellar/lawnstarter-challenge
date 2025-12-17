<template>
  <div class="border border-gray-300 p-4 w-150 mx-auto bg-white rounded-md">
    <h2 class="text-xl font-bold mb-2">Results</h2>
    <hr class="border-gray-300 mb-4" />
    <div class="text-center text-gray-500 h-100 flex flex-col justify-center">
      <p v-if="searchStore.loading">Searching...</p>
      <div v-else-if="!searchStore.loading && searchStore.results.length === 0">
         <p>There are zero matches.</p>
         <p>Use the form to search for People or Movies.</p>
      </div>
      <div v-else>
        <ul>
          <li
              v-for="(result, index) in searchStore.results"
              :key="index"
              class="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span class="font-medium text-lg text-gray-700">{{ result.name || result.title }}</span>
            <button
                @click="onClickItem(result)"
                class="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white font-bold py-1 px-4 rounded-md"
            >
              SEE DETAILS
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useSearchStore} from "../store/search.store";
import {useRouter} from "vue-router";
const router = useRouter();
const searchStore = useSearchStore();

const onClickItem = (item) => {
  searchStore.setItem(item)
  if (searchStore.searchType === 'movies') {
    const id = item.url.split('/').filter(Boolean).pop();
    router.push(`/movie/${id}`)
  } else {
    router.push('/details')
  }
};

</script>

<style scoped>
</style>