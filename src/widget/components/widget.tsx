// import { useContext, useEffect, useRef, useState } from 'react';
// import { WidgetContext } from '../lib/context';
// import bgImage from '../../assets/bg.png';
// import catersweet from '../../assets/catersweet.svg';
// import StepOne from './stepOne';

// function getThemeStyles(theme: 'light' | 'dark' | 'auto') {
//   const isDark =
//     theme === 'dark' ||
//     (theme === 'auto' &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches);

//   return {
//     background: isDark ? '#1a1a1a' : '#fff',
//     color: isDark ? '#fff' : '#333',
//     border: isDark ? '1px solid #333' : '1px solid #e1e5e9',
//     buttonBg: isDark ? '#0066cc' : '#0056b3',
//     buttonShadow: isDark
//       ? '0 4px 12px rgba(0,102,204,0.3)'
//       : '0 4px 12px rgba(0,123,255,0.3)',
//   };
// }
// const positionStyles = {
//   'bottom-right': { bottom: '20px', right: '20px' },
//   'bottom-left': { bottom: '20px', left: '20px' },
//   'top-right': { top: '20px', right: '20px' },
//   'top-left': { top: '20px', left: '20px' },
// };
// export function Widget() {
//   const { isOpen, setIsOpen, config } = useContext(WidgetContext);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const totalSteps = 6;

//   const sizeStyles = {
//     small: { width: '17.5rem', height: '21.875rem' },
//     medium: { width: '27.75rem', height: '35rem' },
//     large: { width: '27.75rem', height: '35rem' },
//   };

//   const positionKey = (config.position ||
//     'bottom-right') as keyof typeof positionStyles;
//   const sizeKey = (config.size || 'medium') as keyof typeof sizeStyles;
//   const currentPosition = positionStyles[positionKey];
//   const currentSize = sizeStyles[sizeKey];

//   // Apply theme-based styling
//   const themeStyles = getThemeStyles(config.theme || 'auto');

//   if (config.debug) {
//     console.log('Widget state:', { isOpen, config });
//   }

//   useEffect(() => {
//     if (isOpen) {
//       // Trigger animation after component mounts
//       setIsAnimating(true);
//     } else {
//       setIsAnimating(false);
//     }
//   }, [isOpen]);

//   const progressPercentage = (currentStep / totalSteps) * 100;

//   const handleNext = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep((prev: any) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev: any) => prev - 1);
//     }
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           style={{
//             ...currentSize,
//             backgroundImage: `url(${bgImage})`,
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             color: themeStyles.color,
//             boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
//             borderRadius: '12px',
//             padding: '16px',
//             border: themeStyles.border,
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'fixed',
//             ...currentPosition,
//             zIndex: 9999,
//             fontFamily:
//               "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//             bottom: '15vh',
//             // Animation styles
//             transform: isAnimating ? 'scale(1)' : 'scale(0.8)',
//             opacity: isAnimating ? 1 : 1,
//             transition:
//               'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out',
//             transformOrigin: getTransformOrigin(positionKey),
//           }}
//         >
//           <div className='w-full h-[0.6rem] bg-[#D9D9D9] rounded-full mb-5 sm:mb-6 flex items-center overflow-hidden'>
//             <div
//               className='h-[0.4rem] bg-[#25C196] rounded-full ml-0.5 mr-0.5 transition-all duration-500 ease-in-out'
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//           {currentStep === 1 && <StepOne handleNext={handleNext} />}
//           {currentStep === 2 && (
//             <>
//               <div className=''>step2</div>
//               <div className='flex items-center justify-between mb-4'>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handlePrevious();
//                   }}
//                   disabled={true}
//                   className='px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200'
//                   style={{ color: themeStyles.color }}
//                 >
//                   Previous
//                 </button>

//                 <span className='text-sm font-medium'>
//                   Step {currentStep} of {totalSteps}
//                 </span>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleNext();
//                   }}
//                   className='px-4 py-2 bg-[#25C196] hover:bg-[#1fa57d] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200'
//                 >
//                   Next
//                 </button>
//               </div>{' '}
//             </>
//           )}
//           {currentStep === 3 && <StepOne handleNext={handleNext} />}
//           {currentStep === 4 && <StepOne handleNext={handleNext} />}
//           {currentStep === 5 && <StepOne handleNext={handleNext} />}
//           {currentStep === 6 && <StepOne handleNext={handleNext} />}
//         </div>
//       )}
//       <div
//         ref={containerRef}
//         style={{
//           position: 'fixed',
//           ...currentPosition,
//           zIndex: 9999,
//           fontFamily:
//             "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
//         }}
//       >
//         <button
//           style={{
//             color: 'white',
//             border: 'none',
//             borderRadius: '50%',
//             width: '70px',
//             height: '70px',
//             cursor: 'pointer',
//             transition: 'transform 0.2s ease',
//             textAlign: 'center',
//           }}
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           <img src={catersweet} />
//         </button>
//       </div>
//     </>
//   );
// }

// // Helper function to determine transform origin based on position
// function getTransformOrigin(position: keyof typeof positionStyles): string {
//   const origins = {
//     'bottom-right': 'bottom right',
//     'bottom-left': 'bottom left',
//     'top-right': 'top right',
//     'top-left': 'top left',
//   };
//   return origins[position] || 'center';
// }
import { useContext, useEffect, useRef, useState, CSSProperties } from 'react';
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
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
