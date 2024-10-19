import logo from "../../assets/unc_logo.svg";
function Logo() {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:h-full w-full">
        <div className="flex items-center justify-center gap-1.5">
          <div className="h-[15rem] w-[15rem] flex flex-row">
            <img src={logo} alt="CSPROBE Logo" />
          </div>
          <div>
            <h1 className="font-bold text-red text-7xl">COMS</h1>
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
