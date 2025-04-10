import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Card, CardDescription, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Quiz } from '~/types/quiz';

type QuizCardProps = {
	quiz: Quiz;
};

export const QuizCard = ({ quiz }: QuizCardProps) => {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: '/quizzes/[id]',
			params: { id: quiz.id },
		});
	};

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
			<Card className='w-full p-6'>
				<View className='flex flex-row items-center justify-between'>
					<CardTitle>{quiz.name}</CardTitle>

					<Badge>
						<Text>
							{quiz.questions.length} {quiz.questions.length > 1 ? 'questions' : 'question'}
						</Text>
					</Badge>
				</View>
				<CardDescription>{quiz.description}</CardDescription>
			</Card>
		</TouchableOpacity>
	);
};
