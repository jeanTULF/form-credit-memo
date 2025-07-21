import { Sidebar, 
SidebarContent, 
SidebarMenu, 
SidebarMenuItem, 
SidebarMenuButton, 
SidebarHeader, 
SidebarFooter } 
from "@/components/ui/sidebar";
import { FileText, FileUp, HandCoins, Home, LogOut, NotepadText, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useActivitiesStore } from "@/store/store";
import { Button } from "./ui/button";

const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "New Activity (JMA)",
      url: "/new-activity",
      icon: NotepadText
    },
    {
      title: "Apply payment",
      url: "/payments",
      icon: HandCoins
    },
    {
      title: "Upload file",
      url: "/upload-file",
      icon: FileUp,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
    },
  ]

const AppSidebar = () => {
  const location = useLocation(); 
  const pathname = location.pathname;

  const handleClear = () => {
    useActivitiesStore.persist.clearStorage();
    console.log("✅ Datos borrados del almacenamiento persistente.");
    alert("Datos borrados correctamente");
    window.location.reload();
    };



  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-4">
          <div className="flex items-center justify-center w-full">
            <img src="/VM-LOGO-PS.png" width={50} height={50} />
            <span className="ml-2 text-xl font-bold">Vm Dashoard</span>
          </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='px-3.5'>
          {items.map((item) => {
              const isActive = item.url === pathname || pathname.startsWith(`${item.url}/`)
              return (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton asChild /* isActive={} */ className={cn('transition-all duration-200 text-gray-600 hover:text-[#f59e0b] hover:bg-gray-50 text-base', {'text-amber-500 bg-amber-50 hover:bg-amber-100' : isActive})}>
                <a href={item.url}>
                    <item.icon />
                    {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
              )
          })}

          <div>
            <Button onClick={handleClear}>
              Borrar datos guardados (prueba)
            </Button>
          </div>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>VM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Jean Polo</span>
                <span className="text-xs text-muted-foreground">Warehouse</span>
              </div>
            </div>
            <Separator className="my-2" />
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton className="cursor-pointer">
                  <User className="h-4 w-4 mr-3" />
                  <span>My profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;