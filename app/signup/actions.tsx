'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const terms = formData.get('terms') as string

    // Validation
    if (!email || !password || !confirmPassword) {
        redirect(`/error?message=${encodeURIComponent('All fields are required')}&type=signup`)
    }

    if (password !== confirmPassword) {
        redirect(`/error?message=${encodeURIComponent('Passwords do not match')}&type=signup`)
    }

    if (password.length < 8) {
        redirect(`/error?message=${encodeURIComponent('Password must be at least 8 characters long')}&type=signup`)
    }

    if (!terms) {
        redirect(`/error?message=${encodeURIComponent('You must agree to the Terms of Service')}&type=signup`)
    }

    const data = {
        email,
        password,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        console.error('Signup error:', error)
        redirect(`/error?message=${encodeURIComponent(error.message)}&type=signup`)
    }

    revalidatePath('/', 'layout')
    redirect('/auth/check-email')
}