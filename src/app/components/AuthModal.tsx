"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export interface IUser {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	city: string;
	password: string;
}

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { signin, signup } = useAuth();
	const { loading, data, error } = React.useContext(AuthenticationContext);

	const renderContent = (signinContent: String, signupContent: string) => {
		return isSignin ? signinContent : signupContent;
	};

	const [inputs, setInputs] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		city: "",
		password: "",
	});

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const [disabled, setDisabled] = React.useState(true);

	React.useEffect(() => {
		if (isSignin) {
			if (inputs.password && inputs.email) {
				return setDisabled(false);
			}
		} else {
			if (
				Object.entries(inputs)
					.map((e) => e[1])
					.every((e) => e)
			) {
				return setDisabled(false);
			}
		}
		setDisabled(true);
	}, [inputs]);

	const handleClick = () => {
		if (isSignin) {
			signin(
				{ email: inputs.email, password: inputs.password },
				handleClose
			);
		} else {
			signup(inputs, handleClose);
		}
	};

	return (
		<div>
			<button
				className={`${renderContent(
					"bg-blue-400 text-white",
					""
				)} border p-1 px-4 rounded mr-3`}
				onClick={handleOpen}
			>
				{renderContent("Sign in", "Sign up")}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{loading ? (
						<div className="px-2 py-24 h-[600px] flex justify-center">
							<CircularProgress />
						</div>
					) : (
						<div className="p-2 h-[600px]">
							{error ? (
								<Alert severity="error" className="mb-4">
									{error}
								</Alert>
							) : null}
							<div className="uppercase font-bold text-center pb-2 border-b mb-2">
								<p className="text-sm">
									{renderContent("Sign In", "Create Account")}
								</p>
							</div>
							<div className="m-auto ">
								<h2 className="text-2xl font-light text-center">
									{renderContent(
										"Log Into Your Account",
										"Create Your OpenTable Account"
									)}
								</h2>
								<AuthModalInputs
									inputs={inputs}
									handleChangeInput={handleChangeInput}
									isSignIn={isSignin}
								/>
								<button
									className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
									disabled={disabled}
									onClick={handleClick}
								>
									{renderContent("Sign In", "Create Account")}
								</button>
							</div>
						</div>
					)}
				</Box>
			</Modal>
		</div>
	);
}
