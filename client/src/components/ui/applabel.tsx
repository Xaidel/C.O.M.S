import { Separator } from "./separator";
import { useQueryClient } from "@tanstack/react-query";

interface AppLabelProps {
  currentPage: string;
}
interface Department {
  Dept_Name: string;
  Dept_Code: string;
  ID: number;
}

interface RoleInfo {
  Department: Department;
  DepartmentID: number;
  ID: number;
}

interface UserInfo {
  UserID: string;
  Firstname: string;
  MiddleName: string;
  Lastname: string;
}

interface currentUser {
  role: string;
  role_info: RoleInfo;
  user_info: UserInfo;
  UserID: string;
}
const AppLabel: React.FC<AppLabelProps> = ({ currentPage }) => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);

  if (!currentUser) return null;
  const { role, role_info, user_info } = currentUser;
  return (
    <>
      <div className="flex flex-col gap-2 min-w-100">
        <div className="font-sans ml-[5rem] flex justify-between">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-4xl font-extrabold text-red">{currentPage}</h1>
            <p>{role_info.Department.Dept_Name}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-bold">{`${user_info.Lastname}, ${user_info.Firstname} ${user_info.MiddleName}`}</p>
            <p>{role}</p>
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="mx-[5rem] h-0.5 w-[calc(100%-5rem)] bg-gray/50"
        />
      </div>
    </>
  );
};

export default AppLabel;

