
import React, { useState } from "react";
import RegistrationForm, { UserData } from "@/components/RegistrationForm";
import Quiz from "@/components/Quiz";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleRegistrationSubmit = (data: UserData) => {
    setUserData(data);
    setQuizStarted(true);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-6 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text quiz-gradient">
            QuizMaster AI
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Test your knowledge with AI-generated questions that change every time!
          </p>
        </header>
        
        <main>
          {!quizStarted ? (
            <RegistrationForm onSubmit={handleRegistrationSubmit} />
          ) : userData ? (
            <Quiz userData={userData} onRestart={handleRestart} />
          ) : null}
        </main>
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 QuizMaster AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
