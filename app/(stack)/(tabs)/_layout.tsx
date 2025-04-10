import { Tabs } from 'expo-router';
import React from 'react';
import { Profile } from '~/lib/icons/Profile';
import { Quiz } from '~/lib/icons/Quiz';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: 'white',
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Quizzes',
					tabBarIcon: ({ color }) => <Quiz color={color} />,
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => <Profile color={color} />,
				}}
			/>
		</Tabs>
	);
}
