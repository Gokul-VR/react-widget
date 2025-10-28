import { useState, useEffect } from 'react';
import { WidgetContext } from '../lib/context';
import { WidgetConfig } from '../lib/widget-config';
import { Widget } from './widget';

interface WidgetContainerProps {
  config: WidgetConfig;
}

export function WidgetContainer({ config }: WidgetContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Log configuration if debug mode is enabled
    if (config.debug) {
      console.log('Widget initialized with config:', config);
    }
  }, [config]);

  if (!mounted) {
    return null;
  }

  return (
    <WidgetContext.Provider value={{ isOpen, setIsOpen, config }}>
      <Widget />
    </WidgetContext.Provider>
  );
}