<script setup>
import ChatMessageList from '../components/ChatMessageList.vue'
import ChatInput from '../components/ChatInput.vue'
import AppHeader from '../components/AppHeader.vue'
import { Card } from 'shadcn-vue'
import { useChatStore } from '../stores/chat'

const chat = useChatStore()
</script>

<template>
  <div class="page">
    <AppHeader />
    <Card class="chat-body">
      <ChatMessageList :messages="chat.messages" />
      <ChatInput :loading="chat.loading" @send="chat.sendMessage" />
    </Card>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
}
.chat-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1rem;
  padding: 1rem;
}
</style>
