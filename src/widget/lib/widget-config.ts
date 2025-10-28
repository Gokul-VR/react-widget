export interface WidgetConfig {
  clientKey: string;
  theme?: 'light' | 'dark' | 'auto';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
  language?: string;
  apiEndpoint?: string;
  debug?: boolean;
  customStyles?: Record<string, string>;
  features?: {
    chat?: boolean;
    notifications?: boolean;
    analytics?: boolean;
  };
  assetBaseUrl?: string;
}

export interface WidgetParams {
  [key: string]: string | undefined;
}

export class WidgetExtractor {
  private script: HTMLScriptElement | null = null;
  private params: WidgetParams = {};

  constructor() {
    this.extractScript();
    this.extractParams();
  }

  private extractScript(): void {
    // Try to get the current script element
    this.script = document.currentScript as HTMLScriptElement;
    
    // Fallback: find script by src if currentScript is not available
    if (!this.script) {
      const scripts = document.querySelectorAll('script[src*="widget.js"]');
      this.script = scripts[scripts.length - 1] as HTMLScriptElement;
    }

    if (!this.script) {
      throw new Error('Widget script not found. Make sure the script tag is properly loaded.');
    }
  }

  private extractParams(): void {
    if (!this.script) return;

    // Extract all data-* attributes
    const attributes = this.script.attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (attr.name.startsWith('data-')) {
        const paramName = attr.name.replace('data-', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        this.params[paramName] = attr.value;
      }
    }
  }

  public getClientKey(): string {
    const clientKey = this.params.clientKey;
    
    if (!clientKey) {
      throw new Error('Missing required data-client-key attribute. Please add data-client-key="your-client-id" to the script tag.');
    }

    if (!this.isValidClientKey(clientKey)) {
      throw new Error('Invalid client key format. Client key should be alphanumeric and 3-50 characters long.');
    }

    return clientKey;
  }

  public getConfig(): WidgetConfig {
    const clientKey = this.getClientKey();
    
    return {
      clientKey,
      theme: this.getTheme(),
      position: this.getPosition(),
      size: this.getSize(),
      language: this.params.language || 'en',
      apiEndpoint: this.params.apiEndpoint,
      debug: this.getBooleanParam('debug', false),
      customStyles: this.getCustomStyles(),
      features: this.getFeatures(),
      assetBaseUrl: this.getAssetBaseUrl(),
    };
  }

  public getParam(key: string): string | undefined {
    return this.params[key];
  }

  public getBooleanParam(key: string, defaultValue: boolean = false): boolean {
    const value = this.params[key];
    if (!value) return defaultValue;
    
    return value.toLowerCase() === 'true' || value === '1';
  }

  public getNumberParam(key: string, defaultValue?: number): number | undefined {
    const value = this.params[key];
    if (!value) return defaultValue;
    
    const num = parseInt(value, 10);
    return isNaN(num) ? defaultValue : num;
  }

  private isValidClientKey(clientKey: string): boolean {
    // Client key should be alphanumeric, 3-50 characters
    const regex = /^[a-zA-Z0-9_-]{3,50}$/;
    return regex.test(clientKey);
  }

  private getTheme(): 'light' | 'dark' | 'auto' {
    const theme = this.params.theme;
    if (theme === 'light' || theme === 'dark' || theme === 'auto') {
      return theme;
    }
    return 'auto';
  }

  private getPosition(): 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' {
    const position = this.params.position;
    if (['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(position || '')) {
      return position as any;
    }
    return 'bottom-right';
  }

  private getSize(): 'small' | 'medium' | 'large' {
    const size = this.params.size;
    if (['small', 'medium', 'large'].includes(size || '')) {
      return size as any;
    }
    return 'medium';
  }

  private getAssetBaseUrl(): string {
    // Derive absolute base URL from the widget script src
    if (!this.script || !this.script.src) return '/';
    try {
      const url = new URL(this.script.src, window.location.href);
      // Ensure trailing slash for safe concatenation
      const pathname = url.pathname.endsWith('/')
        ? url.pathname
        : url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1);
      return `${url.origin}${pathname}`;
    } catch {
      return '/';
    }
  }

  private getCustomStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    
    // Extract custom style parameters
    Object.keys(this.params).forEach(key => {
      if (key.startsWith('style') && this.params[key]) {
        const styleKey = key.replace('style', '').toLowerCase();
        styles[styleKey] = this.params[key]!;
      }
    });

    return styles;
  }

  private getFeatures(): WidgetConfig['features'] {
    return {
      chat: this.getBooleanParam('chat', true),
      notifications: this.getBooleanParam('notifications', true),
      analytics: this.getBooleanParam('analytics', true),
    };
  }

  public validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      this.getClientKey();
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Invalid client key');
    }

    // Validate theme
    const theme = this.params.theme;
    if (theme && !['light', 'dark', 'auto'].includes(theme)) {
      errors.push('Invalid theme. Must be one of: light, dark, auto');
    }

    // Validate position
    const position = this.params.position;
    if (position && !['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(position)) {
      errors.push('Invalid position. Must be one of: bottom-right, bottom-left, top-right, top-left');
    }

    // Validate size
    const size = this.params.size;
    if (size && !['small', 'medium', 'large'].includes(size)) {
      errors.push('Invalid size. Must be one of: small, medium, large');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public logConfig(): void {
    if (this.getBooleanParam('debug', false)) {
      console.log('Widget Configuration:', this.getConfig());
      console.log('Widget Parameters:', this.params);
    }
  }
}
