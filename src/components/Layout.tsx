import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FinancialTips } from "./FinancialTips";
import { ThemeToggle } from "./theme-toggle";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </div>
      <FinancialTips />
      <main className="container mx-auto p-4 mt-32 pb-24">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;