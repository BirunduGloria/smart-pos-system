// app/layout.js
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Smart POS System',
  description: 'Next.js + Tailwind Smart POS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
