import { computed, reactive } from 'vue';

const toastState = reactive({
  items: [],
});

let toastId = 0;

export function useToast() {
  const pushToast = (message, options = {}) => {
    const id = ++toastId;
    const duration = Number.isFinite(options.duration) ? options.duration : 2600;

    const toast = {
      id,
      message,
      type: options.type || 'info',
      duration,
    };

    toastState.items.push(toast);

    if (duration > 0) {
      window.setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toastState.items.findIndex((item) => item.id === id);
    if (index > -1) {
      toastState.items.splice(index, 1);
    }
  };

  const clearToasts = () => {
    toastState.items = [];
  };

  const toasts = computed(() => toastState.items);

  return {
    toasts,
    pushToast,
    removeToast,
    clearToasts,
  };
}
