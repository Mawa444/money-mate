import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FinancialTips } from "./FinancialTips";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="container mx-auto p-4">
        <FinancialTips />
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;