import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setTimeout(()=>{
           navigate("/");
      },[3000]);
      
    } catch (error) {
      console.log(error);
      alert("Register failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,420px)_1.1fr]">
          <Card className="order-2 w-full rounded-3xl border-slate-200 shadow-lg lg:order-1">
            <CardHeader className="space-y-2 px-5 pt-6 sm:px-8 sm:pt-8">
              <p className="text-center text-sm uppercase tracking-[0.25em] text-slate-500 lg:hidden">
                2do App
              </p>
              <CardTitle className="text-center text-2xl sm:text-3xl" >
                Create Account
              </CardTitle>
              <p className="text-center text-sm text-slate-500">
                Simple and organized way to keep your tasks in sync.
              </p>
            </CardHeader>

            <CardContent className="space-y-5 px-5 pb-6 sm:px-8 sm:pb-8">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              <Button className="h-11 w-full" onClick={handleRegister}>
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-sm leading-6 text-slate-600">
                Already have an account?{" "}
                <Link to="/" className="font-medium underline">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>

          <div className="order-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:order-2 lg:flex lg:flex-col lg:justify-between lg:p-8">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                WELCOME TO 2DO APP
              </p>
              <h1 className="max-w-lg text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
                STAY PRODUCTIVE <br></br>
                STAY ORGANIZED   <br></br>
                STAY AHEAD  <br></br>
              </h1>
              <div>
                <p className="text-slate-600">Welcome to 2do App, <br></br>Your personal productivity companion designed to help you stay organized, focused, and in control of your day. Whether you’re managing work tasks, personal goals, or everyday reminders, 2do App makes it easy to create, track, and complete everything in one clean and simple space. With an intuitive interface and seamless access across devices, you can plan smarter, reduce clutter, and turn your daily tasks into real progress.</p>
               <br></br>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-0">
              <div className="rounded-2xl bg-slate-900 p-4 text-white">
                <CheckCircle2 className="mb-3 h-5 w-5" />
                <p className="text-sm font-medium">Clear mobile spacing</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 text-slate-900">
                <CheckCircle2 className="mb-3 h-5 w-5" />
                <p className="text-sm font-medium">Comfortable desktop layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
