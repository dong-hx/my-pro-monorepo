import { Component, type ErrorInfo, type PropsWithChildren } from 'react'

import { Button, Result } from 'antd'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  override state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  private handleReset = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Result
            status="error"
            title="页面出错了"
            subTitle="抱歉，页面遇到了意外错误"
            extra={
              <Button type="primary" onClick={this.handleReset}>
                重试
              </Button>
            }
          />
        </div>
      )
    }

    return this.props.children
  }
}
