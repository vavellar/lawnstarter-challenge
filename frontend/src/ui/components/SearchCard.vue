<template>
  <div class="p-4 w-100 h-fit bg-white rounded-md shadow-md border border-gray-300 mx-auto">
    <h2 class="text-xl font-bold mb-4">What are you searching for?</h2>
    <div class="flex items-center space-x-4 mb-4">
      <label class="flex items-center space-x-2">
        <input
            type="radio"
            name="searchType"
            value="people"
            v-model="searchStore.searchType"
            class="form-radio text-blue-500"
        />
        <span class="font-medium text-lg">People</span>
      </label>
      <label class="flex items-center space-x-2">
        <input
            type="radio"
            name="searchType"
            value="movies"
            v-model="searchStore.searchType"
            class="form-radio text-blue-500"
        />
        <span class="font-medium text-lg">Movies</span>
      </label>
    </div>
    <div class="flex items-center mb-4">
      <input
          type="text"
          class="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="placeholderText"
          v-model="searchTerm"
      />
    </div>
    <button
        :disabled="!searchTerm.trim()"
        @click="onSearch"
        class="text-gray-700 py-2 px-4 rounded-xl w-full font-bold"
        :class="{ 'cursor-not-allowed opacity-50 bg-gray-300': !searchTerm.trim(), 'bg-[#0ab463] hover:cursor-pointer text-white': searchTerm.trim() }"
    >
      {{ searchStore.loading ? "SEARCHING..." : "SEARCH" }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {useSearchStore} from "../../store/search.store";
const searchStore = useSearchStore();

const searchTerm = ref("");
watch(() => searchStore.searchType, () => {
  searchTerm.value = "";
})

const placeholderText = computed(() => {
  return searchStore.searchType === "people"
      ? "e.g. Chewbacca, Yoda, Boba Fett"
      : "e.g. Star Wars, The Empire Strikes Back";
});


const onSearch = () => {
  if (searchTerm.value.trim() === "") {
    return;
  }
  searchStore.performSearch(searchTerm.value);
};

</script>

