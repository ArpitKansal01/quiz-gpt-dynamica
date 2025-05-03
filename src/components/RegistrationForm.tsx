
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface RegistrationFormProps {
  onSubmit: (userData: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const userData = { name, email };
      onSubmit(userData);
      setIsSubmitting(false);
    }, 1000);
  };
  
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardHeader className="space-y-1 quiz-gradient text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Quiz Registration</CardTitle>
        <CardDescription className="text-white/80 text-center">
          Enter your details to start the quiz
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full quiz-gradient h-12 text-white font-semibold text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Start Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
