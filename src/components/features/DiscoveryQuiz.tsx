import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { quizQuestions } from '../../data/mockData';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { QuizQuestion } from '../../types';

interface DiscoveryQuizProps {
  onComplete: (results: Record<string, string>) => void;
}

export const DiscoveryQuiz: React.FC<DiscoveryQuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleOptionSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
  };
  
  const handleNext = () => {
    if (selectedOption) {
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id.toString()]: selectedOption
      };
      
      setAnswers(updatedAnswers);
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        onComplete(updatedAnswers);
      }
    }
  };
  
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Discover Your Cause</h2>
      
      <div className="mb-6">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-medium text-gray-800 mb-4">{currentQuestion.text}</h3>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.value)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center ${
                  selectedOption === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <span>{option.text}</span>
                {selectedOption === option.value && (
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          icon={<ArrowRight size={18} />}
          iconPosition="right"
        >
          {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </Button>
      </div>
    </div>
  );
};