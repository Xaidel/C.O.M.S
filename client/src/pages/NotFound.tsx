import { CircleArrowLeft, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center bg-gray-main">
      <ShieldAlert size={150} className="m-8" />
      <h1 className="text-4xl">Page not Found!</h1>
      <div
        className="flex justify-center items-center gap-2 mt-3 cursor-pointer text-bg-gray/50 cursor:bg-gray"
        onClick={() => {
          navigate(-1);
        }}
      >
        <CircleArrowLeft size={25} />
        <h2 className="text-2xl">Go Back</h2>
      </div>
    </div>
  );
}
