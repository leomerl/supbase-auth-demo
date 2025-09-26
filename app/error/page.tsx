'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const type = searchParams.get('type')

  const getErrorTitle = () => {
    switch (type) {
      case 'login':
        return 'Sign In Failed'
      case 'signup':
        return 'Sign Up Failed'
      default:
        return 'Something went wrong'
    }
  }

  const getErrorDescription = () => {
    if (message) {
      return message
    }
    switch (type) {
      case 'login':
        return 'We couldn\'t sign you in. Please check your credentials and try again.'
      case 'signup':
        return 'We couldn\'t create your account. Please try again or contact support.'
      default:
        return 'An unexpected error occurred. Please try again later.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getErrorTitle()}</h1>
            <p className="text-gray-600 mb-6">{getErrorDescription()}</p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-center block"
            >
              Try Again
            </Link>

            {type === 'signup' && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Already have an account?
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in instead
                </Link>
              </div>
            )}

            {type === 'login' && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Don't have an account?
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Create one now
                </Link>
              </div>
            )}
          </div>

          {message && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <span className="font-medium">Error details:</span> {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}