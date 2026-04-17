<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  list: {
    type: String,
    default: '',
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  const raw = event.target.value;
  if (props.type === 'number') {
    emit('update:modelValue', raw === '' ? '' : Number(raw));
    return;
  }
  emit('update:modelValue', raw);
}
</script>

<template>
  <label class="search-field">
    <span>{{ label }}</span>
    <div class="input-wrap">
      <span class="material-icons">{{ icon }}</span>
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :list="list || undefined"
        :min="min"
        :max="max"
        :step="step"
        @input="updateValue"
      />
    </div>
  </label>
</template>

<style scoped>
.search-field {
  display: grid;
  gap: 0.5rem;
  text-align: left;
}

.search-field > span {
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.75rem;
  font-weight: 600;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  border-radius: 12px;
  padding: 0.7rem 0.8rem;
}

.input-wrap .material-icons {
  font-size: 1rem;
  color: var(--color-input-icon, var(--color-text-muted));
  flex-shrink: 0;
}

.input-wrap input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--color-input-text, var(--color-text));
  font-family: inherit;
  font-size: 0.95rem;
}

.input-wrap input::placeholder {
  color: var(--color-input-placeholder, var(--color-text-muted));
}
</style>
