'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { schedulePostAction } from '@/app/dashboard/scheduleActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Calendar, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ActionState = {
  success: boolean
  error?: string
  message?: string
}

// Dummy data for now - will be replaced with actual connected accounts
const connectedAccounts = [
  {
    id: '1',
    platform: 'facebook',
    name: 'Phase One Nepal',
    icon: Facebook,
    color: 'bg-blue-600'
  },
  {
    id: '2',
    platform: 'instagram',
    name: '@phaseonenepal',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full"
    >
      {pending ? 'Scheduling...' : 'Schedule Post'}
    </Button>
  );
}

export function SchedulePostForm() {
  const [selectedAccount, setSelectedAccount] = useState(connectedAccounts[0].id);
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  const initialState: ActionState = { success: false };
  const [state, formAction] = useActionState(schedulePostAction, initialState);

  const handleAiAssist = async () => {
    const currentContent = content.trim();
    if (!currentContent && !confirm("No topic entered. Generate a generic post idea?")) {
      return;
    }

    setIsAiLoading(true);
    setAiError(null);

    try {
      const prompt = `Generate an engaging social media caption for a Nepalese SMB about: "${currentContent || 'a new product launch'}". Include relevant hashtags.`;
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI suggestion');
      }

      const data = await response.json();
      if (data.content) {
        setContent(data.content);
      } else {
        throw new Error('AI response was empty or malformed');
      }
    } catch (error: unknown) {
      console.error('AI Assist Error:', error);
      setAiError(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Schedule a post for your social media accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          {/* Account Selection */}
          <div className="space-y-2">
            <Label>Select Account</Label>
            <div className="flex flex-wrap gap-3">
              {connectedAccounts.map((account) => (
                <Button
                  key={account.id}
                  type="button"
                  variant={selectedAccount === account.id ? "default" : "outline"}
                  onClick={() => setSelectedAccount(account.id)}
                  className={cn(
                    "flex items-center gap-3",
                    selectedAccount === account.id && "bg-primary text-primary-foreground"
                  )}
                >
                  <div className={cn("p-2 rounded-full", account.color)}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  {account.name}
                </Button>
              ))}
            </div>
            <input type="hidden" name="socialAccountId" value={selectedAccount} />
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Post Content</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAiAssist}
                disabled={isAiLoading}
                className="text-primary hover:text-primary/90"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isAiLoading ? 'Generating...' : 'AI Assist'}
              </Button>
            </div>
            <div className="relative">
              <Textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="min-h-[150px] resize-none"
              />
              {content && (
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {content.length}/280 characters
                </div>
              )}
            </div>
            {aiError && (
              <Alert variant="destructive">
                <AlertDescription>{aiError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Schedule Time */}
          <div className="space-y-2">
            <Label>Schedule Time</Label>
            <div className="flex gap-3 items-center">
              <Input
                type="datetime-local"
                name="scheduleTime"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="flex-1"
              />
              <div className="p-2 rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* AI Generation Progress */}
          {isAiLoading && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                AI is crafting your content...
              </div>
              <Progress value={75} />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <SubmitButton />
          </div>

          {/* Action State Message */}
          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
} 