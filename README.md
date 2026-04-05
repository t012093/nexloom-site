<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1hOJYUlSEZuUzYwpnLSIUlO1SSLkKtSO_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Optional: set iOS distribution URL in `.env.local`
   `VITE_IOS_DOWNLOAD_URL=https://testflight.apple.com/join/your-link`
4. Optional: set iOS label shown on the site
   `VITE_IOS_DOWNLOAD_LABEL=iOS TestFlight`
5. Optional: set Android distribution URL in `.env.local`
   `VITE_ANDROID_DOWNLOAD_URL=https://your-public-host/path/app.apk`
6. Optional: set Android label shown on the site
   `VITE_ANDROID_DOWNLOAD_LABEL=Android preview APK v1.0.0`
7. Prefer a stable public install URL rather than a short-lived artifact URL
8. Run the app:
   `npm run dev`
