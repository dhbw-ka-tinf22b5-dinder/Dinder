import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {StoreProvider} from "@/lib/StoreProvider.tsx";
import "./globals.css";
import NavBarComponent from "@/components/universal/navBar.component.tsx";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Dinder"
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StoreProvider>
            <NavBarComponent/>
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
