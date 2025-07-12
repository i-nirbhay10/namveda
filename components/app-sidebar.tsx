import {
  Sparkles,
  Star,
  Gift,
  Atom,
  Users,
  Heart,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  {
    title: "Name Generator",
    url: "/",
    icon: Sparkles,
  },
  // {
  //   title: "Favorites",
  //   url: "/favorites",
  //   icon: Heart,
  // },
  {
    title: "Sibling Matcher",
    url: "/sibling-matcher",
    icon: Users,
  },
  {
    title: "Astrology Guide",
    url: "/astrology",
    icon: Star,
  },

  // {
  //   title: "Name Trends",
  //   url: "/trends",
  //   icon: TrendingUp,
  // },
  {
    title: "Support Us",
    url: "/donate",
    icon: Gift,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Atom className="h-4 w-4 text-white" />
          </div> */}
          <div>
            <img
              src="/namvedalog.png"
              alt="Generating..."
              className="mx-auto w-52 "
            />
            {/* <h1 className="text-lg font-bold">Namveda</h1>
            <p className="text-xs text-muted-foreground">AI Name Generator</p> */}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3 dark:from-purple-950 dark:to-pink-950">
          <p className="text-xs text-muted-foreground">
            🙏 Support Us: Keep the generator free—your contribution fuels
            hosting and AI upgrades!
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
