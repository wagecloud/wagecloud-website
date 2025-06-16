import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { LoginForm } from './login-form'
import { SocialButtons } from '@/components/auth/social-buttons'

export function LoginCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
        <SocialButtons />
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          {'Don\'t have an account? '}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
