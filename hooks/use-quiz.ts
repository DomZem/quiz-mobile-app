import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/services/firebase';
import { Quiz } from '~/types/quiz';

export const getQuiz = async (id: string): Promise<Quiz | null> => {
	const docRef = doc(db, 'quizzes', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return { id: docSnap.id, ...(docSnap.data() as Omit<Quiz, 'id'>) };
	}

	return null;
};

export const useQuiz = (id: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [quiz, setQuiz] = useState<Quiz | null>(null);

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				setIsLoading(true);
				const fetchedQuiz = await getQuiz(id);
				if (fetchedQuiz) {
					setQuiz(fetchedQuiz);
				} else {
					console.warn('Quiz not found');
				}
			} catch (error) {
				console.error('Error fetching quiz:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuiz();
	}, [id]);

	return { isLoading, quiz };
};
