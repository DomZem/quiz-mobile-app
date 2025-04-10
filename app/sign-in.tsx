import { View } from 'react-native';
import { SignInForm } from '~/components/features/auth/sign-in/sign-in-form';

export default function SignInScreen() {
	return (
		<View className='bg-background h-full flex items-center justify-center'>
			<SignInForm />
		</View>
	);
}
