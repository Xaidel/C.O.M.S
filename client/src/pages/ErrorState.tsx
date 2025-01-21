import { FileX } from "lucide-react";

export default function ErrorState() {
  return (
    <div className="fixed inset-0 min-h-screen min-w-screen bg-[#F3F4F6]  flex flex-col justify-between items-center p-4">
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 -m-6 bg-red-50 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
          <div className="relative p-6">
            <FileX className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-gray-900">
          500 - Server error
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Oops something went wrong. Try to refresh this page or feel free to
          contact us if the problem persists.
        </p>
      </div>
    </div>
  );
}
