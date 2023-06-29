import { AuthenticationContext } from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie, removeCookies } from "cookies-next";
import React from "react";

function useAuth() {
	const { setAuthState } = React.useContext(AuthenticationContext);

	const signin = async (
		{
			email,
			password,
		}: {
			email: string;
			password: string;
		},
		handleClose: () => void
	) => {
		try {
			setAuthState({
				data: null,
				error: null,
				loading: true,
			});
			const response = await axios.post(
				"http://localhost:3000/api/auth/signin",
				{
					email,
					password,
				}
			);
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
			handleClose();
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	const signup = async (
		{
			email,
			password,
			firstName,
			lastName,
			phone,
			city,
		}: {
			email: string;
			password: string;
			firstName: string;
			lastName: string;
			phone: string;
			city: string;
		},
		handleClose: () => void
	) => {
		try {
			setAuthState({
				data: null,
				error: null,
				loading: true,
			});
			const response = await axios.post(
				"http://localhost:3000/api/auth/signup",
				{
					email,
					password,
					firstName,
					lastName,
					phone,
					city,
				}
			);
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
			handleClose();
		} catch (error: any) {
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	const signout = () => {
		deleteCookie("jwt");
		setAuthState({
			data: null,
			error: null,
			loading: false,
		});
	};

	return {
		signin,
		signup,
		signout,
	};
}

export default useAuth;
