# 🛜 LPU WiFi Auto Login
 
A Chrome extension that automatically logs you into LPU's hostel WiFi (24Online captive portal) the moment the login page opens — no more typing credentials every single time you reconnect.
 
---
 
## How It Works
 
When you connect to hostel WiFi, the browser opens the 24Online portal. The extension detects it, checks the T&C checkbox, fills in your credentials, and submits the form — all in under a second.
 
---
 
## Installation
 
> The extension isn't on the Chrome Web Store, so you load it manually. Takes about a minute.
 
**Step 1 — Get the code**
 
```bash
git clone https://github.com/kaustubhshukla9586/lpu-wifi-extension.git
cd lpu-wifi-extension
```
 
Or if you don't have Git, click **Code → Download ZIP** on GitHub, then extract the ZIP somewhere you'll remember (like your Desktop).
 
**Step 2 — Open Chrome Extensions**
 
Paste this in your address bar and hit Enter:
 
```
chrome://extensions
```
 
**Step 3 — Enable Developer Mode**
 
Toggle on **Developer mode** in the top-right corner of the page.
 
**Step 4 — Load the extension**
 
Click **Load unpacked** → navigate to the cloned/extracted folder → select the `lpu-wifi-extension` folder inside it → click **Select Folder**.
 
You should see the extension card appear with the name "LPU WiFi Auto Login".
 
**Step 5 — Pin it to your toolbar**
 
Click the 🧩 puzzle icon in the Chrome toolbar → find the extension → click the 📌 pin icon so it's always visible.
 
---
 
## Setup
 
1. Click the extension icon in your toolbar
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
└── icons/*.png
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
 