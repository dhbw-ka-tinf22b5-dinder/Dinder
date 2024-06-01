import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/lib/StoreProvider.tsx";
import "./globals.css";
import Navbar from "@/components/universal/Navbar.tsx";

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
				<StoreProvider >

                    <Navbar />
                    {children}
                </StoreProvider>
			</body>
		</html>
	);
}
