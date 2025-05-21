# Chat Widget

A React chat widget component for embedding chat functionality in web applications.

## Installation

```bash
npm install chat-widget
# or
yarn add chat-widget
```

## Usage

```jsx
// Import the component
import { ChatWidget } from 'chat-widget';
// Import the styles
import 'chat-widget/styles.css';

function App() {
  return (
    <ChatWidget
      apiEndpoint="https://your-api-endpoint.com/chat"
      // Optional: Override the default logo
      logoUrl="https://your-logo-url.png"
      // Optional: Set initial online status
      initialOnlineStatus={true}
      // Add other props as needed
      companyName="Your Company"
      companyLogo="https://your-company-logo.png"
      isInMaintenance={false}
      maintenanceMessage="We're currently performing maintenance. Please try again later."
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| apiEndpoint | string | Yes | - | The endpoint URL for the chat API |
| title | string | No | 'Eloquent AI' | Title displayed in the chat header |
| subtitle | string | No | 'Ask me anything' | Subtitle displayed in the welcome message |
| logoUrl | string | No | - | URL for the logo image |
| initialOnlineStatus | boolean | No | true | Initial online status of the chat |
| companyName | string | Yes | - | The name of your company |
| companyLogo | string | Yes | - | URL to your company logo |
| isInMaintenance | boolean | No | false | Whether the chat is in maintenance mode |
| maintenanceMessage | string | No | "Chat is currently under maintenance. Please try again later." | Custom message to display during maintenance |

## Features

- Real-time chat interface
- Online/Offline status indicator
- Maintenance mode with customizable message
- Customizable branding
- Responsive design
- TypeScript support

## Assets

The package includes a default logo at `chat-widget/assets/eloquent-logo.png`. You can:
- Use the default logo by not specifying a `logoUrl` prop
- Override it with your own logo by providing a `logoUrl` prop
- Access the default logo directly: `import 'chat-widget/assets/eloquent-logo.png'`

## License

MIT 