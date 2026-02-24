import "./globals.css";

export const metadata = {
  title: "Password Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <div className="bg-animation">
          <span></span>
          <span></span>
        </div>
        {children}
      </body>
    </html>
  );
}
