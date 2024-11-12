import logo from "../assets/unc_logo.svg";
import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroup,
  useSidebar,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import {
  ASSISTANT_DEAN_NAV_ITEMS,
  DEAN_NAV_ITEMS,
  FACULTY_NAV_ITEMS,
  PROGRAM_HEAD_NAV_ITEMS,
  STUDENT_NAV_ITEMS,
} from "@/types/NavItems";
import { useQueryClient } from "@tanstack/react-query";
import { currentUser } from "@/types/Interface";

export function SidebarLayout() {
  const { state } = useSidebar();
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentPath = location.pathname;
  let navItems = DEAN_NAV_ITEMS;

  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  if (!currentUser) return null;
  const { role } = currentUser;
  if (role === "Dean") navItems = DEAN_NAV_ITEMS;
  else if (role === "Assistant Dean") navItems = ASSISTANT_DEAN_NAV_ITEMS;
  else if (role === "Program Head") navItems = PROGRAM_HEAD_NAV_ITEMS;
  else if (role === "Faculty") navItems = FACULTY_NAV_ITEMS;
  else navItems = STUDENT_NAV_ITEMS;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <div className="flex justify-center items-center p-2 gap-1">
          <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem]">
            <img
              src={logo}
              alt="UNC logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className={`whitespace-nowrap mr-4 transition-all duration-200 leading-4 flex flex-col gap-1 ${state === "collapsed" && "hidden"}`}
          >
            <h1 className="font-bold text-red text-[1.5rem] ">C.O.M.S</h1>
            <p className="font-light text-gray text-[0.7rem] ">
              Course Outcome
              <span className="block leading-[0.52rem] ">
                Management System
              </span>
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem
                key={item.path}
                className="flex justify-center items-center p-0"
              >
                <SidebarMenuButton
                  asChild
                  className={`${state === "collapsed" ? "flex justify-center items-center" : "ml-3"} `}
                  size="lg"
                  isActive={currentPath === item.path}
                >
                  <NavLink to={item.path}>
                    <div>
                      <item.icon />
                    </div>
                    <span
                      className={`group-data-[collapsible=icon]:hidden ${item.label === "Assessment and Evaluation Plan" ? "whitespace-normal" : ""}`}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex justify-center items-center py-7">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center items-center p-0">
            <SidebarMenuButton
              asChild
              className={`${state === "collapsed" ? "flex justify-center items-center" : "ml-3"}`}
              size="lg"
            >
              <NavLink to="/login">
                <div className="text-red">
                  <LogOut />
                </div>
                <span className="group-data-[collapsible=icon]:hidden text-red">
                  Logout Account
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
