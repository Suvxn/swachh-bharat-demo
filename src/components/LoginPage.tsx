import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import AshokaEmblem from '@/components/AshokaEmblem';
import { Loader2 } from 'lucide-react';
import heroImage from '@/assets/waste-management-hero.jpg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'citizen@demo.com', role: 'Citizen', name: 'Rajesh Kumar' },
    { email: 'champion@demo.com', role: 'Green Champion', name: 'Priya Singh' },
    { email: 'admin@demo.com', role: 'ULB Admin', name: 'Amit Sharma' },
    { email: 'worker@demo.com', role: 'Worker', name: 'Suresh Yadav' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-govt-blue-light to-background flex">
      {/* Hero Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Waste Management India" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-govt-blue/80 to-transparent flex items-center justify-center">
          <div className="text-white text-center p-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-4"
            >
              Clean India, Green India
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg opacity-90"
            >
              Join the national movement for sustainable waste management
            </motion.p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <AshokaEmblem className="w-16 h-16" />
          </motion.div>
          <h1 className="text-3xl font-bold text-govt-blue mb-2">Swaach Saathi</h1>
          <p className="text-muted-foreground">Demo smart waste management companion</p>
          <div className="h-1 bg-gradient-tricolor mt-4 rounded-full"></div>
        </div>

        {/* Login Form */}
        <Card className="govt-card">
          <CardHeader>
            <CardTitle className="text-center text-xl">Portal Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full govt-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="govt-card mt-6">
          <CardHeader>
            <CardTitle className="text-center text-lg">Demo Accounts</CardTitle>
            <CardDescription className="text-center">
              Use these credentials to test different user roles (Password: 1234)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoAccounts.map((account) => (
                <motion.div
                  key={account.email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 bg-secondary rounded-lg cursor-pointer transition-colors hover:bg-secondary/80"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('1234');
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.role}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;