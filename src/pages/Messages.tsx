import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/types';
import {
  MessageSquare,
  Search,
  Bot,
  User,
  HelpCircle,
  RefreshCw,
  Download,
} from 'lucide-react';

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'user123',
      content: 'What are your delivery options?',
      type: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '2',
      senderId: 'bot',
      content: 'We offer home delivery within Dhaka (24 hours) and nationwide delivery (3-5 days). Cash on delivery and prepaid options available.',
      type: 'faq',
      timestamp: new Date(Date.now() - 1000 * 60 * 29),
    },
    {
      id: '3',
      senderId: 'user456',
      content: 'Can I get a custom order?',
      type: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '4',
      senderId: 'bot',
      content: 'Yes, we accept custom orders! Please share your requirements and we\'ll provide you with a quote within 24 hours. You can also call us at our hotline for urgent custom orders.',
      type: 'ai',
      timestamp: new Date(Date.now() - 1000 * 60 * 59),
    },
    {
      id: '5',
      senderId: 'user789',
      content: 'What payment methods do you accept?',
      type: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: '6',
      senderId: 'bot',
      content: 'We accept bKash, Nagad, and Cash on Delivery (COD). For online orders, you can pay securely through our payment gateway.',
      type: 'faq',
      timestamp: new Date(Date.now() - 1000 * 60 * 119),
    },
  ]);

  const filteredMessages = messages.filter(
    (message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: Message['type']) => {
    switch (type) {
      case 'ai':
        return <Bot className="h-4 w-4 text-purple-400" />;
      case 'faq':
        return <HelpCircle className="h-4 w-4 text-green-400" />;
      default:
        return <User className="h-4 w-4 text-blue-400" />;
    }
  };

  const getTypeLabel = (type: Message['type']) => {
    switch (type) {
      case 'ai':
        return 'AI Response';
      case 'faq':
        return 'FAQ Match';
      default:
        return 'Customer';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            Messages Log
          </h1>
          <p className="mt-1 text-muted-foreground">
            View recent chatbot conversations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Messages', value: messages.length, color: 'text-blue-400' },
          { label: 'AI Responses', value: messages.filter(m => m.type === 'ai').length, color: 'text-purple-400' },
          { label: 'FAQ Matches', value: messages.filter(m => m.type === 'faq').length, color: 'text-green-400' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>Last 20 messages from your chatbot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredMessages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 p-4 rounded-lg animate-fade-in ${
                message.type === 'user' ? 'bg-blue-500/5' : 'bg-secondary/50'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  message.type === 'user'
                    ? 'bg-blue-500/10'
                    : message.type === 'ai'
                    ? 'bg-purple-500/10'
                    : 'bg-green-500/10'
                }`}
              >
                {getTypeIcon(message.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.type === 'user' ? message.senderId : 'Simanto Bot'}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      message.type === 'user'
                        ? 'bg-blue-500/10 text-blue-400'
                        : message.type === 'ai'
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {getTypeLabel(message.type)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{message.content}</p>
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No messages found</p>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term' : 'Messages will appear here'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
