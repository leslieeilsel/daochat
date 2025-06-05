<script setup>
import { ref } from 'vue'
import { Button, Card, Input } from 'shadcn-vue'
import AppHeader from '../components/AppHeader.vue'
import { useConfigStore } from '../stores/config'

const config = useConfigStore()
const keyInput = ref('')
const passInput = ref('')

async function save() {
  await config.setApiKey(passInput.value, keyInput.value)
  keyInput.value = ''
}
</script>

<template>
  <div class="settings">
    <AppHeader />
    <Card class="settings-card">
      <form @submit.prevent="save" class="form">
        <Input v-model="passInput" placeholder="Passphrase" type="password" />
        <Input v-model="keyInput" placeholder="API Key" />
        <Button type="submit" class="mt-2">Save</Button>
      </form>
    </Card>
  </div>
</template>

<style scoped>
.settings {
  padding: 1rem;
}
.settings-card {
  padding: 1rem;
  margin-top: 1rem;
  max-width: 400px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
