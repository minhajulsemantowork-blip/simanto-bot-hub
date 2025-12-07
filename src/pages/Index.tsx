import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Bot,
  Zap,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Facebook,
  Sparkles,
} from 'lucide-react';

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent animate-glow">
          <Bot className="h-7 w-7 text-primary-foreground" />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Responses',
      description: 'Powered by Google Gemini for intelligent, context-aware replies.',
    },
    {
      icon: MessageSquare,
      title: 'FAQ Management',
      description: 'Create and manage FAQs for instant automated responses.',
    },
    {
      icon: Facebook,
      title: 'Facebook Integration',
      description: 'Connect your Facebook page and automate Messenger.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Reliable',
      description: '24/7 uptime with enterprise-grade security.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-accent">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">Simanto Bot</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Chatbot Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Automate Your
              <span className="text-gradient"> Customer Support</span>
              <br />with AI
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
              Simanto Bot helps you manage products, FAQs, and customer messages 
              automatically using AI. Connect your Facebook page and let the bot 
              handle the rest.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button size="xl" asChild>
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm">Active Users</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">1M+</p>
                <p className="text-sm">Messages Handled</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">99%</p>
                <p className="text-sm">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you automate and grow your business
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:glow-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-muted-foreground">
                One plan, all features included
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-primary/20 bg-card gradient-hero">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-2">Pro Plan</p>
                <p className="text-5xl font-bold">
                  ৳500
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited AI Responses',
                  'Unlimited Products & FAQs',
                  'Facebook Page Integration',
                  'Priority Support',
                  'Analytics Dashboard',
                  'Custom Welcome Messages',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full" size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-accent">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">Simanto Bot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Simanto Bot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
