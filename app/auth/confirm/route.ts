import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  let type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  // Handle malformed type parameter (e.g., "email." instead of "email")
  if (type && type.endsWith('.')) {
    type = type.slice(0, -1) as EmailOtpType
  }

  console.log('Email verification attempt:', { token_hash: !!token_hash, type, next })

  if (token_hash && type) {
    const supabase = await createClient()

    try {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })

      if (!error) {
        console.log('Email verification successful')
        redirectTo.pathname = '/login'
        redirectTo.searchParams.set('verified', 'true')
        return NextResponse.redirect(redirectTo)
      } else {
        console.error('Email verification failed:', error)
      }
    } catch (err) {
      console.error('Email verification error:', err)
    }
  } else {
    console.log('Missing token_hash or type:', { token_hash: !!token_hash, type })
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/auth/auth-code-error'
  return NextResponse.redirect(redirectTo)
}