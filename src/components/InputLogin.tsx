import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
	title: string;
	isPassword?: boolean;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputLogin = ({
	title,
	isPassword = false,
	value,
	setValue,
}: Props) => {
	const [showPassword, setShowPassword] = useState(isPassword);

	return (
		<View style={styles.containerInput}>
			<Text style={styles.fontColor}>{title}</Text>
			<View style={styles.sectionStyle}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => {
						setValue(value);
					}}
					value={value}
					secureTextEntry={showPassword}
				/>
				{isPassword ? (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
					>
						<Icon
							name={
								showPassword ? "eye-outline" : "eye-off-outline"
							}
							size={25}
							style={styles.iconStyle}
						/>
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerInput: {
		width: "100%",
	},
	input: {
		flex: 1,
		marginLeft: 4,
	},
	fontColor: {
		color: "#00386E",
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
	},
	iconStyle: {
		alignItems: "center",
		marginRight: 8,
	},
});
