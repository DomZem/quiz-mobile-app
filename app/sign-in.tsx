import { View } from 'react-native';
import { SignInForm } from '~/components/features/auth/sign-in/SignInForm';

export default function SignInScreen() {
	return (
		<View className='bg-background min-h-screen flex items-center justify-center'>
			<SignInForm />
		</View>
	);
}
