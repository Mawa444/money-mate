import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Calculator from "./pages/Calculator";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/calculator" element={<Calculator />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;