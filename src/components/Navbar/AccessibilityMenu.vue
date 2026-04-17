<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { VoiceCommandManager } from '../../services/VoiceCommandManager';

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
  inputText: '--color-input-text',
  inputPlaceholder: '--color-input-placeholder',
  inputIcon: '--color-input-icon',
};

const THEME_CSS_VARS = [
  ...new Set([
    ...Object.values(THEME_VAR_MAP),
    '--color-page-background',
    '--color-tab-header-text',
    '--color-search-button',
    '--color-input-background',
    '--color-form-text',
  ]),
];

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
  inputText: '#BCC5CE',
  inputPlaceholder: '#CDD4DB',
  inputIcon: '#B5BEC8',
};

const CVD_THEME_OVERRIDES = {
  protanopia: {
    primary: '#2b6dab',
    primaryDark: '#214f83',
    cta: '#ed9822',
    accentCoral: '#ed9822',
    star: '#174dcc',
    inputText: '#4F4A43',
    inputPlaceholder: '#7A746C',
    inputIcon: '#4F4A43',
  },
  deuteranopia: {
    primary: '#3f72b2',
    primaryDark: '#2f588c',
    cta: '#ed9822',
    accentCoral: '#ed9822',
    inputText: '#4C647A',
    inputPlaceholder: '#70859A',
    inputIcon: '#4C647A',
  },
  tritanopia: {
    primary: '#be4d61',
    primaryDark: '#97384c',
    cta: '#35a196',
    accentCoral: '#359f95',
    featureIconBoxBg: '#F2DBDC',
    inputText: '#5D5670',
    inputPlaceholder: '#777084',
    inputIcon: '#5D5670',
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
  inputText: '#1F1F1F',
  inputPlaceholder: '#4A4A4A',
  inputIcon: '#1F1F1F',
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

const PICKABLE_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, span, strong, b, em, small, label, a, li, button, input, textarea, select, .material-icons, svg, path, i, div';
const BACKGROUND_HINT_SELECTOR = '.feature-card, .dest-card, .deal-card, .hotel-card, .rental-card, .detail-card, .review-card, .icon-box, .deal-thumb, .hotel-thumb, .rental-thumb, .filters, .search-form, .input-wrap';
const HERO_BACKGROUND_SELECTOR = '.hotels-hero, .flights-hero, .rentals-hero, .hero, [class$="-hero"]';

const open = ref(false);
const menuWrapRef = ref(null);
const mainTab = ref('vision');
const colorTab = ref('presets');

const voiceEnabled = ref(false);
const voiceListening = ref(false);
const voiceSupported = ref(true);
const liveVoiceTranscript = ref('');
const voiceGuideExpanded = ref(false);
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
let hoveredPickElement = null;
let voiceManager = null;

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
  root.style.setProperty('--color-input-text', merged.inputText ?? merged.textMuted);
  root.style.setProperty('--color-input-placeholder', merged.inputPlaceholder ?? merged.textMuted);
  root.style.setProperty('--color-input-icon', merged.inputIcon ?? merged.textMuted);

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

function setPickerCursorState(active) {
  document.documentElement.classList.toggle('a11y-picking', active);
  document.body.classList.toggle('a11y-picking', active);
}

function clearHoveredPickElement() {
  if (hoveredPickElement) {
    hoveredPickElement.classList.remove('a11y-pick-highlight');
    hoveredPickElement = null;
  }
}

function resolveElement(eventTarget) {
  if (!eventTarget) return null;
  if (eventTarget.nodeType === Node.ELEMENT_NODE) return eventTarget;
  if (eventTarget.nodeType === Node.TEXT_NODE) return eventTarget.parentElement;
  return null;
}

function toTitleCase(value) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function friendlyTargetLabel(element, cssProperty) {
  if (cssProperty === 'background' && element.closest(HERO_BACKGROUND_SELECTOR)) {
    return 'Hero background';
  }

  if (cssProperty.startsWith('background')) {
    if (element.matches('.hotel-card, .deal-card, .rental-card, .dest-card, .feature-card')) return 'Card background';
    if (element.matches('.input-wrap, input, textarea, select')) return 'Input background';
    return 'Background';
  }

  if (element.matches('.material-icons')) {
    const iconName = (element.textContent || '').trim();
    if (iconName) {
      const readable = toTitleCase(iconName);
      return `${readable} icon`;
    }
    return 'Icon';
  }

  if (element.matches('svg, path, circle, ellipse, line, polyline, polygon, rect, i')) {
    return 'Icon';
  }

  if (element.matches('button, .search-btn, .page-btn, .clear-btn, .toggle-filters-btn')) {
    return 'Button';
  }

  if (element.matches('h1, h2, h3, h4, h5, h6')) {
    return 'Heading text';
  }

  if (element.matches('a')) {
    return 'Link text';
  }

  if (element.matches('label, p, span, li, strong, b, em, small, div')) {
    return 'Text';
  }

  return 'Element';
}

function getStableClassSelector(element) {
  if (!element || !element.classList || element.classList.length === 0) return null;
  const classNames = Array.from(element.classList)
    .filter((name) => !name.startsWith('a11y-') && !name.startsWith('router-link'))
    .filter((name) => !/^v-/.test(name));

  if (!classNames.length) return null;

  return `.${classNames.join('.')}`;
}

function getElementTagSelector(element) {
  return element.tagName ? element.tagName.toLowerCase() : 'div';
}

function buildGroupSelector(element, cssProperty) {
  const tag = getElementTagSelector(element);

  if (cssProperty === 'background') {
    const hero = element.closest(HERO_BACKGROUND_SELECTOR);
    if (hero?.id) return `#${hero.id}`;
    const heroClass = hero ? getStableClassSelector(hero) : null;
    if (heroClass) return heroClass;
    return HERO_BACKGROUND_SELECTOR;
  }

  if (element.closest('.hotel-tags') && tag === 'span') {
    return '.hotel-tags span';
  }

  if (element.closest('.hotel-bottom') && tag === 'strong') {
    return '.hotel-bottom strong';
  }

  if (element.closest('.hotel-bottom') && element.matches('button')) {
    return '.hotel-bottom button';
  }

  if (element.closest('.amenity')) {
    if (element.matches('.material-icons')) return '.amenity .material-icons';
    return '.amenity';
  }

  if (element.closest('.input-wrap') && element.matches('.material-icons')) {
    return '.input-wrap .material-icons';
  }

  if (element.closest('.filters')) {
    if (element.matches('h2')) return '.filters h2';
    if (element.matches('h3')) return '.filters h3';
    if (element.matches('label, p, span')) return '.filters label, .filters p, .filters span';
  }

  if (cssProperty === 'background-color') {
    const card = element.closest('.hotel-card, .deal-card, .rental-card, .dest-card, .feature-card, .review-card, .detail-card');
    if (card) {
      const cardClass = getStableClassSelector(card);
      if (cardClass) return cardClass;
    }
  }

  const ownClass = getStableClassSelector(element);
  if (ownClass) return `${tag}${ownClass}`;

  const parent = element.parentElement;
  const parentClass = getStableClassSelector(parent);
  if (parentClass) return `${parentClass} ${tag}`;

  return tag;
}

function isTransparentColor(value) {
  if (!value) return true;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'transparent') return true;
  const rgbaMatch = normalized.match(/^rgba\(([^)]+)\)$/);
  if (!rgbaMatch) return false;
  const parts = rgbaMatch[1].split(',').map((part) => part.trim());
  if (parts.length < 4) return false;
  return Number(parts[3]) === 0;
}

function hasDirectText(element) {
  return Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0,
  );
}

function inferPropertyForElement(element) {
  if (element.matches(HERO_BACKGROUND_SELECTOR) || element.closest(HERO_BACKGROUND_SELECTOR)) {
    return 'background';
  }

  if (element.matches('path, circle, ellipse, line, polyline, polygon, rect')) {
    return 'fill';
  }

  if (element.matches('.material-icons, svg, i, input, textarea, select, option')) {
    return 'color';
  }

  if (hasDirectText(element) || element.matches('h1, h2, h3, h4, h5, h6, p, span, strong, b, em, small, label, a, li, button')) {
    return 'color';
  }

  if (element.matches(BACKGROUND_HINT_SELECTOR)) {
    return 'background-color';
  }

  const computed = window.getComputedStyle(element);
  if (!hasDirectText(element) && (!isTransparentColor(computed.backgroundColor) || computed.backgroundImage !== 'none')) {
    return computed.backgroundImage !== 'none' ? 'background' : 'background-color';
  }

  return 'color';
}

function firstColorFromGradient(value) {
  if (!value) return null;
  const match = value.match(/(#(?:[0-9a-fA-F]{6})|rgba?\([^)]+\))/);
  return match ? match[1] : null;
}

function sampleEffectiveColor(element, cssProperty) {
  if (!element) return '#6a7581';

  if (cssProperty === 'background') {
    const style = window.getComputedStyle(element);
    const fromGradient = firstColorFromGradient(style.backgroundImage);
    if (fromGradient) return fromGradient;
    if (!isTransparentColor(style.backgroundColor)) return style.backgroundColor;
    const rootPrimary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    return rootPrimary || '#259d91';
  }

  let node = element;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const value = style.getPropertyValue(cssProperty);
    if (cssProperty === 'fill' && (!value || value === 'none')) {
      const fallback = style.color;
      if (!isTransparentColor(fallback)) return fallback;
    }
    if (!isTransparentColor(value)) {
      return value;
    }
    node = node.parentElement;
  }
  const endStyle = window.getComputedStyle(element);
  return endStyle.getPropertyValue(cssProperty) || endStyle.color || '#6a7581';
}

function detectPickedTarget(element) {
  const startEl = resolveElement(element);
  if (!startEl) return null;

  let pickEl = startEl.matches(PICKABLE_SELECTOR)
    ? startEl
    : startEl.closest(PICKABLE_SELECTOR) || startEl;

  let cssProperty = inferPropertyForElement(pickEl);

  if (cssProperty === 'background') {
    const heroEl = pickEl.closest(HERO_BACKGROUND_SELECTOR);
    if (heroEl) {
      pickEl = heroEl;
      cssProperty = 'background';
    }
  }

  const sampledColor = sampleEffectiveColor(pickEl, cssProperty);
  const groupSelector = buildGroupSelector(pickEl, cssProperty);
  const groupElements = Array.from(document.querySelectorAll(groupSelector)).filter((node) => !menuWrapRef.value?.contains(node));

  return {
    element: pickEl,
    cssProperty,
    sampledColor,
    groupSelector,
    groupSize: groupElements.length || 1,
    label: friendlyTargetLabel(pickEl, cssProperty),
  };
}

function armTargetPicker() {
  pickerArmed.value = true;
  pickedTarget.value = null;
  setPickerCursorState(true);
  pickerHint.value = 'Picker on. Click any exact element (text, icon, button, card) to edit only that element.';
}

function cancelTargetPicker() {
  pickerArmed.value = false;
  setPickerCursorState(false);
  clearHoveredPickElement();
  pickerHint.value = 'Click "Pick from page", then click an element to edit its color.';
}

function updatePickedColorFromText(value) {
  const parsedHex = colorToHexString(value);
  pickedColor.value = parsedHex;
}

function applyPickedColor() {
  if (!pickedTarget.value) return;
  const { element, cssProperty, groupSelector } = pickedTarget.value;
  if (!element?.isConnected) {
    pickerHint.value = 'Selected element is no longer on the page. Pick again.';
    return;
  }

  const targets = Array.from(document.querySelectorAll(groupSelector)).filter((node) => !menuWrapRef.value?.contains(node));
  const applyTo = targets.length ? targets : [element];

  applyTo.forEach((targetEl) => {
    if (!targetEl.dataset.a11yOriginalStyle) {
      targetEl.dataset.a11yOriginalStyle = targetEl.getAttribute('style') || '';
    }

    if (cssProperty === 'background') {
      targetEl.style.setProperty('background-image', 'none', 'important');
      targetEl.style.setProperty('background-color', pickedColor.value, 'important');
    } else {
      targetEl.style.setProperty(cssProperty, pickedColor.value, 'important');
    }
    targetEl.dataset.a11yColorApplied = '1';

    if (cssProperty === 'fill') {
      targetEl.style.setProperty('color', pickedColor.value, 'important');
    }
  });

  pickerHint.value = `Applied ${pickedColor.value} to ${pickedTarget.value.label} (${applyTo.length} matching element${applyTo.length === 1 ? '' : 's'}).`;
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

function clearInlineThemeOverrides() {
  const root = document.documentElement;
  THEME_CSS_VARS.forEach((cssVar) => {
    root.style.removeProperty(cssVar);
  });
}

function clearElementCustomOverrides() {
  const nodes = document.querySelectorAll('[data-a11y-color-applied="1"]');
  nodes.forEach((node) => {
    const originalStyle = node.dataset.a11yOriginalStyle || '';
    if (originalStyle) {
      node.setAttribute('style', originalStyle);
    } else {
      node.removeAttribute('style');
    }
    delete node.dataset.a11yColorApplied;
    delete node.dataset.a11yOriginalStyle;
  });
}

function clearAllCustomColorOverrides() {
  clearInlineThemeOverrides();
  clearElementCustomOverrides();
  voiceManager?.clearScopedTargetRules?.();
  voiceManager?.clearContext?.();
}

function applyNativeVisionScheme(mode) {
  if (!CVD_MODES.some((entry) => entry.value === mode) || mode === 'none') return;

  clearAllCustomColorOverrides();
  highContrast.value = false;
  activeTheme.value = { ...defaultTheme };
  Object.assign(customColors, defaultColors);
  applyCvdClass(mode);
}

function applyPreset(preset) {
  activeTheme.value = { ...defaultTheme, ...preset.theme };
  applyCurrentTheme(true);
}

function resetColors() {
  window.location.reload();
}

function applyVoiceVisionPreset(mode) {
  if (mode === 'highcontrast') {
    highContrast.value = true;
    applyCurrentTheme(false);
    return;
  }

  if (CVD_MODES.some((entry) => entry.value === mode)) {
    cvdMode.value = mode;
  }
}

function setVoiceVisionMode(mode) {
  cvdMode.value = mode && CVD_MODES.some((entry) => entry.value === mode)
    ? mode
    : 'none';
  return cvdMode.value;
}

function resetThemeFromVoice() {
  highContrast.value = false;
  cvdMode.value = 'none';
  cvdSeverity.value = 100;
  brightness.value = 100;
  saturation.value = 100;
  activeTheme.value = { ...defaultTheme };
  applyCurrentTheme(true);
}

function toggleVoice() {
  if (!voiceManager) return;

  if (!voiceSupported.value) {
    voiceManager.showSupportFallback();
    return;
  }

  if (voiceEnabled.value) {
    voiceManager.stop();
  } else {
    voiceManager.start();
  }
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
    pickerHint.value = 'Could not detect a target here. Try clicking directly on text or an icon.';
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  pickedTarget.value = {
    label: match.label,
    element: match.element,
    cssProperty: match.cssProperty,
    groupSelector: match.groupSelector,
    groupSize: match.groupSize,
  };
  pickedColor.value = colorToHexString(match.sampledColor);
  pickerHint.value = `Selected: ${match.label} (${match.groupSize} matching element${match.groupSize === 1 ? '' : 's'}). Choose a color and apply.`;
  pickerArmed.value = false;
  setPickerCursorState(false);
  clearHoveredPickElement();
}

function handlePagePickHover(event) {
  if (!open.value || !pickerArmed.value) return;
  if (!menuWrapRef.value) return;
  if (menuWrapRef.value.contains(event.target)) {
    clearHoveredPickElement();
    return;
  }

  const match = detectPickedTarget(event.target);
  if (!match) {
    clearHoveredPickElement();
    return;
  }

  if (hoveredPickElement && hoveredPickElement !== match.element) {
    hoveredPickElement.classList.remove('a11y-pick-highlight');
  }

  hoveredPickElement = match.element;
  hoveredPickElement.classList.add('a11y-pick-highlight');
}

watch([brightness, saturation], () => {
  const root = document.documentElement;
  root.style.setProperty('--a11y-brightness', `${brightness.value}%`);
  root.style.setProperty('--a11y-saturation', `${saturation.value}%`);
});

watch(cvdMode, (value) => {
  if (value !== 'none') {
    applyNativeVisionScheme(value);
    return;
  }

  applyCvdClass(value);
  applyCurrentTheme(false);
});

watch(cvdSeverity, () => {
  if (cvdMode.value !== 'none') return;
  applyCurrentTheme(false);
});

watch(highContrast, (value) => {
  if (cvdMode.value !== 'none' && value) {
    highContrast.value = false;
    document.documentElement.classList.remove('a11y-high-contrast');
    return;
  }

  document.documentElement.classList.toggle('a11y-high-contrast', value);
  if (cvdMode.value !== 'none') return;
  applyCurrentTheme(false);
});

watch(open, (value) => {
  if (!value && pickerArmed.value) {
    cancelTargetPicker();
  }

  if (!value) {
    voiceGuideExpanded.value = false;
  }
});

onMounted(() => {
  voiceManager = new VoiceCommandManager().init(null, {
    onStateChange: ({ active, supported }) => {
      voiceEnabled.value = Boolean(active);
      voiceListening.value = Boolean(active);
      voiceSupported.value = supported !== false;

      if (!active) {
        liveVoiceTranscript.value = '';
      }
    },
    onTranscriptChange: ({ text }) => {
      liveVoiceTranscript.value = text || '';
    },
    controls: {
      getBrightness: () => brightness.value,
      setBrightness: (value) => {
        brightness.value = clamp(value, 50, 150);
        return brightness.value;
      },
      getSaturation: () => saturation.value,
      setSaturation: (value) => {
        saturation.value = clamp(value, 0, 200);
        return saturation.value;
      },
      getHighContrast: () => highContrast.value,
      setHighContrast: (value) => {
        if (cvdMode.value !== 'none') {
          highContrast.value = false;
          document.documentElement.classList.remove('a11y-high-contrast');
          return false;
        }
        highContrast.value = Boolean(value);
        applyCurrentTheme(false);
        return highContrast.value;
      },
      getVisionMode: () => cvdMode.value,
      setVisionMode: (mode) => setVoiceVisionMode(mode),
      applyVisionPreset: (mode) => {
        applyVoiceVisionPreset(mode);
        return mode;
      },
      resetTheme: () => {
        resetThemeFromVoice();
      },
    },
  });

  voiceSupported.value = voiceManager.isSupported;

  document.addEventListener('pointerdown', handleClickOutside, true);
  document.addEventListener('pointermove', handlePagePickHover, true);
  document.addEventListener('click', handlePagePick, true);
});

onBeforeUnmount(() => {
  if (voiceManager) {
    voiceManager.destroy();
    voiceManager = null;
  }

  document.removeEventListener('pointerdown', handleClickOutside, true);
  document.removeEventListener('pointermove', handlePagePickHover, true);
  document.removeEventListener('click', handlePagePick, true);
  clearHoveredPickElement();
  setPickerCursorState(false);
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

          <div v-if="voiceSupported" class="voice-guide">
            <div class="voice-guide-header">
              <p class="hint">Need ideas? Open the command guide for examples you can say.</p>
              <button
                type="button"
                class="voice-guide-toggle"
                :aria-expanded="voiceGuideExpanded"
                @click="voiceGuideExpanded = !voiceGuideExpanded"
              >
                <span class="material-icons" aria-hidden="true">{{ voiceGuideExpanded ? 'expand_less' : 'expand_more' }}</span>
                <span>{{ voiceGuideExpanded ? 'Hide command guide' : 'Show command guide' }}</span>
              </button>
            </div>

            <div v-if="voiceGuideExpanded" class="voice-guide-card">
              <div class="voice-guide-group">
                <p class="voice-guide-title">Quick starters</p>
                <div class="voice-guide-chips">
                  <span>“Change navigation text to black”</span>
                  <span>“Change card background to white”</span>
                  <span>“Make filter text darker”</span>
                </div>
              </div>

              <div class="voice-guide-group">
                <p class="voice-guide-title">Adjustments</p>
                <div class="voice-guide-chips">
                  <span>“A bit more”</span>
                  <span>“Less saturated”</span>
                  <span>“Buttons too”</span>
                </div>
              </div>

              <div class="voice-guide-group">
                <p class="voice-guide-title">Vision modes</p>
                <div class="voice-guide-chips">
                  <span>“Turn on protanopia”</span>
                  <span>“Turn off deuteranopia”</span>
                  <span>“Standard vision”</span>
                </div>
              </div>

              <div class="voice-guide-group">
                <p class="voice-guide-title">System controls</p>
                <div class="voice-guide-chips">
                  <span>“Increase brightness”</span>
                  <span>“Set brightness to 120”</span>
                  <span>“High contrast on”</span>
                </div>
              </div>
            </div>

            <p v-if="liveVoiceTranscript" class="voice-live">
              <span class="material-icons" aria-hidden="true">graphic_eq</span>
              <span>{{ liveVoiceTranscript }}</span>
            </p>
          </div>
          <p v-else class="hint">Voice commands are unavailable in this browser.</p>

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
            <div class="range-header">
              <label>
                <span class="material-icons" aria-hidden="true">light_mode</span>
                <span>Brightness</span>
              </label>
              <span>{{ brightness }}%</span>
            </div>
            <input v-model.number="brightness" type="range" min="50" max="150" />
          </div>

          <div class="field-group">
            <div class="range-header">
              <label>
                <span class="material-icons" aria-hidden="true">palette</span>
                <span>Saturation</span>
              </label>
              <span>{{ saturation }}%</span>
            </div>
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
              <span class="picker-target">Target: {{ pickedTarget.label }} ({{ pickedTarget.cssProperty }})</span>
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
