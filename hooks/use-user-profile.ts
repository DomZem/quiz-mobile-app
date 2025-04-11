import { collection, getCountFromServer, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '~/services/firebase';
import { QuizPlayer } from '~/types/quiz';

const getQuizzesCount = async (): Promise<number> => {
	const coll = collection(db, 'quizzes');
	const snapshot = await getCountFromServer(coll);
	return snapshot.data().count;
};

const getPlayedQuizzesCount = async (): Promise<number> => {
	const user = auth.currentUser;
	if (!user) return 0;

	const q = query(collection(db, 'quiz_players'), where('user_id', '==', user.uid));
	const snapshot = await getCountFromServer(q);
	return snapshot.data().count;
};

const getCurrentUserQuizPlayer = async (): Promise<QuizPlayer | null> => {
	const user = auth.currentUser;
	if (!user) return null;

	const q = query(collection(db, 'quiz_players'), where('user_id', '==', user.uid), orderBy('total_correct_answers', 'desc'), limit(1));

	const snapshot = await getDocs(q);

	if (snapshot.empty) return null;

	const doc = snapshot.docs[0];
	return {
		id: doc.id,
		...(doc.data() as Omit<QuizPlayer, 'id'>),
	};
};

export const useUserProfile = () => {
	const [quizzesCount, setQuizzesCount] = useState<number | null>(null);
	const [playedQuizzesCount, setPlayedQuizzesCount] = useState<number | null>(null);
	const [currentUserQuizPlayer, setCurrentUserQuizPlayer] = useState<QuizPlayer | null>(null);

	useEffect(() => {
		const fetchQuizzesCount = async () => {
			try {
				const count = await getQuizzesCount();
				setQuizzesCount(count);
			} catch (error) {
				console.error('error fetching quizzes count:', error);
			}
		};

		fetchQuizzesCount();
	}, []);

	useEffect(() => {
		const fetchPlayedQuizzesCount = async () => {
			try {
				const count = await getPlayedQuizzesCount();
				setPlayedQuizzesCount(count);
			} catch (error) {
				console.error('error fetching played quizzes count:', error);
			}
		};

		fetchPlayedQuizzesCount();
	}, []);

	useEffect(() => {
		const fetchCurrentUserQuizPlayer = async () => {
			try {
				const quizPlayer = await getCurrentUserQuizPlayer();
				setCurrentUserQuizPlayer(quizPlayer);
			} catch (error) {
				console.error('error fetching current quiz player:', error);
			}
		};

		fetchCurrentUserQuizPlayer();
	}, []);

	return {
		quizzesCount,
		playedQuizzesCount,
		highestScore: currentUserQuizPlayer?.total_correct_answers ?? 0,
	};
};
