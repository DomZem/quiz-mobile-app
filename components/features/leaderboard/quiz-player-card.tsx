import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { getFirstLetters } from '~/lib/utils';
import { QuizPlayer } from '~/types/quiz';

type QuizPlayerCardProps = {
	quizPlayer: QuizPlayer;
};

export const QuizPlayerCard = ({ quizPlayer }: QuizPlayerCardProps) => {
	return (
		<Card className='p-4 flex flex-row items-center justify-between'>
			<View className='flex-row items-center gap-4'>
				<Avatar alt={`${quizPlayer.user_name}'s Avatar`} className='w-12 h-12'>
					<AvatarImage source={{ uri: undefined }} />
					<AvatarFallback>
						<Text>{getFirstLetters(quizPlayer.user_name)}</Text>
					</AvatarFallback>
				</Avatar>

				<Text>{quizPlayer.user_name}</Text>
			</View>

			<Text className='text-sm text-muted-foreground'>Score: {quizPlayer.total_correct_answers}</Text>
		</Card>
	);
};
