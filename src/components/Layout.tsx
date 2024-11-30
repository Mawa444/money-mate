import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;