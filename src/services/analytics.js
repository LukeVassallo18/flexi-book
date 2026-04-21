import { track } from '@vercel/analytics';

const USER_ID_KEY = 'flexi-book-analytics-user-id';
const SESSION_ID_KEY = 'flexi-book-analytics-session-id';

let analyticsInitialized = false;

function getStorage(type) {
  try {
    if (typeof window === 'undefined') return null;
    return type === 'session' ? window.sessionStorage : window.localStorage;
  } catch (_) {
    return null;
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateId(key, storageType) {
  const storage = getStorage(storageType);
  if (!storage) return createId();

  const existing = storage.getItem(key);
  if (existing) return existing;

  const next = createId();
  storage.setItem(key, next);
  return next;
}

function trackSafely(eventName, payload) {
  try {
    track(eventName, payload);
  } catch (_) {
    // no-op
  }
}

function withAnalyticsContext(metadata = {}) {
  const { userId, sessionId } = getAnalyticsIdentity();

  return {
    userId,
    sessionId,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...metadata,
  };
}

export function getAnalyticsIdentity() {
  return {
    userId: getOrCreateId(USER_ID_KEY, 'local'),
    sessionId: getOrCreateId(SESSION_ID_KEY, 'session'),
  };
}

export function initAnalytics() {
  if (analyticsInitialized || typeof window === 'undefined') return;

  analyticsInitialized = true;
  getAnalyticsIdentity();
}

export function trackUiClick(action, metadata = {}) {
  initAnalytics();
  trackSafely('ui_click', withAnalyticsContext({ action, ...metadata }));
}

export function trackDisclaimerAccepted(metadata = {}) {
  initAnalytics();
  trackSafely('disclaimer_accepted', withAnalyticsContext(metadata));
}

export function trackFlightSearch(searchParams, metadata = {}) {
  initAnalytics();
  trackSafely('flight_search_submitted', withAnalyticsContext({ ...searchParams, ...metadata }));
}

export function trackHotelSearch(searchParams, metadata = {}) {
  initAnalytics();
  trackSafely('hotel_search_submitted', withAnalyticsContext({ ...searchParams, ...metadata }));
}

export function trackCarSearch(searchParams, metadata = {}) {
  initAnalytics();
  trackSafely('car_search_submitted', withAnalyticsContext({ ...searchParams, ...metadata }));
}

export function trackItemViewed(itemType, item, metadata = {}) {
  initAnalytics();
  trackSafely('item_viewed', withAnalyticsContext({
    item_type: itemType,
    item_name: item?.route || item?.name || item?.city || '',
    item_price: item?.price,
    ...metadata,
  }));
}

export function trackItemAddedToCart(itemType, item, metadata = {}) {
  initAnalytics();
  trackSafely('item_added_to_cart', withAnalyticsContext({
    item_type: itemType,
    item_name: item?.route || item?.name || item?.city || '',
    item_price: item?.price,
    ...metadata,
  }));
}

export function trackCartItemRemoved(item, metadata = {}) {
  initAnalytics();
  trackSafely('cart_item_removed', withAnalyticsContext({
    item_type: item?.type || '',
    item_name: item?.route || item?.name || '',
    item_price: item?.price,
    ...metadata,
  }));
}

export function trackCheckoutStarted(itemCount, total, metadata = {}) {
  initAnalytics();
  trackSafely('checkout_started', withAnalyticsContext({ item_count: itemCount, total_amount: total, ...metadata }));
}

export function trackBookingCompleted(bookingRef, itemCount, totalAmount, metadata = {}) {
  initAnalytics();
  trackSafely('booking_completed', withAnalyticsContext({
    booking_reference: bookingRef,
    item_count: itemCount,
    total_amount: totalAmount,
    ...metadata,
  }));
}
