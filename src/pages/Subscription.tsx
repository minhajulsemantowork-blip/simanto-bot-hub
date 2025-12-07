import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Subscription as SubscriptionType } from '@/types';
import {
  CreditCard,
  Crown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Shield,
  Star,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

const Subscription: React.FC = () => {
  const [subscription] = useState<SubscriptionType>({
    plan: 'Pro Plan',
    price: 500,
    expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    daysRemaining: 15,
    status: 'active',
  });

  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenew = async (method: string) => {
    setIsRenewing(true);
    try {
      // TODO: Payment integration placeholder (bKash/Nagad/SSLCommerz)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: 'Payment Initiated',
        description: `Redirecting to ${method} payment gateway...`,
      });
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Could not initiate payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRenewing(false);
    }
  };

  const features = [
    { icon: Zap, label: 'Unlimited AI Responses' },
    { icon: Shield, label: 'Priority Support' },
    { icon: Star, label: 'Advanced Analytics' },
    { icon: Crown, label: 'Custom Branding' },
  ];

  const paymentMethods = [
    { id: 'bkash', label: 'bKash', color: 'bg-pink-500/10 text-pink-400 border-pink-500/30' },
    { id: 'nagad', label: 'Nagad', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
    { id: 'ssl', label: 'SSLCommerz', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  ];

  const getStatusColor = () => {
    switch (subscription.status) {
      case 'active':
        return 'bg-success/10 text-success border-success/30';
      case 'expired':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-primary" />
          Subscription
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your subscription and billing
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Current Plan
              </CardTitle>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor()}`}
              >
                {subscription.status === 'active' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl gradient-hero border border-primary/20">
              <div>
                <h3 className="text-2xl font-bold text-gradient">{subscription.plan}</h3>
                <p className="text-muted-foreground mt-1">Full access to all features</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  ৳{subscription.price}
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="text-2xl font-bold">{subscription.daysRemaining}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expires On</p>
                  <p className="text-lg font-bold">
                    {subscription.expiryDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Included Features</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Renew Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Renew Subscription
            </CardTitle>
            <CardDescription>
              Choose a payment method to renew
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <Button
                key={method.id}
                variant="outline"
                className={`w-full justify-start h-auto py-4 ${method.color}`}
                onClick={() => handleRenew(method.label)}
                disabled={isRenewing}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Pay with {method.label}</p>
                    <p className="text-xs opacity-70">Click to proceed</p>
                  </div>
                </div>
              </Button>
            ))}

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                By renewing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '15 Nov 2024', amount: 500, status: 'Paid', method: 'bKash' },
              { date: '15 Oct 2024', amount: 500, status: 'Paid', method: 'Nagad' },
              { date: '15 Sep 2024', amount: 500, status: 'Paid', method: 'bKash' },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.date}</p>
                    <p className="text-sm text-muted-foreground">
                      via {transaction.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{transaction.amount}</p>
                  <p className="text-sm text-success">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;
