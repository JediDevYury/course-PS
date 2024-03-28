import { View, StyleSheet } from 'react-native';
import ImageUploader from '../../shared/ImageUploader/ImageUploader';
import { useEffect, useState } from 'react';
import { Gaps } from '../../shared/tokens';
import Avatar from '../../entities/user/ui/Avatar/Avatar';
import { updateProfileAtom } from '../../entities/user/model/user.state';
import { useAtom } from 'jotai';
import { Button } from '../../shared/Button/Button';
import * as Sharing from 'expo-sharing';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [profile, updateProfile] = useAtom(updateProfileAtom);
	const handleImageError = (error: string) => {
		console.log(error);
	};

	const shareProfile = async () => {
		const isSharingAvailable = await Sharing.isAvailableAsync();

		if (!isSharingAvailable) {
			return;
		}

		await Sharing.shareAsync('http://jsonplaceholder.typicode.com', {
			mimeType: 'text/plain',
			dialogTitle: 'Share your profile',
		});
	};

	const submitProfile = async () => {
		if (!image) {
			return;
		}

		await updateProfile({ photo: image });
	};

	useEffect(() => {
		if (profile && profile.profile?.photo) {
			setImage(profile.profile.photo);
		}
	}, [profile]);

	return (
		<>
			<View style={styles.container}>
				<Avatar image={image} />
				<ImageUploader onUpload={setImage} onError={handleImageError} />
			</View>
			<View style={styles.actions}>
				<Button text="Save" onPress={submitProfile} />
				<Button text="Share" onPress={shareProfile} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: Gaps.g20,
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	actions: {
		flexGrow: 1,
		gap: Gaps.g20,
		paddingHorizontal: 30,
	},
});
