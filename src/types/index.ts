export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  stock: number;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  createdAt: Date;
}

export interface BotSettings {
  aiReplyEnabled: boolean;
  faqOnlyMode: boolean;
  hybridMode: boolean;
  welcomeMessage: string;
  typingDelay: number;
}

export interface BusinessSettings {
  businessName: string;
  contactNumber: string;
  address: string;
  deliveryInfo: string;
  openingHours: string;
  paymentMethods: {
    bkash: boolean;
    nagad: boolean;
    cod: boolean;
  };
}

export interface Subscription {
  plan: string;
  price: number;
  expiryDate: Date;
  daysRemaining: number;
  status: 'active' | 'expired' | 'pending';
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: 'user' | 'ai' | 'faq';
  timestamp: Date;
}

export interface FacebookPage {
  id: string;
  name: string;
  accessToken: string;
  connected: boolean;
}
