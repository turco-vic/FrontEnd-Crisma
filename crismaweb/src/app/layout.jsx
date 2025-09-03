import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
    title: "Crisma Sousas",
    description: "",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
