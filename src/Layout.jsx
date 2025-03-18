import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar"; 
import { SidebarProvider } from "@/components/ui/sidebar"; 

const Layout = () => {
  return (
    <SidebarProvider>
        <AppSidebar />       
          <Outlet />
    </SidebarProvider>
  );
};

export default Layout;

