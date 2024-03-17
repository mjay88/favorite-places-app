import { View, Text, FlatList, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
	const navigation = useNavigation();

	function selectPlaceHandler(id) {
		navigation.navigate("PlaceDetails", {
			placeId: id,
		});
	}
	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places added yet - start adding some!
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
		/>
	);
};

const styles = StyleSheet.create({
	fallbackContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},

	fallbackText: {
		fontSize: 16,
		color: Colors.primary200,
	},
	list: {
		margin: 24,
	},
});

export default PlacesList;
