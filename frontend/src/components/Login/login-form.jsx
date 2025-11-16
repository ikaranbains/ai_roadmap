import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Label from "../common/Label";
import { Link } from "react-router-dom";
import { LoginDetails } from "../../context/LoginContext";
import { useContext, useState } from "react";
// import axios from "axios";
import { UserDetails } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
// import { PuffLoader } from "react-spinners";
// import Loader from "../Loader";
// import Loader from "@/components/Loader";
import { apiCall } from "@/lib/apiService";
import toast from "react-hot-toast";
import { AtSign, LockKeyhole, LogIn } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const { loginDetails, setLoginDetails } = useContext(LoginDetails);
  const { user, setUser } = useContext(UserDetails);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogged = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    try {
      setLoading(true);
      // console.log("user --", userLogged);
      const response = await apiCall({
        method: "post",
        url: "/user/login",
        data: userLogged,
      });

      console.log("response =====================================", response);
      if (response?.status === 200) {
        setLoading(false);
        const data = response.data;
        setUser(data.user);
        navigate("/home");
        setLoginDetails({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      let message;
      if (err.response?.status === 400) {
        message = err.response.data.errors[0].msg || "Something went wrong";
        toast.error(message);
      } else if (err.response?.status === 401) {
        message = err.response.data.message || "Something went wrong";
        console.log(message);
        toast.error(message);
      } else {
        toast.error(
          <div className="text-center">
            <p className="font-semibold text-base">Something went wrong</p>
            <p className="text-sm opacity-80">Please try again later</p>
          </div>
        );
      }
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={(e) => handleSubmit(e)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-3 items-center">
                  <AtSign size={20} />
                  <Input
                    onChange={(e) =>
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value,
                      })
                    }
                    value={loginDetails.email}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
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
                  <LockKeyhole size={20} />
                  <div className="flex items-center gap-3 h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-1 py-1 text-base shadow-sm transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 selection:bg-blue-500 selection:text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500/20 dark:bg-gray-800 dark:border-gray-700">
                    <input
                      type={type}
                      value={loginDetails.password}
                      onChange={(e) =>
                        setLoginDetails({
                          ...loginDetails,
                          password: e.target.value,
                        })
                      }
                      id="password"
                      className="w-full border-none outline-none bg-transparent px-2 rounded"
                      required
                    />
                    <span
                      onClick={() => handleView()}
                      className="inline-block cursor-pointer mr-2"
                    >
                      {eyeClicked ? (
                        <LuEyeClosed size={18} />
                      ) : (
                        <LuEye size={18} />
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 select-none justify-center items-center">
                <button
                  type="submit"
                  className="group relative inline-flex h-10 w-10.5 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-30 cursor-pointer"
                >
                  <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
                    Login
                  </div>
                  <div className="absolute right-3.5">
                    <LogIn size={18} />
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm select-none">
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
