import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { z } from "zod";
import { Redirect } from "wouter";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const loginSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: InsertUser) => {
    registerMutation.mutate(data);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>Login or Register - GaadiGlow</title>
        <meta name="description" content="Login to your GaadiGlow account or register to book premium car wash services at your doorstep." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col md:flex-row">
        <motion.div 
          className="w-full md:w-1/2 bg-white py-12 px-6 flex items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-primary font-bold text-3xl mb-2">Gaadi<span className="text-accent">Glow</span></h1>
              <p className="text-darkgray">Your car maintenance partner</p>
            </div>
            
            <Tabs defaultValue="login" value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          placeholder="Enter your username"
                          {...loginForm.register("username")}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-sm text-destructive">{loginForm.formState.errors.username.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          {...loginForm.register("password")}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-secondary"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <div className="mt-4 text-center">
                  <p className="text-darkgray">
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 text-primary" 
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </Button>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Sign up for a new GaadiGlow account</CardDescription>
                  </CardHeader>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-username">Username</Label>
                        <Input
                          id="reg-username"
                          placeholder="Choose a username"
                          {...registerForm.register("username")}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.username.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Create a password"
                          {...registerForm.register("password")}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-secondary"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Register"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                <div className="mt-4 text-center">
                  <p className="text-darkgray">
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 text-primary" 
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </Button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
        
        <motion.div 
          className="hidden md:block md:w-1/2 bg-gradient-to-r from-primary to-darkblue text-white p-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Your Car, Our Care, <br />At Your Doorstep</h2>
            <p className="text-xl mb-8 opacity-90">Experience premium car wash services without stepping out of your home.</p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <i className="fas fa-calendar-check text-accent"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Easy Booking</h4>
                  <p className="opacity-80">Schedule appointments in just a few clicks</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <i className="fas fa-truck text-accent"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Doorstep Service</h4>
                  <p className="opacity-80">Professional car wash at your location</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <i className="fas fa-shield-alt text-accent"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Quality Guarantee</h4>
                  <p className="opacity-80">100% satisfaction or we'll rewash your car</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-10">
              <div className="flex items-center">
                <div className="font-bold mr-2">4.8/5</div>
                <div className="text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <div className="ml-2 opacity-80">(2000+ reviews)</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
