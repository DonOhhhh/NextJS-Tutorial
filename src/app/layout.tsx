import AuthContext from "@/context/AuthContext";
import NavBar from "./components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "OpenTable",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<title>OpenTable</title>
				<link rel="icon" href="./favicon.ico" sizes="any" />
			</Head>
			<body className={inter.className}>
				<main className="bg-gray-100 min-h-screen w-screen">
					<AuthContext>
						<main className="max-w-screen-2xl m-auto bg-white">
							<NavBar />
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	);
}
