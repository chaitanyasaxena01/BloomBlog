import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import  Container  from './container/Container';

function Login() {
  return (
    <div className="py-8">
      <Container>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <img src="/logo.png" alt="Logo" className="w-full" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have an account?&nbsp;
              <a
                href="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </a>
            </p>
            <SignIn
              routing="path"
              path="/login"
              redirectUrl="/dashboard"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-sm normal-case',
                  card: 'bg-transparent shadow-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'text-sm normal-case',
                  formFieldInput: 'rounded-lg',
                  dividerLine: 'bg-gray-300',
                  dividerText: 'text-gray-600',
                  footerActionText: 'text-sm text-gray-600',
                  footerActionLink: 'text-blue-500 hover:text-blue-600',
                  identityPreviewText: 'text-gray-700',
                  formFieldLabel: 'text-gray-700',
                  formFieldHintText: 'text-gray-500 text-sm',
                  formFieldErrorText: 'text-red-500 text-sm',
                  formFieldSuccessText: 'text-green-500 text-sm',
                  formResendCodeLink: 'text-blue-500 hover:text-blue-600',
                  otpCodeFieldInput: 'rounded-lg text-center',
                  verificationCodeFieldInput: 'rounded-lg text-center',
                  formFieldLabelRow: 'mb-2',
                  formFieldRow: 'mb-4',
                  formButtonReset: 'text-blue-500 hover:text-blue-600',
                  alternativeMethodsBlockButton: 'text-blue-500 hover:text-blue-600',
                  verificationLinkButton: 'text-blue-500 hover:text-blue-600',
                  identityPreviewEditButton: 'text-blue-500 hover:text-blue-600',
                  formFieldInputShowPasswordButton: 'text-gray-600 hover:text-gray-800',
                  formFieldInputClearButton: 'text-gray-600 hover:text-gray-800'
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                  showOptionalFields: false,
                  shimmer: true,
                  privacyPageUrl: "/privacy",
                  termsPageUrl: "/terms"
                }
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;