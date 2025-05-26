'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { schedulePostAction } from '@/app/dashboard/scheduleActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Calendar, Clock, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
      className="bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200"
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
    } catch (error: any) {
      console.error('AI Assist Error:', error);
      setAiError(error.message || 'Failed to generate content');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          Schedule New Post
        </CardTitle>
        <CardDescription>
          Create and schedule your next social media post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {/* Account Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Account</label>
            <div className="flex gap-2">
              {connectedAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => setSelectedAccount(account.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    selectedAccount === account.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${account.color}`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{account.name}</span>
                </button>
              ))}
            </div>
            <input type="hidden" name="socialAccountId" value={selectedAccount} />
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Post Content</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAiAssist}
                disabled={isAiLoading}
                className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
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
                className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
              {content && (
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {content.length}/280 characters
                </div>
              )}
            </div>
            {aiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{aiError}</p>
              </div>
            )}
          </div>

          {/* Schedule Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Schedule Time</label>
            <div className="flex gap-2">
              <input
                type="datetime-local"
                name="scheduleTime"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* AI Generation Progress */}
          {isAiLoading && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                AI is crafting your content...
              </div>
              <Progress value={75} className="h-2" />
            </div>
          )}

          {/* Status Messages */}
          {state.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          )}
          {state.message && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{state.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 