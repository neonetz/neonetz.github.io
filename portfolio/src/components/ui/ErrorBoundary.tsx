import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="hw-root">
          <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              Something went wrong
            </h1>
            <p
              className="hw-body text-center"
              style={{ maxWidth: '480px' }}
            >
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="hw-btn hw-btn-primary"
            >
              Reload Page
            </button>
          </main>
        </div>
      );
    }

    return this.props.children;
  }
}
