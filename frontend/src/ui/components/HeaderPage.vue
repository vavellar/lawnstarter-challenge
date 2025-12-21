<template>
  <header class="header">
    <div class="header__container">
      <div class="header__spacer"></div>

      <div class="header__title">
        <p>SWStarter</p>
      </div>

      <div class="header__spacer"></div>
    </div>
  </header>
</template>

<script setup>
</script>

<style>
@import "tailwindcss";
.header {
  @apply bg-white text-green-500 font-bold py-4 left-0 w-full z-50;
}

.header__container {
  @apply container mx-auto flex justify-between items-center;
}

.header__spacer {
  @apply flex-1;
}

.header__title {
  @apply flex-1 flex justify-center;
}
</style>
