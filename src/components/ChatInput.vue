<template>
  <form class="input" @submit.prevent="submit">
    <input
      v-model="text"
      placeholder="Send a message"
      @keydown.enter.exact.prevent="submit"
    />
    <button :disabled="loading">Send</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  loading: Boolean,
})
const emit = defineEmits(['send'])
const text = ref('')
function submit() {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<style scoped>
.input {
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #ccc;
}
.input input {
  flex: 1;
  padding: 0.5rem;
}
</style>
