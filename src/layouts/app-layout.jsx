import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="border  w-full">
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-3 text-center bg-gray-800 mt-10">
      {/* <p className="text-gray-400 text-sm">
        &copy; 2023. All rights reserved.
      </p> */}
      </div>
    </div>
  );
};

export default AppLayout;
