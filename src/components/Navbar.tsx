import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Wallet, Receipt, UserCircle, Calculator } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { path: "/", icon: Home, label: "Accueil" },
  { path: "/budget", icon: Wallet, label: "Budget" },
  { path: "/transactions", icon: Receipt, label: "Transactions" },
  { path: "/profile", icon: UserCircle, label: "Profil" },
  { path: "/calculator", icon: Calculator, label: "Calculatrice" },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className="relative flex flex-col items-center text-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Icon className="h-5 w-5" />
                  {location.pathname === path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className="mt-1 text-xs">{label}</span>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};