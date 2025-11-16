import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/lib/apiService";
import toast from "react-hot-toast";

const HomeProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  // const { user, setUser } = useContext(UserDetails);
  // const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // const token = ;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiCall({
          method: "get",
          url: "/user/verify",
        });
        if (response.data.success) {
          setIsVerified(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        if (!error.response.data.success) {
          toast.error("Unauthorized");
          navigate("/login");
        } else {
          toast.error(error.response.data.message);
        }
      }
    };

    checkAuth();
  }, []);

  if (!isVerified) return null;

  return <div>{children}</div>;
};

export default HomeProtectWrapper;
