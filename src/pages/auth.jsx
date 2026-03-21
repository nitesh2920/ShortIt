import {useNavigate, useSearchParams} from "react-router-dom";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Login from "@/components/login";
import Signup from "@/components/signup";
import {useEffect} from "react";
import {UrlState} from "@/context";
import { LockKeyhole } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const createNew = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${createNew ? `createNew=${createNew}` : ""}`);
  }, [isAuthenticated, loading, navigate, createNew]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-[450px] space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {createNew ? "Hold up! Let's get you in first" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account or create a new one to continue.
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full glass p-2 rounded-3xl">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-transparent gap-1">
            <TabsTrigger 
              value="login" 
              className="rounded-2xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="rounded-2xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              Signup
            </TabsTrigger>
          </TabsList>
          <div className="p-4 pt-6">
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
