import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FacebookPage } from '@/types';
import {
  Facebook,
  Link2,
  Unlink,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Shield,
} from 'lucide-react';

const FacebookConnect: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedPage, setConnectedPage] = useState<FacebookPage | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // TODO: Facebook OAuth integration placeholder
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulated connection
      setConnectedPage({
        id: '123456789',
        name: 'My Business Page',
        accessToken: 'EAAxxxxxx...', // Truncated for display
        connected: true,
      });
      
      toast({
        title: 'Page Connected!',
        description: 'Your Facebook page has been connected successfully.',
      });
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect Facebook page. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedPage(null);
    toast({
      title: 'Page Disconnected',
      description: 'Your Facebook page has been disconnected.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Facebook className="h-8 w-8 text-primary" />
          Facebook Connect
        </h1>
        <p className="mt-1 text-muted-foreground">
          Connect your Facebook page to enable the chatbot
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Connection Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {connectedPage ? (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  Page Connected
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-warning" />
                  No Page Connected
                </>
              )}
            </CardTitle>
            <CardDescription>
              {connectedPage
                ? 'Your chatbot is active on your Facebook page'
                : 'Connect your Facebook page to start receiving messages'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {connectedPage ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-success/5 border border-success/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20">
                    <Facebook className="h-7 w-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{connectedPage.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Page ID: {connectedPage.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Active
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted-foreground">Access Token</p>
                    <p className="font-mono text-sm mt-1 truncate">
                      {connectedPage.accessToken.slice(0, 20)}...
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <p className="text-sm text-muted-foreground">Connection Status</p>
                    <p className="text-success font-medium mt-1">Connected</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <a
                      href={`https://facebook.com/${connectedPage.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Page
                    </a>
                  </Button>
                  <Button variant="destructive" onClick={handleDisconnect}>
                    <Unlink className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 animate-pulse">
                    <Facebook className="h-10 w-10 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Connect Your Facebook Page
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Link your Facebook business page to enable Simanto Bot to respond to customer messages automatically.
                </p>
                <Button
                  size="lg"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isConnecting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 className="mr-2 h-4 w-4" />
                      Connect with Facebook
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Required Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Required Permissions
            </CardTitle>
            <CardDescription>
              Permissions needed for full functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'pages_show_list',
                'pages_messaging',
                'pages_read_engagement',
                'pages_manage_metadata',
              ].map((permission) => (
                <div
                  key={permission}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
                >
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-mono text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Simple steps to connect your page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {[
                'Click "Connect with Facebook" button',
                'Login to your Facebook account',
                'Select the page you want to connect',
                'Grant the required permissions',
                'Start receiving messages via Simanto Bot!',
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacebookConnect;
