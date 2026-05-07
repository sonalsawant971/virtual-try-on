import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Shirt } from 'lucide-react';

export default function Auth() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    setLoginLoading(true);
    try {
      await axios.post('http://localhost:5000/api/login', {
        email: loginEmail,
        password: loginPassword,
      });
      toast({ title: 'Welcome back!', description: 'Login successful.' });
      navigate('/app');
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.error || 'Invalid email or password.',
        variant: 'destructive',
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !regEmail || !regPassword) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (!validateEmail(regEmail)) {
      toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    setRegLoading(true);
    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email: regEmail,
        password: regPassword,
      });
      toast({ title: 'Account created!', description: 'Registration successful. Please log in.' });
      setTab('login');
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-primary/5 to-secondary/5 py-12 px-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 transition-opacity hover:opacity-80">
        <Shirt className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-primary">Virtual Wardrobe</span>
      </Link>

      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-2xl font-bold text-center">Get Started</CardTitle>
          <CardDescription className="text-center">
            Sign in or create your account to start shopping
          </CardDescription>
        </CardHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'login' | 'register')} className="w-full">
          <div className="px-6 pt-2">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
              <TabsTrigger value="register" className="w-full">Register</TabsTrigger>
            </TabsList>
          </div>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={loginLoading}>
                  {loginLoading ? 'Signing in...' : 'Login'}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('register')}
                    className="text-primary hover:underline underline-offset-4 font-medium"
                  >
                    Register
                  </button>
                </p>
              </CardFooter>
            </form>
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={regLoading}>
                  {regLoading ? 'Creating account...' : 'Create Account'}
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-primary hover:underline underline-offset-4 font-medium"
                  >
                    Login
                  </button>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
