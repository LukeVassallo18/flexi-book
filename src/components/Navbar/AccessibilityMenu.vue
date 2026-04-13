<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

const CVD_MODES = [
  { value: 'none', label: 'Standard' },
  { value: 'protanopia', label: 'Protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia' },
];

const THEME_VAR_MAP = {
  bg: '--color-bg',
  surface: '--color-surface',
  sectionAlt: '--color-section-alt',
  text: '--color-text',
  heading: '--color-heading',
  textMuted: '--color-text-muted',
  textOnDark: '--color-text-on-dark',
  primary: '--color-primary',
  primaryDark: '--color-primary-dark',
  primaryTint: '--color-primary-tint',
  accentCoral: '--color-accent-coral',
  featureIconBoxBg: '--feature-icon-box-bg',
  cta: '--color-cta',
  star: '--color-star',
  navBg: '--color-nav-bg',
  navText: '--color-nav-text',
  border: '--color-border',
  borderFooter: '--color-border-footer',
  footerBg: '--color-footer-bg',
  heroGradient: '--hero-gradient',
  heroText: '--color-hero-text',
  filterText: '--color-filter-text',
  filterHeading: '--color-filter-heading',
};

const defaultTheme = {
  bg: '#FCFAF8',
  surface: '#FFFFFF',
  sectionAlt: 'rgba(246, 242, 234, 0.30)',
  text: '#181F25',
  heading: '#181F25',
  textMuted: '#6A7581',
  textOnDark: 'rgba(255, 255, 255, 0.70)',
  primary: '#259D91',
  primaryDark: '#1B746B',
  primaryTint: 'rgba(37, 157, 145, 0.10)',
  accentCoral: '#EC7051',
  featureIconBoxBg: 'rgba(37, 157, 145, 0.10)',
  cta: '#EC7051',
  star: '#F4B625',
  navBg: 'rgba(255, 255, 255, 0.80)',
  navText: '#6A7581',
  border: '#E7E2DA',
  borderFooter: 'rgba(255, 255, 255, 0.10)',
  footerBg: '#181F25',
  heroGradient: 'linear-gradient(135deg, #259D91, #1B746B)',
  heroText: '#FFFFFF',
  filterText: '#6A7581',
  filterHeading: '#181F25',
};

const CVD_THEME_OVERRIDES = {
  protanopia: {
    primary: '#2b6dab',
    primaryDark: '#214f83',
    cta: '#3866d0',
    accentCoral: '#3866d0',
    star: '#174dcc',
  },
  deuteranopia: {
    primary: '#3f72b2',
    primaryDark: '#2f588c',
    cta: '#ed9822',
    accentCoral: '#ed9822',
  },
  tritanopia: {
    primary: '#be4d61',
    primaryDark: '#97384c',
    cta: '#35a196',
    accentCoral: '#359f95',
    featureIconBoxBg: '#F2DBDC',
  },
};

const HIGH_CONTRAST_THEME_OVERRIDES = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  sectionAlt: '#FFFFFF',
  text: '#000000',
  heading: '#000000',
  textMuted: '#1F1F1F',
  navBg: '#FFFFFF',
  navText: '#111111',
  border: '#1F1F1F',
  primaryTint: 'rgba(0, 0, 0, 0.08)',
};

const PRESETS = [
  {
    name: 'Ocean Clarity',
    theme: {
      bg: '#F6FAFD',
      surface: '#FFFFFF',
      sectionAlt: '#ECF3FA',
      text: '#102235',
      heading: '#0B1A2A',
      textMuted: '#516579',
      textOnDark: 'rgba(241, 247, 255, 0.88)',
      primary: '#126CA1',
      primaryDark: '#0E527A',
      primaryTint: 'rgba(18, 108, 161, 0.14)',
      cta: '#D9822B',
      star: '#D4A017',
      navBg: 'rgba(255, 255, 255, 0.92)',
      navText: '#415567',
      border: '#BACCE0',
      borderFooter: 'rgba(241, 247, 255, 0.22)',
      footerBg: '#102235',
      heroGradient: 'linear-gradient(135deg, #126CA1, #0E527A)',
      heroText: '#F7FBFF',
    },
  },
  {
    name: 'Amber Slate',
    theme: {
      bg: '#FCF8F2',
      surface: '#FFFFFF',
      sectionAlt: '#F3ECE2',
      text: '#1F2937',
      heading: '#111827',
      textMuted: '#5D6776',
      textOnDark: 'rgba(255, 248, 239, 0.88)',
      primary: '#6C5B7B',
      primaryDark: '#53455F',
      primaryTint: 'rgba(108, 91, 123, 0.14)',
      cta: '#D8892B',
      star: '#D4A017',
      navBg: 'rgba(255, 255, 255, 0.92)',
      navText: '#5A6270',
      border: '#D8CDBE',
      borderFooter: 'rgba(255, 248, 239, 0.22)',
      footerBg: '#2F2A35',
      heroGradient: 'linear-gradient(135deg, #6C5B7B, #53455F)',
      heroText: '#FFF9F2',
    },
  },
  {
    name: 'Nordic Contrast',
    theme: {
      bg: '#F5FAFA',
      surface: '#FFFFFF',
      sectionAlt: '#EAF3F4',
      text: '#102A33',
      heading: '#0C1F26',
      textMuted: '#4D6772',
      textOnDark: 'rgba(239, 250, 255, 0.88)',
      primary: '#0E8A8D',
      primaryDark: '#0B6669',
      primaryTint: 'rgba(14, 138, 141, 0.14)',
      cta: '#C86E2C',
      star: '#D8A928',
      navBg: 'rgba(255, 255, 255, 0.92)',
      navText: '#4A616B',
      border: '#BFD1D5',
      borderFooter: 'rgba(239, 250, 255, 0.22)',
      footerBg: '#102A33',
      heroGradient: 'linear-gradient(135deg, #0E8A8D, #0B6669)',
      heroText: '#F2FCFC',
    },
  },
  {
    name: 'Hi-Vis Focus',
    theme: {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      sectionAlt: '#F2F2F2',
      text: '#000000',
      heading: '#000000',
      textMuted: '#1F1F1F',
      textOnDark: '#FFFFFF',
      primary: '#005A9C',
      primaryDark: '#003F6E',
      primaryTint: 'rgba(0, 90, 156, 0.14)',
      cta: '#C66A00',
      star: '#B38A00',
      navBg: '#FFFFFF',
      navText: '#000000',
      border: '#111111',
      borderFooter: 'rgba(255, 255, 255, 0.35)',
      footerBg: '#111111',
      heroGradient: 'linear-gradient(135deg, #005A9C, #003F6E)',
      heroText: '#FFFFFF',
    },
  },
];

const ALL_COLOR_ITEMS = [
  { key: 'background', label: 'BG' },
  { key: 'text', label: 'Text' },
  { key: 'cards', label: 'Cards' },
  { key: 'buttons', label: 'Btns' },
  { key: 'links', label: 'Links' },
  { key: 'navigation', label: 'Nav' },
  { key: 'headings', label: 'Head' },
  { key: 'filters', label: 'Filt' },
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
  filters: '#6A7581',
  borders: '#E7E2DA',
};

const TARGET_PICKERS = [
  {
    key: 'iconBg',
    label: 'Icon background',
    selector: '.icon-box, .deal-thumb, .hotel-thumb, .rental-thumb',
    themeKey: 'featureIconBoxBg',
  },
  {
    key: 'buttons',
    label: 'Buttons',
    selector: 'button, .btn-primary, .btn-secondary, .search-btn, .page-btn',
    themeKey: 'cta',
  },
  {
    key: 'cards',
    label: 'Cards',
    selector: '.feature-card, .dest-card, .deal-card, .hotel-card, .rental-card, .detail-card, .review-card',
    themeKey: 'surface',
  },
  {
    key: 'navigation',
    label: 'Navigation text',
    selector: '.nav-link, .accessibility-btn, .a11y-trigger',
    themeKey: 'navText',
  },
  {
    key: 'text',
    label: 'Body text',
    selector: 'p, li, span, .subtitle, .deal-details, .review-text',
    themeKey: 'text',
  },
  {
    key: 'headings',
    label: 'Headings',
    selector: 'h1, h2, h3, h4, h5, h6, .section-title',
    themeKey: 'heading',
  },
  {
    key: 'filters',
    label: 'Filters',
    selector: '.filters, .filter-group, .filter-option',
    themeKey: 'filterText',
  },
];

const open = ref(false);
const menuWrapRef = ref(null);
const mainTab = ref('vision');
const colorTab = ref('presets');

const voiceEnabled = ref(false);
const voiceListening = ref(false);
const cvdMode = ref('none');
const cvdSeverity = ref(100);
const highContrast = ref(false);

const brightness = ref(100);
const saturation = ref(100);

const customColors = reactive({ ...defaultColors });
const activeTheme = ref({ ...defaultTheme });
const pickerArmed = ref(false);
const pickedTarget = ref(null);
const pickedColor = ref('#6a7581');
const pickerHint = ref('Click "Pick from page", then click an element to edit its color.');

const mainTabs = [
  { id: 'vision', label: 'Vision', icon: 'visibility_off' },
  { id: 'colours', label: 'Colours', icon: 'palette' },
];

const mainTabIndex = computed(() => {
  const index = mainTabs.findIndex((tab) => tab.id === mainTab.value);
  return index >= 0 ? index : 0;
});

const colourTabIndex = computed(() => (colorTab.value === 'presets' ? 0 : 1));

const cvdClasses = ['cvd-protanopia', 'cvd-deuteranopia', 'cvd-tritanopia'];

function applyCvdClass(mode) {
  const root = document.documentElement;
  root.classList.remove(...cvdClasses);

  if (mode !== 'none') {
    root.classList.add(`cvd-${mode}`);
  }
}

function setCustomColor(key, value) {
  customColors[key] = value;

  if (key === 'background') {
    activeTheme.value.bg = value;
    activeTheme.value.sectionAlt = value;
  }
  if (key === 'text') activeTheme.value.text = value;
  if (key === 'cards') activeTheme.value.surface = value;
  if (key === 'buttons') activeTheme.value.cta = value;
  if (key === 'links') activeTheme.value.navText = value;
  if (key === 'navigation') activeTheme.value.navBg = value;
  if (key === 'headings') activeTheme.value.heading = value;
  if (key === 'filters') {
    activeTheme.value.filterText = value;
    activeTheme.value.filterHeading = value;
  }
  if (key === 'borders') activeTheme.value.border = value;

  applyCurrentTheme(false);
}

function applyTheme(theme, syncCustom = true) {
  const root = document.documentElement;
  const merged = { ...defaultTheme, ...theme };

  Object.entries(THEME_VAR_MAP).forEach(([themeKey, cssVar]) => {
    root.style.setProperty(cssVar, merged[themeKey]);
  });

  root.style.setProperty('--color-page-background', merged.bg);
  root.style.setProperty('--color-tab-header-text', merged.heading);
  root.style.setProperty('--color-search-button', merged.cta);
  root.style.setProperty('--color-input-background', merged.border);
  root.style.setProperty('--color-form-text', merged.navText);

  if (syncCustom) {
    customColors.background = merged.bg;
    customColors.text = merged.text;
    customColors.cards = merged.surface;
    customColors.buttons = merged.cta;
    customColors.links = merged.navText;
    customColors.navigation = merged.navBg;
    customColors.headings = merged.heading;
    customColors.filters = merged.filterText;
    customColors.borders = merged.border;
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseColor(color) {
  if (!color) return null;
  const hex = color.trim();
  const hexMatch = hex.match(/^#([0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const normalized = hexMatch[1];
    return {
      r: Number.parseInt(normalized.slice(0, 2), 16),
      g: Number.parseInt(normalized.slice(2, 4), 16),
      b: Number.parseInt(normalized.slice(4, 6), 16),
      a: 1,
    };
  }

  const rgbaMatch = hex.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgbaMatch) return null;
  const parts = rgbaMatch[1].split(',').map((part) => part.trim());
  if (parts.length < 3) return null;

  return {
    r: Number(parts[0]),
    g: Number(parts[1]),
    b: Number(parts[2]),
    a: parts[3] !== undefined ? Number(parts[3]) : 1,
  };
}

function blendColors(fromColor, toColor, ratio) {
  const from = parseColor(fromColor);
  const to = parseColor(toColor);
  if (!from || !to) return toColor;

  const t = clamp(ratio, 0, 1);
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  const a = from.a + (to.a - from.a) * t;

  if (a < 0.999) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

function colorToHexString(value) {
  const parsed = parseColor(value);
  if (!parsed) return '#6a7581';
  const toHex = (channel) => channel.toString(16).padStart(2, '0');
  return `#${toHex(clamp(Math.round(parsed.r), 0, 255))}${toHex(clamp(Math.round(parsed.g), 0, 255))}${toHex(clamp(Math.round(parsed.b), 0, 255))}`;
}

function detectPickedTarget(element) {
  let bestMatch = null;

  for (const target of TARGET_PICKERS) {
    const closest = element.closest(target.selector);
    if (!closest) continue;

    let distance = 0;
    let node = element;
    while (node && node !== closest) {
      node = node.parentElement;
      distance += 1;
    }

    if (!bestMatch || distance < bestMatch.distance) {
      bestMatch = { target, distance };
    }
  }

  return bestMatch?.target || null;
}

function armTargetPicker() {
  pickerArmed.value = true;
  pickedTarget.value = null;
  pickerHint.value = 'Click any button, card, navigation text, filter, or text on the page.';
}

function cancelTargetPicker() {
  pickerArmed.value = false;
  pickerHint.value = 'Click "Pick from page", then click an element to edit its color.';
}

function updatePickedColorFromText(value) {
  const parsedHex = colorToHexString(value);
  pickedColor.value = parsedHex;
}

function applyPickedColor() {
  if (!pickedTarget.value) return;
  const { themeKey } = pickedTarget.value;
  activeTheme.value[themeKey] = pickedColor.value;

  if (themeKey === 'cta') customColors.buttons = pickedColor.value;
  if (themeKey === 'surface') customColors.cards = pickedColor.value;
  if (themeKey === 'navText') customColors.links = pickedColor.value;
  if (themeKey === 'text') customColors.text = pickedColor.value;
  if (themeKey === 'heading') customColors.headings = pickedColor.value;

  if (themeKey === 'filterText') {
    activeTheme.value.filterHeading = pickedColor.value;
    customColors.filters = pickedColor.value;
  }

  applyCurrentTheme(false);
}

function resolveTheme() {
  const merged = { ...activeTheme.value };

  if (cvdMode.value !== 'none' && CVD_THEME_OVERRIDES[cvdMode.value]) {
    const severityRatio = clamp(cvdSeverity.value / 100, 0, 1);
    const modeOverrides = CVD_THEME_OVERRIDES[cvdMode.value];

    Object.entries(modeOverrides).forEach(([key, targetValue]) => {
      const sourceValue = merged[key] ?? defaultTheme[key];
      merged[key] = blendColors(sourceValue, targetValue, severityRatio);
    });

    merged.heroGradient = `linear-gradient(135deg, ${merged.primary}, ${merged.primaryDark})`;
  }

  if (highContrast.value) {
    Object.assign(merged, HIGH_CONTRAST_THEME_OVERRIDES);
  }

  return merged;
}

function applyCurrentTheme(syncCustom = false) {
  applyTheme(resolveTheme(), syncCustom);
}

function applyPreset(preset) {
  activeTheme.value = { ...defaultTheme, ...preset.theme };
  applyCurrentTheme(true);
}

function resetColors() {
  activeTheme.value = { ...defaultTheme };
  applyCurrentTheme(true);
  brightness.value = 100;
  saturation.value = 100;
  cvdMode.value = 'none';
  highContrast.value = false;
  voiceEnabled.value = false;
  voiceListening.value = false;
  cvdSeverity.value = 100;
  pickerArmed.value = false;
  pickedTarget.value = null;
}

function toggleVoice() {
  voiceEnabled.value = !voiceEnabled.value;
  voiceListening.value = voiceEnabled.value;
}

function handleClickOutside(event) {
  if (!open.value) return;
  if (!menuWrapRef.value) return;
  if (pickerArmed.value) return;

  if (!menuWrapRef.value.contains(event.target)) {
    open.value = false;
  }
}

function handlePagePick(event) {
  if (!open.value || !pickerArmed.value) return;
  if (!menuWrapRef.value) return;
  if (menuWrapRef.value.contains(event.target)) return;

  const match = detectPickedTarget(event.target);
  if (!match) {
    pickerHint.value = 'That item type is not editable. Try buttons, cards, nav, filters, or text.';
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  pickedTarget.value = match;
  const rootStyle = getComputedStyle(document.documentElement);
  const currentColor = rootStyle.getPropertyValue(THEME_VAR_MAP[match.themeKey]).trim() || '#6a7581';
  pickedColor.value = colorToHexString(currentColor);
  pickerHint.value = `Selected: ${match.label}. Choose a color and apply.`;
  pickerArmed.value = false;
}

watch([brightness, saturation], () => {
  const root = document.documentElement;
  root.style.setProperty('--a11y-brightness', `${brightness.value}%`);
  root.style.setProperty('--a11y-saturation', `${saturation.value}%`);
});

watch(cvdMode, (value) => {
  applyCvdClass(value);
  applyCurrentTheme(false);
});

watch(cvdSeverity, () => {
  applyCurrentTheme(false);
});

watch(highContrast, (value) => {
  document.documentElement.classList.toggle('a11y-high-contrast', value);
  applyCurrentTheme(false);
});

onMounted(() => {
  document.addEventListener('pointerdown', handleClickOutside, true);
  document.addEventListener('click', handlePagePick, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleClickOutside, true);
  document.removeEventListener('click', handlePagePick, true);
  document.body.style.letterSpacing = '';
  document.body.style.lineHeight = '';
  document.documentElement.style.fontSize = '';
  document.documentElement.style.removeProperty('--a11y-brightness');
  document.documentElement.style.removeProperty('--a11y-saturation');
  document.documentElement.classList.remove(...cvdClasses);
  document.documentElement.classList.remove('a11y-high-contrast');
});
</script>

<template>
  <div ref="menuWrapRef" class="a11y-menu-wrap">
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

    <div v-if="open && !pickerArmed" class="a11y-overlay" @click="open = false"></div>

    <div v-if="open" class="a11y-panel">
      <div class="a11y-header">
        <h3>Accessibility</h3>
        <button class="reset-btn" @click="resetColors">
          <span class="material-icons">autorenew</span>
          <span>Reset</span>
        </button>
      </div>

      <div
        class="main-tabs"
        :style="{ '--active-index': mainTabIndex, '--tab-count': mainTabs.length }"
      >
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

          <div class="field-group" v-if="cvdMode !== 'none'">
            <div class="range-header"><label>CVD Severity</label><span>{{ cvdSeverity }}%</span></div>
            <input v-model.number="cvdSeverity" type="range" min="0" max="100" step="5" />
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
          <div
            class="sub-tabs"
            :style="{ '--active-index': colourTabIndex, '--tab-count': 2 }"
          >
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
                  v-for="(swatch, index) in [preset.theme.bg, preset.theme.primary, preset.theme.cta, preset.theme.text]"
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

          <div class="picker-box" v-if="colorTab === 'custom'">
            <div class="picker-row">
              <button
                type="button"
                class="picker-btn"
                :class="{ active: pickerArmed }"
                @click="pickerArmed ? cancelTargetPicker() : armTargetPicker()"
              >
                <span class="material-icons">ads_click</span>
                <span>{{ pickerArmed ? 'Cancel picking' : 'Pick from page' }}</span>
              </button>

              <div class="picker-color-wrap" v-if="pickedTarget">
                <label>Color</label>
                <input v-model="pickedColor" type="color" />
                <input
                  class="picker-text-input"
                  type="text"
                  :value="pickedColor"
                  placeholder="#RRGGBB"
                  @change="updatePickedColorFromText($event.target.value)"
                />
              </div>
            </div>

            <p class="picker-hint">{{ pickerHint }}</p>

            <div class="picker-actions" v-if="pickedTarget">
              <span class="picker-target">Target: {{ pickedTarget.label }}</span>
              <button type="button" class="apply-picked-btn" @click="applyPickedColor">Apply color</button>
            </div>
          </div>

          <div class="preview" :style="{ backgroundColor: customColors.background, color: customColors.text, borderColor: customColors.borders }">
            <span class="chip" :style="{ backgroundColor: customColors.navigation, color: '#fff' }">Nav</span>
            <span class="preview-heading" :style="{ color: customColors.headings }">Heading</span>
            <span>Body</span>
            <span class="chip" :style="{ backgroundColor: customColors.buttons, color: '#fff' }">Btn</span>
            <span class="preview-link" :style="{ color: customColors.links }">Link</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped src="./AccessibilityMenu.css"></style>
