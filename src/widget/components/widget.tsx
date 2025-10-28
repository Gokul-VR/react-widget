import { useContext, useEffect, useRef } from 'react';
import { WidgetContext } from '../lib/context';
import bgImage from '../../assets/bg.png';
import catersweet from '../../assets/catersweet.svg';
import StepOne from './stepOne';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };

  const sizeStyles = {
    small: { width: '17.5rem', height: '21.875rem' },
    medium: { width: '27.75rem', height: '35rem' },
    large: { width: '27.75rem', height: '35rem' },
  };

  const positionKey = (config.position ||
    'bottom-right') as keyof typeof positionStyles;
  const sizeKey = (config.size || 'medium') as keyof typeof sizeStyles;
  const currentPosition = positionStyles[positionKey];
  const currentSize = sizeStyles[sizeKey];

  // Apply theme-based styling
  const themeStyles = getThemeStyles(config.theme || 'auto');

  if (config.debug) {
    console.log('Widget state:', { isOpen, config });
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | globalThis.MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener(
        'mousedown',
        handleClickOutside as EventListener,
      );
    }

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as EventListener,
      );
    };
  }, [isOpen, setIsOpen]);

  // type cateringTypes = {
  //   icon: string;
  //   label: string;
  // };
  // const cateringItems = [
  //   { label: 'Corporate', icon: CorporateIcon },
  //   { label: 'Wedding', icon: WeddingIcon },
  //   { label: 'Private Parties', icon: PrivatePartiesIcon },
  //   { label: 'Outdoor', icon: OutdoorIcon },
  //   { label: 'Fund Raising', icon: FundRaisingIcon },
  //   { label: 'Others', icon: OthersIcon },
  // ];
  return (
    <div
      ref={containerRef}
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
            backgroundImage: `url(${bgImage})`,
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
          <StepOne />
        </div>
      ) : (
        <button
          style={{
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            textAlign: 'center',
          }}
          onClick={() => setIsOpen(true)}
        >
          <img src={catersweet} />
        </button>
      )}
    </div>
  );
}
