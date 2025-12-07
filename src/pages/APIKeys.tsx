import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Save,
  Loader2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const APIKeys: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleValidate = async () => {
    if (!geminiKey) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your Gemini API key',
        variant: 'destructive',
      });
      return;
    }

    setIsValidating(true);
    try {
      // TODO: Gemini API validation placeholder
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulated validation (check if key starts with "AI")
      const valid = geminiKey.startsWith('AI') && geminiKey.length > 20;
      setIsValid(valid);
      
      toast({
        title: valid ? 'API Key Valid!' : 'Invalid API Key',
        description: valid
          ? 'Your Gemini API key has been validated successfully.'
          : 'The API key appears to be invalid. Please check and try again.',
        variant: valid ? 'default' : 'destructive',
      });
    } catch (error) {
      setIsValid(false);
      toast({
        title: 'Validation Failed',
        description: 'Could not validate the API key. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!geminiKey) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your Gemini API key',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Firestore integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'API Key Saved',
        description: 'Your Gemini API key has been saved securely.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save API key. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Key className="h-8 w-8 text-primary" />
          API Keys
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your API keys for AI services
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Gemini API Key
          </CardTitle>
          <CardDescription>
            Your Google Gemini API key for AI-powered responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="geminiKey">API Key</Label>
            <div className="relative">
              <Input
                id="geminiKey"
                type={showKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => {
                  setGeminiKey(e.target.value);
                  setIsValid(null);
                }}
                placeholder="AIzaSy..."
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isValid !== null && (
                  isValid ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="h-8 w-8"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              onClick={handleValidate}
              disabled={isValidating || !geminiKey}
            >
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Validate Key
                </>
              )}
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !geminiKey}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Key
                </>
              )}
            </Button>
          </div>

          <div className="rounded-lg bg-secondary p-4">
            <h4 className="font-medium mb-2">How to get your Gemini API Key</h4>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>1. Go to Google AI Studio</li>
              <li>2. Sign in with your Google account</li>
              <li>3. Click on "Get API key" in the left sidebar</li>
              <li>4. Create a new API key or use an existing one</li>
              <li>5. Copy and paste the key above</li>
            </ol>
            <Button variant="link" asChild className="mt-3 px-0">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Google AI Studio
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="flex items-start gap-4 p-4">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning">Security Notice</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Your API key is stored securely and encrypted. Never share your API key with others.
              If you suspect your key has been compromised, regenerate it immediately in Google AI Studio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeys;
