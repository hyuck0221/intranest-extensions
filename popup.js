import {
  apiRequest, checkServer, displayError, initializeLanguage, isPreview, normalizeServerAddress,
  requestHostAccess, storageGet, storageSet, toggleLanguage, translate
} from './shared.js';

const $ = (selector) => document.querySelector(selector);
const state = { server: '', key: '', links: [], preview: isPreview(), release: null };
const demoLinks = [
  { id: 'demo-1', title: 'Team handbook', url: 'https://handbook.office/' },
  { id: 'demo-2', title: 'Shared drive', url: 'https://drive.office/' },
  { id: 'demo-3', title: 'Project board', url: 'https://projects.office/' }
];
const tileClasses = ['tile-blue', 'tile-green', 'tile-coral'];
const releaseEndpoint = 'https://api.github.com/repos/hyuck0221/intranest-extensions/releases/latest';
const releasesPage = 'https://github.com/hyuck0221/intranest-extensions/releases/latest';

function setStatus(message) {
  $('#popup-connect-status').textContent = message;
}

function setBusy(busy) {
  const button = $('#popup-connect-button');
  button.disabled = busy;
  button.querySelector('[data-i18n]').textContent = busy ? translate('connect.checking') : translate('connect.button');
}

function showConnection(message = '') {
  $('#connection-screen').hidden = false;
  $('#home-screen').hidden = true;
  $('#header-connection').hidden = true;
  setStatus(message);
}

function showHome(server) {
  $('#connection-screen').hidden = true;
  $('#home-screen').hidden = false;
  $('#header-connection').hidden = false;
  $('#server-name').textContent = state.preview ? 'Main office' : (new URL(server).hostname || 'Intranet server');
  $('#server-address').textContent = server.replace(/^https?:\/\//, '');
}

function hostPattern(server) {
  return new URL(server).origin + '/*';
}

async function assertHostPermission(server) {
  if (!globalThis.chrome?.runtime?.id || state.preview) return true;
  const hasAccess = await chrome.permissions.contains({ origins: [hostPattern(server)] });
  if (!hasAccess) {
    const error = new Error('permission_missing');
    error.code = 'permission_missing';
    throw error;
  }
  return true;
}

function friendlyError(error) {
  if (error?.code === 'permission_missing') return translate('connect.permissionDenied');
  return displayError(error);
}

function normalizeLink(raw) {
  let value = String(raw || '').trim();
  if (!value) throw new Error('bad_link');
  if (!/^https?:\/\//i.test(value)) value = 'http://' + value;
  let url;
  try { url = new URL(value); } catch { throw new Error('bad_link'); }
  if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password) throw new Error('bad_link');
  return url.toString();
}

async function connect(serverInput, keyInput) {
  setStatus('');
  setBusy(true);
  try {
    const server = normalizeServerAddress(serverInput);
    const key = String(keyInput || '').trim();
    if (!key) throw { status: 401 };
    if (globalThis.chrome?.runtime?.id && !state.preview) {
      const granted = await requestHostAccess(server);
      if (!granted) {
        const error = new Error('permission_denied');
        error.code = 'permission_denied';
        throw error;
      }
    }
    await checkServer(server, key);
    state.server = server;
    state.key = key;
    if (!state.preview) {
      await storageSet({ serverUrl: server, accessKey: key, permissionOrigin: hostPattern(server) });
    }
    showHome(server);
    await loadLinks();
    if (!state.preview) void checkForUpdate(false);
  } catch (error) {
    const message = error?.code === 'permission_denied'
      ? translate('connect.permissionDenied')
      : friendlyError(error);
    showConnection(message);
  } finally {
    setBusy(false);
  }
}

$('#popup-connect-form').addEventListener('submit', (event) => {
  event.preventDefault();
  void connect($('#popup-address').value, $('#popup-key').value);
});

async function fetchLinks() {
  if (state.preview) return [...demoLinks];
  return apiRequest(state.server, state.key, '/links');
}

function faviconURL(targetURL) {
  if (!globalThis.chrome?.runtime?.id || state.preview) return '';
  const endpoint = new URL(chrome.runtime.getURL('_favicon/'));
  endpoint.searchParams.set('pageUrl', targetURL);
  endpoint.searchParams.set('size', '32');
  return endpoint.toString();
}

function renderLink(link, index) {
  const row = document.createElement('li');
  row.className = 'link-row';
  const open = document.createElement('button');
  open.className = 'link-open';
  open.type = 'button';
  open.setAttribute('aria-label', link.title + ', ' + new URL(link.url).hostname);
  const number = document.createElement('span');
  number.className = 'link-index';
  number.textContent = String(index + 1).padStart(2, '0');
  const tile = document.createElement('span');
  tile.className = 'favicon-tile ' + tileClasses[index % tileClasses.length];
  const image = document.createElement('img');
  image.alt = '';
  image.loading = 'lazy';
  const iconURL = faviconURL(link.url);
  const fallback = document.createElement('span');
  fallback.className = 'favicon-fallback';
  fallback.hidden = Boolean(iconURL);
  image.addEventListener('error', () => { image.hidden = true; fallback.hidden = false; }, { once: true });
  if (iconURL) {
    image.src = iconURL;
  } else {
    image.hidden = true;
  }
  tile.append(image, fallback);
  const copy = document.createElement('span');
  copy.className = 'link-copy';
  const title = document.createElement('strong');
  title.className = 'link-title';
  title.textContent = link.title;
  const host = document.createElement('small');
  host.className = 'link-host';
  host.textContent = new URL(link.url).host;
  copy.append(title, host);
  const arrow = document.createElement('span');
  arrow.className = 'icon icon-chevron link-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  open.append(number, tile, copy, arrow);
  open.addEventListener('click', () => openLink(link.url));
  row.append(open);
  return row;
}

function openLink(target) {
  let url;
  try { url = new URL(target); } catch { return; }
  if (!['http:', 'https:'].includes(url.protocol)) return;
  if (globalThis.chrome?.tabs?.create && !state.preview) {
    chrome.tabs.create({ url: url.toString() });
  } else {
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  }
}

async function loadLinks() {
  $('#home-status').textContent = translate('home.loading');
  $('#links-list').replaceChildren();
  try {
    const links = await fetchLinks();
    state.links = links;
    $('#home-status').textContent = '';
    $('#links-empty').hidden = links.length > 0;
    for (let index = 0; index < links.length; index += 1) {
      $('#links-list').append(renderLink(links[index], index));
    }
  } catch (error) {
    $('#home-status').textContent = friendlyError(error) || translate('home.linkError');
    $('#links-empty').hidden = true;
  }
}

$('#refresh-button').addEventListener('click', () => { void loadLinks(); });
$('#home-settings-button').addEventListener('click', openOptions);
$('#add-link-button').addEventListener('click', () => {
  $('#link-form-status').textContent = '';
  $('#link-dialog').showModal();
  $('#link-title').focus();
});
$('#close-link-dialog').addEventListener('click', () => $('#link-dialog').close());
$('#cancel-link').addEventListener('click', () => $('#link-dialog').close());

$('#link-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = $('#link-title').value.trim();
  if (!title) {
    $('#link-form-status').textContent = translate('link.required');
    return;
  }
  let url;
  try { url = normalizeLink($('#link-url').value); } catch {
    $('#link-form-status').textContent = translate('link.badAddress');
    return;
  }
  const button = event.submitter;
  button.disabled = true;
  try {
    if (state.preview) {
      state.links.push({ id: 'demo-' + Date.now(), title, url });
    } else {
      await apiRequest(state.server, state.key, '/links', { method: 'POST', body: JSON.stringify({ title, url }) });
    }
    $('#link-form').reset();
    $('#link-dialog').close();
    await loadLinks();
    toast(translate('link.saved'));
  } catch (error) {
    $('#link-form-status').textContent = friendlyError(error);
  } finally {
    button.disabled = false;
  }
});

function openOptions() {
  if (globalThis.chrome?.runtime?.openOptionsPage && !state.preview) {
    chrome.runtime.openOptionsPage();
  } else {
    window.location.href = 'options.html';
  }
}

let toastTimer;
function toast(message, action, onAction) {
  const element = $('#toast');
  element.replaceChildren(document.createTextNode(message));
  if (action && onAction) {
    const button = document.createElement('button');
    button.className = 'toast-action';
    button.type = 'button';
    button.textContent = action;
    button.addEventListener('click', onAction, { once: true });
    element.append(button);
  }
  element.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('is-visible'), 2800);
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

function displayRelease(release, dismissedVersion = '') {
  state.release = release;
  if (!release || compareVersions(release.tag_name, chrome.runtime?.getManifest?.().version || '0.1.0') <= 0 || release.tag_name === dismissedVersion) {
    $('#update-notice').hidden = true;
    return;
  }
  $('#update-title').textContent = translate('update.title');
  $('#update-version').textContent = release.tag_name;
  $('#update-notice').hidden = false;
}

async function checkForUpdate(manual = false) {
  if (state.preview || !globalThis.chrome?.permissions) return;
  try {
    const saved = await storageGet(['latestRelease', 'releaseCheckedAt', 'dismissedVersion']);
    if (!manual && saved.latestRelease) displayRelease(saved.latestRelease, saved.dismissedVersion || '');
    const age = Date.now() - Number(saved.releaseCheckedAt || 0);
    if (!manual && age < 6 * 60 * 60 * 1000) return;
    const permitted = await chrome.permissions.contains({ origins: ['https://api.github.com/*'] });
    if (!permitted) return;
    const response = await fetch(releaseEndpoint, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
      credentials: 'omit',
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return;
    const release = await response.json();
    if (!release?.tag_name || !release?.html_url) return;
    const compactRelease = { tag_name: release.tag_name, html_url: release.html_url };
    await storageSet({ latestRelease: compactRelease, releaseCheckedAt: Date.now() });
    displayRelease(compactRelease, saved.dismissedVersion || '');
  } catch {
    // An unavailable release feed must not interrupt access to the intranet.
  }
}

$('#update-now').addEventListener('click', async () => {
  const target = state.release?.html_url;
  const releaseURL = (() => {
    try {
      const url = new URL(target || releasesPage);
      return url.origin === 'https://github.com' ? url.href : releasesPage;
    } catch { return releasesPage; }
  })();
  if (globalThis.chrome?.tabs?.create && !state.preview) chrome.tabs.create({ url: releaseURL });
  else window.open(releaseURL, '_blank', 'noopener,noreferrer');
});
$('#update-later').addEventListener('click', async () => {
  if (state.release?.tag_name) await storageSet({ dismissedVersion: state.release.tag_name });
  $('#update-notice').hidden = true;
  toast(translate('update.dismissed'));
});

async function start() {
  await initializeLanguage();
  document.querySelector('[data-language-toggle]')?.addEventListener('click', toggleLanguage);
  if (globalThis.chrome?.storage?.local && globalThis.chrome?.runtime?.id) {
    try {
      if (typeof chrome.storage.local.setAccessLevel === 'function') {
        await chrome.storage.local.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
      }
    } catch {
      // Older Chrome versions can use the default extension-only storage access.
    }
  }
  const saved = await storageGet(['serverUrl', 'accessKey']);
  $('#popup-address').value = saved.serverUrl || '';
  $('#popup-key').value = saved.accessKey || '';
  if (state.preview && new URLSearchParams(location.search).get('preview') === '1') {
    state.server = 'http://192.168.1.40:8080';
    state.links = [...demoLinks];
    showHome(state.server);
    await loadLinks();
    return;
  }
  if (!saved.serverUrl || !saved.accessKey) {
    showConnection();
    return;
  }
  try {
    state.server = normalizeServerAddress(saved.serverUrl);
    state.key = saved.accessKey;
    await assertHostPermission(state.server);
    await checkServer(state.server, state.key);
    showHome(state.server);
    await loadLinks();
    void checkForUpdate(false);
  } catch (error) {
    showConnection(friendlyError(error));
  }
}

void start();
