import React, { Component } from 'react'

interface ErrorBoundaryProps {
	children: React.ReactElement // Keep as ReactElement as per Lexical's requirements
	onError: (error: Error) => void // Adjusted to match Lexical's expected signature
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false,
	}

	// This lifecycle method is invoked after an error has been thrown by a descendant component.
	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true }
	}

	// This lifecycle method is invoked when an error is caught.
	public componentDidCatch(error: Error) {
		// Removed errorInfo parameter
		this.props.onError(error) // Call onError with only the error object
	}

	public render() {
		if (this.state.hasError) {
			return <h1>Sorry.. there was an error</h1>
		}

		return this.props.children
	}
}

export default ErrorBoundary
