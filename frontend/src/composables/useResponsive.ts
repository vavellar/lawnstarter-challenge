import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useResponsive(breakpoint = 768) {
  const width = ref<number>(typeof window !== 'undefined' ? window.innerWidth : breakpoint)

  const update = () => {
    if (typeof window !== 'undefined') width.value = window.innerWidth
  }

  onMounted(() => {
    if (typeof window !== 'undefined') window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') window.removeEventListener('resize', update)
  })

  const isMobile = computed(() => width.value < breakpoint)
  const isDesktop = computed(() => width.value >= breakpoint)

  return {
    width,
    isMobile,
    isDesktop,
    breakpoint,
  }
}

export default useResponsive
