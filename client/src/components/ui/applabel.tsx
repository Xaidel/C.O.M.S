import { Separator } from "./separator";
import { useUser } from "@/features/auth/useUser";

interface AppLabelProps {
  currentPage: string;
}
const AppLabel: React.FC<AppLabelProps> = ({ currentPage }) => {
  const { currentUser } = useUser();

  if (!currentUser) return null;
  const { role, role_info } = currentUser;
  const { User } = role_info;
  let label;
  if (role === "Student" || role === "Program Head") {
    const { Programs } = role_info;
    label = Programs?.[0].Program_Name; //temporary
  } else {
    const { Department } = role_info;
    label = Department.Dept_Name;
  }
  return (
    <>
      <div className="flex flex-col gap-2 min-w-100 mb-9">
        <div className="font-sans  flex justify-between">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-4xl font-extrabold text-red">{currentPage}</h1>
            <p>{label}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-bold text-xl">{`${User.Lastname}, ${User.Firstname} ${User.Middlename}`}</p>
            <p>{role}</p>
          </div>
        </div>
        <Separator orientation="horizontal" className="h-0.5 bg-gray/50" />
      </div>
    </>
  );
};

export default AppLabel;
