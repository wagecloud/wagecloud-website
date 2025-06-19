'use client'

import { useGetPayment } from '@/core/payment/payment.query'
import { PaymentStatus } from '@/core/payment/payment.type'
import PaymentSuccess from './payment-success'
import PaymentFailed from './payment-failed'
import { useSearchParams } from 'next/navigation'

export function Payment() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('vnp_TxnRef')
  const { data: payment } = useGetPayment(paymentId ?? '')
  console.log('Payment data:', paymentId)

  if (!payment || !paymentId) {
    return <div>Loading...</div>
  }

  if (payment.status === PaymentStatus.SUCCESS) {
    return <PaymentSuccess paymentId={paymentId}></PaymentSuccess>
  }

  return <PaymentFailed paymentId={paymentId}></PaymentFailed>
}
