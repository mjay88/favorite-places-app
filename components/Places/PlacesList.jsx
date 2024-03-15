import { View, Text, FlatList, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

const PlacesList = ({ places }) => {
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
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <PlaceItem place={item} />}
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
});

export default PlacesList;
