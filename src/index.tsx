import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
    throw new Error('нет контейнера root');
}

const root = createRoot(container);
root.render(<App />);
