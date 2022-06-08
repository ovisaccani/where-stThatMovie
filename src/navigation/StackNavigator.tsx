import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/Login";
import { Home } from "../screens/Home";
import { CreateAccount } from "../screens/CreateAccount";

const Stack = createStackNavigator();

export const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="CreateAccount" component={CreateAccount} />
		</Stack.Navigator>
	);
};