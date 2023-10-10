import LoggedHeader from "@/features/home/Components/LoggedHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen items-center ">
      <LoggedHeader />

      <section className=" px-10 flex flex-col justify-center max-w-6xl w-full flex-grow ">
        {children}
      </section>
    </main>
  );
}
