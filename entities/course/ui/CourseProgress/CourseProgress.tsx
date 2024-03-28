import { Text, View, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../shared/tokens';

type CourseProgressProps = {
	totalLessons: number;
	lessonsPassed: number;
};

const CourseProgress = ({ totalLessons, lessonsPassed }: CourseProgressProps) => {
	const percent = `${(lessonsPassed / totalLessons) * 100}%`;

	return (
		<View style={styles.wrapper}>
			<View style={styles.head}>
				<Text style={styles.textPercent}> {percent}</Text>
				<Text style={styles.textCount}>{`${lessonsPassed}/${totalLessons}`}</Text>
			</View>
			<View style={styles.bar}>
				<View
					style={{
						...styles.progress,
						width: percent,
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 18,
	},
	head: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
	},
	textPercent: {
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
		color: Colors.pink,
	},
	textCount: {
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
		color: Colors.white,
	},
	bar: {
		height: 5,
		borderRadius: 20,
		backgroundColor: Colors.border,
	},
	progress: {
		height: 5,
		borderRadius: 20,
		backgroundColor: Colors.pink,
	},
});

export default CourseProgress;
