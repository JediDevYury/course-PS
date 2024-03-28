import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export const Notification = () => {
	const router = useRouter();

	useEffect(() => {
		const subscriptionReceived = Notifications.addNotificationReceivedListener((notification) => {
			console.log(notification.request.content.data);
		});

		const subscriptionResponseReceived = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				const { alias } = response.notification.request.content.data;
				if (!alias) return;
				router.push(`/(app)/course/${alias}`);
			},
		);

		return () => {
			subscriptionReceived.remove();
			subscriptionResponseReceived.remove();
		};
	}, []);
	return <></>;
};

export default Notification;
