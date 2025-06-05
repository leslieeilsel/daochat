<template>
  <div ref="wrapper" class="messages">
    <ChatMessage
      v-for="(m, i) in messages"
      :key="i"
      :from="m.from"
      :text="m.text"
    />
  </div>
</template>

<script setup>
import { onMounted, watch, ref, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'
const props = defineProps({
  messages: Array,
})
const wrapper = ref(null)
function scrollToBottom() {
  if (wrapper.value) {
    wrapper.value.scrollTop = wrapper.value.scrollHeight
  }
}
onMounted(scrollToBottom)
watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)
</script>

<style scoped>
.messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
