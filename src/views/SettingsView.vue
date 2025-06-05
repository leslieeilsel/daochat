<script setup>
import { ref } from 'vue'
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
    <h1>Settings</h1>
    <form @submit.prevent="save">
      <input v-model="passInput" placeholder="Passphrase" type="password" />
      <input v-model="keyInput" placeholder="API Key" />
      <button>Save</button>
    </form>
  </div>
</template>

<style scoped>
.settings {
  padding: 1rem;
}
</style>
