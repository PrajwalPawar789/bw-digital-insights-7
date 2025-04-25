
import { useState, useEffect, useRef } from 'react';
import { Bot, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BOTPRESS_CLIENT_ID = 'aaf0c61b-ef96-45c9-bbf5-db8ba11d2654';

const ChatBot = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Check if script is already loaded to avoid duplicate injections
    if (document.querySelector('script[src="https://cdn.botpress.cloud/webchat/v1/inject.js"]')) {
      return;
    }

    // Initialize Botpress webchat
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    scriptRef.current = script;
    
    const handleScriptLoad = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          "composerPlaceholder": "Chat with us",
          "botConversationDescription": "Welcome to InsightsBW AI Assistant",
          "botId": BOTPRESS_CLIENT_ID,
          "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
          "messagingUrl": "https://messaging.botpress.cloud",
          "clientId": BOTPRESS_CLIENT_ID,
          "botName": "InsightsBW Assistant",
          "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/d3d431e9-e64c-4622-85e2-fb7fdb86c27b/v31097/style.css",
          "useSessionStorage": true,
          "showPoweredBy": false,
          "theme": "prism",
          "themeColor": "#EF4444"
        });

        // Check if webchat is ready
        const checkChatReady = setInterval(() => {
          const widgetContainer = document.getElementById('bp-web-widget-container');
          if (widgetContainer) {
            setIsLoading(false);
            clearInterval(checkChatReady);
          }
        }, 500);

        // Clear check if it takes too long
        setTimeout(() => {
          clearInterval(checkChatReady);
          setIsLoading(false);
        }, 5000);
      }
    };

    script.onload = handleScriptLoad;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      
      // Clean up Botpress chat
      if (window.botpressWebChat) {
        window.botpressWebChat.cleanup();
      }
      
      // Remove any interval that might be running
      const widgetContainer = document.getElementById('bp-web-widget-container');
      if (widgetContainer && widgetContainer.parentNode) {
        widgetContainer.parentNode.removeChild(widgetContainer);
      }
    };
  }, []);

  const toggleChat = () => {
    if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'toggle' });
      setIsOpen(!isOpen);
    }
  };

  return (
    <Button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-insightRed hover:bg-insightRed/90 transition-all duration-300 transform hover:scale-110"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="h-6 w-6 text-white animate-spin" />
      ) : (
        <Bot className="h-6 w-6 text-white" />
      )}
    </Button>
  );
};

export default ChatBot;
