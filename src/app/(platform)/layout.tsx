export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-regal-orange text-white font-bold text-md text-center py-1.5">Recomanda si castiga!</div>
      {children}
    </div>
  );
}
