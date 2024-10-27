import logo from "../assets/unc_logo.svg";
import {
  LayoutDashboard,
  UserRoundPlus,
  FileCheck2,
  LogOut,
} from "lucide-react";
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

export function SidebarLayout() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
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
            <SidebarMenuItem className="flex justify-center items-center p-0">
              <SidebarMenuButton
                asChild
                className={`${state === "collapsed" ? "flex justify-center items-center" : "ml-3"} `}
                size="lg"
                isActive={currentPath === "/dashboard"}
              >
                <NavLink to="dashboard">
                  <div>
                    <LayoutDashboard />
                  </div>
                  <span className="group-data-[collapsible=icon]:hidden ">
                    Dashboard
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex justify-center items-center p-0">
              <SidebarMenuButton
                asChild
                className={`${state === "collapsed" ? "flex justify-center items-center" : "ml-3"} `}
                size="lg"
                isActive={currentPath === "/teaching-assignment"}
              >
                <NavLink to="teaching-assignment">
                  <div>
                    <UserRoundPlus />
                  </div>
                  <span className="group-data-[collapsible=icon]:hidden truncate">
                    Teaching Assignment
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="flex justify-center items-center p-0">
              <SidebarMenuButton
                asChild
                className={`${state === "collapsed" ? "flex justify-center items-center" : "ml-3"}`}
                size="lg"
                isActive={currentPath === "/coaep"}
              >
                <NavLink to="coaep">
                  <div>
                    <FileCheck2 />
                  </div>
                  <span
                    className={`transition-all duration-1 whitespace-normal ${state === "collapsed" && "hidden"}`}
                  >
                    Assessment and{"\n"}Evaluation Plan
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
