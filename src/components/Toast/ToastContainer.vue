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
        <span class="material-icons toast-icon" aria-hidden="true">{{ iconFor(toast.type) }}</span>
        <span class="toast-message">{{ toast.message }}</span>
        <button type="button" class="toast-close" aria-label="Dismiss notification" @click="removeToast(toast.id)">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
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
  width: min(560px, 100%);
}

.toast-item {
  pointer-events: auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.45rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(135deg, #0b1f3a, #102a4d);
  color: #ffffff;
  padding: 0.65rem 0.7rem;
  box-shadow: 0 18px 40px rgba(6, 15, 28, 0.28), 0 0 0 1px rgba(92, 150, 255, 0.14);
}

.toast-icon {
  font-size: 18px;
}

.toast-message {
  font-size: 0.9rem;
  line-height: 1.25;
}

.toast-close {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  cursor: pointer;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.toast-close .material-icons {
  font-size: 16px;
}

.toast-success {
  border-color: rgba(76, 198, 255, 0.45);
}

.toast-error {
  border-color: rgba(255, 140, 120, 0.55);
}

.toast-warning {
  border-color: rgba(255, 214, 102, 0.55);
}

.toast-success .toast-icon {
  color: #66d9ff;
}

.toast-error .toast-icon {
  color: #ff9a86;
}

.toast-warning .toast-icon {
  color: #ffd96a;
}

.toast-item::before {
  content: '';
  width: 4px;
  align-self: stretch;
  border-radius: 999px;
  background: rgba(102, 217, 255, 0.95);
  margin-right: 0.15rem;
}

.toast-success::before {
  background: linear-gradient(180deg, #70e2ff, #57c0ff);
}

.toast-error::before {
  background: linear-gradient(180deg, #ffb2a3, #ff8b73);
}

.toast-warning::before {
  background: linear-gradient(180deg, #ffe48f, #ffd15b);
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 220ms ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
