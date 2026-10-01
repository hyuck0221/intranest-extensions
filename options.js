import {
  ApiError, checkServer, displayError, initializeLanguage, normalizeServerAddress,
  requestHostAccess, requestReleaseAccess, storageGet, storageSet, toggleLanguage, translate
} from './shared.js';

const $ = (selector) => document.querySelector(selector);
const releaseEndpoint = 'https://api.github.com/repos/hyuck0221/intranest-extensions/releases/latest';
const releasesPage = 'https://github.com/hyuck0221/intranest-extensions/releases/latest';
const installedVersion = globalThis.chrome?.runtime?.getManifest?.().version || '0.1.0';
let latestRelease = null;

function setStatus(element, message, kind = '') {
  element.textContent = message;
  element.className = 'form-status' + (kind ? ' is-' + kind : '');
}

function compareVersions(left, right) {
  const parse = (value) => String(value).replace(/^v/i, '').split(/[+-]/)[0].split('.').map((part) => Number.parseInt(part, 10) || 0);
  const a = parse(left);
  const b = parse(right);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const difference = (a[index] || 0) - (b[index] || 0);
    if (difference) return difference;
  }
  return 0;
}

function showRelease(release, dismissedVersion = '') {
  latestRelease = release;
  const hasNewer = release && compareVersions(release.tag_name, installedVersion) > 0;
  $('#latest-version-row').hidden = !release;
  $('#latest-version').textContent = release?.tag_name || '';
  $('#release-link').hidden = !hasNewer || release.tag_name === dismissedVersion;
  $('#dismiss-update').hidden = !hasNewer || release.tag_name === dismissedVersion;
  if (release && !hasNewer) setStatus($('#update-status'), translate('settings.upToDate'), 'success');
  else if (hasNewer && release.tag_name === dismissedVersion) setStatus($('#update-status'), translate('update.dismissed'), 'success');
  else if (hasNewer) setStatus($('#update-status'), translate('update.now'), 'success');
}

async function connectAndSave(event) {
  event.preventDefault();
  const button = $('#save-button');
  const label = button.querySelector('[data-i18n]');
  const original = translate('settings.check');
  button.disabled = true;
  label.textContent = translate('settings.checking');
  setStatus($('#settings-status'), '');
  try {
    const server = normalizeServerAddress($('#server-address').value);
    const key = $('#access-key').value.trim();
    if (!key) throw new ApiError(401, 'invalid_access_key');

    const granted = await requestHostAccess(server);
    if (!granted) {
      const error = new Error('permission_denied');
      error.code = 'permission_denied';
      throw error;
    }
    await checkServer(server, key);

    const permissionOrigin = new URL(server).origin + '/*';
    const saved = await storageGet(['permissionOrigin']);
    await storageSet({ serverUrl: server, accessKey: key, permissionOrigin });
    if (saved.permissionOrigin && saved.permissionOrigin !== permissionOrigin && globalThis.chrome?.permissions?.remove) {
      await globalThis.chrome.permissions.remove({ origins: [saved.permissionOrigin] }).catch(() => false);
    }
    setStatus($('#settings-status'), translate('settings.saved'), 'success');
  } catch (error) {
    const message = error?.code === 'permission_denied'
      ? translate('connect.permissionDenied')
      : displayError(error);
    setStatus($('#settings-status'), message, 'error');
  } finally {
    button.disabled = false;
    label.textContent = original;
  }
}

async function checkForUpdate() {
  const button = $('#check-updates');
  const original = translate('settings.checkUpdates');
  button.disabled = true;
  button.textContent = translate('settings.checkingUpdates');
  setStatus($('#update-status'), '');
  try {
    const granted = await requestReleaseAccess();
    if (!granted) {
      setStatus($('#update-status'), translate('settings.updatePermissionDenied'), 'error');
      return;
    }
    const response = await fetch(releaseEndpoint, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
      credentials: 'omit',
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error('release_unavailable');
    const release = await response.json();
    if (!/^v?\d+\.\d+\.\d+$/.test(release?.tag_name || '') || !release?.html_url) throw new Error('release_invalid');
    const url = new URL(release.html_url);
    if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/hyuck0221/intranest-extensions/releases/')) {
      throw new Error('release_invalid');
    }
    const compactRelease = { tag_name: release.tag_name, html_url: url.href };
    const saved = await storageGet(['dismissedVersion']);
    await storageSet({ latestRelease: compactRelease, releaseCheckedAt: Date.now() });
    showRelease(compactRelease, saved.dismissedVersion || '');
  } catch {
    setStatus($('#update-status'), translate('settings.updateError'), 'error');
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

async function dismissUpdate() {
  if (!latestRelease?.tag_name) return;
  await storageSet({ dismissedVersion: latestRelease.tag_name });
  showRelease(latestRelease, latestRelease.tag_name);
}

async function start() {
  await initializeLanguage();
  $('#language-toggle').addEventListener('click', toggleLanguage);
  $('#current-version').textContent = 'v' + installedVersion;
  $('#settings-form').addEventListener('submit', connectAndSave);
  $('#check-updates').addEventListener('click', checkForUpdate);
  $('#dismiss-update').addEventListener('click', dismissUpdate);

  const saved = await storageGet(['serverUrl', 'accessKey', 'latestRelease', 'dismissedVersion']);
  $('#server-address').value = saved.serverUrl || '';
  $('#access-key').value = saved.accessKey || '';
  if (saved.latestRelease?.tag_name && saved.latestRelease?.html_url) {
    showRelease(saved.latestRelease, saved.dismissedVersion || '');
  }
}

void start();
