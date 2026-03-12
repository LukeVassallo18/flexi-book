<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue';

const CVD_MODES = [
  { value: 'none', label: 'Standard' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
];

const PRESETS = [
  { name: 'Ocean', colors: { background: '#f0f7fa', text: '#1a2b3c', buttons: '#2196a4', navigation: '#1b7a85', links: '#0e6b76', headings: '#14404d', borders: '#b8d8e0', cards: '#ffffff' } },
  { name: 'Sand', colors: { background: '#faf6f0', text: '#3c2e1a', buttons: '#c4792a', navigation: '#a86520', links: '#9b5b1a', headings: '#4d3314', borders: '#e0d4b8', cards: '#fffdf8' } },
  { name: 'Forest', colors: { background: '#f2f7f0', text: '#1a3c1e', buttons: '#3a8a45', navigation: '#2d7a38', links: '#267632', headings: '#1e4d24', borders: '#b8e0be', cards: '#fafffa' } },
  { name: 'Hi-Vis', colors: { background: '#000000', text: '#ffffff', buttons: '#ffcc00', navigation: '#ffcc00', links: '#00ccff', headings: '#ffffff', borders: '#666666', cards: '#1a1a1a' } },
];

const ALL_COLOR_ITEMS = [
  { key: 'background', label: 'BG' },
  { key: 'text', label: 'Text' },
  { key: 'cards', label: 'Cards' },
  { key: 'buttons', label: 'Btns' },
  { key: 'links', label: 'Links' },
  { key: 'navigation', label: 'Nav' },
  { key: 'headings', label: 'Head' },
  { key: 'borders', label: 'Bord' },
];

const defaultColors = {
  background: '#FCFAF8',
  text: '#181F25',
  cards: '#ffffff',
  buttons: '#EC7051',
  links: '#6A7581',
  navigation: 'rgba(255, 255, 255, 0.80)',
  headings: '#181F25',
  borders: '#E7E2DA',
};

const open = ref(false);
const mainTab = ref('vision');
const colorTab = ref('presets');

const voiceEnabled = ref(false);
const voiceListening = ref(false);
const cvdMode = ref('none');
const highContrast = ref(false);

const brightness = ref(100);
const saturation = ref(100);
const fontSize = ref(100);
const letterSpacing = ref(0);
const lineHeight = ref(1.5);

const customColors = reactive({ ...defaultColors });

const mainTabs = [
  { id: 'vision', label: 'Vision', icon: 'visibility_off' },
  { id: 'colours', label: 'Colours', icon: 'palette' },
  { id: 'tuning', label: 'Tuning', icon: 'tune' },
];

const cvdFilterMap = {
  none: '',
  protanopia: 'sepia(0.25) hue-rotate(-20deg) saturate(0.85)',
  deuteranopia: 'sepia(0.2) hue-rotate(25deg) saturate(0.9)',
  tritanopia: 'sepia(0.15) hue-rotate(130deg) saturate(0.8)',
};

function setCustomColor(key, value) {
  customColors[key] = value;
  const root = document.documentElement;

  if (key === 'background') {
    root.style.setProperty('--color-bg', value);
    root.style.setProperty('--color-page-background', value);
  }
  if (key === 'text') {
    root.style.setProperty('--color-text', value);
    root.style.setProperty('--color-tab-header-text', value);
  }
  if (key === 'cards') {
    root.style.setProperty('--color-surface', value);
  }
  if (key === 'buttons') {
    root.style.setProperty('--color-cta', value);
    root.style.setProperty('--color-search-button', value);
  }
  if (key === 'links') {
    root.style.setProperty('--color-nav-text', value);
    root.style.setProperty('--color-form-text', value);
  }
  if (key === 'navigation') {
    root.style.setProperty('--color-nav-bg', value);
  }
  if (key === 'headings') {
    root.style.setProperty('--color-heading', value);
  }
  if (key === 'borders') {
    root.style.setProperty('--color-border', value);
    root.style.setProperty('--color-input-background', value);
  }
}

function applyPreset(preset) {
  Object.entries(preset.colors).forEach(([key, value]) => {
    setCustomColor(key, value);
  });
}

function resetColors() {
  Object.entries(defaultColors).forEach(([key, value]) => setCustomColor(key, value));
  brightness.value = 100;
  saturation.value = 100;
  fontSize.value = 100;
  letterSpacing.value = 0;
  lineHeight.value = 1.5;
  cvdMode.value = 'none';
  highContrast.value = false;
  voiceEnabled.value = false;
  voiceListening.value = false;
}

function toggleVoice() {
  voiceEnabled.value = !voiceEnabled.value;
  voiceListening.value = voiceEnabled.value;
}

watch([brightness, saturation, cvdMode], () => {
  const base = `brightness(${brightness.value}%) saturate(${saturation.value}%)`;
  const cvd = cvdFilterMap[cvdMode.value];
  document.body.style.filter = cvd ? `${base} ${cvd}` : base;
});

watch([fontSize, letterSpacing, lineHeight], () => {
  document.documentElement.style.fontSize = `${fontSize.value}%`;
  document.body.style.letterSpacing = `${letterSpacing.value}px`;
  document.body.style.lineHeight = String(lineHeight.value);
});

watch(highContrast, (value) => {
  document.documentElement.classList.toggle('a11y-high-contrast', value);
});

onBeforeUnmount(() => {
  document.body.style.filter = '';
  document.body.style.letterSpacing = '';
  document.body.style.lineHeight = '';
  document.documentElement.style.fontSize = '';
  document.documentElement.classList.remove('a11y-high-contrast');
});
</script>

<template>
  <div class="a11y-menu-wrap">
    <button
      class="a11y-trigger"
      aria-label="Accessibility settings"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="material-icons" aria-hidden="true">accessibility_new</span>
      <span class="a11y-label">Accessibility</span>
      <span v-if="voiceListening" class="listening-dot" aria-hidden="true"></span>
    </button>

    <div v-if="open" class="a11y-overlay" @click="open = false"></div>

    <div v-if="open" class="a11y-panel">
      <div class="a11y-header">
        <h3>Accessibility</h3>
        <button class="reset-btn" @click="resetColors">
          <span class="material-icons">autorenew</span>
          <span>Reset</span>
        </button>
      </div>

      <div class="main-tabs">
        <button
          v-for="tab in mainTabs"
          :key="tab.id"
          class="main-tab"
          :class="{ active: mainTab === tab.id }"
          @click="mainTab = tab.id"
        >
          <span class="material-icons">{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <div class="a11y-content">
        <template v-if="mainTab === 'vision'">
          <button class="voice-btn" :class="{ active: voiceEnabled }" @click="toggleVoice">
            <span class="material-icons">{{ voiceEnabled ? 'mic' : 'mic_off' }}</span>
            <span>{{ voiceEnabled ? 'Listening...' : 'Voice Commands' }}</span>
          </button>

          <p v-if="voiceEnabled" class="hint">Say: "protanopia", "high contrast", "reset"</p>

          <div class="field-group">
            <label>Colour Vision</label>
            <select v-model="cvdMode">
              <option v-for="mode in CVD_MODES" :key="mode.value" :value="mode.value">{{ mode.label }}</option>
            </select>
          </div>

          <div class="switch-row">
            <label>High Contrast</label>
            <button class="switch" :class="{ on: highContrast }" @click="highContrast = !highContrast">
              <span></span>
            </button>
          </div>

          <div class="field-group">
            <div class="range-header"><label>Brightness</label><span>{{ brightness }}%</span></div>
            <input v-model.number="brightness" type="range" min="50" max="150" />
          </div>

          <div class="field-group">
            <div class="range-header"><label>Saturation</label><span>{{ saturation }}%</span></div>
            <input v-model.number="saturation" type="range" min="0" max="200" />
          </div>
        </template>

        <template v-else-if="mainTab === 'colours'">
          <div class="sub-tabs">
            <button :class="{ active: colorTab === 'presets' }" @click="colorTab = 'presets'">
              <span class="material-icons">auto_awesome</span>
              <span>Presets</span>
            </button>
            <button :class="{ active: colorTab === 'custom' }" @click="colorTab = 'custom'">
              <span class="material-icons">visibility</span>
              <span>Custom</span>
            </button>
          </div>

          <div v-if="colorTab === 'presets'" class="preset-grid">
            <button v-for="preset in PRESETS" :key="preset.name" class="preset-item" @click="applyPreset(preset)">
              <div class="swatches">
                <span
                  v-for="(swatch, index) in [preset.colors.background, preset.colors.buttons, preset.colors.text, preset.colors.navigation]"
                  :key="`${preset.name}-${index}`"
                  :style="{ backgroundColor: swatch }"
                ></span>
              </div>
              <span>{{ preset.name }}</span>
            </button>
          </div>

          <div v-else class="custom-grid">
            <label v-for="item in ALL_COLOR_ITEMS" :key="item.key" class="color-input">
              <input
                type="color"
                :value="customColors[item.key]"
                @input="setCustomColor(item.key, $event.target.value)"
              />
              <span>{{ item.label }}</span>
            </label>
          </div>

          <div class="preview" :style="{ backgroundColor: customColors.background, color: customColors.text, borderColor: customColors.borders }">
            <span class="chip" :style="{ backgroundColor: customColors.navigation, color: '#fff' }">Nav</span>
            <span class="preview-heading" :style="{ color: customColors.headings }">Heading</span>
            <span>Body</span>
            <span class="chip" :style="{ backgroundColor: customColors.buttons, color: '#fff' }">Btn</span>
            <span class="preview-link" :style="{ color: customColors.links }">Link</span>
          </div>
        </template>

        <template v-else>
          <div class="field-group">
            <div class="range-header"><label>Text Size</label><span>{{ fontSize }}%</span></div>
            <input v-model.number="fontSize" type="range" min="80" max="150" step="1" />
          </div>

          <div class="field-group">
            <div class="range-header"><label>Letter Spacing</label><span>{{ letterSpacing > 0 ? '+' : '' }}{{ letterSpacing }}px</span></div>
            <input v-model.number="letterSpacing" type="range" min="0" max="5" step="0.5" />
          </div>

          <div class="field-group">
            <div class="range-header"><label>Line Height</label><span>{{ lineHeight.toFixed(1) }}</span></div>
            <input v-model.number="lineHeight" type="range" min="1" max="2.5" step="0.1" />
          </div>

          <div class="preview tuning-preview" :style="{ backgroundColor: customColors.background, color: customColors.text }">
            <p class="preview-heading" :style="{ color: customColors.headings }">Sample Heading</p>
            <p>This is how your text settings look with the current tuning applied.</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AccessibilityMenu.css"></style>
