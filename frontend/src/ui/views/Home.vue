<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-[0.75fr_1fr] grid-rows-1 gap-x-5 gap-y-0 w-full sm:w-3/4 mx-auto">
    <SearchCard v-if="isMobile && !searchStore.searchTrigerred ? true : isDesktop ? true : false"/>
    <Results v-if="isDesktop ? true : searchStore.searchTrigerred ? true : false"/>
  </div>
</template>
<script setup>
import SearchCard from "../components/SearchCard.vue";
import Results from "../components/Results.vue";
import { useResponsive } from "../../composables/useResponsive";
import { onMounted } from "vue";
import { useSearchStore } from "../../store/search.store";

const searchStore = useSearchStore();
const { isMobile, isDesktop } = useResponsive();

onMounted(() => {
  searchStore.resetError()
});

</script>
