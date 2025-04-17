import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar"; 
import { SidebarProvider } from "@/components/ui/sidebar"; 
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
  return (
    <SidebarProvider>
        <AppSidebar />       
          <Outlet />
          <Toaster />
    </SidebarProvider>
  );
};

export default Layout;

