import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

import { Colors } from "../../constants/colors";

function ImagePicker() {
	const imageObject = {
		assets: [
			{
				assetId: null,
				base64: null,
				duration: null,
				exif: null,
				fileName: null,
				filesize: null,
				height: 540,
				mimeType: "image/jpeg",
				rotation: null,
				type: "image",
				uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fusing-native-device-features-demo-app-1b2956ed-4325-4720-aedd-4586fea925c9/ImagePicker/05efd3c8-d60f-475e-b896-ca44016685a6.jpeg",
				width: 960,
			},
		],
		canceled: false,
	};
	const [pickedImage, setPickedImage] = useState();

	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	async function verifyPermissions() {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant camera permissions to use this app."
			);
			return false;
		}

		return true;
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		console.log(image.assets[0].uri, "image object");
		setPickedImage(image.assets[0].uri);
	}

	let imagePreview = <Text>No image taken yet.</Text>;

	if (pickedImage) {
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<Button title="Take Image" onPress={takeImageHandler} />
		</View>
	);
}

export default ImagePicker;

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 4,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
