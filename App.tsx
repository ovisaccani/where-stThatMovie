import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigator } from "./src/navigation/StackNavigator";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/authContext/AuthContext";
import { PeliculasProvider } from "./src/context/peliculasContext/PeliculasContext";

const AppState = ({ children }: any) => {
	return (
		<AuthProvider>
			<PeliculasProvider>{children}</PeliculasProvider>
		</AuthProvider>
	);
};
const App = () => {
	return (
		<NavigationContainer>
			<AppState>
				<StackNavigator />
			</AppState>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default App;
