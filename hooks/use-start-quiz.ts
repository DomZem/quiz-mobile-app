import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '~/services/firebase';
import { Answer, Quiz } from '~/types/quiz';

const saveQuizResult = async ({ quiz, score }: { quiz: Pick<Quiz, 'id' | 'questions'>; score: number }) => {
	const currentUser = auth.currentUser;

	if (!currentUser) return;

	await addDoc(collection(db, 'quiz_players'), {
		quiz_id: quiz.id,
		user_id: currentUser.uid,
		user_name: currentUser?.displayName || 'Anonymous',
		user_email: currentUser?.email || '',
		total_correct_answers: score,
		total_questions: quiz.questions.length,
		created_at: new Date(),
	});
};

export const useStartQuiz = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [isFinished, setIsFinished] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);

	const answerQuestion = async ({ quiz, answer }: { quiz: Quiz; answer: Answer }) => {
		if (answer.is_correct) setScore((prev) => prev + 1);

		const nextIndex = currentIndex + 1;

		if (nextIndex < (quiz.questions.length ?? 0)) {
			setCurrentIndex(nextIndex);
			return;
		}

		setIsFinished(true);
		await saveQuizResult({ quiz, score: score + 1 });

		console.warn('Saving quiz result to Firestore...');
	};

	const handleStartQuiz = () => {
		console.warn('Starting quiz...');
		setHasStarted(true);
	};

	return {
		hasStarted,
		isFinished,
		currentIndex,
		score,
		handleStartQuiz,
		answerQuestion,
	};
};
