# 🛜 LPU WiFi Auto Login

A Chrome extension that automatically logs you into LPU's hostel WiFi (24Online captive portal) the moment the login page opens — no more typing credentials every single time you reconnect.

---

## How It Works

When you connect to hostel WiFi, the browser opens the 24Online portal. The extension detects it, checks the T&C checkbox, fills in your credentials, and submits the form — all in under a second.

---

## Installation

> The extension isn't on the Chrome Web Store, so you load it manually. Takes about a minute.

1. **Download** — Clone this repo or hit **Code → Download ZIP** and extract it
2. **Open** `chrome://extensions` in Chrome
3. **Enable Developer mode** (toggle in the top-right)
4. **Click Load unpacked** → select the `lpu-wifi-extension` folder
5. **Pin it** — click the 🧩 puzzle icon in the toolbar and pin the extension

---

## Setup

1. Click the extension icon
2. Enter your **LPU registration number** — just the number, no `@lpu.com`
3. Enter your **WiFi password**
4. Hit **Save Credentials**

Done. Next time the portal opens, it logs you in automatically.

---

## Project Structure

```
lpu-wifi-extension/
├── manifest.json     # Extension config (Manifest V3)
├── content.js        # Detects the portal page, fills & submits the form
├── background.js     # Service worker
├── popup.html        # Extension popup UI
├── popup.js          # Save/load credentials logic
└── icons/
```

---

## Troubleshooting

**Nothing happens on the portal page**
→ Make sure the extension loaded without errors at `chrome://extensions`. Try reloading it.

**Login fails**
→ Open the popup, double-check your credentials, and try logging in manually once to confirm they're correct.

**Page loads but form isn't filled**
→ Hard refresh the tab (`Ctrl + Shift + R`) — sometimes the page loads faster than the script.

---

## Privacy

Credentials are saved locally using `chrome.storage.local` and never leave your device. The extension only has permission to access `10.10.0.1` and `internet.lpu.in` — nothing else.

---

## License

MIT
