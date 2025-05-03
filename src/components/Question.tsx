
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionProps {
  questionData: QuestionData;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionData,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === questionData.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    
    // Delay next question to show feedback
    setTimeout(() => {
      onAnswerSubmit(correct);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }, 1500);
  };

  const getOptionClassName = (index: number) => {
    if (!isAnswerSubmitted) {
      return `answer-button ${selectedOption === index ? 'selected' : ''}`;
    }
    
    if (index === questionData.correctAnswer) {
      return 'answer-button correct';
    }
    
    if (index === selectedOption && index !== questionData.correctAnswer) {
      return 'answer-button incorrect';
    }
    
    return 'answer-button';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <Progress 
          value={(questionNumber / totalQuestions) * 100} 
          className="h-2" 
        />
        <p className="text-sm mt-2 text-gray-600">
          Question {questionNumber} of {totalQuestions}
        </p>
      </div>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-white/50 backdrop-blur-sm border-b">
          <CardTitle className="text-xl">{questionData.question}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {questionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={getOptionClassName(index)}
                disabled={isAnswerSubmitted}
                aria-selected={selectedOption === index}
                aria-disabled={isAnswerSubmitted}
                aria-label={option}
              >
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full border-2 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          {isAnswerSubmitted ? (
            <div className="w-full text-center">
              <p className={`text-lg font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Correct! 🎉' : 'Incorrect! The correct answer was option ' + 
                  String.fromCharCode(65 + questionData.correctAnswer)}
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="quiz-gradient w-full"
            >
              Submit Answer
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Question;
