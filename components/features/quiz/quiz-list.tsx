import { ActivityIndicator, FlatList, View } from 'react-native';
import { useQuizzes } from '~/hooks/use-quizzes';
import { QuizCard } from './quiz-card';

export const QuizList = () => {
	const { isLoading, quizzes } = useQuizzes();

	if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />;

	return <FlatList data={quizzes} keyExtractor={(item) => item.id} renderItem={({ item }) => <QuizCard quiz={item} />} ItemSeparatorComponent={() => <View style={{ height: 12 }} />} />;
};
