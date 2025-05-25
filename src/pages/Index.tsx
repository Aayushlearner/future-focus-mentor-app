
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
    skills: ''
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

    setIsLoading(true);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on user input
      const mockResponse = `Based on your profile, here are 3 career suggestions for ${formData.name}:

**1. UX/UI Designer**
Create intuitive and visually appealing digital experiences for users across web and mobile platforms.
Combine your creative interests with technical skills to solve user problems through design.

Learning Resources:
- Google UX Design Certificate (Coursera)
- "Don't Make Me Think" by Steve Krug

**2. Technical Content Creator**
Develop educational content, tutorials, and documentation that makes complex topics accessible to broader audiences.
Blend your communication skills with technical knowledge to help others learn and grow.

Learning Resources:
- Technical Writing Fundamentals (edX)
- "Everybody Writes" by Ann Handley

**3. Product Manager**
Guide product development from conception to launch, working with cross-functional teams to build solutions.
Use your analytical skills and user focus to drive product strategy and execution.

Learning Resources:
- Product Management Fundamentals (Udemy)
- "Inspired" by Marty Cagan`;

      setSuggestions(mockResponse);
      
      toast({
        title: "Success!",
        description: "Your career suggestions are ready!",
      });
    } catch (error) {
      console.error('Error getting career suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to get career suggestions. Please try again.",
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
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-teal-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
              AI Career Mentor
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover your perfect career path based on your unique interests and skills. 
            Let AI guide you toward exciting opportunities that match your potential.
          </p>
        </div>

        {/* Main Form */}
        <Card className="shadow-xl border border-gray-700 bg-gray-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-100 flex items-center justify-center gap-2">
              <Target className="h-6 w-6 text-teal-400" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription className="text-gray-400">
              Share your interests and skills to get personalized career recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-200">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 text-base bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400"
                />
              </div>

              {/* Interests Textarea */}
              <div className="space-y-2">
                <Label htmlFor="interests" className="text-sm font-medium text-gray-200">
                  Your Interests
                </Label>
                <Textarea
                  id="interests"
                  placeholder="e.g., design, teaching, technology, helping others, solving problems..."
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  className="min-h-[100px] text-base bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 resize-none"
                />
              </div>

              {/* Skills Textarea */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-gray-200">
                  Your Skills
                </Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., Python, writing, communication, project management, creative thinking..."
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="min-h-[100px] text-base bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:border-teal-400 focus:ring-teal-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-500 to-violet-500 hover:from-teal-600 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-xl text-white border-0"
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
          <Card className="shadow-xl border border-gray-700 bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-100 flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6 text-teal-400" />
                Career Suggestions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Based on your interests and skills, here are some exciting career paths to explore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg p-6 border border-gray-600">
                  <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
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
