import { Redirect, Stack } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { app } from '~/services/firebase';

export default function AppLayout() {
	const auth = getAuth(app);

	// Check if user is authenticated
	if (!auth.currentUser) {
		return <Redirect href='/sign-in' />;
	}

	return (
		<Stack>
			<Stack.Screen
				name='(tabs)'
				options={{
					title: 'QuizBuddy',
					headerStyle: { backgroundColor: '#18181b' },
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>

			<Stack.Screen
				name='quizzes/[id]/index'
				options={{
					title: 'Quiz',
					headerStyle: { backgroundColor: '#18181b' },
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
		</Stack>
	);
}
