<script setup>
import { useToast } from '../../services/toastStore';

const { toasts, removeToast } = useToast();

function iconFor(type) {
  if (type === 'success') return 'check_circle';
  if (type === 'error') return 'error';
  if (type === 'warning') return 'warning';
  return 'info';
}
</script>

<template>
  <div class="toast-layer" aria-live="polite" aria-atomic="true">
    <TransitionGroup name="toast-slide" tag="div" class="toast-stack">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
        :class="`toast-${toast.type}`"
        role="status"
      >
        <div class="toast-rail">
          <span class="toast-rail-line" aria-hidden="true"></span>
          <span class="material-icons toast-icon" aria-hidden="true">{{ iconFor(toast.type) }}</span>
          <button type="button" class="toast-close" aria-label="Dismiss notification" @click="removeToast(toast.id)">
            <span class="material-icons" aria-hidden="true">close</span>
          </button>
        </div>
        <p class="toast-message">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-layer {
  position: fixed;
  inset: auto 0 1rem;
  z-index: 2500;
  pointer-events: none;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.toast-stack {
  display: grid;
  gap: 0.5rem;
  width: min(760px, 100%);
}

.toast-item {
  --toast-accent: #66d9ff;
  pointer-events: auto;
  display: grid;
  grid-template-columns: 44px 1fr;
  align-items: stretch;
  gap: 0.52rem;
  border-radius: 14px;
  border: 2px solid color-mix(in srgb, var(--toast-accent) 70%, transparent);
  background: linear-gradient(135deg, #082145 0%, #0b2b56 100%);
  color: #ffffff;
  padding: 0.52rem 0.68rem;
  min-height: 62px;
  box-shadow: 0 18px 40px rgba(6, 15, 28, 0.36), 0 0 0 1px rgba(111, 178, 255, 0.12);
}

.toast-rail {
  display: grid;
  grid-template-rows: auto auto 1fr;
  align-items: start;
  justify-items: center;
  gap: 0.3rem;
  padding-top: 0.03rem;
}

.toast-rail-line {
  width: 5px;
  height: 26px;
  border-radius: 999px;
  background: var(--toast-accent);
}

.toast-icon {
  font-size: 23px;
  line-height: 1;
  color: var(--toast-accent);
}

.toast-message {
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  line-height: 1.25;
  letter-spacing: 0.01em;
  padding-right: 0.12rem;
}

.toast-close {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  transition: background-color 0.16s ease;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.12);
}

.toast-close .material-icons {
  font-size: 18px;
}

.toast-success {
  --toast-accent: #66d9ff;
}

.toast-error {
  --toast-accent: #ff9582;
}

.toast-warning {
  --toast-accent: #ffd96a;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 220ms ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

@media (max-width: 680px) {
  .toast-item {
    min-height: 58px;
    border-radius: 12px;
    padding: 0.46rem 0.58rem;
    grid-template-columns: 40px 1fr;
    gap: 0.46rem;
  }

  .toast-icon {
    font-size: 20px;
  }

  .toast-message {
    font-size: 0.84rem;
  }
}
</style>
