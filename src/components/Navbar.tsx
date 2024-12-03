import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Receipt,
  User,
  Calculator,
  History,
  FileText,
} from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/transactions", icon: Receipt, label: "Transactions" },
    { to: "/reports", icon: FileText, label: "Rapports" },
    { to: "/calculator", icon: Calculator, label: "Calculatrice" },
    { to: "/history", icon: History, label: "Historique" },
    { to: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {links.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="relative flex flex-col items-center p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};