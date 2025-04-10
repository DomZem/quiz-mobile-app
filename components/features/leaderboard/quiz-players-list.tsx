import { ActivityIndicator, FlatList, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useQuizLeaderboard } from '~/hooks/use-quiz-leaderboard';
import { QuizPlayerCard } from './quiz-player-card';

type QuizLeaderboardsListProps = {
	quizId: string;
};

export const QuizPlayersList = ({ quizId }: QuizLeaderboardsListProps) => {
	const { isLoading, players } = useQuizLeaderboard(quizId);

	if (isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />;

	if (!players || players.length === 0) {
		return (
			<View className='flex-1 items-center justify-center'>
				<Text>No players have completed this quiz yet</Text>
				<Text>Be the first to take it and get on the leaderboard!</Text>
			</View>
		);
	}

	return <FlatList data={players} keyExtractor={(item) => item.id} renderItem={({ item }) => <QuizPlayerCard quizPlayer={item} />} ItemSeparatorComponent={() => <View style={{ height: 12 }} />} />;
};
