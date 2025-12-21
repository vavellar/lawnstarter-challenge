<template>
  <div 
    class="results-container"
  >
   <div>
     <h2 class="results-title">Results</h2>
     <hr class="results-divider" />
      <div 
        class="results-content"
        :class="{ 'results-content--center': searchStore.loading || (!searchStore.loading && searchStore.results.length === 0), 'results-content--start': !searchStore.loading && searchStore.results.length > 0 }"
      >
        <p v-if="searchStore.loading">Searching...</p>
        <div v-else-if="!searchStore.loading && searchStore.results.length === 0">
          <p>There are zero matches.</p>
          <p>Use the form to search for People or Movies.</p>
        </div>
        <div v-else class="results-list-wrapper">
          <ul class="results-list">
            <li
                v-for="(result, index) in searchStore.results"
                :key="index"
                class="results-item"
            >
              <p class="results-item-name">{{ result.name || result.title }}</p>
              <CustomButton
                  :full="isMobile"
                  @click="onClickItem(result)"
                  :text="'SEE DETAILS'"
              />    
            </li>
          </ul>
        </div>
      </div>
    </div>
    <CustomButton 
          v-if="isMobile"
          @click="searchStore.clearResults()"
          class="results-back-button"
          :text="'BACK TO SEARCH'"
          :full="isMobile"
      />
  </div>
</template>

<script setup>
import {useSearchStore} from "../../store/search.store";
import { useResponsive } from "../../composables/useResponsive";
import CustomButton from "../components/CustomButton.vue";
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

<style>
@import "tailwindcss";
.results-container {
  @apply border border-gray-300 p-8 sm:w-150 w-full mx-auto bg-white rounded-md flex flex-col justify-between sm:h-fit;
}

.results-title {
  @apply text-xl font-bold mb-2;
}

.results-divider {
  @apply border-gray-300 mb-4;
}

.results-content {
  @apply text-center text-gray-500 h-fit min-h-100 flex flex-col;
}

.results-content--center {
  @apply justify-center;
}

.results-content--start {
  @apply justify-start;
}

.results-list-wrapper {
  @apply md:max-h-100 h-auto overflow-auto;
}

.results-list {
  @apply w-full;
}

.results-item {
  @apply flex justify-between items-center py-4 md:py-2 border-b border-gray-200 flex-col md:flex-row;
}

.results-item-name {
  @apply font-bold text-left text-lg text-gray-700 w-full md:w-fit;
}

.results-back-button {
  @apply mt-12;
}
</style>