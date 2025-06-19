'use client'

import { XCircle, RefreshCw, MessageCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSuspenseGetPayment } from '@/core/payment/payment.query'
import { formatVND } from '../utils/vnd'

export default function PaymentFailed({ paymentId }: Readonly<{ paymentId: string }>) {
  const { data: payment } = useSuspenseGetPayment(paymentId)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
          <CardDescription>
            We were unable to process your payment. Please try again or use a different payment method.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              <strong>Error:</strong>
              {' '}
              Something went wrong with your payment. Please check the details and try again.
              {/* Your card was declined. Please check your card details or try a different payment
              method. */}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ID</span>
              <span className="font-mono">{payment.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">{formatVND(payment.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Attempted</span>
              <span>{new Date(payment.date_created).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Get Help
              </Button>
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Common reasons for payment failure:</p>
            <ul className="text-xs space-y-1">
              <li>• Insufficient funds</li>
              <li>• Incorrect card details</li>
              <li>• Card expired or blocked</li>
              <li>• Bank security restrictions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
