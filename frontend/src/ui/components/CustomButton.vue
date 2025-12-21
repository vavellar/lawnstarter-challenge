<template>
     <button
        @click="emit('click')"
        class="font-bold py-2 px-4 rounded-3xl my-2  md:mt-0"
        :class="{ 'cursor-not-allowed opacity-50 bg-gray-300': disabled, 'bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white': !disabled, 'w-full': full, 'md:w-fit': !full }"
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