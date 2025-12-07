import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { BusinessSettings as BusinessSettingsType } from '@/types';
import {
  Building2,
  Phone,
  MapPin,
  Truck,
  Clock,
  Wallet,
  Save,
  Loader2,
} from 'lucide-react';

const BusinessSettings: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettingsType>({
    businessName: 'My Store',
    contactNumber: '+880 1234567890',
    address: 'Dhaka, Bangladesh',
    deliveryInfo: 'Same day delivery within Dhaka. 3-5 days nationwide.',
    openingHours: 'Sun-Thu: 9AM-6PM, Fri-Sat: Closed',
    paymentMethods: {
      bkash: true,
      nagad: true,
      cod: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Firestore integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Settings Saved',
        description: 'Business settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Business Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Configure your business information
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Your business identity and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) =>
                  setSettings({ ...settings, businessName: e.target.value })
                }
                placeholder="Enter business name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                value={settings.contactNumber}
                onChange={(e) =>
                  setSettings({ ...settings, contactNumber: e.target.value })
                }
                placeholder="+880 1234567890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                placeholder="Enter your business address"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery & Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Delivery & Hours
            </CardTitle>
            <CardDescription>
              Delivery information and business hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryInfo" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery Information
              </Label>
              <Textarea
                id="deliveryInfo"
                value={settings.deliveryInfo}
                onChange={(e) =>
                  setSettings({ ...settings, deliveryInfo: e.target.value })
                }
                placeholder="Describe your delivery options..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openingHours" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Opening Hours
              </Label>
              <Textarea
                id="openingHours"
                value={settings.openingHours}
                onChange={(e) =>
                  setSettings({ ...settings, openingHours: e.target.value })
                }
                placeholder="e.g., Mon-Fri: 9AM-6PM"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Select accepted payment methods for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { id: 'bkash', label: 'bKash', color: 'bg-pink-500/10 text-pink-400' },
                { id: 'nagad', label: 'Nagad', color: 'bg-orange-500/10 text-orange-400' },
                { id: 'cod', label: 'Cash on Delivery', color: 'bg-green-500/10 text-green-400' },
              ].map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                    settings.paymentMethods[method.id as keyof typeof settings.paymentMethods]
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      paymentMethods: {
                        ...settings.paymentMethods,
                        [method.id]: !settings.paymentMethods[method.id as keyof typeof settings.paymentMethods],
                      },
                    })
                  }
                >
                  <Checkbox
                    checked={settings.paymentMethods[method.id as keyof typeof settings.paymentMethods]}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          [method.id]: checked as boolean,
                        },
                      })
                    }
                  />
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${method.color}`}
                  >
                    <Wallet className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{method.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessSettings;
