<template>
  <div class="grid grid-cols-[0.75fr_1fr] grid-rows-1 gap-x-5 gap-y-0">
    <SearchCard />
    <Results />
  </div>
</template>
<script setup>
import SearchCard from "../components/SearchCard.vue";
import Results from "../components/Results.vue";
import { onMounted } from "vue";
import { useSearchStore } from "../../store/search.store";

const searchStore = useSearchStore();

onMounted(() => {
  searchStore.resetError()
});

</script>
