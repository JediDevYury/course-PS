import { View, StyleSheet, Text } from 'react-native';
import { User } from '../../../entities/user/model/user.model';
import Avatar from '../../../entities/user/ui/Avatar/Avatar';
import { Colors, Fonts, Gaps } from '../../../shared/tokens';

interface UserMenuProps {
	user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
	return (
		<View style={styles.container}>
			<Avatar image={user?.photo ?? null} />
			<Text style={styles.name}>{user?.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: Gaps.g8,
		marginTop: 30,
		marginBottom: 40,
	},
	name: {
		fontSize: Fonts.f16,
		fontFamily: Fonts.regular,
		color: Colors.white,
	},
});
