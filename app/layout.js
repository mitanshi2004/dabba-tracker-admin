import "./globals.css";

export const metadata = {
  title: "Dabba Tracker",
  description: "Track your dabba delivery easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center font-bold">
          Dabba Tracker
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-10">
          © 2025 Dabba Tracker
        </footer>
      </body>
    </html>
  );
}
