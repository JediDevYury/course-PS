import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { courseAtom, loadCourseAtom } from '../../entities/course/model/course.state';
import CourseCard from '../../entities/course/ui/CourseCard/CourseCard';
import { StudentCourseDescription } from '../../entities/course/model/course.model';
import { Colors } from '../../shared/tokens';
import * as Notifications from 'expo-notifications';
import { Button } from '../../shared/Button/Button';
import Notification from '../../shared/Notification/Notification';
import * as Devices from 'expo-device';
import Constants from 'expo-constants';

export default function MyCourses() {
	const { isLoading, courses } = useAtomValue(courseAtom);
	const loadCourse = useSetAtom(loadCourseAtom);
	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.item}>
				<CourseCard {...item} />
			</View>
		);
	};

	const checkAllowNotifications = async () => {
		const settings = await Notifications.getPermissionsAsync();

		return (
			settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
		);
	};

	const requestPermissions = async () => {
		return await Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
			},
		});
	};

	const scheduleNotification = async () => {
		const granted = await checkAllowNotifications();

		if (!granted) {
			return await requestPermissions();
		}

		if (Devices.isDevice) {
			try {
				const token = await Notifications.getExpoPushTokenAsync({
					projectId: Constants?.expoConfig?.extra?.eas.projectId,
				});

				console.log(token.data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		loadCourse();
	}, []);

	return (
		<>
			<Notification />
			{isLoading && (
				<ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />
			)}
			<Button text="Напомнить" onPress={scheduleNotification} />
			{courses.length > 0 && (
				<FlatList
					refreshControl={
						<RefreshControl
							tintColor={Colors.primary}
							titleColor={Colors.primary}
							refreshing={isLoading}
							onRefresh={loadCourse}
						/>
					}
					data={courses}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCourse}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	activity: {
		marginTop: 30,
	},
	item: {
		padding: 20,
	},
});
