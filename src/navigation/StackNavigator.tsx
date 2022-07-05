import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { Home } from "../screens/Home";
import { CreateAccount } from "../screens/CreateAccount";
import { MovieDetail } from "../screens/MovieDetail";
import { Movie } from "../interfaces/movieInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Appbar } from "../components/Appbar";
import { screensEnabled } from "react-native-screens";

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams = {
	Login: undefined;
	Home: undefined;
	CreateAccount: undefined;
	MovieDetail: Movie;
};

export const StackNavigator = () => {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function checkTokensAndSetNavigation() {
			const token = await AsyncStorage.getItem("token");
			if (token === null || token === "") {
				setIsSignedIn(false);
				setLoading(false);
			} else {
				setIsSignedIn(true);
				setLoading(false);
			}
		}
		checkTokensAndSetNavigation();
	}, []);

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignContent: "center",
					marginTop: 8,
				}}
			></View>
		);
	}
	if (isSignedIn) {
		return (
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="MovieDetail" component={MovieDetail} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="CreateAccount" component={CreateAccount} />
			</Stack.Navigator>
		);
	} else {
		return (
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="MovieDetail" component={MovieDetail} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="CreateAccount" component={CreateAccount} />
			</Stack.Navigator>
		);
	}
};
