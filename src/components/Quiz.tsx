
import React, { useState, useEffect } from "react";
import Question, { QuestionData } from "./Question";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "./RegistrationForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

interface QuizProps {
  userData: UserData;
  onRestart: () => void;
}

const Quiz: React.FC<QuizProps> = ({ userData, onRestart }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an API call to fetch questions
      // For now, we'll generate some mock questions
      const mockQuestions = generateMockQuestions(20);
      setQuestions(mockQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getScoreMessage = (): { title: string; message: string } => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage >= 90) {
      return {
        title: "Outstanding! 🏆",
        message: "You're a quiz master! Perfect performance!"
      };
    } else if (percentage >= 70) {
      return {
        title: "Great Job! 🎉",
        message: "You've got excellent knowledge!"
      };
    } else if (percentage >= 50) {
      return {
        title: "Good Effort! 👍",
        message: "You're on the right track! Keep learning!"
      };
    } else {
      return {
        title: "Keep Practicing! 📚",
        message: "Don't give up! Try again and improve your score!"
      };
    }
  };

  const scoreMessage = getScoreMessage();

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-2 w-full mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-white/50 backdrop-blur-sm border-b">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <Skeleton key={index} className="h-14 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="w-full max-w-md mx-auto animate-in fade-in duration-500">
        <Card className="shadow-lg border-0">
          <CardHeader className="quiz-gradient text-white text-center rounded-t-lg">
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{scoreMessage.title}</h2>
              <p className="text-gray-600">{scoreMessage.message}</p>
            </div>
            
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full quiz-gradient text-white">
                <span className="text-3xl font-bold">
                  {score}/{questions.length}
                </span>
              </div>
              <p className="mt-2 text-lg">
                {Math.round((score / questions.length) * 100)}% Accuracy
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600">Thank you for participating, {userData.name}!</p>
              <p className="text-sm text-gray-500">Your results have been sent to {userData.email}</p>
            </div>
            
            <Button 
              onClick={onRestart}
              className="quiz-gradient mt-6 w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Question
      questionData={questions[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswerSubmit={handleAnswerSubmit}
    />
  );
};

// Mock question generator function
const generateMockQuestions = (count: number): QuestionData[] => {
  const categories = [
    "Science", "History", "Geography", "Art", "Literature",
    "Technology", "Movies", "Music", "Sports", "Food"
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const options = generateRandomOptions(4);
    const correctAnswer = Math.floor(Math.random() * 4);
    
    return {
      id: `q-${i}`,
      question: `${category} Question: What is the significance of ${getRandomTerm(category)}?`,
      options,
      correctAnswer,
    };
  });
};

const getRandomTerm = (category: string): string => {
  const terms = {
    "Science": ["photosynthesis", "quantum mechanics", "DNA", "black holes", "gravity"],
    "History": ["the Renaissance", "World War II", "the Roman Empire", "the Industrial Revolution"],
    "Geography": ["the Nile River", "Mount Everest", "the Amazon Rainforest", "the Great Barrier Reef"],
    "Art": ["the Mona Lisa", "Impressionism", "Cubism", "the Renaissance period"],
    "Literature": ["Shakespeare", "War and Peace", "Don Quixote", "Homer's Odyssey"],
    "Technology": ["artificial intelligence", "blockchain", "quantum computing", "the Internet"],
    "Movies": ["Citizen Kane", "The Godfather", "Star Wars", "Inception"],
    "Music": ["classical composition", "jazz improvisation", "rock and roll", "hip-hop"],
    "Sports": ["the Olympics", "the World Cup", "the Super Bowl", "Wimbledon"],
    "Food": ["fermentation", "caramelization", "umami", "spice trade"]
  };
  
  const categoryTerms = terms[category as keyof typeof terms] || terms["Science"];
  return categoryTerms[Math.floor(Math.random() * categoryTerms.length)];
};

const generateRandomOptions = (count: number): string[] => {
  const baseAnswers = [
    "It revolutionized our understanding of the subject",
    "It marked a turning point in history",
    "It represents the pinnacle of human achievement",
    "It changed how we perceive the world around us",
    "It established fundamental principles still used today",
    "It challenged conventional thinking of the era",
    "It provided a framework for future discoveries",
    "It symbolizes the cultural heritage of humanity",
    "It demonstrates the power of human innovation"
  ];
  
  // Shuffle and take required number
  return [...baseAnswers]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(option => option);
};

export default Quiz;
