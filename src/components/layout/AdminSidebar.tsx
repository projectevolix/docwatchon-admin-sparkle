import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { 
  LayoutDashboard, 
  Film, 
  Tv, 
  Users,
  BarChart3,
  Settings
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Movies",
    url: "/dashboard/movies",
    icon: Film,
  },
  {
    title: "Series",
    url: "/dashboard/series",
    icon: Tv,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      className={`${isCollapsed ? "w-[70px]" : "w-64"} border-r border-sidebar-border bg-sidebar transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-sidebar-border">
        <Logo showText={!isCollapsed} className={isCollapsed ? "justify-center" : ""} />
      </div>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-sidebar-accent rounded-md">
                  <span className="text-sidebar-accent-foreground">Movies</span>
                  <span className="text-sidebar-primary font-semibold">1,234</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-sidebar-accent rounded-md">
                  <span className="text-sidebar-accent-foreground">Series</span>
                  <span className="text-sidebar-primary font-semibold">567</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-sidebar-accent rounded-md">
                  <span className="text-sidebar-accent-foreground">Users</span>
                  <span className="text-sidebar-primary font-semibold">89,012</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}