import React from 'react';
import { View } from 'react-native';
import { SignUpForm } from '~/components/features/auth/sign-up/SignUpForm';

export default function SignUpScreen() {
	return (
		<View className='bg-background min-h-screen flex items-center justify-center'>
			<SignUpForm />
		</View>
	);
}
