import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    navigate('/');
  };

  return (
    <Layout>
      <div className="container py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md border-2 border-foreground shadow-md">
          <CardHeader className="text-center border-b-2 border-foreground bg-secondary">
            <div className="h-14 w-14 border-2 border-foreground bg-primary flex items-center justify-center mx-auto mb-4">
              <Plane className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your bookings
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold uppercase text-xs">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="border-2 border-foreground pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="font-bold uppercase text-xs">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-xs hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-2 border-foreground pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 shadow-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
