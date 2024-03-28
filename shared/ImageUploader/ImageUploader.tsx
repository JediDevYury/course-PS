import React from 'react';

import { Text, View, StyleSheet, Alert, Pressable } from 'react-native';
import {
	launchImageLibraryAsync,
	MediaTypeOptions,
	PermissionStatus,
	useMediaLibraryPermissions,
} from 'expo-image-picker';
import UploadIcon from '../../assets/icons/menu/upload-icon';
import { Colors, Fonts, Gaps, Radius } from '../tokens';
import FormData from 'form-data';
import axios from 'axios';
import { FILE_API } from '../api';
import { ImageUploaderInterface } from './imageUploader.interface';

type ImageUploaderProps = {
	onUpload: (uri: string) => void;
	onError?: (error: string) => void;
};

const ImageUploader = ({ onUpload, onError }: ImageUploaderProps) => {
	const [libraryPermissions, requestLibraryPermission] = useMediaLibraryPermissions();

	const verifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermission();
			return res.granted;
		}
		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Permission denied',
				'You need to grant media library permissions to use this feature',
			);
			return false;
		}

		return true;
	};

	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (!result.assets) {
			return null;
		}

		return result.assets[0];
	};

	// await uploadToServer(result.assets[0].uri, result.assets[0].fileName ?? '');
	const uploadToServer = async (uri: string, name: string) => {
		const formData = new FormData();

		formData.append('files', {
			uri,
			name,
			type: 'image/jpeg',
		});

		try {
			const { data } = await axios.post<ImageUploaderInterface>(FILE_API.uploadImage, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			return data.urls.original;
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}

			return null;
		}
	};

	const upload = async () => {
		const isPermissionGranted = await verifyMediaPermissions();

		if (!isPermissionGranted) {
			onError?.('Permission denied');
			return;
		}

		const asset = await pickImage();

		if (!asset) {
			onError?.('Image is not selected');
			return;
		}

		const uploadedUri = await uploadToServer(asset.uri, asset.fileName ?? '');

		if (!uploadedUri) {
			onError?.('Image is not uploaded');
			return;
		}

		onUpload(uploadedUri);
	};

	return (
		<Pressable onPress={upload} style={styles.pressable}>
			<View style={styles.container}>
				<UploadIcon />
				<Text style={styles.text}>Upload image</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressable: {
		flex: 1,
	},
	container: {
		// alignSelf: 'stretch',
		flexDirection: 'row',
		gap: Gaps.g8,
		backgroundColor: Colors.violetDark,
		borderRadius: Radius.r10,
		paddingHorizontal: 20,
		paddingVertical: 17,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: Fonts.f14,
		fontFamily: Fonts.regular,
		color: Colors.white,
	},
});

export default ImageUploader;
