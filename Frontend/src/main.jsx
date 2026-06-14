import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-white bg-carbon min-h-screen font-body">
          <h1 className="text-red-500 text-2xl font-heading mb-4 uppercase">Strategic Failure</h1>
          <p className="text-copper font-bold mb-4 uppercase tracking-widest text-xs">Error Log Synchronized:</p>
          <pre className="text-yellow-400 mt-5 p-4 bg-carbon-light border border-white/5 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {this.state.error?.message}
          </pre>
          <pre className="text-steel-dim mt-4 p-4 text-[10px] whitespace-pre-wrap font-mono">
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
