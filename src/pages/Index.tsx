
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, BookOpen, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    interests: '',
    skills: '',
    apiKey: ''
  });
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.interests || !formData.skills) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before getting suggestions.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to get career suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `The user is named ${formData.name}. Their interests are: ${formData.interests}. Their skills include: ${formData.skills}. Suggest 3 suitable career options for this user. For each option, provide: - A career title - A 2-line description - Two beginner-friendly learning resources (courses or articles).`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formData.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get career suggestions');
      }

      const data = await response.json();
      setSuggestions(data.choices[0].message.content);
      
      toast({
        title: "Success!",
        description: "Your career suggestions are ready!",
      });
    } catch (error) {
      console.error('Error getting career suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to get career suggestions. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Mentor
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect career path based on your unique interests and skills. 
            Let AI guide you toward exciting opportunities that match your potential.
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <Target className="h-6 w-6 text-indigo-600" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription className="text-gray-600">
              Share your interests and skills to get personalized career recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* API Key Input */}
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                  OpenAI API Key (Required)
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="sk-..."
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  className="h-12 text-base border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
                <p className="text-xs text-gray-500">
                  Your API key is stored locally and only used for this session. Get one at openai.com
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 text-base border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>

              {/* Interests Textarea */}
              <div className="space-y-2">
                <Label htmlFor="interests" className="text-sm font-medium text-gray-700">
                  Your Interests
                </Label>
                <Textarea
                  id="interests"
                  placeholder="e.g., design, teaching, technology, helping others, solving problems..."
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  className="min-h-[100px] text-base border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Skills Textarea */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">
                  Your Skills
                </Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., Python, writing, communication, project management, creative thinking..."
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="min-h-[100px] text-base border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting Your Career Suggestions...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Career Suggestions
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {suggestions && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                Your Career Suggestions
              </CardTitle>
              <CardDescription className="text-gray-600">
                Based on your interests and skills, here are some exciting career paths to explore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {suggestions}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
