import React from 'react';
import { View } from 'react-native';
import { SignUpForm } from '~/components/features/auth/sign-up/sign-up-form';

export default function SignUpScreen() {
	return (
		<View className='bg-background h-full flex items-center justify-center'>
			<SignUpForm />
		</View>
	);
}
