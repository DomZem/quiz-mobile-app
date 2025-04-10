import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

export const useHideStackHeader = () => {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [navigation]);
};
