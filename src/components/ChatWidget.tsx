import React, { useState } from 'react'
import './ChatWidget.css'

const defaultLogoUrl = 'https://raw.githubusercontent.com/heeyeonl/chat-widget-package/main/eloquent-logo.png';
/**
 * Interface for individual chat messages
 */
export interface Message {
  id: number
  text: string
  sender: 'user' | 'support'
  timestamp: Date
}

/**
 * Configuration props for the ChatWidget component
 */
export interface ChatWidgetProps {
  /** API endpoint for chat messages */
  apiUrl?: string
  /** Title displayed in the chat header */
  title?: string
  /** Subtitle displayed in the welcome message */
  subtitle?: string
  /** URL for the logo image */
  logoUrl?: string
  /** URL for the "Powered by" link */
  poweredByUrl?: string
  /** Text for the "Powered by" link */
  poweredByText?: string
}

/**
 * A configurable chat widget component that can be embedded in any React application
 */
export function ChatWidget({
  apiUrl = 'http://localhost:3001/api/chat',
  title = 'Eloquent AI',
  subtitle = 'Ask me anything',
  logoUrl = defaultLogoUrl,
  poweredByUrl = 'https://www.eloquentai.co/',
  poweredByText = 'Eloquent AI'
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
  
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: inputText })
        });
  
        let data;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        } else {
          throw new Error('Server is not responding properly. Please make sure the server is running.');
        }
  
        if (!res.ok) {
          throw new Error(data.error || `API request failed with status ${res.status}`);
        }
  
        const supportResponse: Message = {
          id: messages.length + 2,
          text: data.reply,
          sender: 'support',
          timestamp: new Date()
        };
  
        setMessages(prev => [...prev, supportResponse]);
      } catch (error: Error | unknown) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: error instanceof Error ? error.message : 'Sorry, there was an error processing your message. Please try again.',
          sender: 'support',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  return (
    <>
      <button 
        className="chat-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <img src={logoUrl} alt={title} />
            <h2>{title}</h2>
          </div>
          <div className="chat-messages">
            <div className="chat-welcome">
              <img src={logoUrl} alt={title} />
              <h3>{title} responds instantly</h3>
              <p>{subtitle}</p>
            </div>
            {messages.map((message) => (
              <div key={message.id} className={`message-container ${message.sender}`}>
                {message.sender === 'support' && (
                  <img src={logoUrl} alt={title} className="message-logo" />
                )}
                <div className={`message ${message.sender}`}>
                  <div className="message-content">
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#fff"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
          <div className="chat-footer">
            <p>Powered by <a href={poweredByUrl}>{poweredByText}</a></p>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget 