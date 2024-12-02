import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FinancialTips } from "./FinancialTips";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto p-4">
          <FinancialTips />
        </div>
      </div>
      <main className="container mx-auto p-4 mt-24 pb-24">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;