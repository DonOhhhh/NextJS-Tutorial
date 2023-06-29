"use client";

import { IUser } from "@/app/components/AuthModal";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";

interface IState {
	loading: boolean;
	error: string | null;
	data: IUser | null;
}

interface IAuthState extends IState {
	setAuthState: React.Dispatch<React.SetStateAction<IState>>;
}

export const AuthenticationContext = createContext<IAuthState>({
	loading: true,
	error: null,
	data: null,
	setAuthState: () => {},
});

function AuthContext({ children }: { children: React.ReactNode }) {
	const [authState, setAuthState] = useState<IState>({
		loading: true,
		data: null,
		error: null,
	});

	const fetchUser = async () => {
		try {
			const jwt = getCookie("jwt");
			if (!jwt) {
				return setAuthState({
					loading: false,
					data: null,
					error: null,
				});
			}

			const response = await axios.get(
				"http://localhost:3000/api/auth/me",
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);

			axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

			setAuthState((_) => ({
				data: response.data,
				error: null,
				loading: false,
			}));
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				...authState,
				setAuthState,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
}

export default AuthContext;
