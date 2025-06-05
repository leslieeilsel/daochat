<template>
  <div :class="['message', from]">
    <Card class="bubble">
      <div ref="container" v-html="html" />
      <Button variant="outline" size="sm" class="copy" @click="copyMessage">
        Copy
      </Button>
    </Card>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref, nextTick } from "vue";
import { Button, Card } from "shadcn-vue";
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
}
.message.user .bubble {
  background-color: #cce8ff;
}

.copy {
  margin-top: 0.5rem;
}
</style>
