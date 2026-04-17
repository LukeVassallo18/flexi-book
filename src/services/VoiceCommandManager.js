const CVD_PRESETS = {
  deuteranopia: {
    '--color-bg': '#F7FAFD',
    '--color-surface': '#EAF3FB',
    '--color-section-alt': 'rgba(226, 236, 247, 0.60)',
    '--color-text': '#10253A',
    '--color-heading': '#0A1B2D',
    '--color-text-muted': '#4C647A',
    '--color-text-on-dark': 'rgba(255, 255, 255, 0.86)',
    '--color-primary': '#E69F00',
    '--color-primary-dark': '#B97D00',
    '--color-primary-tint': 'rgba(230, 159, 0, 0.18)',
    '--color-accent-coral': '#E69F00',
    '--feature-icon-box-bg': 'rgba(230, 159, 0, 0.14)',
    '--color-cta': '#E69F00',
    '--color-star': '#174DCC',
    '--color-nav-bg': 'rgba(247, 250, 253, 0.92)',
    '--color-nav-text': '#17344D',
    '--color-border': '#C8D8E8',
    '--color-border-footer': 'rgba(255, 255, 255, 0.20)',
    '--color-footer-bg': '#0A1B2D',
    '--hero-gradient': 'linear-gradient(135deg, #3F72B2, #2F588C)',
    '--color-hero-text': '#F7FBFF',
    '--color-filter-text': '#4C647A',
    '--color-filter-heading': '#0A1B2D',
    '--color-input-text': '#4C647A',
    '--color-input-placeholder': '#70859A',
    '--color-input-icon': '#4C647A',
    '--color-page-background': '#F7FAFD',
  },
  protanopia: {
    '--color-bg': '#FCF9F2',
    '--color-surface': '#FFF6EA',
    '--color-section-alt': 'rgba(255, 242, 221, 0.62)',
    '--color-text': '#111111',
    '--color-heading': '#0A0A0A',
    '--color-text-muted': '#4F4A43',
    '--color-text-on-dark': 'rgba(255, 255, 255, 0.88)',
    '--color-primary': '#56B4E9',
    '--color-primary-dark': '#2D89BF',
    '--color-primary-tint': 'rgba(86, 180, 233, 0.18)',
    '--color-accent-coral': '#56B4E9',
    '--feature-icon-box-bg': 'rgba(86, 180, 233, 0.14)',
    '--color-cta': '#56B4E9',
    '--color-star': '#174DCC',
    '--color-nav-bg': 'rgba(255, 250, 243, 0.94)',
    '--color-nav-text': '#1B1B1B',
    '--color-border': '#E7DCCB',
    '--color-border-footer': 'rgba(255, 255, 255, 0.20)',
    '--color-footer-bg': '#121212',
    '--hero-gradient': 'linear-gradient(135deg, #56B4E9, #2D89BF)',
    '--color-hero-text': '#FFFFFF',
    '--color-filter-text': '#4F4A43',
    '--color-filter-heading': '#101010',
    '--color-input-text': '#4F4A43',
    '--color-input-placeholder': '#7A746C',
    '--color-input-icon': '#4F4A43',
    '--color-page-background': '#FCF9F2',
  },
  tritanopia: {
    '--color-bg': '#FAF5FF',
    '--color-surface': '#F1E9FF',
    '--color-section-alt': 'rgba(236, 225, 255, 0.60)',
    '--color-text': '#151321',
    '--color-heading': '#0F0C1A',
    '--color-text-muted': '#5D5670',
    '--color-text-on-dark': 'rgba(255, 255, 255, 0.88)',
    '--color-primary': '#D55E00',
    '--color-primary-dark': '#A14600',
    '--color-primary-tint': 'rgba(213, 94, 0, 0.20)',
    '--color-accent-coral': '#D55E00',
    '--feature-icon-box-bg': 'rgba(213, 94, 0, 0.13)',
    '--color-cta': '#D55E00',
    '--color-star': '#174DCC',
    '--color-nav-bg': 'rgba(250, 245, 255, 0.92)',
    '--color-nav-text': '#26203A',
    '--color-border': '#D8CCF3',
    '--color-border-footer': 'rgba(255, 255, 255, 0.22)',
    '--color-footer-bg': '#1A1528',
    '--hero-gradient': 'linear-gradient(135deg, #D55E00, #A14600)',
    '--color-hero-text': '#FFFFFF',
    '--color-filter-text': '#5D5670',
    '--color-filter-heading': '#0F0C1A',
    '--color-input-text': '#5D5670',
    '--color-input-placeholder': '#777084',
    '--color-input-icon': '#5D5670',
    '--color-page-background': '#FAF5FF',
  },
  highcontrast: {
    '--color-bg': '#000000',
    '--color-surface': '#000000',
    '--color-section-alt': '#000000',
    '--color-text': '#FFFFFF',
    '--color-heading': '#FFFFFF',
    '--color-text-muted': '#FFFFFF',
    '--color-text-on-dark': '#FFFFFF',
    '--color-primary': '#FFFF00',
    '--color-primary-dark': '#E3E300',
    '--color-primary-tint': 'rgba(255, 255, 0, 0.20)',
    '--color-accent-coral': '#FFFF00',
    '--feature-icon-box-bg': 'rgba(255, 255, 0, 0.16)',
    '--color-cta': '#FFFF00',
    '--color-star': '#FFFF00',
    '--color-nav-bg': '#000000',
    '--color-nav-text': '#FFFFFF',
    '--color-border': '#FFFFFF',
    '--color-border-footer': 'rgba(255, 255, 255, 0.40)',
    '--color-footer-bg': '#000000',
    '--hero-gradient': 'linear-gradient(135deg, #000000, #0B0B0B)',
    '--color-hero-text': '#FFFFFF',
    '--color-filter-text': '#FFFFFF',
    '--color-filter-heading': '#FFFFFF',
    '--color-input-text': '#FFFFFF',
    '--color-input-placeholder': '#FFFFFF',
    '--color-input-icon': '#FFFFFF',
    '--color-page-background': '#000000',
  },
};

const RESET_TOKENS = {
  '--color-heading': '#181F25',
  '--color-text': '#181F25',
  '--color-text-muted': '#6A7581',
  '--color-filter-text': '#6A7581',
  '--color-filter-heading': '#181F25',
  '--color-input-text': '#BCC5CE',
  '--color-input-placeholder': '#CDD4DB',
  '--color-input-icon': '#B5BEC8',
  '--color-text-on-dark': 'rgba(255, 255, 255, 0.70)',
  '--color-primary': '#259D91',
  '--color-primary-dark': '#1B746B',
  '--color-primary-tint': 'rgba(37, 157, 145, 0.10)',
  '--feature-icon-box-bg': 'var(--color-primary-tint)',
  '--hero-gradient': 'linear-gradient(135deg, #259D91, #1B746B)',
  '--color-cta': '#EC7051',
  '--color-accent-coral': '#EC7051',
  '--color-star': '#F4B625',
  '--color-bg': '#FCFAF8',
  '--color-surface': '#ffffff',
  '--color-section-alt': 'rgba(246, 242, 234, 0.30)',
  '--color-nav-bg': 'rgba(255, 255, 255, 0.80)',
  '--color-nav-text': '#3F4B57',
  '--color-footer-bg': '#181F25',
  '--color-border': '#E7E2DA',
  '--color-border-footer': 'rgba(255, 255, 255, 0.10)',
  '--color-page-background': '#FCFAF8',
  '--color-hero-text': '#ffffff',
};

const TARGET_SYNONYMS = {
  cards: [
    "card",
    "cards",
    "tile",
    "tiles",
    "panel",
    "panels",
    "grid cards",
    "grid card",
  ],
  cardText: [
    "card text",
    "cards text",
    "grid cards text",
    "grid card text",
    "card words",
    "cards words",
  ],
  cardIcons: [
    "card icon",
    "card icons",
    "cards icon",
    "cards icons",
    "grid cards icon",
    "grid card icon",
  ],
  text: [
    "text",
    "words",
    "font",
    "copy",
    "content",
    "body text",
    "paragraph",
    "paragraphs",
    "labels",
  ],
  headings: ["heading", "headings", "header text", "heading text"],
  background: [
    "background",
    "page",
    "backdrop",
    "page background",
    "site background",
    "screen",
  ],
  all: ["everything", "all", "entire", "whole app", "whole page", "whole site"],
  buttons: [
    "button",
    "buttons",
    "cta",
    "search button",
    "book button",
    "action button",
    "action buttons",
  ],
  navBackground: [
    "navigation colour",
    "navigation color",
    "navigation background",
    "navbar colour",
    "navbar color",
    "nav background",
    "menu background",
    "navigation bar",
  ],
  links: [
    "link",
    "links",
    "navigation",
    "nav",
    "menu",
    "navigation text",
    "nav text",
    "menu text",
    "navbar",
    "navbar text",
  ],
  borders: ["border", "borders", "outline", "lines", "stroke", "strokes"],
  icons: ["icon", "icons", "symbol", "symbols", "logo", "logos"],
  filters: ["filter", "filters", "sidebar", "side panel", "filter panel"],
  inputText: [
    "input text",
    "inputs text",
    "input",
    "inputs",
    "placeholder",
    "placeholders",
    "field text",
    "form text",
    "destination text",
    "search field",
    "search fields",
  ],
  inputBackground: [
    "input background",
    "input text background",
    "input field background",
    "field background",
    "form field background",
  ],
  stars: ["star", "stars", "rating", "ratings"],
  formBackground: [
    "form background",
    "search form background",
    "hero form background",
  ],
  tabText: [
    "tab text",
    "tabs text",
    "tab label",
    "tab labels",
    "form tab text",
  ],
  heroBackground: [
    "hero",
    "banner",
    "header background",
    "hero section",
    "hero background",
  ],
  heroText: [
    "hero text",
    "banner text",
    "header text",
    "title",
    "titles",
    "hero heading",
    "hero title",
  ],
  heroTitle: ["title", "titles", "title only", "hero title"],
};

const TARGET_PHRASES = {
  links: [
    "navigation text",
    "nav text",
    "menu text",
    "navbar text",
    "navigation links",
    "menu links",
  ],
  navBackground: [
    "navigation colour",
    "navigation color",
    "navigation background",
    "navbar colour",
    "navbar color",
    "nav colour",
    "nav color",
    "menu background",
  ],
  cards: [
    "card background",
    "cards background",
    "grid cards background",
    "card colour",
    "cards colour",
    "card color",
    "cards color",
    "grid cards colour",
    "grid cards color",
  ],
  cardText: [
    "card text",
    "cards text",
    "grid card text",
    "grid cards text",
    "card text colour",
    "card text color",
  ],
  cardIcons: [
    "card icon colour",
    "card icon color",
    "cards icon colour",
    "cards icon color",
    "grid cards icon colour",
    "grid cards icon color",
  ],
  buttons: [
    "button background",
    "buttons background",
    "button colour",
    "buttons colour",
    "button color",
    "buttons color",
  ],
  text: ["body text", "paragraph text", "main text"],
  headings: ["heading text", "headings text"],
  filters: [
    "filter text",
    "filters text",
    "filter text colour",
    "filter text color",
  ],
  inputText: [
    "input text",
    "input text colour",
    "input text color",
    "placeholder text",
    "placeholder colour",
    "placeholder color",
    "destination text",
    "form text",
    "field text",
  ],
  inputBackground: [
    "input background",
    "input text background",
    "input text and background",
    "input field background",
    "field background",
    "form field background",
  ],
  background: ["page background", "site background", "screen background"],
  borders: ["border colour", "border color", "outline colour", "outline color"],
  formBackground: [
    "form background",
    "search form background",
    "hero form background",
  ],
  tabText: [
    "tab text",
    "tabs text",
    "tab label",
    "tab labels",
    "form tab text",
  ],
  heroBackground: ["hero background", "banner background", "header background"],
  heroText: ["hero text", "banner text", "header text"],
  heroTitle: ["title", "titles", "title only", "hero title"],
};

const TARGET_PRIORITY = [
  "navBackground",
  "links",
  "cardText",
  "cardIcons",
  "cards",
  "icons",
  "buttons",
  "headings",
  "filters",
  "inputBackground",
  "formBackground",
  "tabText",
  "inputText",
  "stars",
  "borders",
  "heroTitle",
  "heroText",
  "heroBackground",
  "text",
  "background",
  "all",
];

const ACTION_VERB_PATTERN = /\b(make|change|set|turn|update|switch|apply|paint|color|colour)\b/;
const CONTINUATION_PATTERN = /\b(too|also|as\s+well|same|it|them)\b/;
const RESET_TERMS = ['reset colours', 'reset colors', 'undo', 'go back to default', 'default theme', 'reset'];
const HELP_MESSAGE =
  "You can change navigation background, navigation text, icons, cards background, card text, card icons, input text, input background, filter text, headings, stars, buttons, hero background, hero title, background, or borders. You can also say: make hero title lighter, change hero title to white, make filter text darker, change input text background, buttons too, increase brightness, turn on protanopia, or turn off deuteranopia.";
const SMALL_STEP_PATTERN = /\b(a bit|a little|a little bit|little bit|slightly|somewhat|tiny bit)\b/;
const LARGE_STEP_PATTERN = /\b(a lot|much|way more|way less|far more|far less|significantly)\b/;
const GENERIC_MORE_PATTERN = /\b(more|increase|higher|stronger)\b/;
const GENERIC_LESS_PATTERN = /\b(less|decrease|lower|reduce|weaker)\b/;
const TOO_DARK_PATTERN = /\b(too dark)\b/;
const TOO_LIGHT_PATTERN = /\b(too light|too pale|too faint)\b/;
const TOO_BRIGHT_PATTERN = /\b(too bright)\b/;
const BRIGHTNESS_TERMS = ['brightness', 'screen brightness', 'page brightness'];
const SATURATION_TERMS = ['saturation', 'saturate', 'saturated', 'vibrancy', 'vibrant', 'vivid'];
const LIGHTNESS_STEPS = { small: 0.08, default: 0.14, large: 0.22 };
const SATURATION_STEPS = { small: 0.12, default: 0.18, large: 0.30 };
const CONTROL_STEPS = {
  brightness: { small: 8, default: 12, large: 18 },
  saturation: { small: 10, default: 18, large: 28 },
};
const CONTROL_LIMITS = {
  brightness: { min: 50, max: 150, defaultValue: 100, label: 'brightness' },
  saturation: { min: 0, max: 200, defaultValue: 100, label: 'saturation' },
};

const CARD_TARGET_SELECTOR = [
  '.feature-card',
  '.dest-card',
  '.deal-card',
  '.hotel-card',
  '.rental-card',
  '.detail-card',
  '.review-card',
  '.summary-card',
  '.cart-item',
  '.cart-item-card',
  '.search-card',
  '.section-card',
  '.sidebar-card',
  '[class$="-card"]',
].join(', ');

const BUTTON_TARGET_SELECTOR = [
  '.search-btn',
  '.book-btn',
  '.checkout-btn',
  '.toggle-filters-btn',
  '.clear-btn',
  '.page-btn',
  '.back-btn',
  '.recommend-btn',
  '.btn-primary',
  '.btn-secondary',
  '.remove-btn',
  '.view-details-btn',
  '.secondary-btn',
  '.primary-btn',
  '.proceed-btn',
  '.cart-btn',
  '.signin-btn',
  '.accessibility-btn',
  '.cta-btn',
  '.deal-bottom button',
  '.hotel-bottom button',
  '.rental-bottom button',
].join(', ');

const ICON_TARGET_SELECTOR = '.material-icons, .material-symbols-outlined, svg, i, [class*="icon"]';
const GLOBAL_HIGHLIGHT_SELECTOR = [
  '#app',
  '.navbar',
  '.hero',
  '.flights-hero',
  '.hotels-hero',
  '.rentals-hero',
  '.search-form',
  '.search-card',
  '.filters',
  '.input-wrap',
  CARD_TARGET_SELECTOR,
  BUTTON_TARGET_SELECTOR,
].join(', ');

const VISION_MODE_ALIASES = {
  protanopia: /\b(protanopia|protenopia|protanopium|protenopium|protonopia)\b|\bpro\s*(?:ten|to|ta)?\s*op(?:ia|ium)\b/,
  deuteranopia: /\b(deuteranopia|dueteranopia|deutranopia|duteranopia)\b|\bdeu?\s*(?:ter|tur|tra)?\s*anop(?:ia|ium)\b/,
  tritanopia: /\b(tritanopia|trytanopia|tritonopia)\b|\btr(?:i|y)\s*(?:tan|ton)?\s*op(?:ia|ium)\b/,
};

const TARGET_TO_VARS = {
  cards: [],
  cardText: [],
  cardIcons: [],
  text: [
    "--color-text",
    "--color-heading",
    "--color-text-muted",
    "--color-filter-text",
    "--color-filter-heading",
  ],
  headings: ["--color-heading", "--color-filter-heading"],
  background: ["--color-bg", "--color-page-background"],
  buttons: [],
  navBackground: ["--color-nav-bg"],
  links: ["--color-nav-text"],
  borders: ["--color-border", "--color-border-footer"],
  icons: [],
  filters: ["--color-filter-text", "--color-filter-heading"],
  inputText: [
    "--color-input-text",
    "--color-input-placeholder",
    "--color-input-icon",
    "--color-form-text",
  ],
  inputBackground: ["--color-input-background"],
  formBackground: [],
  tabText: [],
  stars: ["--color-star"],
  hero: ["--hero-gradient"],
  heroBackground: ["--hero-gradient"],
  heroText: ["--color-hero-text"],
  heroTitle: ["--color-hero-text"],
  all: [
    "--color-bg",
    "--color-page-background",
    "--color-surface",
    "--color-section-alt",
    "--feature-icon-box-bg",
    "--color-text",
    "--color-heading",
    "--color-text-muted",
    "--color-filter-text",
    "--color-filter-heading",
    "--color-input-text",
    "--color-input-placeholder",
    "--color-input-icon",
    "--color-primary",
    "--color-primary-dark",
    "--color-cta",
    "--color-accent-coral",
    "--color-nav-text",
    "--color-border",
    "--color-star",
  ],
};

const TARGET_HIGHLIGHT_SELECTORS = {
  cards: CARD_TARGET_SELECTOR,
  cardText: `${CARD_TARGET_SELECTOR} h1, ${CARD_TARGET_SELECTOR} h2, ${CARD_TARGET_SELECTOR} h3, ${CARD_TARGET_SELECTOR} h4, ${CARD_TARGET_SELECTOR} h5, ${CARD_TARGET_SELECTOR} h6, ${CARD_TARGET_SELECTOR} p, ${CARD_TARGET_SELECTOR} span, ${CARD_TARGET_SELECTOR} li, ${CARD_TARGET_SELECTOR} a, ${CARD_TARGET_SELECTOR} label, ${CARD_TARGET_SELECTOR} strong, ${CARD_TARGET_SELECTOR} small`,
  cardIcons: `${CARD_TARGET_SELECTOR} .material-icons, ${CARD_TARGET_SELECTOR} .material-symbols-outlined, ${CARD_TARGET_SELECTOR} svg, ${CARD_TARGET_SELECTOR} i, ${CARD_TARGET_SELECTOR} [class*="icon"]`,
  buttons: BUTTON_TARGET_SELECTOR,
  icons: ICON_TARGET_SELECTOR,
  navBackground: ".navbar, .nav-links, .navbar-left, .navbar-right",
  links: ".navbar a, .nav-links a, a",
  text: "p, span, li, label, input, select, textarea",
  headings: "h1, h2, h3, h4, h5, h6",
  filters:
    ".filters h2, .filters .filter-group h3, .filters .filter-group label, .filters .filter-group p",
  inputText:
    ".input-wrap input, .input-wrap select, .input-wrap .material-icons",
  inputBackground:
    ".input-wrap, .input-wrap input, .input-wrap select, .input-wrap textarea",
  formBackground: ".search-shell, .search-card",
  tabText:
    ".travel-tabs .tab, .travel-tabs .tab .material-icons, .travel-tabs .tab span",
  stars: ".rating .material-icons, .material-icons.star",
  hero: '.hero, .flights-hero, .hotels-hero, .rentals-hero, [class$="-hero"]',
  heroBackground:
    '.hero, .flights-hero, .hotels-hero, .rentals-hero, [class$="-hero"]',
  heroText:
    '.hero h1, .hero h2, .hero h3, .hero p, .flights-hero h1, .flights-hero h2, .flights-hero h3, .flights-hero p, .hotels-hero h1, .hotels-hero h2, .hotels-hero h3, .hotels-hero p, .rentals-hero h1, .rentals-hero h2, .rentals-hero h3, .rentals-hero p, [class$="-hero"] h1, [class$="-hero"] h2, [class$="-hero"] h3, [class$="-hero"] p',
  heroTitle:
    '.hero h1, .hero h2, .hero h3, .hero p, .flights-hero h1, .flights-hero h2, .flights-hero h3, .flights-hero p, .hotels-hero h1, .hotels-hero h2, .hotels-hero h3, .hotels-hero p, .rentals-hero h1, .rentals-hero h2, .rentals-hero h3, .rentals-hero p, [class$="-hero"] h1, [class$="-hero"] h2, [class$="-hero"] h3, [class$="-hero"] p',
  background: `body, .search-form, .filters, .input-wrap, ${CARD_TARGET_SELECTOR}`,
  borders: `.search-form, .filters, .input-wrap, ${CARD_TARGET_SELECTOR}, .a11y-panel`,
  all: GLOBAL_HIGHLIGHT_SELECTOR,
};

const NAMED_COLORS = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  orange: '#ffa500',
  purple: '#800080',
  pink: '#ff69b4',
  gray: '#808080',
  grey: '#808080',
  brown: '#8b4513',
  navy: '#001f3f',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  teal: '#008080',
  beige: '#f5f5dc',
  gold: '#ffd700',
  silver: '#c0c0c0',
  maroon: '#800000',
  olive: '#808000',
  lime: '#00ff00',
  aqua: '#00ffff',
  turquoise: '#40e0d0',
  violet: '#8f00ff',
  indigo: '#4b0082',
  coral: '#ff7f50',
  salmon: '#fa8072',
  cream: '#fffdd0',
  ivory: '#fffff0',
  charcoal: '#36454f',
};

class VoiceCommandManager {
  constructor() {
    this.button = null;
    this.recognition = null;
    this.isActive = false;
    this.isSupported = false;
    this.toastEl = null;
    this.fallbackEl = null;
    this.restartOnEnd = false;
    this.onStateChange = null;
    this.onTranscriptChange = null;
    this.boundButtonHandler = null;
    this.scopedStyleEl = null;
    this.highlightStyleEl = null;
    this.scopedRules = {};
    this.lastTargets = [];
    this.lastColor = null;
    this.lastColorLabel = null;
    this.lastTargetColors = {};
    this.lastCommandContext = null;
    this.controls = null;
    this.transcriptClearTimer = null;
    this.autoRestartEnabled = true;
  }

  init(buttonElement, options = {}) {
    this.button = buttonElement || null;
    this.onStateChange = typeof options.onStateChange === 'function' ? options.onStateChange : null;
    this.onTranscriptChange = typeof options.onTranscriptChange === 'function' ? options.onTranscriptChange : null;
    this.controls = this.createControls(options.controls || {});
    this.ensureToast();
    this.ensureHighlightStyleElement();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.isSupported = false;
      this.showSupportFallback();
      return this;
    }

    this.isSupported = true;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.autoRestartEnabled = !this.isBraveBrowser();

    this.recognition.onresult = (event) => this.handleResult(event);
    this.recognition.onerror = (event) => this.handleError(event);
    this.recognition.onend = () => {
      if (this.restartOnEnd && this.isActive && this.autoRestartEnabled) {
        this.safeStart();
      }
    };

    if (this.button) {
      this.wireButton(this.button);
    }

    return this;
  }

  wireButton(buttonElement) {
    this.button = buttonElement;
    this.button.setAttribute('aria-pressed', 'false');
    this.button.classList.remove('active');

    this.boundButtonHandler = () => {
      if (!this.isSupported) {
        this.showSupportFallback();
        return;
      }

      if (this.isActive) {
        this.stop();
      } else {
        this.start();
      }
    };

    this.button.addEventListener('click', this.boundButtonHandler);
  }

  start() {
    if (!this.recognition || this.isActive) return;
    this.isActive = true;
    this.restartOnEnd = true;
    this.updateButtonState();
    this.safeStart();
    this.emitTranscript('Listening…', false);
    this.speakAndToast('Voice commands are now active.', { icon: '🎤' });
  }

  stop() {
    if (!this.recognition) return;
    this.isActive = false;
    this.restartOnEnd = false;
    this.updateButtonState();
    this.emitTranscript('', false);
    try {
      this.recognition.stop();
    } catch (_) {
      // no-op
    }
    this.speakAndToast('Voice commands stopped.', { icon: '🛑' });
  }

  safeStart() {
    try {
      this.recognition.start();
    } catch (_) {
      // no-op: start can throw if called while already active
    }
  }

  updateButtonState() {
    if (this.button) {
      this.button.setAttribute('aria-pressed', this.isActive ? 'true' : 'false');
      this.button.classList.toggle('active', this.isActive);
    }

    if (this.onStateChange) {
      this.onStateChange({ active: this.isActive, supported: this.isSupported });
    }
  }

  handleResult(event) {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      const transcript = (result[0]?.transcript || '').toLowerCase().trim();
      const confidence = Number(result[0]?.confidence || 0);

      if (!transcript) continue;

      if (!result.isFinal) {
        interimTranscript = transcript;
        continue;
      }

      this.emitTranscript(transcript, true);

      // Chrome sometimes reports confidence=0 even for valid speech; only reject when confidence is explicitly low.
      if (confidence > 0 && confidence < 0.45) {
        this.speakAndToast('I am not fully sure. Please repeat that command more clearly.', { icon: '⚠️' });
        continue;
      }

      this.processTranscript(transcript);

      window.clearTimeout(this.transcriptClearTimer);
      this.transcriptClearTimer = window.setTimeout(() => {
        this.emitTranscript('', false);
      }, 1500);
    }

    if (interimTranscript) {
      this.emitTranscript(interimTranscript, false);
    }
  }

  handleError(event) {
    if (!event || !event.error) {
      this.speakAndToast('Sorry, there was a microphone issue. Please try again.', { icon: '⚠️' });
      return;
    }

    if (event.error === 'no-speech') return;

    if (event.error === "aborted") {
      // Some browsers emit aborted during normal stop/restart cycles.
      return;
    }

    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      this.isActive = false;
      this.restartOnEnd = false;
      this.updateButtonState();
      if (this.isBraveBrowser()) {
        this.speakAndToast(
          "Brave is blocking voice service. Turn Shields down for this site, keep microphone allowed, then reload.",
          { icon: "🛡️" },
        );
        return;
      }

      this.speakAndToast('Microphone access is blocked. Please allow microphone permissions and try again.', { icon: '🚫' });
      return;
    }

    if (event.error === "network") {
      if (this.isBraveBrowser()) {
        this.speakAndToast(
          "Voice service is blocked by Brave network/privacy settings. Turn Shields down for this site and reload.",
          { icon: "🛡️" },
        );
        return;
      }

      this.speakAndToast(
        "Network issue while using voice recognition. Please check connection and try again.",
        { icon: "📶" },
      );
      return;
    }

    this.speakAndToast('Sorry, there was a microphone issue. Please try again.', { icon: '⚠️' });
  }

  isBraveBrowser() {
    return Boolean(window?.navigator?.brave);
  }

  emitTranscript(text, isFinal = false) {
    if (!this.onTranscriptChange) return;
    this.onTranscriptChange({ text, isFinal });
  }

  createControls(overrides = {}) {
    const defaults = {
      getBrightness: () => this.readPercentCssVar('--a11y-brightness', CONTROL_LIMITS.brightness.defaultValue),
      setBrightness: (value) => {
        const nextValue = this.clampNumber(value, CONTROL_LIMITS.brightness.min, CONTROL_LIMITS.brightness.max);
        document.documentElement.style.setProperty('--a11y-brightness', `${nextValue}%`);
        return nextValue;
      },
      getSaturation: () => this.readPercentCssVar('--a11y-saturation', CONTROL_LIMITS.saturation.defaultValue),
      setSaturation: (value) => {
        const nextValue = this.clampNumber(value, CONTROL_LIMITS.saturation.min, CONTROL_LIMITS.saturation.max);
        document.documentElement.style.setProperty('--a11y-saturation', `${nextValue}%`);
        return nextValue;
      },
      getHighContrast: () => document.documentElement.classList.contains('a11y-high-contrast'),
      setHighContrast: (enabled) => {
        document.documentElement.classList.toggle('a11y-high-contrast', Boolean(enabled));
        return Boolean(enabled);
      },
      getVisionMode: () => {
        const root = document.documentElement;
        if (root.classList.contains('cvd-protanopia')) return 'protanopia';
        if (root.classList.contains('cvd-deuteranopia')) return 'deuteranopia';
        if (root.classList.contains('cvd-tritanopia')) return 'tritanopia';
        return 'none';
      },
      setVisionMode: (mode) => {
        this.clearModeClasses();
        if (mode && mode !== 'none') {
          document.documentElement.classList.add(`cvd-${mode}`);
        }
        return mode || 'none';
      },
      applyVisionPreset: null,
      resetTheme: null,
    };

    return { ...defaults, ...overrides };
  }

  processTranscript(transcript) {
    const parsed = this.parseCommand(transcript);

    if (!parsed) {
      this.speakAndToast(
        "I didn't catch that. Try saying: change cards to blue, make the text a bit less dark, or increase brightness.",
        { icon: '🤔' },
      );
      return;
    }

    if (parsed.intent === 'HELP') {
      this.speakAndToast(HELP_MESSAGE, { icon: '💡' });
      return;
    }

    if (parsed.intent === 'RESET') {
      this.resetExperience();
      return;
    }

    if (parsed.intent === 'APPLY_PRESET') {
      this.applyPreset(parsed.preset);
      return;
    }

    if (parsed.intent === 'SET_VISION_MODE') {
      this.setVisionMode(parsed.mode);
      return;
    }

    if (parsed.intent === 'SET_COLOUR') {
      this.applyColorToTargets(parsed.targets, parsed.color, parsed.colorLabel);
      return;
    }

    if (parsed.intent === 'ADJUST_COLOUR') {
      this.adjustTargetsColor(parsed.targets, parsed.axis, parsed.delta);
      return;
    }

    if (parsed.intent === 'SET_CONTROL') {
      this.setAccessibilityControl(parsed.control, parsed.value);
      return;
    }

    if (parsed.intent === 'ADJUST_CONTROL') {
      this.adjustAccessibilityControl(parsed.control, parsed.delta);
      return;
    }

    if (parsed.intent === 'SET_HIGH_CONTRAST') {
      this.setHighContrast(parsed.enabled);
      return;
    }
  }

  parseCommand(transcript) {
    const text = transcript.toLowerCase();
    const normalized = text.replace(/[^a-z0-9#(),\s-]/g, ' ').replace(/\s+/g, ' ').trim();
    const colorToken = this.extractColorToken(normalized);
    const color = colorToken?.value || null;
    const colorLabel = colorToken?.label || 'selected colour';
    const targets = this.extractTargets(normalized);
    const setVerb = ACTION_VERB_PATTERN.test(normalized);
    const hasContinuation = CONTINUATION_PATTERN.test(normalized);
    const intensity = this.extractIntensity(normalized);

    if (this.containsAny(normalized, ['what can i say', 'help', 'commands', 'command list', 'what are my options'])) {
      return { intent: 'HELP' };
    }

    if (this.containsAny(normalized, RESET_TERMS)) {
      return { intent: 'RESET' };
    }

    const accessibilityCommand = this.extractAccessibilityCommand(normalized, intensity, targets);
    if (accessibilityCommand) {
      return accessibilityCommand;
    }

    const visionModeCommand = this.extractVisionModeCommand(normalized);
    if (visionModeCommand) {
      return visionModeCommand;
    }

    const presetMatch = this.extractPreset(normalized);
    if (presetMatch) {
      return { intent: 'APPLY_PRESET', preset: presetMatch };
    }

    const explicitColorAdjustment = this.extractExplicitColorAdjustment(normalized, targets, intensity);
    if (explicitColorAdjustment) {
      return explicitColorAdjustment;
    }

    if (setVerb && color) {
      const resolvedTargets = targets.length ? targets : this.lastTargets;
      if (resolvedTargets.length) {
        return { intent: 'SET_COLOUR', color, colorLabel, targets: resolvedTargets };
      }
    }

    if (!color && targets.length && this.lastColor && (hasContinuation || this.containsAny(normalized, ['same colour', 'same color', 'same shade']))) {
      return { intent: 'SET_COLOUR', color: this.lastColor, colorLabel: this.lastColorLabel || 'selected colour', targets };
    }

    const relativeContinuation = this.extractRelativeContinuation(normalized, targets, intensity);
    if (relativeContinuation) {
      return relativeContinuation;
    }

    return null;
  }

  containsAny(text, terms) {
    return terms.some((term) => text.includes(term));
  }

  extractPreset(text) {
    const normalized = text.toLowerCase();
    const compact = normalized
      .replace(/\b10\b/g, 'ten')
      .replace(/[^a-z]/g, '');

    const compactVariants = {
      protanopia: ['protanopia', 'protenopia', 'protanopium', 'protenopium', 'protonopia', 'protenopiummode'],
      deuteranopia: ['deuteranopia', 'dueteranopia', 'deutranopia', 'duteranopia'],
      tritanopia: ['tritanopia', 'trytanopia', 'tritonopia'],
    };

    if (
      VISION_MODE_ALIASES.deuteranopia.test(normalized)
      || compactVariants.deuteranopia.some((token) => compact.includes(token))
    ) return 'deuteranopia';

    if (
      VISION_MODE_ALIASES.protanopia.test(normalized)
      || compactVariants.protanopia.some((token) => compact.includes(token))
    ) return 'protanopia';

    if (
      VISION_MODE_ALIASES.tritanopia.test(normalized)
      || compactVariants.tritanopia.some((token) => compact.includes(token))
    ) return 'tritanopia';

    return null;
  }

  extractVisionModeCommand(text) {
    const requestedMode = this.extractPreset(text);
    const turnOffRequested = /\b(turn off|switch off|disable|stop|remove|exit)\b/.test(text);
    const standardModeRequested = /\b(standard|normal|default)\s+(vision|mode|colou?r vision|theme)?\b/.test(text)
      || /\b(turn off|disable|remove)\s+(colou?r vision|vision mode)\b/.test(text);

    if (requestedMode) {
      return {
        intent: 'SET_VISION_MODE',
        mode: turnOffRequested ? 'none' : requestedMode,
      };
    }

    if (standardModeRequested) {
      return { intent: 'SET_VISION_MODE', mode: 'none' };
    }

    return null;
  }

  extractTargets(text) {
    const phraseMatchedTargets = new Set();
    const wantsMultiTarget = /\b(and|plus|also|too|as well|&|then)\b/.test(text) || text.includes(',');

    for (const [target, phrases] of Object.entries(TARGET_PHRASES)) {
      const phraseMatch = phrases.some((phrase) => {
        const safe = this.escapeRegExp(phrase);
        return new RegExp(`\\b${safe}\\b`, 'i').test(text);
      });
      if (phraseMatch) phraseMatchedTargets.add(target);
    }

    const foundTargets = new Set();
    if (phraseMatchedTargets.size) {
      if (wantsMultiTarget) {
        phraseMatchedTargets.forEach((target) => foundTargets.add(target));
      } else {
        for (const preferred of TARGET_PRIORITY) {
          if (phraseMatchedTargets.has(preferred)) {
            foundTargets.add(preferred);
            break;
          }
        }
      }
    }

    const scores = {};
    for (const [target, words] of Object.entries(TARGET_SYNONYMS)) {
      let score = 0;
      words.forEach((word) => {
        const safe = this.escapeRegExp(word);
        if (new RegExp(`\\b${safe}\\b`, 'i').test(text)) {
          score += 1;
        }
      });
      if (score > 0) {
        scores[target] = score;
      }
    }

    if (Object.keys(scores).length > 0 && (wantsMultiTarget || phraseMatchedTargets.size === 0)) {
      const bestScore = Math.max(...Object.values(scores));
      const bestTargets = Object.keys(scores).filter((key) => scores[key] === bestScore);

      for (const preferred of TARGET_PRIORITY) {
        if (bestTargets.includes(preferred)) {
          foundTargets.add(preferred);
          if (!wantsMultiTarget) break;
        }
      }

      if (wantsMultiTarget) {
        Object.entries(scores).forEach(([target, score]) => {
          if (score >= 1) foundTargets.add(target);
        });
      }
    }

    const hasCardContext = /\b(grid cards?|grid card|cards?|card)\b/.test(text);
    if (hasCardContext) {
      if (/\b(text|words|font|copy)\b/.test(text)) {
        foundTargets.add('cardText');
        foundTargets.delete('text');
      }

      if (/\b(icon|icons)\b/.test(text) && !/\ball icons?\b/.test(text)) {
        foundTargets.add('cardIcons');
        foundTargets.delete('icons');
      }

      if (
        /\b(background|colour|color|shade)\b/.test(text)
        && !/\b(page|site|screen)\s+background\b/.test(text)
      ) {
        foundTargets.add('cards');
        foundTargets.delete('background');
      }
    }

    if (
      foundTargets.has('inputBackground')
      && foundTargets.has('inputText')
      && /\b(input text background|input field background|form field background|field background)\b/.test(text)
      && !/\b(input text and (input )?background|input background and (input )?text)\b/.test(text)
    ) {
      foundTargets.delete('inputText');
    }

    if (foundTargets.has('inputText') || foundTargets.has('inputBackground')) {
      foundTargets.delete('text');
      if (foundTargets.has('inputBackground')) {
        foundTargets.delete('background');
      }
    }

    if (foundTargets.has('cardText')) {
      foundTargets.delete('text');
    }

    if (foundTargets.has('cardIcons')) {
      foundTargets.delete('icons');
    }

    if (foundTargets.has("background")) {
      const explicitPageBackground = /\b(page|site|screen)\s+background\b/.test(
        text,
      );
      if (!explicitPageBackground) {
        foundTargets.delete("background");
        foundTargets.add("heroBackground");
      }
    }

    if (foundTargets.has('all')) return ['all'];

    const ordered = TARGET_PRIORITY.filter((target) => foundTargets.has(target));
    return ordered;
  }

  extractTarget(text) {
    const targets = this.extractTargets(text);
    return targets[0] || null;
  }

  escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  extractColor(text) {
    const token = this.extractColorToken(text);
    return token?.value || null;
  }

  extractColorToken(text) {
    const hexMatch = text.match(/#([0-9a-f]{3}|[0-9a-f]{6})\b/i);
    if (hexMatch) {
      const hex = hexMatch[0];
      const normalized = hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;
      return { value: normalized, label: 'selected shade' };
    }

    const rgbMatch = text.match(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/i);
    if (rgbMatch) return { value: rgbMatch[0], label: 'selected shade' };

    const sortedNames = Object.keys(NAMED_COLORS).sort((a, b) => b.length - a.length);
    const found = sortedNames.find((name) => new RegExp(`\\b${name}\\b`, 'i').test(text));
    if (found) return { value: NAMED_COLORS[found], label: found };

    return null;
  }

  extractIntensity(text) {
    if (LARGE_STEP_PATTERN.test(text)) return 'large';
    if (SMALL_STEP_PATTERN.test(text)) return 'small';
    return 'default';
  }

  extractAccessibilityCommand(text, intensity, targets = []) {
    const hasScopedTargets = targets.length > 0 && !targets.includes('all');
    const highContrastIntent = this.extractHighContrastIntent(text);
    if (highContrastIntent !== null) {
      return { intent: 'SET_HIGH_CONTRAST', enabled: highContrastIntent };
    }

    if (this.containsAny(text, BRIGHTNESS_TERMS)) {
      const numericValue = this.extractNumericValue(text);
      if (numericValue !== null) {
        return { intent: 'SET_CONTROL', control: 'brightness', value: numericValue };
      }

      if (TOO_BRIGHT_PATTERN.test(text) || this.hasDarkerIntent(text)) {
        return { intent: 'ADJUST_CONTROL', control: 'brightness', delta: -this.getControlStep('brightness', intensity) };
      }

      if (TOO_DARK_PATTERN.test(text) || this.hasLighterIntent(text)) {
        return { intent: 'ADJUST_CONTROL', control: 'brightness', delta: this.getControlStep('brightness', intensity) };
      }

      const relation = this.extractGenericRelation(text);
      if (relation !== 0) {
        return { intent: 'ADJUST_CONTROL', control: 'brightness', delta: relation * this.getControlStep('brightness', intensity) };
      }
    }

    if (this.containsAny(text, SATURATION_TERMS)) {
      if (hasScopedTargets) return null;

      const numericValue = this.extractNumericValue(text);
      if (numericValue !== null) {
        return { intent: 'SET_CONTROL', control: 'saturation', value: numericValue };
      }

      if (this.hasMoreSaturationIntent(text)) {
        return { intent: 'ADJUST_CONTROL', control: 'saturation', delta: this.getControlStep('saturation', intensity) };
      }

      if (this.hasLessSaturationIntent(text)) {
        return { intent: 'ADJUST_CONTROL', control: 'saturation', delta: -this.getControlStep('saturation', intensity) };
      }

      const relation = this.extractGenericRelation(text);
      if (relation !== 0) {
        return { intent: 'ADJUST_CONTROL', control: 'saturation', delta: relation * this.getControlStep('saturation', intensity) };
      }
    }

    return null;
  }

  extractExplicitColorAdjustment(text, targets, intensity) {
    const scopedTargets = targets.length ? targets : this.lastTargets;
    if (!scopedTargets.length) return null;

    if (TOO_DARK_PATTERN.test(text) || this.hasLighterIntent(text)) {
      return {
        intent: 'ADJUST_COLOUR',
        axis: 'lightness',
        delta: this.getColorStep('lightness', intensity),
        targets: scopedTargets,
      };
    }

    if (TOO_LIGHT_PATTERN.test(text) || TOO_BRIGHT_PATTERN.test(text) || this.hasDarkerIntent(text)) {
      return {
        intent: 'ADJUST_COLOUR',
        axis: 'lightness',
        delta: -this.getColorStep('lightness', intensity),
        targets: scopedTargets,
      };
    }

    if (this.hasMoreSaturationIntent(text)) {
      return {
        intent: 'ADJUST_COLOUR',
        axis: 'saturation',
        delta: this.getColorStep('saturation', intensity),
        targets: scopedTargets,
      };
    }

    if (this.hasLessSaturationIntent(text)) {
      return {
        intent: 'ADJUST_COLOUR',
        axis: 'saturation',
        delta: -this.getColorStep('saturation', intensity),
        targets: scopedTargets,
      };
    }

    return null;
  }

  extractRelativeContinuation(text, targets, intensity) {
    const relation = this.extractGenericRelation(text);
    const context = this.lastCommandContext;
    if (!context) return null;

    const hasRelativeSignal = relation !== 0 || TOO_DARK_PATTERN.test(text) || TOO_LIGHT_PATTERN.test(text) || TOO_BRIGHT_PATTERN.test(text);
    if (!hasRelativeSignal) return null;

    if (context.kind === 'target-colour') {
      const resolvedTargets = targets.length ? targets : context.targets || this.lastTargets;
      if (!resolvedTargets.length) return null;

      if (TOO_DARK_PATTERN.test(text)) {
        return {
          intent: 'ADJUST_COLOUR',
          axis: 'lightness',
          delta: this.getColorStep('lightness', intensity),
          targets: resolvedTargets,
        };
      }

      if (TOO_LIGHT_PATTERN.test(text) || TOO_BRIGHT_PATTERN.test(text)) {
        return {
          intent: 'ADJUST_COLOUR',
          axis: 'lightness',
          delta: -this.getColorStep('lightness', intensity),
          targets: resolvedTargets,
        };
      }

      if (relation === 0) return null;

      return {
        intent: 'ADJUST_COLOUR',
        axis: context.axis,
        delta: context.direction * relation * this.getColorStep(context.axis, intensity),
        targets: resolvedTargets,
      };
    }

    if (context.kind === 'accessibility-control') {
      if (context.control === 'contrast') {
        if (TOO_BRIGHT_PATTERN.test(text) || relation < 0) {
          return { intent: 'SET_HIGH_CONTRAST', enabled: false };
        }

        if (relation > 0) {
          return { intent: 'SET_HIGH_CONTRAST', enabled: true };
        }

        return null;
      }

      if (context.control === 'brightness') {
        if (TOO_BRIGHT_PATTERN.test(text)) {
          return { intent: 'ADJUST_CONTROL', control: 'brightness', delta: -this.getControlStep('brightness', intensity) };
        }

        if (TOO_DARK_PATTERN.test(text)) {
          return { intent: 'ADJUST_CONTROL', control: 'brightness', delta: this.getControlStep('brightness', intensity) };
        }
      }

      if (relation === 0) return null;

      return {
        intent: 'ADJUST_CONTROL',
        control: context.control,
        delta: context.direction * relation * this.getControlStep(context.control, intensity),
      };
    }

    return null;
  }

  extractGenericRelation(text) {
    const hasMore = GENERIC_MORE_PATTERN.test(text);
    const hasLess = GENERIC_LESS_PATTERN.test(text);

    if (hasMore === hasLess) return 0;
    return hasMore ? 1 : -1;
  }

  extractHighContrastIntent(text) {
    const mentionsContrast = /\b(high\s*contrast|highcontrast|contrast mode)\b/.test(text);

    if (this.containsAny(text, ['turn off high contrast', 'disable high contrast', 'high contrast off', 'less contrast', 'normal contrast', 'contrast off'])) {
      return false;
    }

    if (this.containsAny(text, ['turn on high contrast', 'enable high contrast', 'switch to high contrast', 'activate high contrast', 'use high contrast', 'high contrast on', 'more contrast'])) {
      return true;
    }

    if (mentionsContrast) {
      return true;
    }

    return null;
  }

  extractNumericValue(text) {
    const targettedMatch = text.match(/\b(?:to|at)\s+(\d{1,3})(?:\s*(?:%|percent))?\b/);
    if (targettedMatch) return Number(targettedMatch[1]);

    if (!ACTION_VERB_PATTERN.test(text)) return null;

    const plainMatch = text.match(/\b(\d{1,3})(?:\s*(?:%|percent))?\b/);
    if (plainMatch) return Number(plainMatch[1]);

    return null;
  }

  hasDarkerIntent(text) {
    return /\b(darker|darken|deeper|more dark|less light|less bright)\b/.test(text);
  }

  hasLighterIntent(text) {
    return /\b(lighter|lighten|brighter|more light|less dark)\b/.test(text);
  }

  hasMoreSaturationIntent(text) {
    return /\b(more saturated|increase saturation|more saturation|more vibrant|more vivid|richer|stronger colour|stronger color)\b/.test(text);
  }

  hasLessSaturationIntent(text) {
    return /\b(less saturated|decrease saturation|less saturation|desaturate|more muted|muted|less vibrant|less vivid|softer colour|softer color)\b/.test(text);
  }

  getColorStep(axis, intensity) {
    const stepSet = axis === 'saturation' ? SATURATION_STEPS : LIGHTNESS_STEPS;
    return stepSet[intensity] || stepSet.default;
  }

  getControlStep(control, intensity) {
    const stepSet = CONTROL_STEPS[control];
    if (!stepSet) return 0;
    return stepSet[intensity] || stepSet.default;
  }

  applyPreset(presetName) {
    const preset = CVD_PRESETS[presetName];
    if (!preset) return;

    this.clearScopedTargetRules();
    this.clearContext();

    if (this.controls?.applyVisionPreset) {
      this.controls.applyVisionPreset(presetName);
      this.highlightTarget('all');
      this.speakAndToast(`Successfully applied ${presetName.replace('highcontrast', 'high contrast')} mode.`, { icon: '✅' });
      return;
    }

    this.clearModeClasses();
    this.applyTokens(preset);
    this.highlightTarget('all');
    this.speakAndToast(`Successfully applied ${presetName.replace('highcontrast', 'high contrast')} mode.`, { icon: '✅' });
  }

  setVisionMode(mode) {
    const nextMode = mode || 'none';
    this.clearScopedTargetRules();
    this.clearContext();

    if (this.controls?.setVisionMode) {
      this.controls.setVisionMode(nextMode);
    } else if (nextMode === 'none') {
      this.clearModeClasses();
      this.applyTokens(RESET_TOKENS);
    } else {
      this.clearModeClasses();
      this.applyTokens(CVD_PRESETS[nextMode] || {});
    }

    this.highlightTarget('all');

    if (nextMode === 'none') {
      this.speakAndToast('Successfully turned off colour vision mode.', { icon: '✅' });
      return;
    }

    this.speakAndToast(`Successfully turned on ${nextMode}.`, { icon: '✅' });
  }

  clearModeClasses() {
    const root = document.documentElement;
    root.classList.remove('cvd-protanopia', 'cvd-deuteranopia', 'cvd-tritanopia', 'a11y-high-contrast');
  }

  resetExperience() {
    this.clearScopedTargetRules();
    this.clearContext();

    if (this.controls?.resetTheme) {
      this.controls.resetTheme();
    } else {
      this.clearModeClasses();
      this.applyTokens(RESET_TOKENS);
      this.controls?.setBrightness?.(CONTROL_LIMITS.brightness.defaultValue);
      this.controls?.setSaturation?.(CONTROL_LIMITS.saturation.defaultValue);
      this.controls?.setHighContrast?.(false);
    }

    this.highlightTarget('all');
    this.speakAndToast('Successfully reset colours to default.', { icon: '✅' });
  }

  applyColorToTargets(targets, color, colorLabel = 'selected colour') {
    const targetList = Array.isArray(targets) ? targets : [targets];
    const uniqueTargets = [...new Set(targetList)].filter(Boolean);

    uniqueTargets.forEach((target) => {
      this.applyColorToTarget(target, color, { silent: true });
      this.highlightTarget(target);
    });

    if (uniqueTargets.length) {
      this.rememberTargetColorContext(uniqueTargets, color, colorLabel);
    }

    const targetLabel = uniqueTargets.length > 1
      ? uniqueTargets.map((target) => this.formatTargetName(target)).join(', ')
      : this.formatTargetName(uniqueTargets[0]);
    this.speakAndToast(`Successfully changed ${targetLabel} colour to ${colorLabel}.`, { icon: '✅' });
  }

  applyColorToTarget(target, color, options = {}) {
    const { silent = false } = options;
    const root = document.documentElement;

    if (target === 'cards') {
      this.setScopedTargetRule(
        'cards',
        `
        ${CARD_TARGET_SELECTOR} {
          background: ${color} !important;
          background-color: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === 'icons') {
      this.setScopedTargetRule(
        'icons',
        `
        ${ICON_TARGET_SELECTOR} {
          color: ${color} !important;
          fill: ${color} !important;
          stroke: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === 'cardText') {
      this.setScopedTargetRule(
        'cardText',
        `
        ${TARGET_HIGHLIGHT_SELECTORS.cardText} {
          color: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === 'cardIcons') {
      this.setScopedTargetRule(
        'cardIcons',
        `
        ${TARGET_HIGHLIGHT_SELECTORS.cardIcons} {
          color: ${color} !important;
          fill: ${color} !important;
          stroke: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === 'buttons') {
      const readableTextColor = this.getReadableTextColor(color);
      const hoverColor = this.adjustColorBrightness(color, -0.18);

      this.setScopedTargetRule(
        'buttons',
        `
        ${BUTTON_TARGET_SELECTOR} {
          background: ${color} !important;
          background-color: ${color} !important;
          border-color: ${color} !important;
          color: ${readableTextColor} !important;
        }

        ${BUTTON_TARGET_SELECTOR}:hover,
        ${BUTTON_TARGET_SELECTOR}:focus-visible {
          background: ${hoverColor} !important;
          background-color: ${hoverColor} !important;
          border-color: ${hoverColor} !important;
          color: ${readableTextColor} !important;
        }

        ${BUTTON_TARGET_SELECTOR} .material-icons,
        ${BUTTON_TARGET_SELECTOR} svg,
        ${BUTTON_TARGET_SELECTOR} i {
          color: ${readableTextColor} !important;
          fill: ${readableTextColor} !important;
          stroke: ${readableTextColor} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === 'inputBackground') {
      this.setScopedTargetRule(
        'inputBackground',
        `
        ${TARGET_HIGHLIGHT_SELECTORS.inputBackground} {
          background: ${color} !important;
          background-color: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
      return;
    }

    if (target === "formBackground") {
      this.setScopedTargetRule(
        "formBackground",
        `
        ${TARGET_HIGHLIGHT_SELECTORS.formBackground} {
          background: ${color} !important;
          background-color: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent)
        this.speakAndToast(
          `Successfully changed ${this.formatTargetName(target)} colour to selected colour.`,
          { icon: "✅" },
        );
      return;
    }

    if (target === "tabText") {
      this.setScopedTargetRule(
        "tabText",
        `
        ${TARGET_HIGHLIGHT_SELECTORS.tabText} {
          color: ${color} !important;
        }
      `,
      );
      this.lastTargetColors[target] = color;
      if (!silent)
        this.speakAndToast(
          `Successfully changed ${this.formatTargetName(target)} colour to selected colour.`,
          { icon: "✅" },
        );
      return;
    }

    const vars = TARGET_TO_VARS[target] || [];
    vars.forEach((cssVar) => {
      if (cssVar === '--hero-gradient') {
        const darker = this.adjustColorBrightness(color, -0.18);
        root.style.setProperty(cssVar, `linear-gradient(135deg, ${color}, ${darker})`, 'important');
      } else {
        root.style.setProperty(cssVar, color, 'important');
      }
    });

    this.lastTargetColors[target] = color;
    if (!silent) this.speakAndToast(`Successfully changed ${this.formatTargetName(target)} colour to selected colour.`, { icon: '✅' });
  }

  adjustTargetsColor(targets, axis, delta) {
    const targetList = Array.isArray(targets) ? targets : [targets];
    const uniqueTargets = [...new Set(targetList)].filter(Boolean);
    if (!uniqueTargets.length) {
      this.speakAndToast('Please tell me what to adjust. For example: make cards darker.');
      return;
    }

    uniqueTargets.forEach((target) => {
      const baseColor = this.resolveBaseColorForTarget(target);
      const nextColor = axis === 'saturation'
        ? this.adjustColorSaturation(baseColor, delta)
        : this.adjustColorBrightness(baseColor, delta);
      this.applyColorToTarget(target, nextColor, { silent: true });
      this.lastTargetColors[target] = nextColor;
      this.highlightTarget(target);
    });

    this.lastTargets = uniqueTargets;
    this.lastColor = uniqueTargets.length === 1 ? this.lastTargetColors[uniqueTargets[0]] : null;
    this.lastColorLabel = this.lastColor ? 'adjusted colour' : null;
    this.rememberTargetAdjustmentContext(uniqueTargets, axis, delta);

    const direction = axis === 'saturation'
      ? (delta < 0 ? 'less saturated' : 'more saturated')
      : (delta < 0 ? 'darker' : 'lighter');
    this.speakAndToast(`Successfully made ${uniqueTargets.map((target) => this.formatTargetName(target)).join(', ')} ${direction}.`, { icon: '✅' });
  }

  formatTargetName(target) {
    if (!target) return 'section';
    if (target === "heroText" || target === "heroTitle") return "hero title";
    return target
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\bnav\b/gi, 'navigation')
      .toLowerCase();
  }

  setAccessibilityControl(control, value) {
    const nextValue = this.applyControlValue(control, value);
    if (nextValue === null) return;

    this.lastCommandContext = {
      kind: 'accessibility-control',
      control,
      direction: 1,
    };

    this.highlightTarget('all');
    const label = CONTROL_LIMITS[control]?.label || control;
    this.speakAndToast(`Successfully set ${label} to ${nextValue} percent.`, { icon: '✅' });
  }

  adjustAccessibilityControl(control, delta) {
    const currentValue = this.getAccessibilityControlValue(control);
    const nextValue = this.applyControlValue(control, currentValue + delta);
    if (nextValue === null) return;

    this.lastCommandContext = {
      kind: 'accessibility-control',
      control,
      direction: delta >= 0 ? 1 : -1,
    };

    this.highlightTarget('all');
    const direction = delta >= 0 ? 'increased' : 'decreased';
    const label = CONTROL_LIMITS[control]?.label || control;
    this.speakAndToast(`Successfully ${direction} ${label} to ${nextValue} percent.`, { icon: '✅' });
  }

  setHighContrast(enabled) {
    const applied = this.controls?.setHighContrast ? this.controls.setHighContrast(Boolean(enabled)) : Boolean(enabled);
    this.lastCommandContext = {
      kind: 'accessibility-control',
      control: 'contrast',
      direction: applied ? 1 : -1,
    };
    this.highlightTarget('all');
    this.speakAndToast(`Successfully turned ${applied ? 'on' : 'off'} high contrast.`, { icon: '✅' });
  }

  getAccessibilityControlValue(control) {
    if (control === 'brightness') {
      return this.controls?.getBrightness ? this.controls.getBrightness() : CONTROL_LIMITS.brightness.defaultValue;
    }

    if (control === 'saturation') {
      return this.controls?.getSaturation ? this.controls.getSaturation() : CONTROL_LIMITS.saturation.defaultValue;
    }

    return null;
  }

  applyControlValue(control, value) {
    const limits = CONTROL_LIMITS[control];
    if (!limits) return null;

    const nextValue = this.clampNumber(value, limits.min, limits.max);

    if (control === 'brightness' && this.controls?.setBrightness) {
      return this.controls.setBrightness(nextValue);
    }

    if (control === 'saturation' && this.controls?.setSaturation) {
      return this.controls.setSaturation(nextValue);
    }

    return nextValue;
  }

  rememberTargetColorContext(targets, color, colorLabel) {
    const uniqueTargets = [...new Set(targets)].filter(Boolean);
    const continuation = this.inferContinuationFromColor(color);

    this.lastTargets = uniqueTargets;
    this.lastColor = color;
    this.lastColorLabel = colorLabel;
    this.lastCommandContext = {
      kind: 'target-colour',
      targets: uniqueTargets,
      axis: continuation.axis,
      direction: continuation.direction,
    };
  }

  rememberTargetAdjustmentContext(targets, axis, delta) {
    this.lastCommandContext = {
      kind: 'target-colour',
      targets: [...new Set(targets)].filter(Boolean),
      axis,
      direction: delta >= 0 ? 1 : -1,
    };
  }

  inferContinuationFromColor(color) {
    const rgb = this.parseColorToRgb(color);
    if (!rgb) {
      return { axis: 'lightness', direction: -1 };
    }

    const { s, l } = this.rgbToHsl(rgb);

    if (l <= 0.28) {
      return { axis: 'lightness', direction: -1 };
    }

    if (l >= 0.72) {
      return { axis: 'lightness', direction: 1 };
    }

    if (s >= 0.35) {
      return { axis: 'saturation', direction: 1 };
    }

    return { axis: 'lightness', direction: l >= 0.5 ? 1 : -1 };
  }

  adjustColorBrightness(color, delta) {
    const rgb = this.parseColorToRgb(color);
    if (!rgb) return color;

    const ratio = Math.max(-0.8, Math.min(0.8, delta));
    const apply = (channel) => {
      if (ratio >= 0) {
        return Math.round(channel + (255 - channel) * ratio);
      }
      return Math.round(channel * (1 + ratio));
    };

    const r = apply(rgb.r);
    const g = apply(rgb.g);
    const b = apply(rgb.b);
    return `rgb(${r}, ${g}, ${b})`;
  }

  adjustColorSaturation(color, delta) {
    const rgb = this.parseColorToRgb(color);
    if (!rgb) return color;

    const hsl = this.rgbToHsl(rgb);
    hsl.s = this.clampNumber(hsl.s + delta, 0, 1);
    const next = this.hslToRgb(hsl);
    return `rgb(${next.r}, ${next.g}, ${next.b})`;
  }

  resolveBaseColorForTarget(target) {
    if (this.lastTargetColors[target]) {
      return this.lastTargetColors[target];
    }

    const rootStyle = window.getComputedStyle(document.documentElement);

    if (target === "heroBackground" || target === "hero") {
      return (
        this.readSelectorColor(
          TARGET_HIGHLIGHT_SELECTORS.heroBackground,
          "background-color",
        ) ||
        rootStyle.getPropertyValue("--hero-gradient").trim() ||
        rootStyle.getPropertyValue("--color-primary").trim() ||
        "#808080"
      );
    }

    if (target === "heroText" || target === "heroTitle") {
      return (
        this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.heroTitle, "color") ||
        this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.heroText, "color") ||
        rootStyle.getPropertyValue("--color-hero-text").trim() ||
        "#ffffff"
      );
    }

    if (target === "formBackground") {
      return (
        this.readSelectorColor(
          TARGET_HIGHLIGHT_SELECTORS.formBackground,
          "background-color",
        ) ||
        rootStyle.getPropertyValue("--color-surface").trim() ||
        "#ffffff"
      );
    }

    if (target === "tabText") {
      return (
        this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.tabText, "color") ||
        rootStyle.getPropertyValue("--color-nav-text").trim() ||
        "#3f4b57"
      );
    }

    if (target === 'cards') {
      return this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.cards, 'background-color')
        || rootStyle.getPropertyValue('--color-surface').trim()
        || '#808080';
    }

    if (target === 'buttons') {
      return this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.buttons, 'background-color')
        || rootStyle.getPropertyValue('--color-cta').trim()
        || rootStyle.getPropertyValue('--color-primary').trim()
        || '#808080';
    }

    if (target === 'icons') {
      return this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS.icons, 'color')
        || rootStyle.getPropertyValue('--color-primary').trim()
        || '#808080';
    }

    const vars = TARGET_TO_VARS[target] || [];
    for (const cssVar of vars) {
      const value = rootStyle.getPropertyValue(cssVar).trim();
      if (!value) continue;

      if (cssVar === '--hero-gradient') {
        const gradientColor = this.extractFirstCssColor(value);
        if (gradientColor) return gradientColor;
        continue;
      }

      if (!this.isTransparentColor(value) && this.parseColorToRgb(value)) {
        return value;
      }
    }

    const fallbackProperty = ['background', 'cards', 'buttons', 'inputBackground', 'navBackground'].includes(target)
      ? 'background-color'
      : 'color';
    return this.readSelectorColor(TARGET_HIGHLIGHT_SELECTORS[target], fallbackProperty) || this.lastColor || '#808080';
  }

  readSelectorColor(selector, property) {
    if (!selector) return null;

    const nodes = Array.from(document.querySelectorAll(selector))
      .filter((node) => !node.closest('.a11y-panel'))
      .slice(0, 10);

    for (const node of nodes) {
      const styles = window.getComputedStyle(node);
      const value = property === 'background-color'
        ? styles.backgroundColor
        : styles.getPropertyValue(property) || styles.color;

      if (!this.isTransparentColor(value) && this.parseColorToRgb(value)) {
        return value;
      }

      if (styles.backgroundImage && styles.backgroundImage !== 'none') {
        const gradientColor = this.extractFirstCssColor(styles.backgroundImage);
        if (gradientColor) return gradientColor;
      }
    }

    return null;
  }

  extractFirstCssColor(value) {
    if (!value) return null;
    const match = String(value).match(/(rgba?\([^)]+\)|#[0-9a-f]{3,6})/i);
    return match ? match[1] : null;
  }

  isTransparentColor(value) {
    if (!value) return true;
    const normalized = String(value).trim().toLowerCase();
    if (normalized === 'transparent') return true;

    const rgbaMatch = normalized.match(/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([0-9.]+)\s*\)$/);
    if (!rgbaMatch) return false;

    return Number(rgbaMatch[1]) === 0;
  }

  parseColorToRgb(input) {
    if (!input) return null;
    const value = String(input).trim().toLowerCase();
    const normalized = NAMED_COLORS[value] || value;

    const hexMatch = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1].length === 3
        ? hexMatch[1].split('').map((c) => `${c}${c}`).join('')
        : hexMatch[1];
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16),
      };
    }

    const rgbMatch = normalized.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[0-9.]+)?\s*\)$/i);
    if (rgbMatch) {
      return {
        r: Number(rgbMatch[1]),
        g: Number(rgbMatch[2]),
        b: Number(rgbMatch[3]),
      };
    }

    return null;
  }

  rgbToHsl({ r, g, b }) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2;
    const delta = max - min;

    if (delta === 0) {
      return { h: 0, s: 0, l: lightness };
    }

    const saturation = lightness > 0.5
      ? delta / (2 - max - min)
      : delta / (max + min);

    let hue = 0;
    switch (max) {
      case red:
        hue = ((green - blue) / delta) + (green < blue ? 6 : 0);
        break;
      case green:
        hue = ((blue - red) / delta) + 2;
        break;
      default:
        hue = ((red - green) / delta) + 4;
        break;
    }

    return { h: hue / 6, s: saturation, l: lightness };
  }

  hslToRgb({ h, s, l }) {
    if (s === 0) {
      const value = Math.round(l * 255);
      return { r: value, g: value, b: value };
    }

    const hueToRgb = (p, q, t) => {
      let channel = t;
      if (channel < 0) channel += 1;
      if (channel > 1) channel -= 1;
      if (channel < 1 / 6) return p + (q - p) * 6 * channel;
      if (channel < 1 / 2) return q;
      if (channel < 2 / 3) return p + (q - p) * (2 / 3 - channel) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
    const p = (2 * l) - q;

    return {
      r: Math.round(hueToRgb(p, q, h + (1 / 3)) * 255),
      g: Math.round(hueToRgb(p, q, h) * 255),
      b: Math.round(hueToRgb(p, q, h - (1 / 3)) * 255),
    };
  }

  getReadableTextColor(backgroundColor) {
    const rgb = this.parseColorToRgb(backgroundColor);
    if (!rgb) return '#ffffff';

    const channels = [rgb.r, rgb.g, rgb.b].map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });

    const luminance = (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
    return luminance > 0.45 ? '#111111' : '#ffffff';
  }

  readPercentCssVar(cssVar, fallback) {
    const rawValue = window.getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
    const numericValue = Number.parseFloat(rawValue.replace('%', ''));
    return Number.isFinite(numericValue) ? numericValue : fallback;
  }

  clampNumber(value, min, max) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return min;
    return Math.min(max, Math.max(min, numericValue));
  }

  applyTokens(tokens) {
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value, 'important');
    });
  }

  highlightTarget(target) {
    const selector = TARGET_HIGHLIGHT_SELECTORS[target] || TARGET_HIGHLIGHT_SELECTORS.all;
    if (!selector) return;

    const className = ['text', 'headings', 'links', 'icons', 'filters', 'stars', 'inputText'].includes(target)
      ? 'voice-target-glow-text'
      : 'voice-target-glow-box';

    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach((node) => {
      if (node.closest('.a11y-panel')) return;
      node.classList.remove(className);
      // force reflow so the animation can replay
      // eslint-disable-next-line no-unused-expressions
      node.offsetWidth;
      node.classList.add(className);
      window.setTimeout(() => {
        node.classList.remove(className);
      }, 2000);
    });
  }

  ensureHighlightStyleElement() {
    if (this.highlightStyleEl) return;

    const style = document.createElement('style');
    style.setAttribute('data-voice-highlight-styles', '1');
    style.textContent = `
      @keyframes voiceGlowFadeBox {
        0% { box-shadow: 0 0 0 0 rgba(37, 157, 145, 0.00); opacity: 0.92; }
        30% { box-shadow: 0 0 0 2px rgba(37, 157, 145, 0.45), 0 0 16px rgba(37, 157, 145, 0.32); opacity: 1; }
        100% { box-shadow: 0 0 0 0 rgba(37, 157, 145, 0.00); opacity: 1; }
      }

      @keyframes voiceGlowFadeText {
        0% { text-shadow: 0 0 0 rgba(37, 157, 145, 0.00); }
        30% { text-shadow: 0 0 10px rgba(37, 157, 145, 0.48); }
        100% { text-shadow: 0 0 0 rgba(37, 157, 145, 0.00); }
      }

      .voice-target-glow-box {
        animation: voiceGlowFadeBox 2s ease;
      }

      .voice-target-glow-text {
        animation: voiceGlowFadeText 2s ease;
      }
    `;

    document.head.appendChild(style);
    this.highlightStyleEl = style;
  }

  ensureScopedStyleElement() {
    if (this.scopedStyleEl) return;
    const style = document.createElement('style');
    style.setAttribute('data-voice-target-overrides', '1');
    document.head.appendChild(style);
    this.scopedStyleEl = style;
  }

  setScopedTargetRule(target, cssRule) {
    this.ensureScopedStyleElement();
    this.scopedRules[target] = cssRule;
    this.rebuildScopedStyleElement();
  }

  clearScopedTargetRules() {
    this.scopedRules = {};
    if (this.scopedStyleEl) {
      this.scopedStyleEl.textContent = '';
    }
  }

  clearContext() {
    this.lastTargets = [];
    this.lastColor = null;
    this.lastColorLabel = null;
    this.lastTargetColors = {};
    this.lastCommandContext = null;
  }

  rebuildScopedStyleElement() {
    if (!this.scopedStyleEl) return;
    this.scopedStyleEl.textContent = Object.values(this.scopedRules).join('\n');
  }

  showSupportFallback() {
    if (this.fallbackEl) return;

    const notice = document.createElement('div');
    notice.className = 'voice-fallback-notice';
    notice.textContent = 'Voice commands are unavailable: this browser does not support Web Speech API.';
    document.body.appendChild(notice);

    const style = document.createElement('style');
    style.textContent = `
      .voice-fallback-notice {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 9999;
        background: #ffffff;
        color: #111;
        border: 1px solid #d1d1d1;
        border-radius: 8px;
        padding: 0.6rem 0.75rem;
        font-size: 0.82rem;
        max-width: 320px;
      }
    `;
    document.head.appendChild(style);

    this.fallbackEl = notice;
  }

  ensureToast() {
    if (this.toastEl) return;

    const toast = document.createElement('div');
    toast.className = 'voice-toast';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    const style = document.createElement('style');
    style.textContent = `
      .voice-toast {
        position: fixed;
        left: 50%;
        bottom: 1rem;
        transform: translateX(-50%) translateY(120%);
        z-index: 9999;
        background: #ffffff;
        color: #111111;
        border: 1px solid #cfd7df;
        border-radius: 10px;
        padding: 0.5rem 0.8rem;
        font-size: 0.85rem;
        opacity: 0;
        transition: transform 180ms ease, opacity 180ms ease;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }

      .voice-toast .voice-toast-icon {
        font-size: 0.95rem;
        line-height: 1;
      }

      .voice-toast .voice-toast-message {
        line-height: 1.25;
      }

      .voice-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(style);

    this.toastEl = toast;
  }

  speakAndToast(message, options = {}) {
    this.showToast(message, options);

    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      // no-op
    }
  }

  showToast(message, options = {}) {
    if (!this.toastEl) this.ensureToast();
    const icon = options.icon || '💬';
    this.toastEl.innerHTML = `<span class="voice-toast-icon" aria-hidden="true">${icon}</span><span class="voice-toast-message">${message}</span>`;
    this.toastEl.classList.add('show');

    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2300);
  }

  destroy() {
    this.restartOnEnd = false;
    this.isActive = false;

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {
        // no-op
      }
      this.recognition.onresult = null;
      this.recognition.onerror = null;
      this.recognition.onend = null;
    }

    if (this.button && this.boundButtonHandler) {
      this.button.removeEventListener('click', this.boundButtonHandler);
    }

    if (this.onStateChange) {
      this.onStateChange({ active: false, supported: this.isSupported });
    }

    this.emitTranscript('', false);
    window.clearTimeout(this.transcriptClearTimer);

    this.clearContext();
  }
}

export function init(buttonElement) {
  const manager = new VoiceCommandManager();
  return manager.init(buttonElement);
}

export { VoiceCommandManager };
