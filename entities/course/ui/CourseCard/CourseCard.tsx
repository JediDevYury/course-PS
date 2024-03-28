import { View, StyleSheet, Image, Text, Linking } from 'react-native';
import { StudentCourseDescription } from '../../model/course.model';
import { Colors, Fonts, Gaps, Radius } from '../../../../shared/tokens';
import { Button } from '../../../../shared/Button/Button';
import { Chip } from '../../../../shared/Chip/Chip';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import CourseProgress from '../CourseProgress/CourseProgress';

const CourseCard = ({
	image,
	shortTitle,
	courseOnDirection,
	id,
	tariffs,
}: StudentCourseDescription) => {
	return (
		<View style={styles.card}>
			<Image
				source={{
					uri: image,
				}}
				style={styles.image}
				height={200}
			/>
			<View style={styles.header}>
				<CourseProgress totalLessons={120} lessonsPassed={60} />
				<Text style={styles.title}>{shortTitle}</Text>
				<View style={styles.chips}>
					{courseOnDirection.length > 0 &&
						courseOnDirection.map((c) => <Chip text={c.direction.name} />)}
				</View>
				<MaskedView
					maskElement={<Text style={styles.tariff}>Тариф &laquo;{tariffs[0].name}&raquo;</Text>}
				>
					<LinearGradient
						colors={['#D77BE5', '#6C38CC']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
					>
						<Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
							Тариф &laquo;{tariffs[0].name}&raquo;
						</Text>
					</LinearGradient>
				</MaskedView>
			</View>
			<View style={styles.footer}>
				<Button
					text="Купить"
					onPress={() => {
						Linking.openURL(`https://app.purpleschool.ru/course/${id}`);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		borderRadius: Radius.r10,
		backgroundColor: Colors.blackLight,
	},
	image: {
		borderRadius: Radius.r10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		fontSize: Fonts.f21,
		color: Colors.white,
		fontFamily: Fonts.semibold,
		marginBottom: 12,
	},
	chips: {
		flexDirection: 'row',
		gap: Gaps.g10,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 18,
	},
	footer: {
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	tariff: {
		marginTop: 10,
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
	},
	tariffWithOpacity: {
		opacity: 0,
	},
});

export default CourseCard;
