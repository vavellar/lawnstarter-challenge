<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-[0.75fr_1fr] grid-rows-1 gap-x-5 gap-y-0 w-full sm:w-3/4 mx-auto">
    <SearchCard v-if="showSearchCard" />
    <Results v-if="showResults" />
  </div>
</template>
<script setup>
import SearchCard from "../components/SearchCard.vue";
import Results from "../components/Results.vue";
import { useResponsive } from "../../composables/useResponsive";
import { onMounted, computed } from "vue";
import { useSearchStore } from "../../store/search.store";

const searchStore = useSearchStore();
const { isMobile, isDesktop } = useResponsive();

const showSearchCard = computed(() => isDesktop.value || (isMobile.value && !searchStore.searchTrigerred));
const showResults = computed(() => isDesktop.value || searchStore.searchTrigerred);

onMounted(() => {
  searchStore.resetError()
});

</script>
