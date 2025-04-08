import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { FormErrorMessage, FormInputWrapper } from '~/components/ui/Form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { auth } from '~/services/firebase';
import { AuthFormHeader, AuthFormWrapper } from '../common/AuthFormHeader';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const SignInForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const handleSignIn = async ({ email, password }: z.infer<typeof signInSchema>) => {
		try {
			const credentials = await signInWithEmailAndPassword(auth, email, password);

			console.log('credentials', credentials);

			const user = credentials.user;

			if (user) {
				router.push('/(app)');
				return;
			}
		} catch (error) {
			console.error('Error signing in', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthFormWrapper>
			<AuthFormHeader variant='sign-in' />

			<View className='flex flex-col gap-6'>
				<FormInputWrapper>
					<Label htmlFor='email'>Email</Label>
					<Controller
						control={form.control}
						render={({ field: { onChange, onBlur, value } }) => {
							return <Input id='email' placeholder='anakin@gmail.com' onBlur={onBlur} onChangeText={onChange} value={value} />;
						}}
						name='email'
					/>
					{form.formState.errors.password && <FormErrorMessage>{form.formState.errors.password.message}</FormErrorMessage>}
				</FormInputWrapper>

				<FormInputWrapper>
					<Label htmlFor='password'>Password</Label>
					<Controller
						control={form.control}
						render={({ field: { onChange, onBlur, value } }) => {
							return <Input id='password' secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />;
						}}
						name='password'
					/>
					{form.formState.errors.password && <FormErrorMessage>{form.formState.errors.password.message}</FormErrorMessage>}
				</FormInputWrapper>

				<Button className='w-full' onPress={form.handleSubmit(handleSignIn)} disabled={isLoading}>
					<Text>{isLoading ? 'Signing in...' : 'Sign In'}</Text>
				</Button>
			</View>
		</AuthFormWrapper>
	);
};
