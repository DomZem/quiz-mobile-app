import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { useHideStackHeader } from '~/hooks/use-hide-stack-header';
import { useUserProfile } from '~/hooks/use-user-profile';
import { getFirstLetters } from '~/lib/utils';
import { auth } from '~/services/firebase';

export default function ProfileScreen() {
	useHideStackHeader();

	const { quizzesCount, playedQuizzesCount, highestScore } = useUserProfile();

	const currentUser = auth.currentUser;

	const progressValue = playedQuizzesCount && quizzesCount ? (playedQuizzesCount / quizzesCount) * 100 : 0;

	return (
		<View className='bg-background flex items-center justify-center flex-1 p-4'>
			<Card className='w-full max-w-sm p-6 rounded-2xl'>
				<CardHeader className='items-center'>
					<Avatar alt={currentUser?.displayName ? `${currentUser.displayName}'s Avatar` : "User's Avatar"} className='w-24 h-24'>
						<AvatarImage source={{ uri: currentUser?.photoURL ?? undefined }} />
						<AvatarFallback>
							<Text>{currentUser?.displayName ? getFirstLetters(currentUser.displayName) : 'A'}</Text>
						</AvatarFallback>
					</Avatar>
					<View className='p-3' />
					<CardTitle className='pb-2 text-center'>{currentUser?.displayName ?? 'Anonymouse'}</CardTitle>
					{currentUser?.email && <CardDescription className='text-base font-semibold'>{currentUser.email}</CardDescription>}
				</CardHeader>
				<CardContent>
					<View className='flex-row justify-around gap-3'>
						<View className='items-center'>
							<Text className='text-sm text-muted-foreground'>Quiz Played</Text>
							<Text className='text-xl font-semibold'>{playedQuizzesCount}</Text>
						</View>
						<View className='items-center'>
							<Text className='text-sm text-muted-foreground'>Highest Score</Text>
							<Text className='text-xl font-semibold'>{highestScore}</Text>
						</View>
					</View>
				</CardContent>
				<CardFooter className='flex-col gap-3 pb-0'>
					<Text className='text-sm text-muted-foreground'>
						{playedQuizzesCount} of {quizzesCount} quizzes completed
					</Text>
					<Progress value={progressValue} className='h-2' indicatorClassName='bg-sky-600' />
				</CardFooter>
			</Card>
		</View>
	);
}
