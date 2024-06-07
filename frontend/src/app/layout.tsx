import Navbar from "@/components/universal/Navbar.tsx";
import { StoreProvider } from "@/lib/StoreProvider.tsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dinder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<StoreProvider>
					<Navbar />
					{children}
				</StoreProvider>
			</body>
		</html>
	);
}
