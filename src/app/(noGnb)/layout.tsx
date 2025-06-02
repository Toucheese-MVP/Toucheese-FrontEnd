export default function WithGnbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="md:relative md:min-h-screen h-auto max-w-[var(--max-width)] mx-auto pt-16 pb-8 px-4 md:shadow-md">
      {children}
    </main>
  );
}
