<template>
    <div id="grid grid-cols-1 grid-rows-[0.1fr_1fr] gap-0 h-screen">
        <!-- <HeaderPage /> -->
        <div v-if="searchStore.error" class="bg-red-100 border mt-26 border-red-400 text-red-700 px-4 py-3 rounded relative w-150 mx-auto flex flex-col items-center" role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">There was an error processing your request. Please try again later.</span>
            <button @click="router.push('/')" class="hover:cursor-pointer underline">Back to home</button>
        </div>
        <router-view class="md:mx-auto w-fit md:mt-8"/>
    </div>
</template>

<script setup>
import { useSearchStore } from "./store/search.store";
import HeaderPage from "./ui/components/HeaderPage.vue";
import { useRouter } from "vue-router";
const router = useRouter()
const searchStore = useSearchStore()
</script>