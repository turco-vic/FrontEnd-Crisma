import "./globals.css";

export const metadata = {
    title: "Crisma Sousas",
    description: "",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
