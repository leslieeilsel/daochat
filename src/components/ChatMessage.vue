<template>
  <div :class="['message', from]">
    <div class="bubble">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  from: String,
  text: String,
})
</script>

<style scoped>
.message {
  margin: 0.5rem 0;
  display: flex;
}
.message.user {
  justify-content: flex-end;
}
.bubble {
  max-width: 80%;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background-color: #f6f6f6;
}
.message.user .bubble {
  background-color: #cce8ff;
}
</style>
