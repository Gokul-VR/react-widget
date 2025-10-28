import { createContext } from 'react';
import { WidgetConfig } from './widget-config';

interface WidgetContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  config: WidgetConfig;
}

export const WidgetContext = createContext<WidgetContextType>({
  isOpen: false,
  setIsOpen: () => undefined,
  config: {
    clientKey: '',
    theme: 'auto',
    position: 'bottom-right',
    size: 'medium',
    language: 'en',
    debug: false,
    customStyles: {},
    features: {
      chat: true,
      notifications: true,
      analytics: true,
    },
  },
});