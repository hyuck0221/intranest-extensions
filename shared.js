const copy = {
  en: {
    'connect.tag': 'YOUR INTRANEST', 'connect.title': 'Connect your nest.', 'connect.body': 'Add the intranet server address to open your team’s shared links.',
    'connect.address': 'Server address', 'connect.key': 'Team access key',
    'connect.button': 'Check and connect', 'connect.permission': 'Chrome asks for access to this server. GitHub access is requested only when you check for updates.',
    'connect.admin': 'Connection settings', 'connect.checking': 'Checking server…',
    'connect.badAddress': 'Enter a valid server address using http:// or https://.',
    'connect.unavailable': 'Could not reach the server. Check the address, port, network, and local network permission.',
    'connect.incompatible': 'This server API version is not supported by this extension yet.',
    'connect.badKey': 'The server answered, but this access key was not accepted.',
    'connect.permissionDenied': 'Chrome access was not granted. Allow this server address to connect.',
    'home.connected': 'Connected', 'home.links': 'Shared links', 'home.refresh': 'Refresh',
    'home.empty': 'No shared links yet.', 'home.add': 'Add link', 'home.settings': 'Settings',
    'home.loading': 'Connecting…', 'home.linkError': 'Could not load links. Check the server connection.',
    'link.addTitle': 'Add a shared link', 'link.title': 'Title', 'link.address': 'Link address',
    'link.save': 'Save link', 'link.cancel': 'Cancel', 'link.saved': 'Link added.',
    'link.badAddress': 'Enter a valid http:// or https:// link.',
    'link.required': 'Add a title and link address.', 'link.deleted': 'Link removed.', 'link.undo': 'Undo',
    'update.title': 'Update available', 'update.download': 'Download update', 'update.later': 'Later',
    'update.now': 'A new version is ready to download.', 'update.dismissed': 'Update reminder hidden.',
    'settings.tag': 'YOUR INTRANEST', 'settings.title': 'Connection settings',
    'settings.body': 'Your server address and access key are stored in this Chrome profile. Only the server host you enter is requested for access.',
    'settings.address': 'Server address', 'settings.key': 'Team access key',
    'settings.check': 'Check and save', 'settings.checking': 'Checking server…', 'settings.saved': 'Connection saved.',
    'settings.permission': 'The first connection asks Chrome for this server origin. GitHub access is requested separately only when you check for updates. Remove these permissions in chrome://extensions.',
    'settings.guide': 'Open setup guide', 'settings.update': 'Extension updates', 'settings.current': 'Installed version',
    'settings.latest': 'Latest version', 'settings.checkUpdates': 'Check for updates', 'settings.checkingUpdates': 'Checking…',
    'settings.upToDate': 'You have the latest version.', 'settings.updateError': 'Could not check releases. Try again later.',
    'settings.updatePermissionDenied': 'GitHub access was not granted. You can connect to your server without it.',
    'settings.updatePermission': 'Connect once before checking for updates.', 'settings.release': 'Download update',
    'common.retry': 'Try again', 'common.settings': 'Settings', 'common.close': 'Close',
    'common.remove': 'Remove link', 'common.removeConfirm': 'Remove this link?', 'common.error': 'Something went wrong.',
    'lang.switch': '한국어', 'lang.name': 'English'
  },
  ko: {
    'connect.tag': '내 INTRANEST', 'connect.title': '둥지에 연결하세요.', 'connect.body': '팀의 공유 링크를 열 수 있도록 인트라넷 서버 주소를 추가하세요.',
    'connect.address': '서버 주소', 'connect.key': '팀 접근 키',
    'connect.button': '연결 확인', 'connect.permission': 'Chrome에서 서버 접근 권한을 요청합니다. GitHub 권한은 업데이트 확인을 누를 때 요청합니다.',
    'connect.admin': '연결 설정', 'connect.checking': '서버 확인 중…',
    'connect.badAddress': 'http:// 또는 https://로 시작하는 올바른 주소를 입력하세요.',
    'connect.unavailable': '서버에 연결할 수 없습니다. 주소와 포트, 네트워크, 로컬 네트워크 권한을 확인하세요.',
    'connect.incompatible': '현재 확장 프로그램에서 지원하지 않는 서버 API 버전입니다.',
    'connect.badKey': '서버는 응답했지만 접근 키가 올바르지 않습니다.',
    'connect.permissionDenied': 'Chrome 접근 권한을 허용하지 않았습니다. 연결하려면 이 서버 주소의 접근을 허용하세요.',
    'home.connected': '연결됨', 'home.links': '공유 링크', 'home.refresh': '새로고침',
    'home.empty': '아직 공유 링크가 없습니다.', 'home.add': '링크 추가', 'home.settings': '설정',
    'home.loading': '연결 중…', 'home.linkError': '링크를 불러오지 못했습니다. 서버 연결을 확인하세요.',
    'link.addTitle': '공유 링크 추가', 'link.title': '제목', 'link.address': '링크 주소',
    'link.save': '링크 저장', 'link.cancel': '취소', 'link.saved': '링크를 추가했습니다.',
    'link.badAddress': 'http:// 또는 https://로 시작하는 올바른 링크를 입력하세요.',
    'link.required': '제목과 링크 주소를 입력하세요.', 'link.deleted': '링크를 삭제했습니다.', 'link.undo': '실행 취소',
    'update.title': '업데이트 있음', 'update.download': '업데이트 다운로드', 'update.later': '다음에 하기',
    'update.now': '새 버전을 내려받을 수 있습니다.', 'update.dismissed': '업데이트 알림을 숨겼습니다.',
    'settings.tag': '내 INTRANEST', 'settings.title': '연결 설정',
    'settings.body': '서버 주소와 접근 키를 이 Chrome 프로필에 저장합니다. 입력한 서버 호스트에만 접근을 요청합니다.',
    'settings.address': '서버 주소', 'settings.key': '팀 접근 키',
    'settings.check': '연결 확인 후 저장', 'settings.checking': '서버 확인 중…', 'settings.saved': '연결 정보를 저장했습니다.',
    'settings.permission': '처음 연결할 때 Chrome에서 서버 origin 접근 권한을 요청합니다. GitHub 권한은 업데이트 확인을 누를 때 별도로 요청합니다. chrome://extensions에서 권한을 제거할 수 있습니다.',
    'settings.guide': '설치 가이드 열기', 'settings.update': '확장 프로그램 업데이트', 'settings.current': '설치된 버전',
    'settings.latest': '최신 버전', 'settings.checkUpdates': '업데이트 확인', 'settings.checkingUpdates': '확인 중…',
    'settings.upToDate': '최신 버전을 사용 중입니다.', 'settings.updateError': '릴리스를 확인하지 못했습니다. 잠시 후 다시 시도하세요.',
    'settings.updatePermissionDenied': 'GitHub 접근을 허용하지 않았습니다. 서버 연결은 계속 사용할 수 있습니다.',
    'settings.updatePermission': '업데이트를 확인하기 전에 서버에 연결하세요.', 'settings.release': '업데이트 다운로드',
    'common.retry': '다시 시도', 'common.settings': '설정', 'common.close': '닫기',
    'common.remove': '링크 삭제', 'common.removeConfirm': '이 링크를 삭제할까요?', 'common.error': '작업을 완료하지 못했습니다.',
    'lang.switch': 'English', 'lang.name': '한국어'
  }
};

let currentLanguage = 'en';
const previewMode = !globalThis.chrome?.runtime?.id;

export async function initializeLanguage() {
  const saved = await storageGet(['language']);
  currentLanguage = saved.language === 'ko' || saved.language === 'en'
    ? saved.language
    : (navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en');
  applyLanguage();
  return currentLanguage;
}

export function language() { return currentLanguage; }

export function translate(key) {
  return copy[currentLanguage]?.[key] || copy.en[key] || key;
}

export function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });
  const button = document.querySelector('#language-toggle');
  if (button) button.textContent = translate('lang.switch');
}

export async function toggleLanguage() {
  currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
  await storageSet({ language: currentLanguage });
  applyLanguage();
}

export async function storageGet(keys) {
  if (globalThis.chrome?.storage?.local && !previewMode) return chrome.storage.local.get(keys);
  const names = Array.isArray(keys) ? keys : Object.keys(keys || {});
  const result = {};
  for (const key of names) {
    const value = localStorage.getItem('intranest.' + key);
    if (value !== null) result[key] = value;
  }
  return result;
}

export async function storageSet(values) {
  if (globalThis.chrome?.storage?.local && !previewMode) {
    await chrome.storage.local.set(values);
    return;
  }
  for (const [key, value] of Object.entries(values)) localStorage.setItem('intranest.' + key, String(value));
}

export async function storageRemove(keys) {
  if (globalThis.chrome?.storage?.local && !previewMode) {
    await chrome.storage.local.remove(keys);
    return;
  }
  for (const key of keys) localStorage.removeItem('intranest.' + key);
}

export function isPreview() { return previewMode; }

export function normalizeServerAddress(raw) {
  let value = String(raw || '').trim();
  if (!value) throw new Error('bad_address');
  if (!/^https?:\/\//i.test(value)) value = 'http://' + value;
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error('bad_address'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) throw new Error('bad_address');
  parsed.pathname = '/';
  parsed.search = '';
  parsed.hash = '';
  return parsed.origin.replace(/\/$/, '');
}

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message || code || 'request_failed');
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(server, key, route, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 8000);
  const headers = new Headers(options.headers || {});
  if (key) headers.set('Authorization', 'Bearer ' + key);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  try {
    const response = await fetch(server + '/api/v1' + route, {
      ...options, headers, signal: controller.signal, mode: 'cors', cache: 'no-store',
      credentials: 'omit', targetAddressSpace: 'local'
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(response.status, payload?.error, payload?.message);
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkServer(server, key) {
  const health = await apiRequest(server, '', '/health');
  if (health?.status !== 'ok' || String(health.apiVersion) !== '1') throw new ApiError(200, 'api_version');
  if (key) await apiRequest(server, key, '/session');
  return health;
}

export async function requestHostAccess(server) {
  if (previewMode) return true;
  const origin = new URL(server).origin + '/*';
  return chrome.permissions.request({ origins: [origin] });
}

export async function requestReleaseAccess() {
  if (previewMode) return true;
  return chrome.permissions.request({ origins: ['https://api.github.com/*'] });
}

export function displayError(error) {
  if (error?.code === 'bad_address') return translate('connect.badAddress');
  if (error?.code === 'api_version') return translate('connect.incompatible');
  if (error?.status === 401) return translate('connect.badKey');
  if (error?.status === 404 || error?.status >= 500) return translate('connect.unavailable');
  if (error?.name === 'AbortError' || error instanceof TypeError || error?.status === 0) return translate('connect.unavailable');
  return error?.message || translate('common.error');
}
