import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
	const [fetchedPlace, setFetchedPlace] = useState();

	function showOnMapHandler() {
		navigation.navigate("Map", {
			initialLat: fetchedPlace.location.lat,
			initialLng: fetchedPlace.location.lng,
		});
	}

	const selectedPlaceId = route.params.placeId;

	useEffect(() => {
		async function loadPlaceData() {
			const place = await fetchPlaceDetails(selectedPlaceId);
			setFetchedPlace(place);
			//doing this in useEffect and not useLayoutEffect becasue when we transition to this screen we won't have fetched the place yet. So our title will change in the UI
			navigation.setOptions({
				title: place.title,
			});
		}

		loadPlaceData();
	}, [selectedPlaceId]);

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place data...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{fetchedPlace.address}</Text>
				</View>
				<OutlineButton icon="map" onPress={showOnMapHandler}>
					View on Map
				</OutlineButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		height: "35%",
		minHeight: 300,
		width: "100%",
	},
	locationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary500,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default PlaceDetails;
