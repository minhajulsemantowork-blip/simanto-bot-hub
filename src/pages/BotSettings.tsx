import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { BotSettings as BotSettingsType } from '@/types';
import {
  Settings,
  Bot,
  Zap,
  MessageSquare,
  Clock,
  Save,
  RotateCcw,
} from 'lucide-react';

const BotSettings: React.FC = () => {
  const [settings, setSettings] = useState<BotSettingsType>({
    aiReplyEnabled: true,
    faqOnlyMode: false,
    hybridMode: true,
    welcomeMessage: 'Hello! Welcome to our store. How can I help you today?',
    typingDelay: 1500,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Firestore integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Settings Saved',
        description: 'Your bot settings have been updated successfully.',
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

  const handleReset = () => {
    setSettings({
      aiReplyEnabled: true,
      faqOnlyMode: false,
      hybridMode: true,
      welcomeMessage: 'Hello! Welcome to our store. How can I help you today?',
      typingDelay: 1500,
    });
    toast({
      title: 'Settings Reset',
      description: 'Bot settings have been reset to defaults.',
    });
  };

  const handleModeChange = (mode: 'ai' | 'faq' | 'hybrid') => {
    setSettings({
      ...settings,
      aiReplyEnabled: mode === 'ai' || mode === 'hybrid',
      faqOnlyMode: mode === 'faq',
      hybridMode: mode === 'hybrid',
    });
  };

  const getCurrentMode = () => {
    if (settings.hybridMode) return 'hybrid';
    if (settings.faqOnlyMode) return 'faq';
    return 'ai';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Bot Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Configure your chatbot behavior
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Response Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Response Mode
            </CardTitle>
            <CardDescription>
              Choose how the bot responds to messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: 'ai',
                label: 'AI Only',
                description: 'Use Gemini AI for all responses',
                icon: Zap,
              },
              {
                id: 'faq',
                label: 'FAQ Only',
                description: 'Only respond with predefined FAQs',
                icon: MessageSquare,
              },
              {
                id: 'hybrid',
                label: 'Hybrid Mode',
                description: 'Try FAQ first, fallback to AI',
                icon: Bot,
              },
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => handleModeChange(mode.id as 'ai' | 'faq' | 'hybrid')}
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                  getCurrentMode() === mode.id
                    ? 'border-primary bg-primary/5 glow-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  getCurrentMode() === mode.id ? 'bg-primary/20' : 'bg-secondary'
                }`}>
                  <mode.icon className={`h-5 w-5 ${
                    getCurrentMode() === mode.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{mode.label}</p>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 ${
                  getCurrentMode() === mode.id
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {getCurrentMode() === mode.id && (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              AI Settings
            </CardTitle>
            <CardDescription>
              Configure AI response behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable AI Responses</p>
                <p className="text-sm text-muted-foreground">
                  Allow the bot to use AI for responses
                </p>
              </div>
              <Switch
                checked={settings.aiReplyEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, aiReplyEnabled: checked })
                }
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Typing Delay
                </Label>
                <span className="text-sm text-muted-foreground">
                  {settings.typingDelay}ms
                </span>
              </div>
              <Slider
                value={[settings.typingDelay]}
                onValueChange={(value) =>
                  setSettings({ ...settings, typingDelay: value[0] })
                }
                max={5000}
                min={500}
                step={100}
              />
              <p className="text-xs text-muted-foreground">
                Simulates typing before sending response
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Welcome Message */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Welcome Message
            </CardTitle>
            <CardDescription>
              The first message users see when they start a conversation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={settings.welcomeMessage}
              onChange={(e) =>
                setSettings({ ...settings, welcomeMessage: e.target.value })
              }
              placeholder="Enter welcome message..."
              rows={4}
              className="resize-none"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Tip: Keep it friendly and informative. Mention key services you offer.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BotSettings;
