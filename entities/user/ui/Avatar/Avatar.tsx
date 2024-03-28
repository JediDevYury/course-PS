import React from 'react';

import { StyleSheet, Image } from 'react-native';

interface AvatarProps {
	image: string | null;
}
const Avatar = ({ image }: AvatarProps) => {
	if (!image) {
		return;
	}

	return (
		<>
			{image ? (
				<Image
					style={styles.image}
					source={{
						uri: image,
					}}
				/>
			) : (
				<Image source={require('../../../../assets/images/avatar.png')} />
			)}
		</>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
});

export default Avatar;
