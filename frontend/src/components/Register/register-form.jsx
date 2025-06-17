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
import { useContext, useRef, useState } from "react";
import { RegisterDetails } from "../../context/RegisterContext";
import { UserDetails } from "../../context/UserContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export function RegisterForm({ className, ...props }) {
  const { registerDetails, setRegisterDetails } = useContext(RegisterDetails);
  const { registerUser, setRegisterUser } = useContext(UserDetails);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname: registerDetails.firstname,
      lastname: registerDetails.lastname,
      email: registerDetails.email,
      password: registerDetails.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setRegisterUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    setRegisterDetails({
      firstname: "",
      lastname: "",
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your email below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="firstname">Firstname</Label>
                <Input
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      firstname: e.target.value,
                    })
                  }
                  value={registerDetails.firstname}
                  id="firstname"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastname">Lastname</Label>
                <Input
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      lastname: e.target.value,
                    })
                  }
                  value={registerDetails.lastname}
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) =>
                    setRegisterDetails({
                      ...registerDetails,
                      email: e.target.value,
                    })
                  }
                  value={registerDetails.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Input
                    onChange={(e) =>
                      setRegisterDetails({
                        ...registerDetails,
                        password: e.target.value,
                      })
                    }
                    value={registerDetails.password}
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
                  className="w-full"
                >
                  Create Account
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
