# Eloquent AI Chat Widget

A customizable chat widget component for React applications that provides a seamless chat interface for your users.

## Features

- 🎨 Customizable appearance (logo, title, subtitle)
- 💬 Real-time chat functionality
- 🔄 Online/Offline status indicator
- 🛠️ Maintenance mode support
- 📱 Responsive design
- ⌨️ Keyboard support (Enter to send)
- 🖱️ Click outside to close
- 🔍 Auto-scroll to latest messages

## Installation

```bash
npm install @eloquentai/chat-widget
```

## Usage

```jsx
import { ChatWidget } from '@eloquentai/chat-widget';

function App() {
  return (
    <ChatWidget
      apiUrl="your-api-endpoint"
      title="Your Chat Title"
      subtitle="Your welcome message"
      logoUrl="your-logo-url"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | 'http://localhost:3001/api/chat' | API endpoint for chat messages |
| `title` | string | 'Eloquent AI' | Title displayed in the chat header |
| `subtitle` | string | 'Ask me anything' | Subtitle displayed in the welcome message |
| `logoUrl` | string | Eloquent AI logo | URL for the logo image |
| `initialOnlineStatus` | boolean | true | Initial online status |

## Current Mock Implementations

### Online/Offline Status
The widget currently includes a mock implementation of the online/offline status:
- User is considered online when there's any activity (mouse movement, clicks, keyboard input, or touch)
- After 10 seconds of inactivity, the status changes to offline
- Status automatically returns to online when user activity is detected
- This can be replaced with real status tracking from your backend

### Maintenance Mode
The widget includes a mock implementation of maintenance mode:
- Maintenance mode activates every 30 seconds
- Each maintenance period lasts for 5 seconds
- During maintenance:
  - A maintenance banner is displayed
  - Chat input is disabled
  - Users cannot send new messages
- This mock implementation can be replaced with real maintenance status from the Eloquent AI endpoint in the future.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the package
npm run build
```

## License

MIT © [Eloquent AI](https://www.eloquentai.co/)

