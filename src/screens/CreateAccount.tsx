import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { InputLogin } from "../components/InputLogin";
import { auth } from "../../firebase";

interface Props extends StackScreenProps<any, any> {}

export const CreateAccount = ({ navigation }: Props) => {
	const [usuario, setusuario] = useState("");
	const [contrasena, setContrasena] = useState("");
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const register = () => {
		if (usuario === "" || contrasena === "") {
			setError("Error. Debe completar ámbos campos");
			setSuccessMessage("");
		} else {
			auth.createUserWithEmailAndPassword(usuario, contrasena)
				.then((userCredentials: any) => {
					setError("");
					setSuccessMessage(
						"Usuario registrado exitosamente! En 3 segundos será redireccionado a la Home"
					);
					setTimeout(() => {
						navigation.navigate("Home");
					}, 3000);
				})
				.catch((error: any) => {
					setError(error.message);
					setSuccessMessage("");
				});
		}
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
			}}
		>
			<View style={styles.container}>
				<InputLogin
					title="Email"
					value={usuario}
					setValue={setusuario}
				/>
				<InputLogin
					title="Contraseña"
					value={contrasena}
					setValue={setContrasena}
					isPassword
				/>
				{error !== "" ? (
					<View style={{ width: "100%", marginTop: 4 }}>
						<Text style={styles.fontError}>{error}</Text>
					</View>
				) : null}
				{successMessage !== "" ? (
					<View style={{ width: "100%", marginTop: 4 }}>
						<Text style={styles.fontSuccess}>{successMessage}</Text>
					</View>
				) : null}
				<TouchableOpacity
					style={styles.botonAceptar}
					onPress={register}
				>
					<Text style={styles.botonTexto}>REGISTRAR</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "70%",
		backgroundColor: "#F3F1F1",
		marginTop: 24,
	},
	containerInput: {
		width: "100%",
		marginVertical: 12,
	},
	input: {
		height: 38,
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 4,
	},
	fontOlvidaste: {
		color: "#00386E",
	},
	fontError: {
		color: "red",
	},
	fontSuccess: {
		color: "green",
	},
	botonAceptar: {
		marginTop: 45,
		width: "100%",
		backgroundColor: "#00386E",
		alignItems: "center",
		height: 35,
		justifyContent: "center",
		borderRadius: 4,
		borderWidth: 1,
	},
	botonTexto: {
		color: "white",
		fontWeight: "bold",
	},
});
