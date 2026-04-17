<script setup>
import { computed } from 'vue';

const props = defineProps({
  maxWidth: {
    type: String,
    default: '900px',
  },
  marginTop: {
    type: String,
    default: '2rem',
  },
  padding: {
    type: String,
    default: '1.5rem',
  },
  gap: {
    type: String,
    default: '1rem',
  },
  columns: {
    type: Number,
    default: 4,
  },
  submitText: {
    type: String,
    default: 'Search',
  },
  submitIcon: {
    type: String,
    default: 'search',
  },
});

const emit = defineEmits(['submit']);

const styleVars = computed(() => ({
  '--search-form-max-width': props.maxWidth,
  '--search-form-margin-top': props.marginTop,
  '--search-form-padding': props.padding,
  '--search-grid-gap': props.gap,
  '--search-grid-columns': String(props.columns),
}));
</script>

<template>
  <form class="search-form" :style="styleVars" @submit.prevent="emit('submit')">
    <div class="search-grid">
      <slot></slot>

      <button type="submit" class="search-btn">
        <span class="material-icons">{{ submitIcon }}</span>
        {{ submitText }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.search-form {
  max-width: var(--search-form-max-width);
  margin: var(--search-form-margin-top) auto 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--search-form-padding);
  box-shadow: var(--shadow-elevated);
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(var(--search-grid-columns), minmax(0, 1fr));
  gap: var(--search-grid-gap);
  align-items: flex-end;
}

.search-btn {
  border: 0;
  border-radius: 12px;
  background: var(--color-cta);
  color: #fff;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
  min-height: 44px;
  margin: 0 auto;
  grid-column: 1 / -1;
  transition: opacity 0.2s;
}

.search-btn:hover {
  opacity: 0.9;
}

.search-btn .material-icons {
  font-size: 1rem;
}

@media (max-width: 1100px) {
  .search-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .search-form {
    margin-top: 1.5rem;
    padding: 1rem;
  }

  .search-grid {
    grid-template-columns: 1fr;
  }
}
</style>
