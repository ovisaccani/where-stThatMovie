import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	getMovieByName: () => Promise<void>;
}

export const SearchInput = ({ value, setValue, getMovieByName }: Props) => {
	return (
		<View style={styles.containerInput}>
			<View style={styles.sectionStyle}>
				<Icon name={"search"} size={25} style={styles.iconStyle} />
				<TextInput
					style={styles.input}
					onChangeText={(value) => {
						setValue(value);
					}}
					value={value}
				/>
				<TouchableOpacity
					onPress={getMovieByName}
					disabled={value.length === 0}
				>
					<Text>Buscar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerInput: {
		width: "100%",
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		marginLeft: 4,
	},
	sectionStyle: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#43434403",
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 4,
		borderColor: "#00386E7D",
		paddingHorizontal: 4,
	},
	iconStyle: {
		alignItems: "center",
		marginRight: 8,
	},
});
