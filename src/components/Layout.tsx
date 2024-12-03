import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FinancialTips } from "./FinancialTips";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <FinancialTips />
      <main className="container mx-auto p-4 mt-32 pb-24">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;