# UGC NET Political Science — Quiz Hub

## What this is
A small multi-topic quiz website (static) for UGC NET Political Science. Designed for easy editing and hosting on GitHub Pages.

## How to use locally
1. Download the folder.
2. Open `index.html` in your browser (double-click). The built-in default questions will work locally.

## How to host on GitHub Pages
1. Create a GitHub repository (e.g., `ugc-net-political-science`).
2. Upload all files to the `main` branch.
3. Go to Settings → Pages → Source: `main` branch → Save.  
4. Your site will be served at `https://<username>.github.io/<repo>/`.

## How to add questions
- Edit `questions.js`. Each topic is a property whose value is an array of question objects:
```js
"New Topic": [
  { q: "Question text", opts: ["A","B","C","D"], ans: 0, explanation: "optional" }
]
