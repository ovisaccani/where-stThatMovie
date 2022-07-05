import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
	navigation: StackNavigationProp<any, any, undefined>;
}
export const Appbar = ({ navigation }: Props) => {
	const { logout } = useContext(AuthContext);
	const logOut = () => {
		logout();
		navigation.navigate("Login");
	};

	return (
		<View style={styles.containerInput}>
			<Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
				Where's that movie
			</Text>
			<TouchableOpacity style={{ paddingHorizontal: 4 }} onPress={logOut}>
				<Icon name={"log-out-outline"} size={25} />
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	containerInput: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 8,
	},
});
