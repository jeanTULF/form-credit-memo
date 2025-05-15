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
      url: "#",
      icon: FileUp,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileText,
    },
  ]

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-4">
          <div className="flex items-center justify-center w-full">
            <img src="/VM-LOGO-PS.png" width={50} height={50} />
            <span className="ml-2 text-xl font-bold">Vm Dashoard</span>
          </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild /* isActive={} */>
                <a href={item.url}>
                    <item.icon />
                    {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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