<template>
    <div id="app">
        <HeaderPage />
        <router-view class="mt-26 mx-auto w-fit"/>
    </div>
</template>

<script setup>
import HeaderPage from "./ui/components/HeaderPage.vue";
</script>