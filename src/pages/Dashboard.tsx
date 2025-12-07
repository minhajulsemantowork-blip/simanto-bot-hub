import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import {
  Package,
  HelpCircle,
  MessageSquare,
  Users,
  Settings,
  Building2,
  CreditCard,
  User,
  TrendingUp,
  Bot,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Products', value: 24, icon: Package, trend: { value: 12, isPositive: true } },
    { title: 'FAQs', value: 18, icon: HelpCircle, trend: { value: 5, isPositive: true } },
    { title: 'Messages Today', value: 156, icon: MessageSquare, trend: { value: 23, isPositive: true } },
    { title: 'Active Users', value: 42, icon: Users, trend: { value: 8, isPositive: true } },
  ];

  const quickActions = [
    { icon: Package, label: 'Manage Products', path: '/products', color: 'text-blue-400' },
    { icon: HelpCircle, label: 'Manage FAQs', path: '/faqs', color: 'text-green-400' },
    { icon: Settings, label: 'Bot Settings', path: '/bot-settings', color: 'text-purple-400' },
    { icon: Building2, label: 'Business Settings', path: '/business', color: 'text-orange-400' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription', color: 'text-pink-400' },
    { icon: User, label: 'Profile', path: '/profile', color: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-gradient">{user?.name || 'User'}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your chatbot today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-success">Bot Online</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => (
              <Button
                key={action.path}
                variant="secondary"
                asChild
                className="h-auto py-4 justify-start animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <Link to={action.path}>
                  <action.icon className={`mr-3 h-5 w-5 ${action.color}`} />
                  <span>{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Customer Query #{i}</p>
                    <p className="text-xs text-muted-foreground">
                      "What are your delivery options?"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {i} hour{i > 1 ? 's' : ''} ago • AI Response
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" asChild className="w-full mt-4">
              <Link to="/messages">View All Messages</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Premium Widget', 'Super Gadget', 'Mega Tool'].map((product, i) => (
                <div key={product} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product}</p>
                      <p className="text-xs text-muted-foreground">{50 - i * 12} queries</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" asChild className="w-full mt-4">
              <Link to="/products">Manage Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
