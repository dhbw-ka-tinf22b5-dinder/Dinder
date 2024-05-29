import type { Metadata } from "next";
import "../globals.css";
import NavBarStartComponent from "@/components/universal/navBar_start.component.tsx";

export const metadata: Metadata = {
	title: "Dinder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<NavBarStartComponent />
			{children}
		</>
	);
}
