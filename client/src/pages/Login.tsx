import Logo from "@/components/ui/logo";
import LoginForm from "@/features/auth/LoginForm";
import { useEffect, useState } from "react";
import SplashPage from "./SplashPage";

export default function Login() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splashShown")
  })

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem("splashShown", "true")
      }, 1700)
      return () => clearTimeout(timer)
    }
  }, [showSplash])

  return (
    <>
      {showSplash ? (<SplashPage />)
        : (< div className="flex bg-white-loginBG w-screen h-screen flex-col md:flex-row">
          <div className="w-full h-full flex-1 flex flex-col items-center justify-end md:block ">
            <Logo />
          </div>
          <div className="flex-1 flex justify-center md:items-center">
            <LoginForm />
          </div>
        </div >
        )}
    </>
  );
};

