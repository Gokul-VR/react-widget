import './App.css';
import './widget/styles/style.css';

import { WidgetContainer } from './widget/components/widget-container.tsx';

function App() {
  return (
    <>
      <WidgetContainer config={{
        clientKey: 'test-key',
        theme: 'auto',
        position: 'bottom-right',
        size: 'medium',
        language: 'en',
        debug: true,
        customStyles: {},
        features: {
          chat: true,
          notifications: true,
          analytics: true,
        },
      }} />
    </>
  );
}

export default App;
