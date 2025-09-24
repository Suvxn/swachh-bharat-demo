import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import AshokaEmblem from '@/components/AshokaEmblem';
import { motion } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      citizen: 'Citizen',
      champion: 'Green Champion',
      admin: 'ULB Admin',
      worker: 'Worker'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  return (
    <div className="min-h-screen bg-background font-govt">
      {/* Header */}
      <motion.header 
        className="bg-gradient-primary shadow-govt sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <AshokaEmblem className="w-10 h-10" />
              <div className="text-white">
                <h1 className="text-xl font-bold tracking-wide">
                  National Waste Management Portal
                </h1>
                <p className="text-xs opacity-90">Government of India</p>
              </div>
            </div>

            {/* User Info and Logout */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-right text-white">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs opacity-90">{getRoleDisplayName(user.role)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-primary border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Tricolor separator */}
      <div className="h-1 bg-gradient-tricolor"></div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-govt-blue text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Government of India. National Waste Management Portal
          </p>
          <p className="text-xs opacity-75 mt-1">
            Developed for sustainable waste management and environmental protection
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;