// content.js - Runs on the 24Online login page

(async () => {
  // Get saved credentials from storage
  const data = await chrome.storage.local.get(["username", "password", "autoLogin"]);

  if (!data.username || !data.password) {
    console.log("[LPU WiFi] No credentials saved. Open the extension popup to set them.");
    return;
  }

  if (data.autoLogin === false) {
    console.log("[LPU WiFi] Auto-login is disabled.");
    return;
  }

  // Wait for the form elements to be ready
  const waitFor = (selector, timeout = 5000) =>
    new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Timeout waiting for ${selector}`));
      }, timeout);
    });

  try {
    console.log("[LPU WiFi] Login page detected. Starting auto-login...");

    // Small delay to ensure page scripts have initialised
    await new Promise(r => setTimeout(r, 800));

    // 1. Fill username (without @lpu.com — appendUserName() adds it on submit)
    const usernameInput = await waitFor('input[name="username"]');
    usernameInput.value = data.username;

    // 2. Fill password
    const passwordInput = await waitFor('input[name="password"]');
    passwordInput.value = data.password;

    // 3. Check the T&C checkbox to enable the login button
    const checkbox = await waitFor('#agreepolicy');
    if (!checkbox.checked) {
      checkbox.click(); // triggers policycheck() which enables loginbtn
    }

    // 4. Wait a tick for the button to become enabled
    await new Promise(r => setTimeout(r, 300));

    // 5. Enable the button manually as a fallback (in case policycheck() needs onChange)
    const loginBtn = document.getElementById('loginbtn');
    if (loginBtn) {
      loginBtn.disabled = false;
    }

    // 6. Click the login button — this triggers the page's own onclick="return appendUserName()"
    //    which runs in the page's JS context (content scripts can't call page functions directly).
    await new Promise(r => setTimeout(r, 200));

    const loginBtn2 = document.getElementById('loginbtn');
    if (loginBtn2) {
      console.log("[LPU WiFi] Clicking login button...");
      loginBtn2.click();
    } else {
      console.error("[LPU WiFi] Login button not found.");
    }

  } catch (err) {
    console.error("[LPU WiFi] Auto-login failed:", err.message);
  }
})();
