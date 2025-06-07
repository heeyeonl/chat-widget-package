import React, { useState, useEffect, useRef } from 'react'
import './ChatWidget.css'

const API_URL = 'https://chat-widget-server.onrender.com/api/chat';
const DEFAULT_LOGO = 'https://raw.githubusercontent.com/heeyeonl/chat-widget-package/main/logo.png';
const DEFAULT_TITLE = 'Chat AI';
const DEFAULT_SUBTITLE = 'Ask me anything';
const DEFAULT_BRAND_COLOR = '#4981ba';
const DEFAULT_HOVER_COLOR = '#CD5A86';

/**
 * Interface for maintenance status response
 */
interface MaintenanceStatus {
  isInMaintenance: boolean;
  maintenanceMessage: string;
}

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
  /** URL for the logo image */
  logoUrl?: string
  /** Title displayed in the chat header */
  title?: string
  /** Subtitle displayed in the welcome message */
  subtitle?: string
  /** Primary brand color for the chat widget */
  brandColor?: string
  /** Hover color for the chat widget */
  hoverColor?: string
}

/**
 * A configurable chat widget component that can be embedded in any React application
 */
export function ChatWidget({
  logoUrl = DEFAULT_LOGO,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  brandColor = DEFAULT_BRAND_COLOR,
  hoverColor = DEFAULT_HOVER_COLOR
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: "Hello! How can I help you today?",
      sender: 'support',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [maintenanceStatus, setMaintenanceStatus] = useState<MaintenanceStatus>({
    isInMaintenance: false,
    maintenanceMessage: "We're currently performing maintenance. Please try again later."
  })
  const chatWidgetRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Update CSS variables when brand color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', brandColor);
    document.documentElement.style.setProperty('--brand-color-hover', hoverColor);
  }, [brandColor, hoverColor]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock maintenance status changes
  useEffect(() => {
    // TODO: uncomment this for the real endpoint
    // const fetchMaintenanceStatus = async () => {
    //   try {
    //     const response = await fetch(MAINTENANCE_STATUS_URL);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch maintenance status');
    //     }
    //     const data = await response.json();
    //     setMaintenanceStatus(data);
    //   } catch (error) {
    //     console.error('Error fetching maintenance status:', error);
    //   }
    // };

    // fetchMaintenanceStatus();
    // const interval = setInterval(fetchMaintenanceStatus, 60000);

    // return () => clearInterval(interval);

    // Mock maintenance status set up ---- remove this part when the real api is implemented.
    // Initial status is not in maintenance
    setMaintenanceStatus({
      isInMaintenance: false,
      maintenanceMessage: "We're currently performing maintenance. Please try again later."
    });

    const startMaintenanceCycle = () => {
      const maintenanceTimer = setTimeout(() => {
        setMaintenanceStatus({
          isInMaintenance: true,
          maintenanceMessage: "We're currently performing maintenance. Please try again later."
        });
        const normalTimer = setTimeout(() => {
          setMaintenanceStatus({
            isInMaintenance: false,
            maintenanceMessage: "We're currently performing maintenance. Please try again later."
          });
          startMaintenanceCycle();
        }, 10000); // 10 seconds

        return () => clearTimeout(normalTimer);
      }, 60000); // 1 minute

      return () => clearTimeout(maintenanceTimer);
    };

    const cleanup = startMaintenanceCycle();
    return () => {
      cleanup();
    };
  }, []);

  // Track user activity for online/offline status
  useEffect(() => {
    let inactivityTimer: number;

    const handleUserActivity = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      
      setIsOnline(true);
      
      inactivityTimer = window.setTimeout(() => {
        setIsOnline(false);
      }, 10000);
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    handleUserActivity();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatWidgetRef.current &&
        !chatWidgetRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (inputText.trim() && !maintenanceStatus.isInMaintenance) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputText('');
  
      try {
        const res = await fetch(API_URL, {
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
          id: Date.now() + 1,
          text: data.reply,
          sender: 'support',
          timestamp: new Date()
        };
  
        setMessages(prev => [...prev, supportResponse]);
      } catch (error: Error | unknown) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: Date.now() + 1,
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
        ref={toggleButtonRef}
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
        <div className="chat-widget" ref={chatWidgetRef}>
          <div className="chat-header">
            <img src={logoUrl} alt={title} />
            <div className="header-content">
              <h2>{title}</h2>
              <div className="status-indicator">
                <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
              </div>
            </div>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
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
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {maintenanceStatus.isInMaintenance && (
            <div className="maintenance-banner">
              We're performing maintenance. Chat will be back soon!
            </div>
          )}
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={maintenanceStatus.isInMaintenance ? "Chat is currently in maintenance" : "Type a message..."}
              disabled={maintenanceStatus.isInMaintenance}
            />
            <button onClick={handleSendMessage} disabled={maintenanceStatus.isInMaintenance}>
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
            <p>Built by <a href="https://www.heeyeonlee.com" target="_blank" rel="noopener noreferrer">Heeyeon Lee</a></p>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget 