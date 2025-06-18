import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CreditCard } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing & Usage
          </CardTitle>
          <CardDescription>
            Manage your billing information and view usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <p className="text-2xl font-bold">Pro</p>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Usage</p>
              <p className="text-2xl font-bold">$127.50</p>
              <p className="text-sm text-muted-foreground">of $200 limit</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Next Billing</p>
              <p className="text-2xl font-bold">Dec 15</p>
              <p className="text-sm text-muted-foreground">2024</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Payment Method</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Billing Address</h4>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Street Address" />
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="ZIP Code" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
