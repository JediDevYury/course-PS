import React, { useEffect } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors } from '../../../../shared/tokens';
import { CustomLink } from '../../../../shared/CustomLink/CustomLink';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { useAtom, useSetAtom } from 'jotai';

import CoursesIcon from '../../../../assets/icons/menu/courses';
import ProfileIcon from '../../../../assets/icons/menu/profile';
import { MenuItem } from '../../../../entities/layout/ui/MenuItem/MenuItems';
import { logoutAtom } from '../../../../entities/auth/model/auth.state';
import { loadProfileAtom } from '../../../../entities/user/model/user.state';
import { UserMenu } from '../../../user/UserMenu/UserMenu';

const MENU = [
	{ text: 'Courses', icon: <CoursesIcon />, path: 'index' },
	{ text: 'Profile', icon: <ProfileIcon />, path: 'profile' },
];

const CustomDrawer = (props: DrawerContentComponentProps) => {
	const logout = useSetAtom(logoutAtom);
	const [profile, loadProfile] = useAtom(loadProfileAtom);

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<UserMenu user={profile.profile} />
				{MENU.map((menu) => (
					<MenuItem key={menu.path} {...menu} drawer={props} />
				))}
			</View>
			<View style={styles.footer}>
				<CustomLink text="Exit" onPress={() => logout()} href={'/login'} />
				<Image
					style={styles.logo}
					source={require('../../../../assets/logo.png')}
					resizeMode="contain"
				/>
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	content: {
		flex: 1,
	},
	footer: {
		gap: 50,
		alignItems: 'center',
		marginBottom: 40,
	},
	logo: {
		width: 160,
	},
});

export default CustomDrawer;
