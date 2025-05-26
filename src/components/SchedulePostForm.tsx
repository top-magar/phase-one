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
    <Card className="border-0 shadow-md bg-white/70 backdrop-blur-lg transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <form action={formAction} className="space-y-6">
          {/* Account Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Account</label>
            <div className="flex flex-wrap gap-3">
              {connectedAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => setSelectedAccount(account.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium
                    ${selectedAccount === account.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-full ${account.color} shadow-sm`}>
                    <account.icon className="h-4 w-4 text-white" />
                  </div>
                  {account.name}
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
                className="text-purple-600 hover:text-purple-700 disabled:opacity-50 transition-colors duration-200"
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
                className="min-h-[150px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg shadow-sm p-4 text-gray-800"
              />
              {content && (
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {content.length}/280 characters
                </div>
              )}
            </div>
            {aiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm mt-2">
                <p className="text-sm text-red-700">{aiError}</p>
              </div>
            )}
          </div>

          {/* Schedule Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Schedule Time</label>
            <div className="flex gap-3 items-center">
              <input
                type="datetime-local"
                name="scheduleTime"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 shadow-sm text-gray-800"
              />
              <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                 <Calendar className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* AI Generation Progress */}
          {isAiLoading && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                AI is crafting your content...
              </div>
              <Progress value={75} className="h-2 bg-blue-600" />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <SubmitButton />
          </div>

          {/* Action State Message */}
          {state?.message && (
            <div className={`p-3 rounded-lg shadow-sm ${state.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              <p className="text-sm">{state.message}</p>
            </div>
          )}

        </form>
      </CardContent>
    </Card>
  );
} 