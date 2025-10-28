import { useContext } from 'react';
import { WidgetContext, buildAssetUrl } from '../lib/context';

function getThemeStyles(theme: 'light' | 'dark' | 'auto') {
  const isDark =
    theme === 'dark' ||
    (theme === 'auto' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return {
    background: isDark ? '#1a1a1a' : '#fff',
    color: isDark ? '#fff' : '#333',
    border: isDark ? '1px solid #333' : '1px solid #e1e5e9',
    buttonBg: isDark ? '#0066cc' : '#0056b3',
    buttonShadow: isDark
      ? '0 4px 12px rgba(0,102,204,0.3)'
      : '0 4px 12px rgba(0,123,255,0.3)',
  };
}

export function Widget() {
  const { isOpen, setIsOpen, config } = useContext(WidgetContext);
  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };

  const sizeStyles = {
    small: { width: '17.5rem', height: '21.875rem' },
    medium: { width: '25.75rem', height: '25rem' },
    large: { width: '25.75rem', height: '31.25rem' },
  };

  const positionKey = (config.position || 'bottom-right') as keyof typeof positionStyles;
  const sizeKey = (config.size || 'medium') as keyof typeof sizeStyles;
  const currentPosition = positionStyles[positionKey];
  const currentSize = sizeStyles[sizeKey];

  // Apply theme-based styling
  const themeStyles = getThemeStyles(config.theme || 'auto');

  if (config.debug) {
    console.log('Widget state:', { isOpen, config });
  }
  return (
    <div
      style={{
        position: 'fixed',
        ...currentPosition,
        zIndex: 9999,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {isOpen ? (
        <div
          style={{
            ...currentSize,
            backgroundImage: `url(${buildAssetUrl(config.assetBaseUrl, 'bg.svg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: themeStyles.color,
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '16px',
            border: themeStyles.border,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
              Hello from React Widget 👋
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#fff',
                opacity: 0.7,
                padding: '4px',
                borderRadius: '4px',
              }}
            >
              ✖
            </button>
          </div>
          <div>
            <button className='flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
              Back
            </button>
          </div>
        </div>
      ) : (
        <button
          style={{
            background: themeStyles.buttonBg,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            boxShadow: themeStyles.buttonShadow,
            transition: 'transform 0.2s ease',
            textAlign: 'center',
          }}
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
}
