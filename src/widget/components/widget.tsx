import { useContext, useEffect, useRef, useState, CSSProperties } from 'react';
import { WidgetContext } from '../lib/context';
import bgImage from '../../assets/bg.png';
import catersweet from '../../assets/catersweet.svg';
import StepOne from './steps/stepOne';
import StepFour from './steps/stepFour';
import StepTwo from './steps/stepTwo';
import StepThree from './steps/stepThree';
import StepFive from './steps/stepFive';
import StepSix from './steps/stepSix';
import Completed from './steps/completed';

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

// Helper function to determine transform origin based on position
function getTransformOrigin(position: string): string {
  const origins: { [key: string]: string } = {
    'bottom-right': 'bottom right',
    'bottom-left': 'bottom left',
    'top-right': 'top right',
    'top-left': 'top left',
  };
  return origins[position] || 'center';
}

export function Widget() {
  const { isOpen, setIsOpen, config } = useContext(WidgetContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animationState, setAnimationState] = useState<
    'opening' | 'closing' | 'closed'
  >('closed');

  const totalSteps = 6;
  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };

  const sizeStyles = {
    small: { width: '17.5rem', height: '21.875rem' },
    medium: { width: '27.75rem', height: '36rem' },
    large: { width: '27.75rem', height: '36rem' },
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
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setAnimationState('opening');
      }, 100);
    } else if (shouldRender) {
      setAnimationState('closing');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationState('closed');
        setIsSubmitted(false);
        setCurrentStep(1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

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
  const handleSubmit = () => {
    if (currentStep === 6) {
      setIsSubmitted(true);
    }
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };
  const getWidgetStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      width: currentSize.width,
      height: currentSize.height,
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
      position: 'fixed',
      ...currentPosition,
      zIndex: 9999,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      bottom: '15vh',
      transition:
        'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out',
      transformOrigin: getTransformOrigin(positionKey),
    };

    if (animationState === 'opening') {
      return {
        ...baseStyles,
        transform: 'scale(1)',
        opacity: 1,
      };
    } else if (animationState === 'closing') {
      return {
        ...baseStyles,
        transform: 'scale(0.8)',
        opacity: 0,
      };
    } else {
      return {
        ...baseStyles,
        transform: 'scale(0.8)',
        opacity: 0,
      };
    }
  };

  return (
    <>
      {shouldRender && (
        <div style={getWidgetStyles()}>
          {!isSubmitted && (
            <div className='w-full h-[0.6rem] bg-[#D9D9D9] rounded-full mb-4 flex items-center overflow-hidden'>
              <div
                className='h-[0.4rem] bg-[#25C196] rounded-full ml-0.5 mr-0.5 transition-all duration-500 ease-in-out'
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          )}

          {currentStep === 1 && <StepOne handleNext={handleNext} />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour />}
          {currentStep === 5 && <StepFive />}
          {currentStep === 6 && !isSubmitted && <StepSix />}
          {currentStep === 6 && isSubmitted && <Completed />}
          {!isSubmitted && (
            <div className='flex items-center justify-center gap-3 mb-[0.98rem] '>
              <button
                className='flex items-center justify-center gap-1.5 w-[151px] h-[41px] px-7 rounded-full border border-[#F2F2F2] bg-[rgba(214,214,214,0.3)] backdrop-blur-sm shadow-lg hover:bg-[rgba(214,214,214,0.4)] transition-all'
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <svg width='7' height='13' viewBox='0 0 7 13' fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1.95003 6.49985L6.07478 10.33L5.24995 11.0959L0.712784 6.88281C0.603426 6.78123 0.541992 6.64348 0.541992 6.49985C0.541992 6.35622 0.603426 6.21847 0.712784 6.11689L5.24995 1.90381L6.07478 2.66973L1.95003 6.49985Z'
                    fill='white'
                    fillOpacity='0.85'
                  />
                </svg>
                <span className='text-white/85 font-poppins text-[15px] font-bold -tracking-[0.305px]'>
                  Back
                </span>
              </button>
              {currentStep === 6 ? (
                <button
                  className='flex items-center justify-center gap-1.5 w-[151px] h-[41px] px-7 rounded-full border border-white bg-[rgba(214,214,214,0.3)] backdrop-blur-sm shadow-lg hover:bg-[rgba(214,214,214,0.4)] transition-all'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                  }}
                >
                  <span className='text-white/85 font-poppins text-[15px] font-bold -tracking-[0.305px]'>
                    Submit
                  </span>
                </button>
              ) : (
                <button
                  className='flex items-center justify-center gap-1.5 w-[151px] h-[41px] px-7 rounded-full border border-white bg-[rgba(214,214,214,0.3)] backdrop-blur-sm shadow-lg hover:bg-[rgba(214,214,214,0.4)] transition-all'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                >
                  <span className='text-white/85 font-poppins text-[15px] font-bold -tracking-[0.305px]'>
                    Next
                  </span>
                  <svg width='7' height='13' viewBox='0 0 7 13' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.04997 6.49985L0.925216 10.33L1.75005 11.0959L6.28722 6.88281C6.39657 6.78123 6.45801 6.64348 6.45801 6.49985C6.45801 6.35622 6.39657 6.21847 6.28722 6.11689L1.75005 1.90381L0.925216 2.66973L5.04997 6.49985Z'
                      fill='white'
                      fillOpacity='0.85'
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className='flex items-center justify-center gap-2 text-white text-xs '>
            <span
              className='text-white/80'
              style={{
                fontFamily:
                  'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
              }}
            >
              Powered By
            </span>
            <div className='flex items-center gap-1.5'>
              <svg
                width='12'
                height='11'
                viewBox='0 0 12 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.29815 7.66709C6.87625 9.39672 1.95057 10.6412 0.231751 7.12634C1.42038 10.2751 6.89459 11.6455 10.9309 8.78093L8.29815 7.66709Z'
                  fill='#DA291C'
                />
                <path
                  d='M11.0508 1.65652C9.37343 -0.00657711 4.49983 -0.0965629 2.95482 3.05139C3.71021 2.13114 6.31189 1.16425 8.41809 3.18657L11.0508 1.65652Z'
                  fill='#3FC366'
                />
                <path
                  d='M7.61107 0.199333C5.61152 0.228501 1.51957 1.41224 2.4527 6.02552C2.68445 6.85596 3.61196 8.62127 5.74482 8.78093C3.97692 9.26568 0.714094 9.21804 0.10079 5.85364C-0.0984313 4.76077 0.0570256 3.6008 0.631585 2.65004C1.60142 1.0452 3.71414 -0.57459 7.61107 0.199333Z'
                  fill='#FFC72C'
                />
              </svg>
              <span
                className='font-normal'
                style={{
                  fontFamily:
                    'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                CATERSWEET
              </span>
              <span
                className='font-bold'
                style={{
                  fontFamily:
                    'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
                }}
              >
                FORMS
              </span>
            </div>
          </div>
        </div>
      )}
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
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={catersweet} />
        </button>
      </div>
    </>
  );
}
