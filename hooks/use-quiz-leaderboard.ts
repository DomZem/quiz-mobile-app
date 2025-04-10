import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/services/firebase';
import { QuizPlayer } from '~/types/quiz';

const getQuizPlayers = async (quizId: string) => {
	const q = query(collection(db, 'quiz_players'), where('quiz_id', '==', quizId));
	const querySnapshot = await getDocs(q);

	const data: QuizPlayer[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<QuizPlayer, 'id'>) }));
	return data;
};

export const useQuizLeaderboard = (quizId: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [players, setPlayers] = useState<QuizPlayer[]>([]);

	useEffect(() => {
		const fetchQuizLeaderboard = async () => {
			try {
				setIsLoading(true);
				const leaderboard = await getQuizPlayers(quizId);
				setPlayers(leaderboard);
			} catch (error) {
				console.error('Error fetching quiz leaderboard:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuizLeaderboard();
	}, []);

	return { isLoading, players };
};
