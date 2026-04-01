// popup.js

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const autoLoginToggle = document.getElementById('autoLogin');
const saveBtn = document.getElementById('saveBtn');
const loginNowBtn = document.getElementById('loginNowBtn');
const toast = document.getElementById('toast');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

// Load saved values
chrome.storage.local.get(['username', 'password', 'autoLogin'], (data) => {
  if (data.username) usernameInput.value = data.username;
  if (data.password) passwordInput.value = data.password;
  autoLoginToggle.checked = data.autoLogin !== false; // default true

  updateStatus(!!data.username && !!data.password, data.autoLogin !== false);
});

function updateStatus(hasCreds, autoOn) {
  if (hasCreds && autoOn) {
    statusDot.className = 'dot active';
    statusText.textContent = 'Ready — will auto-login when portal opens.';
  } else if (hasCreds && !autoOn) {
    statusDot.className = 'dot inactive';
    statusText.textContent = 'Credentials saved, but auto-login is off.';
  } else {
    statusDot.className = 'dot inactive';
    statusText.textContent = 'No credentials saved yet.';
  }
}

saveBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const autoLogin = autoLoginToggle.checked;

  if (!username || !password) {
    statusDot.className = 'dot inactive';
    statusText.textContent = 'Please enter both username and password.';
    return;
  }

  chrome.storage.local.set({ username, password, autoLogin }, () => {
    updateStatus(true, autoLogin);
    toast.style.display = 'block';
    setTimeout(() => (toast.style.display = 'none'), 3000);
  });
});

loginNowBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://10.10.0.1/24online/servlet/E24onlineHTTPClient' });
});
