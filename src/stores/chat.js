import { defineStore } from 'pinia'
import { useConfigStore } from './config'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    loading: false,
  }),
  actions: {
    async sendMessage(text) {
      if (!text.trim()) return
      const config = useConfigStore()
      this.messages.push({ from: 'user', text })
      this.loading = true
      try {
        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify({ message: text }),
        })
        const reader = resp.body.getReader()
        const decoder = new TextDecoder()
        const assistant = { from: 'assistant', text: '' }
        this.messages.push(assistant)
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          assistant.text += decoder.decode(value, { stream: true })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
})
