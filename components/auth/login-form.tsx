'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReloadIcon } from '@radix-ui/react-icons'
import { authenticate } from '@/lib/actions'
import AlertMessage from '@/components/auth/alert'
import InputField from './input-field'
import EmailForm from './email-form'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

export function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const [status, dispatch, isPending] = useActionState(
        authenticate.bind(null, callbackUrl),
        undefined
    )

    return (
        <Card className="mx-auto w-full max-w-md rounded-sm">
            <CardHeader>
                <CardTitle className="text-2xl flex justify-center">
                    TalentBot
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <form action={dispatch} className={'flex flex-col gap-4'}>
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password.."
                        />
                        <Link
                            href="/auth/password/reset"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full disabled:cursor-not-allowed"
                        >
                            {isPending && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isPending ? 'LoggingIn...' : 'Login'}
                        </Button>
                        {status?.status && <AlertMessage {...status} />}
                    </form>
                    <EmailForm />
                    {/* <Providers /> */}
                </div>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
