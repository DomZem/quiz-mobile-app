import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/services/firebase';
import { Quiz } from '~/types/quiz';

const getQuizzes = async () => {
	const snapshot = await getDocs(collection(db, 'quizzes'));
	const quizzes: Quiz[] = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Quiz, 'id'>),
	}));
	return quizzes;
};

export const useQuizzes = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [quizzes, setQuizzes] = useState<Quiz[]>([]);

	useEffect(() => {
		const fetchQuizzes = async () => {
			try {
				setIsLoading(true);
				const quizzes = await getQuizzes();
				setQuizzes(quizzes);
			} catch (error) {
				console.error('Error fetching quizzes:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	return { isLoading, quizzes };
};
