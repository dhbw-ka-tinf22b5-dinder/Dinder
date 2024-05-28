import type { Metadata } from "next";
import "../globals.css";
import NavBarAppFunctionalityComponent from "@/components/universal/navBar_appFunctionality.component.tsx";

export const metadata: Metadata = {
	title: "Dinder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
            <NavBarAppFunctionalityComponent/>
            {children}
        </>
	);
}
