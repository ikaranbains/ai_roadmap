import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { LoginDetails } from "../../context/LoginContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserDetails } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { PuffLoader } from "react-spinners";

export function LoginForm({ className, ...props }) {
  const { loginDetails, setLoginDetails } = useContext(LoginDetails);
  const { user, setUser } = useContext(UserDetails);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userLogged = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/login`,
      userLogged
    );

    setTimeout(() => {
      if (response.status === 200) {
        setLoading(false);
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    }, 1500);

    setLoginDetails({
      email: "",
      password: "",
    });
  };

  //password view hide
  const [eyeClicked, setEyeClicked] = useState(false);
  const [type, setType] = useState("password");
  const handleView = () => {
    setEyeClicked((prev) => {
      const newState = !prev;
      setType(newState ? "text" : "password");
      return newState;
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, email: e.target.value })
                  }
                  value={loginDetails.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Input
                    onChange={(e) =>
                      setLoginDetails({
                        ...loginDetails,
                        password: e.target.value,
                      })
                    }
                    value={loginDetails.password}
                    id="password"
                    type={type}
                    required
                  />
                  <span
                    onClick={() => handleView()}
                    className="inline-block cursor-pointer"
                  >
                    {eyeClicked ? (
                      <LuEyeClosed size={24} />
                    ) : (
                      <LuEye size={24} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  {loading ? <PuffLoader size={20} color="#ffffff" /> : "Login"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
