// background.js - Service worker

// Listen for tab updates — when the captive portal tab opens, the content
// script will fire automatically via manifest content_scripts.
// This background script is kept minimal; it could be extended to detect
// network changes in the future.

chrome.runtime.onInstalled.addListener(() => {
  console.log("[LPU WiFi] Extension installed. Open the popup to save your credentials.");
});
