import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";

// Definir cómo luce, qué información tendré aquí
export interface AuthState {
	isLoggedIn: boolean;
}

// Estado inicial
export const authInitialState: AuthState = {
	isLoggedIn: false,
};

// Lo usaremos para decirle a React cómo luce y qué expone el context
export interface AuthContextProps {
	authState: AuthState;
	signIn: () => void;
	logout: () => void;
}

// Crear el contexto
export const AuthContext = createContext({} as AuthContextProps);

// Componente proveedor del estado
export const AuthProvider = ({ children }: any) => {
	const [authState, dispatch] = useReducer(authReducer, authInitialState);

	const signIn = () => {
		dispatch({ type: "signIn" });
	};

	const logout = async () => {
		await AsyncStorage.setItem("token", "");
		console.log("logout")

		dispatch({ type: "logout" });
	};

	return (
		<AuthContext.Provider
			value={{
				authState,
				signIn,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
