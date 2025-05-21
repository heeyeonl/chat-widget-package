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
      logoUrl="path/to/your/logo.png"
      // Add other props as needed
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| apiEndpoint | string | Yes | The endpoint URL for the chat API |
| title | string | No | Title displayed in the chat header (default: 'Eloquent AI') |
| subtitle | string | No | Subtitle displayed in the welcome message (default: 'Ask me anything') |
| logoUrl | string | No | URL for the logo image (default: 'chat-widget/assets/eloquent-logo.png') |
| poweredByUrl | string | No | URL for the "Powered by" link |
| poweredByText | string | No | Text for the "Powered by" link |

## Assets

The package includes a default logo at `chat-widget/assets/eloquent-logo.png`. You can:
- Use the default logo by not specifying a `logoUrl` prop
- Override it with your own logo by providing a `logoUrl` prop
- Access the default logo directly: `import 'chat-widget/assets/eloquent-logo.png'`

## License

MIT 