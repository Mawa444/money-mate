import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { FinancialTips } from "./FinancialTips";
import { ThemeToggle } from "./theme-toggle";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </div>
      <FinancialTips />
      <main className="container mx-auto p-4 mt-32 pb-24 flex-grow">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t border-border">
        Développé avec ❤️ par ODD
      </footer>
      <Navbar />
    </div>
  );
};

export default Layout;