import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { InputLogin } from "../components/InputLogin";
import { AuthContext } from "../context/authContext/AuthContext";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends StackScreenProps<any, any> {}

export const Login = ({ navigation }: Props) => {
	const [usuario, setusuario] = useState("");
	const [contrasena, setContrasena] = useState("");
	const [error, setError] = useState("");
	const { signIn } = useContext(AuthContext);

	const validate = async () => {
		if (usuario === "" || contrasena === "") {
			setError("Error. Debe completar ámbos campos");
		} else {
			signIn;
			auth.signInWithEmailAndPassword(usuario, contrasena)
				.then(async (userCredentials: any) => {
					const user = userCredentials;
					await AsyncStorage.setItem("token", user.user?.uid);
					if (user) {
						signIn();
						navigation.navigate("Home");
					} else {
						setError("Error. Usuario o contraseña invalidos.");
					}
				})
				.catch(() =>
					setError("Error. Usuario o contraseña invalidos.")
				);
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
				<View style={styles.containerInput}>
					<Text style={styles.fontOlvidaste}>
						¿Olvidaste tu contraseña?
					</Text>
				</View>
				<TouchableOpacity
					style={styles.botonAceptar}
					onPress={validate}
				>
					<Text style={styles.botonTexto}>ACEPTAR</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						justifyContent: "center",
						marginTop: 16,
					}}
					onPress={() => navigation.navigate("CreateAccount")}
				>
					<Text style={styles.fontOlvidaste}>
						¿No tenes cuenta? Registrate acá
					</Text>
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
