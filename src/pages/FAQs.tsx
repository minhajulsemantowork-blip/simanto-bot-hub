import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { FAQ } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  MessageCircle,
} from 'lucide-react';

const FAQs: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What are your delivery options?',
      answer: 'We offer home delivery within Dhaka (24 hours) and nationwide delivery (3-5 days). Cash on delivery and prepaid options available.',
      createdAt: new Date(),
    },
    {
      id: '2',
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking ID via SMS. You can also check your order status in the app.',
      createdAt: new Date(),
    },
    {
      id: '3',
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery. Items must be unused and in original packaging. Contact support to initiate a return.',
      createdAt: new Date(),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question || !formData.answer) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (editingFaq) {
      setFaqs(faqs.map((f) =>
        f.id === editingFaq.id
          ? { ...f, question: formData.question, answer: formData.answer }
          : f
      ));
      toast({
        title: 'FAQ Updated',
        description: 'FAQ has been updated successfully.',
      });
    } else {
      const newFaq: FAQ = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer,
        createdAt: new Date(),
      };
      setFaqs([...faqs, newFaq]);
      toast({
        title: 'FAQ Added',
        description: 'New FAQ has been added successfully.',
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
    toast({
      title: 'FAQ Deleted',
      description: 'FAQ has been removed successfully.',
    });
  };

  const resetForm = () => {
    setFormData({ question: '', answer: '' });
    setEditingFaq(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-primary" />
            FAQs
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage frequently asked questions
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the question"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the answer"
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingFaq ? 'Update' : 'Add'} FAQ
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <Card
            key={faq.id}
            glow
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(faq)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(faq.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-medium">No FAQs found</p>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try a different search term' : 'Add your first FAQ to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQs;
