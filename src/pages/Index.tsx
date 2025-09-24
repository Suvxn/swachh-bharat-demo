import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  
  // Redirect authenticated users to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-govt-blue-light to-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-govt-blue mb-4">
          Welcome to National Waste Management Portal
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Government of India initiative for sustainable waste management
        </p>
        <div className="h-1 bg-gradient-tricolor rounded-full max-w-md mx-auto"></div>
      </motion.div>
    </div>
  );
};

export default Index;