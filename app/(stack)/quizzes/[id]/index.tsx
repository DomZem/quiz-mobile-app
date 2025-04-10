import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { QuizPlayersList } from '~/components/features/leaderboard/quiz-players-list';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useQuiz } from '~/hooks/use-quiz';
import { useStartQuiz } from '~/hooks/use-start-quiz';
import { Trophy } from '~/lib/icons/Trophy';

export default function QuizDetailsScreen() {
	const { id } = useLocalSearchParams();
	const { quiz, isLoading } = useQuiz(id as string);
	const { hasStarted, isFinished, currentIndex, score, handleStartQuiz, answerQuestion } = useStartQuiz();

	if (!quiz || isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />;

	if (!hasStarted) {
		return (
			<View className='bg-background flex-1 flex flex-col gap-6 p-4'>
				<View>
					<Text className='text-2xl font-bold mb-2'>{quiz.name}</Text>
					<Text className='text-lg mb-4'>{quiz.description}</Text>
					<Button onPress={handleStartQuiz} className='w-full'>
						<Text>Start Quiz</Text>
					</Button>
				</View>

				<View className='flex-1'>
					<Text className='text-2xl font-bold mb-2'>Leaderboard</Text>
					<QuizPlayersList quizId={id as string} />
				</View>
			</View>
		);
	}

	if (isFinished) {
		return (
			<View className='flex-1 justify-center items-center p-4'>
				<Text className='text-2xl font-bold mb-2'>Quiz Finished!</Text>
				<Text className='text-lg'>
					Your Score: {score} / {quiz.questions.length}
				</Text>
			</View>
		);
	}

	const currentQuestion = quiz.questions[currentIndex];

	return (
		<View className='bg-background flex-1 p-4'>
			<View className='justify-between items-center flex flex-row'>
				<Text className='text-xl font-bold'>Question {currentIndex + 1}</Text>
				<View className='flex flex-row gap-2 items-center'>
					<Badge className='flex items-center gap-2 flex-row'>
						<Trophy className='text-secondary' size={16} />
						<Text>{score}</Text>
					</Badge>
				</View>
			</View>

			<Text className='text-lg my-6 text-center'>{currentQuestion.title}</Text>

			{currentQuestion.answers.map((answer, idx) => (
				<Button
					className='mb-2'
					onPress={() =>
						answerQuestion({
							quiz,
							answer,
						})
					}
					key={idx}
				>
					<Text className=''>{answer.title}</Text>
				</Button>
			))}
		</View>
	);
}
