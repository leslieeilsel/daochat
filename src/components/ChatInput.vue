<template>
  <form class="input" @submit.prevent="submit">
    <Input
      v-model="text"
      placeholder="Send a message"
      @keydown.enter.exact.prevent="submit"
      class="flex-1"
    />
    <Button :disabled="loading" type="submit" class="ml-2">Send</Button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Input } from 'shadcn-vue'
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
.input :deep(.input-element) {
  flex: 1;
}
</style>
