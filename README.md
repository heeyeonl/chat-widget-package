# Chat Widget

A modern, AI-powered chat widget for React applications, powered by OpenAI's GPT-3.5 Turbo. This lightweight, customizable component adds intelligent, contextual support to your app with minimal setup.

## ✨ Features

* 🤖 **AI-Powered Responses** – Uses OpenAI's GPT-3.5 Turbo for natural, contextual replies
* 🎨 **Customizable Branding** – Easily set your own logo, title, subtitle, and brand colors
* 💬 **Live Chat UI** – Smooth interface with auto-scroll and typing support
* 🛠️ **Maintenance Mode** – Gracefully disables input and shows a banner when offline
* 📱 **Responsive Design** – Mobile-friendly, works across all screen sizes
* 🔌 **Backend Integration** – Easily connect to your own or hosted OpenAI proxy
* 🔐 **Secure Architecture** – API key remains server-side; frontend communicates via API

---

## 🚀 Quick Start

### 1. Install the package

```bash
npm install @heeyeonl/chat-widget
```

### 2. Use it in your React app

```jsx
import { ChatWidget } from '@heeyeonl/chat-widget';

function App() {
  return (
    <ChatWidget
      logoUrl="https://your-logo-url.png"
      title="Chat Support"
      subtitle="Ask me anything"
      brandColor="#6f33b7"
    />
  );
}
```

---

## 🧪 Build & Test

### To build the component:

```bash
npm run build
```

### To test it locally:

```bash
npm start
```

This will launch the development server to preview and test the widget.

### To package and test locally via npm:

```bash
npm run build
npm pack
npm link
```

Then in another sample project:

```bash
npm link @heeyeonl/chat-widget
```

---

## 🌐 Embed in a Sample HTML Page

Although this widget is designed for React apps, you can test it in an HTML environment by bundling it with a tool like Vite or Webpack. Alternatively, run a simple React app and mount `<ChatWidget />` there to simulate integration.

---

## 💭 Approach & Architecture

### Problem Approach:

I aimed to design a plug-and-play React component that provides AI-powered support, while being easily brandable and backend-agnostic. The goal was to mimic a real-world SaaS SDK that can be distributed as an npm package.

### Architectural Decisions:

* **Frontend/Backend separation** to keep the API key secure and maintain proper layering
* **CSS variable theming** to support easy brand customization without class rewriting
* **Mocked maintenance mode** to simulate real-world behavior for future dynamic toggle support

### Challenges Faced:

* Handling API key security when designing a seamless frontend integration
* Managing state and UI consistency for edge cases like maintenance or offline mode
* Ensuring CSS, images, and assets were bundled and linked properly in npm for distribution

---

## ⚙️ Configuration Options

| Prop         | Type     | Default                                                                                   | Description                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------- | --------------------------------------- |
| `logoUrl`    | `string` | `"https://raw.githubusercontent.com/heeyeonl/chat-widget-package/main/eloquent-logo.png"` | URL of your company logo                |
| `title`      | `string` | `"Eloquent AI"`                                                                           | Title displayed in the chat header      |
| `subtitle`   | `string` | `"Ask me anything"`                                                                       | Subtitle displayed in the chat          |
| `brandColor` | `string` | `"#6f33b7"`                                                                               | Primary brand color for the chat widget |

---

## 🔍 Feature Details

### 🤖 AI-Powered Chat

* Intelligent responses using OpenAI's GPT-3.5 Turbo
* Context-aware conversations
* Natural language understanding

### 🛠️ Maintenance Mode

* Supports configurable maintenance periods with user-friendly messaging
* While in maintenance mode, the chat input is disabled and a banner is shown
* Currently, maintenance mode is simulated: it activates every 60 seconds and lasts for 10 seconds (mocked)

### 🟢 Online/Offline Mode

* Displays a green dot when the user is active, and gray when inactive
* User status is determined by mouse movement — if there's no activity for 10 seconds, the status switches to offline (mocked)

### 🎨 Customization

* Seamless brand integration through customizable props
* Dynamic color theming with brand color support
* Flexible header customization (logo, title, subtitle)
* Consistent styling across all components

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the package
npm run build
```

---

## 🧰 Tech Stack

* React + TypeScript
* OpenAI (GPT-3.5 Turbo)
* Node.js (Express for backend)
* Render (deployment)
* Custom CSS with design tokens via CSS variables

---

## 📄 License

MIT © Heeyeon Lee
