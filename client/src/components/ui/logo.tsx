import logo from "../../assets/unc_logo.svg";
import { Separator } from "./separator";

function Logo() {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:h-full w-full">
        <div className="flex items-center justify-center gap-1.5">
          <div className="h-[15rem] w-[15rem] flex flex-row border-gray/60 ">
            <img src={logo} alt="CSPROBE Logo" />
          </div>
          <Separator orientation="vertical" className="m-4 w-0.5 bg-gray/50" />
          <div className="ml-3">
            <h1 className="font-bold text-red text-7xl">C.O.M.S</h1>
            <p className="font-light text-gray text-4xl">
              Course Outcome
              <br />
              Management System
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logo;
