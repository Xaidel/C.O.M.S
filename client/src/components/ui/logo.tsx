import logo from "../../assets/csprobe_logo_small.svg";
function Logo() {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:h-full w-full">
        <div className="h-44 w-44 flex flex-row">
          <img src={logo} alt="CSPROBE Logo" />
        </div>
        <p className="font-sans text-xs text-gray-500 md:text-black">
          University of Nueva Caceres
        </p>
      </div>
    </>
  );
}

export default Logo;
