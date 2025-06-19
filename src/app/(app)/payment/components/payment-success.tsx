'use client'

import { CheckCircle, Download, Home, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useSuspenseGetPayment } from '@/core/payment/payment.query'
import { formatVND } from '../utils/vnd'

export default function PaymentSuccess({ paymentId }: Readonly<{ paymentId: string }>) {
  const { data: payment } = useSuspenseGetPayment(paymentId)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your purchase. Your payment has been processed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              <span className="text-muted-foreground">Payment Method</span>
              {/* <span>•••• •••• •••• 4242</span> */}
              <span>{payment.method.toString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{new Date(payment.date_created).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Receipt className="mr-2 h-4 w-4" />
                View Order
              </Button>
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
