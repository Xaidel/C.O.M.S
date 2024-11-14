import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "./SidebarLayout";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="absolute"
      >
        <SidebarLayout />
      </div>
      <div className={`ml-[5rem] h-screen w-screen p-8 bg-gray-main`}>
        <Outlet />
        {open && (
          <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-300 ease-in-out" />
        )}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
