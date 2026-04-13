<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  pageSize: {
    type: Number,
    default: 12,
  },
  itemLabel: {
    type: String,
    default: 'results',
  },
});

const currentPage = ref(1);

const totalItems = computed(() => props.items.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / props.pageSize)));

const startIndex = computed(() => {
  if (!totalItems.value) return 0;
  return (currentPage.value - 1) * props.pageSize + 1;
});

const endIndex = computed(() => {
  if (!totalItems.value) return 0;
  return Math.min(currentPage.value * props.pageSize, totalItems.value);
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.items.slice(start, end);
});

watch(
  () => props.items,
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

watch(totalPages, (value) => {
  if (currentPage.value > value) currentPage.value = value;
});

function goToPrevious() {
  if (currentPage.value > 1) currentPage.value -= 1;
}

function goToNext() {
  if (currentPage.value < totalPages.value) currentPage.value += 1;
}
</script>

<template>
  <div class="paginated-results">
    <div v-if="totalItems > 0" class="results-list">
      <slot
        :items="paginatedItems"
        :total-items="totalItems"
        :start-index="startIndex"
        :end-index="endIndex"
        :current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>

    <slot v-else name="empty" />

    <div v-if="totalItems > 0" class="pagination-wrap" aria-label="Pagination">
      <p class="pagination-summary">
        Showing {{ startIndex }}-{{ endIndex }} of {{ totalItems }} {{ itemLabel }}
      </p>

      <div class="pagination-controls" v-if="totalPages > 1">
        <button type="button" class="page-btn" :disabled="currentPage === 1" @click="goToPrevious">
          Previous
        </button>
        <span class="page-indicator">Page {{ currentPage }} of {{ totalPages }}</span>
        <button type="button" class="page-btn" :disabled="currentPage === totalPages" @click="goToNext">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-list {
  display: grid;
  gap: 1.5rem;
}

.pagination-wrap {
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.pagination-summary {
  font-size: 0.86rem;
  color: var(--color-text-muted);
}

.pagination-controls {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.page-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-heading);
  border-radius: 10px;
  height: 34px;
  padding: 0 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
</style>
