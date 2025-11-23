import { useState, useEffect } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CheckInForm } from '@/components/CheckInForm';
import { WellnessReport } from '@/components/WellnessReport';
import { DailyChallenge } from '@/components/DailyChallenge';
import { LGPDConsent } from '@/components/LGPDConsent';
import { QuizFlow } from '@/components/QuizFlow';
import { ProcessingScreen } from '@/components/ProcessingScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CheckInData, WellnessReport as WellnessReportType, Challenge, UserProgress } from '@/types/wellness';
import { analyzeWellness, generateChallenge } from '@/utils/wellnessAnalysis';

type Screen = 'welcome' | 'checkin' | 'report' | 'challenge' | 'quiz' | 'processing' | 'results';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentReport, setCurrentReport] = useState<WellnessReportType | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [quizResult, setQuizResult] = useState<'anxiety' | 'burnout' | 'depression' | 'balanced' | null>(null);
  
  const [checkIns, setCheckIns] = useLocalStorage<CheckInData[]>('sabiamente-checkins', []);
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>('sabiamente-challenges', []);
  const [progress, setProgress] = useLocalStorage<UserProgress>('sabiamente-progress', {
    totalCheckIns: 0,
    consecutiveDays: 0,
    completedChallenges: 0,
    badges: [],
    lastCheckIn: '',
  });

  // Auto dark mode based on time (18h-22h)
  useEffect(() => {
    const hour = new Date().getHours();
    const isDarkTime = hour >= 18 || hour < 6;
    
    if (isDarkTime) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleCheckInComplete = (data: CheckInData) => {
    // Save check-in
    setCheckIns([data, ...checkIns]);
    
    // Analyze wellness
    const report = analyzeWellness(data);
    setCurrentReport(report);
    
    // Update progress
    const today = new Date().toDateString();
    const lastCheckInDate = progress.lastCheckIn ? new Date(progress.lastCheckIn).toDateString() : '';
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    const isConsecutive = lastCheckInDate === yesterday;
    const newConsecutiveDays = isConsecutive ? progress.consecutiveDays + 1 : 1;
    
    setProgress({
      ...progress,
      totalCheckIns: progress.totalCheckIns + 1,
      consecutiveDays: newConsecutiveDays,
      lastCheckIn: new Date().toISOString(),
    });
    
    setCurrentScreen('report');
  };

  const handleGenerateChallenge = () => {
    const lastCheckIn = checkIns[0];
    if (lastCheckIn) {
      const challenge = generateChallenge(lastCheckIn);
      setCurrentChallenge(challenge);
      setChallenges([challenge, ...challenges]);
      setCurrentScreen('challenge');
    }
  };

  const handleCompleteChallenge = () => {
    if (currentChallenge) {
      const updatedChallenges = challenges.map(c => 
        c.id === currentChallenge.id ? { ...c, completed: true } : c
      );
      setChallenges(updatedChallenges);
      setCurrentChallenge({ ...currentChallenge, completed: true });
      
      setProgress({
        ...progress,
        completedChallenges: progress.completedChallenges + 1,
        badges: progress.consecutiveDays >= 2 && !progress.badges.includes('superador') 
          ? [...progress.badges, 'superador'] 
          : progress.badges,
      });
    }
  };

  const handleNewCheckIn = () => {
    setCurrentScreen('welcome');
    setCurrentReport(null);
    setCurrentChallenge(null);
    setQuizResult(null);
  };

  const handleQuizComplete = (result: 'anxiety' | 'burnout' | 'depression' | 'balanced') => {
    setQuizResult(result);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('results');
  };

  return (
    <>
      <LGPDConsent />
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('quiz')} />
      )}

      {currentScreen === 'quiz' && (
        <QuizFlow onComplete={handleQuizComplete} />
      )}

      {currentScreen === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}

      {currentScreen === 'results' && quizResult && (
        <ResultsScreen result={quizResult} />
      )}
      
      {currentScreen === 'checkin' && (
        <CheckInForm 
          onComplete={handleCheckInComplete}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}
      
      {currentScreen === 'report' && currentReport && (
        <WellnessReport 
          report={currentReport}
          onGenerateChallenge={handleGenerateChallenge}
          onNewCheckIn={handleNewCheckIn}
        />
      )}
      
      {currentScreen === 'challenge' && currentChallenge && (
        <DailyChallenge 
          challenge={currentChallenge}
          onComplete={handleCompleteChallenge}
          onNewCheckIn={handleNewCheckIn}
          consecutiveDays={progress.consecutiveDays}
        />
      )}
    </>
  );
};

export default Index;
