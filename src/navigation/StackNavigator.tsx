import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { Home } from "../screens/Home";
import { CreateAccount } from "../screens/CreateAccount";
import { MovieDetail } from "../screens/MovieDetail";
import { MovieDBMoviesResponse, Movie } from "../interfaces/movieInterface";

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams = {
	Login: undefined;
	Home: undefined;
	CreateAccount: undefined;
	MovieDetail: Movie;
};

export const StackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
			<Stack.Screen name="MovieDetail" component={MovieDetail} />
		</Stack.Navigator>
	);
};
