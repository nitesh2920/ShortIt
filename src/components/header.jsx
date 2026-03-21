import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {logout} from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Link, useNavigate} from "react-router-dom";
import {BarLoader} from "react-spinners";
import {Button} from "./ui/button";
import {UrlState} from "@/context";
import { useLocation } from "react-router-dom";
import { LinkIcon, LogOut, Sun, Moon, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const {loading, fn: fnLogout} = useFetch(logout);
  const navigate = useNavigate();
  const location = useLocation();
  const {user, fetchUser} = UrlState();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <nav className="sticky top-4 z-50 py-3 px-6 flex justify-between items-center glass rounded-2xl mb-8 transition-all duration-300 hover:shadow-xl">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" className="h-10 transition-transform group-hover:scale-110" alt="ShortIt Logo" />
          <span className="text-xl font-bold tracking-tight text-gradient">ShortIt</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </Button>

          {!user && location.pathname !== "/auth" ? (
            <Button 
              className="premium-gradient text-white border-0 shadow-lg hover:shadow-primary/25 transition-all active:scale-95" 
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          ) : user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-amber-500 hover:scale-105 transition-transform">
                  <Avatar className="h-9 w-9 border-2 border-background shadow-inner">
                    <AvatarImage src={user?.user_metadata?.profile_pic} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user?.user_metadata?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass mt-2 border-border/50">
                <DropdownMenuLabel className="font-semibold px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm">{user?.user_metadata?.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer gap-2 py-3">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer gap-2 py-3">
                  <LinkIcon className="h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                  className="text-destructive focus:bg-destructive/10 cursor-pointer gap-2 py-3"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4 fixed top-0 left-0 right-0 z-[60]" width={"100%"} color="oklch(var(--primary))" />}
    </>
  );
};

export default Header;
