import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="border  w-full">
      <main className="min-h-screen mx-auto px-2 w-full ">
        <Header />
        <Outlet />
      </main>
     
    </div>
  );
};

export default AppLayout;
