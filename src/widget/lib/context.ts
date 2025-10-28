import { createContext } from 'react';
import { WidgetConfig } from '../lib/widget-config';

export interface WidgetContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  config: WidgetConfig;
}

export const WidgetContext = createContext<WidgetContextType>({
  isOpen: false,
  setIsOpen: () => {},
  // Default values; will be overridden by provider
  config: { clientKey: '' },
});

export function buildAssetUrl(assetBaseUrl: string | undefined, path: string): string {
  const base = (assetBaseUrl || '/').replace(/\/$/, '/');
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalizedPath}`;
}