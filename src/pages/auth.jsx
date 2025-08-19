import Login from "@/components/login";
import Signup from "@/components/signup";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UrlState} from "@/context";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const [title,setTitle]=useState('Login')
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className=" flex flex-col items-center gap-10">
      <h1 className="text-2xl sm:text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : title}
      </h1>
      <Tabs defaultValue="login" className="w-full sm:w-[400px]" onValueChange={(val)=>setTitle(val=== "login"?"Login":"Signup")}>
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login" >Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
