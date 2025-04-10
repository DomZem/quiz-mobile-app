import { Link } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
	return <View className='flex flex-col gap-6 max-w-sm w-full'>{children}</View>;
};

export const AuthFormHeader = ({ variant }: { variant: 'sign-in' | 'sign-up' }) => {
	return (
		<View className='flex flex-col items-center gap-2'>
			<Text className='text-xl font-bold'>Welcome to QuizBuddy</Text>
			<View className='flex flex-row items-center gap-2'>
				<Text className='text-sm'>{variant === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}</Text>
				<Link href={variant === 'sign-in' ? '/sign-up' : '/sign-in'}>
					<Text className='underline text-sm underline-offset-4'>{variant === 'sign-in' ? 'Sign up' : 'Sign in'}</Text>
				</Link>
			</View>
		</View>
	);
};
