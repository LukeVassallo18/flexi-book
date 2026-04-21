import { track } from '@vercel/analytics';

const USER_ID_KEY = 'flexi-book-analytics-user-id';
const SESSION_ID_KEY = 'flexi-book-analytics-session-id';

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

export function getAnalyticsIdentity() {
  return {
    userId: getOrCreateId(USER_ID_KEY, 'local'),
    sessionId: getOrCreateId(SESSION_ID_KEY, 'session'),
  };
}

export function trackUiClick(action, metadata = {}) {
  const { userId, sessionId } = getAnalyticsIdentity();

  track('ui_click', {
    action,
    userId,
    sessionId,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...metadata,
  });
}
