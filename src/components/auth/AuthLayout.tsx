import React from 'react';
import { Bot } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl gradient-accent animate-glow">
              <Bot className="h-14 w-14 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gradient">Simanto Bot</h1>
          <p className="text-lg text-muted-foreground">
            Intelligent AI-powered chatbot system for your business. Automate customer support, manage products, and grow your business.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-card/50 p-4 border border-border/50">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="rounded-xl bg-card/50 p-4 border border-border/50">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">AI Support</p>
            </div>
            <div className="rounded-xl bg-card/50 p-4 border border-border/50">
              <p className="text-2xl font-bold text-primary">99%</p>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                <Bot className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">Simanto Bot</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
