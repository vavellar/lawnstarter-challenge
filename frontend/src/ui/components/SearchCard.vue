<template>
  <div class="search-card">
    <div>
      <h2 class="search-card-title">What are you searching for?</h2>
        <div class="search-card-options">
        <label class="search-card-option">
          <input
              type="radio"
              name="searchType"
              value="people"
              v-model="searchStore.searchType"
              class="search-card-radio"
          />
          <span class="search-card-label">People</span>
        </label>
        <label class="search-card-option">
          <input
              type="radio"
              name="searchType"
              value="movies"
              v-model="searchStore.searchType"
              class="search-card-radio"
          />
          <span class="search-card-label">Movies</span>
        </label>
      </div>
      <div class="search-card-input-wrapper">
        <input
            type="text"
            class="search-card-input"
            :placeholder="placeholderText"
            v-model="searchTerm"
        />
      </div>
    </div>    
    <CustomButton 
      :disabled="!searchTerm.trim()"
      @click="onSearch"
      full
      :text="searchStore.loading ? 'SEARCHING...' : 'SEARCH'" 
    />    
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {useSearchStore} from "../../store/search.store";
import CustomButton from "./CustomButton.vue";
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


<style>
@import "tailwindcss";
.search-card {
  @apply p-8 sm:w-100 w-full h-[94vh] sm:h-fit bg-white rounded-md shadow-md border border-gray-300 mx-auto flex flex-col justify-between;
}

.search-card-title {
  @apply text-xl text-black mb-4;
}

.search-card-options {
  @apply flex items-center space-x-4 mb-4;
}

.search-card-option {
  @apply flex items-center space-x-2;
}

.search-card-radio {
  @apply  text-blue-500;
}

.search-card-label {
  @apply font-medium text-lg;
}

.search-card-input-wrapper {
  @apply flex items-center justify-between mb-4;
}

.search-card-input {
  @apply border border-gray-300 rounded-md w-full py-2 px-3 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>

