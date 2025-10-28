import { useContext, useEffect, useRef, useState } from 'react';
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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
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
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev: any) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev: any) => prev - 1);
    }
  };
  console.log(currentStep, 'step');
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
          <div className='w-full h-[0.6rem] bg-[#D9D9D9] rounded-full mb-5 sm:mb-6 flex items-center overflow-hidden'>
            <div
              className='h-[0.4rem] bg-[#25C196] rounded-full ml-0.5 mr-0.5 transition-all duration-500 ease-in-out'
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {currentStep === 1 && <StepOne handleNext={handleNext} />}
          {currentStep === 2 && (
            <>
              <div className=''>step2</div>
              <div className='flex items-center justify-between mb-4'>
                <button
                  onClick={handlePrevious}
                  disabled={true}
                  className='px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200'
                  style={{ color: themeStyles.color }}
                >
                  Previous
                </button>

                <span className='text-sm font-medium'>
                  Step {currentStep} of {totalSteps}
                </span>

                <button
                  onClick={handleNext}
                  className='px-4 py-2 bg-[#25C196] hover:bg-[#1fa57d] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200'
                >
                  Next
                </button>
              </div>{' '}
            </>
          )}
          {currentStep === 3 && <StepOne handleNext={handleNext} />}
          {currentStep === 4 && <StepOne handleNext={handleNext} />}
          {currentStep === 5 && <StepOne handleNext={handleNext} />}
          {currentStep === 6 && <StepOne handleNext={handleNext} />}

          {/* <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              style={{ color: currentStep === 1 ? "#9ca3af" : themeStyles.color }}
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>

            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className="px-4 py-2 bg-[#25C196] hover:bg-[#1fa57d] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          </div> */}
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
