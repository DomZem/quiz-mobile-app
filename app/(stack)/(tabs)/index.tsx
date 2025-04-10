import { View } from 'react-native';
import { QuizList } from '~/components/features/quiz/quiz-list';
import { useHideStackHeader } from '~/hooks/use-hide-stack-header';

export default function QuizzesScreen() {
	useHideStackHeader();

	return (
		<View className='bg-background h-full p-4 pt-6'>
			<QuizList />
		</View>
	);
}
