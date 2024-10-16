import Logo from "@/components/ui/logo";
import LoginForm from "@/features/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex bg-white-loginBG w-screen h-screen flex-col md:flex-row">
      <div className="w-full h-full flex-1 flex flex-col items-center justify-end md:block ">
        <Logo />
      </div>
      <div className="flex-1 flex justify-center md:items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
