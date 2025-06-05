<template>
  <div :class="['message', from]">
    <div class="bubble">
      <div ref="container" v-html="html" />
      <button class="copy" @click="copyMessage">Copy</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref, nextTick } from "vue";
import MarkdownIt from "markdown-it";
import mermaid from "mermaid";

const props = defineProps({
  from: String,
  text: String,
});

const container = ref(null);
const md = new MarkdownIt({ html: true, linkify: true });

const html = computed(() => md.render(props.text));

function renderMermaid() {
  nextTick(() => {
    if (container.value) {
      mermaid.init(
        undefined,
        container.value.querySelectorAll(".language-mermaid"),
      );
    }
  });
}

function copyMessage() {
  navigator.clipboard.writeText(props.text);
}

onMounted(renderMermaid);
watch(() => props.text, renderMermaid);
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

.copy {
  margin-top: 0.5rem;
  background: none;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
}
</style>
