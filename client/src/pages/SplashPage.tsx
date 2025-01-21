import Logo from "@/components/ui/logo";

export default function SplashPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-[#F3F4F6] p-4">
      {/* Centered Logo */}
      <div className="flex-grow flex items-center justify-center">
        <Logo />
      </div>
      {/* Footer */}
      <div className="w-full text-center pb-4">
        <h2 className="text-gray-600 text-xl md:text-2xl">
          University of Nueva Caceres
        </h2>
      </div>
    </main>
  );
}
