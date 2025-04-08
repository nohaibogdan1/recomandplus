import Header from "@/components/Header";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}
