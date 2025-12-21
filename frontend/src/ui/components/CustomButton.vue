<template>
  <button
    @click="emit('click')"
    class="btn"
    :class="{ 'btn--disabled': disabled, 'btn--active': !disabled, 'btn--full': full, 'btn--fit': !full }"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  full: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click']);
</script>

<style>
@import "tailwindcss";
.btn {
  @apply font-bold py-2 px-4 rounded-3xl my-2 md:mt-0;
}

.btn--disabled {
  @apply cursor-not-allowed opacity-50 bg-gray-300;
}

.btn--active {
  @apply bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white;
}

.btn--full {
  @apply w-full;
}

.btn--fit {
  @apply md:w-fit;
}
</style>