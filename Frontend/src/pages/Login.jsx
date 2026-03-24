import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import api from "@/api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_minmax(0,420px)]">
          <div className="hidden rounded-3xl bg-slate-900 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                2do App
              </p>
              <h1 className="max-w-md text-4xl font-semibold leading-tight">
                Manage your tasks, boost your productivity, and stay organized
                with 2do App.
              </h1>
              <p className="max-w-lg text-sm leading-6 text-slate-300">
                Sign in to manage tasks, track progress, and keep your workflow
                comfortable and efficient.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4" />
                Quick access to your personal dashboard
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4" />
                Clean task management across devices
              </div>
            </div>
          </div>

          <Card className="w-full rounded-3xl border-slate-200 shadow-lg">
            <CardHeader className="space-y-2 px-5 pt-6 sm:px-8 sm:pt-8">
              <p className="text-center text-sm uppercase tracking-[0.25em] text-slate-500 lg:hidden">
                2do App
              </p>
              <CardTitle className="text-center text-2xl sm:text-3xl">
                Login
              </CardTitle>
              <p className="text-center text-sm text-slate-500">
                Welcome back. Pick up right where you left off.
              </p>
            </CardHeader>

            <CardContent className="space-y-5 px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              <Button className="h-11 w-full" onClick={handleLogin}>
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-sm leading-6 text-slate-600">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="font-medium underline">
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
