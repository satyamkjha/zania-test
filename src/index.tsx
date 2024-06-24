// src/index.tsx
import ReactDOM from 'react-dom';
import App from './App';
import { worker } from './mocks/browser';

worker.start();

ReactDOM.render(<App />, document.getElementById('root'));
