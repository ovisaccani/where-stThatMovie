import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigator } from "./src/navigation/StackNavigator";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/authContext/AuthContext";

const App = () => {
	return (
		<NavigationContainer>
			<AppState>
				<StackNavigator />
			</AppState>
		</NavigationContainer>
	);
};

const AppState = ({ children }: any) => {
	return <AuthProvider>{children}</AuthProvider>;
};

const styles = StyleSheet.create({});

export default App;
