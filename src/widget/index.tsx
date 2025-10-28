import { hydrateRoot } from 'react-dom/client';
import { WidgetContainer } from './components/widget-container';
import { WidgetExtractor } from './lib/widget-config';
import './styles/style.css';

function initializeWidget() {
  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
}

function onReady() {
  try {
    // Initialize widget extractor
    const extractor = new WidgetExtractor();
    
    // Validate configuration
    const validation = extractor.validateConfig();
    if (!validation.isValid) {
      console.error('Widget configuration errors:', validation.errors);
      throw new Error(`Widget configuration invalid: ${validation.errors.join(', ')}`);
    }

    // Get widget configuration
    const config = extractor.getConfig();
    
    // Log configuration if debug mode is enabled
    extractor.logConfig();

    // Create widget container
    const element = document.createElement('div');
    const shadow = element.attachShadow({ mode: 'open' });
    const shadowRoot = document.createElement('div');
    
    shadowRoot.id = 'widget-root';
    
    // Apply custom styles if any
    applyCustomStyles(shadowRoot, config.customStyles);

    const component = (
      <WidgetContainer config={config} />
    );

    shadow.appendChild(shadowRoot);
    injectStyle(shadowRoot);
    hydrateRoot(shadowRoot, component);

    document.body.appendChild(element);
    
    // Track widget initialization
    if (config.features?.analytics) {
      trackWidgetInitialization(config);
    }
    
  } catch (error) {
    console.error('Widget initialization failed:', error);
    
    // Show user-friendly error message
    showErrorMessage(error instanceof Error ? error.message : 'Widget failed to load');
  }
}

function injectStyle(shadowRoot: HTMLElement) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  const fileName = process.env.WIDGET_NAME || 'widget';
  // Try to build an absolute URL from the script's base to ensure external hosts can fetch the CSS
  const base = new WidgetExtractor().getConfig().assetBaseUrl || '/';
  link.href = process.env.WIDGET_CSS_URL || `${base}${fileName}.css`;
  shadowRoot.appendChild(link);
}

function applyCustomStyles(shadowRoot: HTMLElement, customStyles: Record<string, string> = {}) {
  if (Object.keys(customStyles).length === 0) return;
  
  const style = document.createElement('style');
  let cssText = '';
  
  Object.entries(customStyles).forEach(([property, value]) => {
    cssText += `:host { ${property}: ${value}; }\n`;
  });
  
  style.textContent = cssText;
  shadowRoot.appendChild(style);
}

function trackWidgetInitialization(config: any) {
  // This would typically send analytics data to your backend
  console.log('Widget analytics: Initialized for client', config.clientKey);
  
  // Example: Send to analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'widget_initialized', {
      client_key: config.clientKey,
      theme: config.theme,
      position: config.position,
      size: config.size,
    });
  }
}

function showErrorMessage(message: string) {
  // Create a simple error message for users
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    z-index: 9999;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `;
  errorDiv.textContent = `Widget Error: ${message}`;
  
  document.body.appendChild(errorDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

initializeWidget();