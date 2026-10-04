"use client";
import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "@/config";
import { LS_KEY, RESPONSE_STATUS } from "@/constants";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user";
import { baseNextQuery } from "@/lib/api";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser, userLogout } = useUserStore();

  const handleUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/userapp/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LS_KEY.auth_token)}`,
        },
      });
      const data = await response.json();
      if (data && data.status === RESPONSE_STATUS.success) {
        setUser(data.data);
        setIsAuthenticated(true);
      } else if (data && data.status === RESPONSE_STATUS.unauthorized) {
        setIsAuthenticated(false);
        userLogout();
        localStorage.removeItem(LS_KEY.auth_token);
        // router.push("/auth");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [router]);
  useEffect(() => {
    handleUserDetails();
  }, [handleUserDetails]);

  const handleLogout = async () => {
    try {
      const result = await baseNextQuery({
        url: "/api/logout",
        method: "POST",
      });
      if (result.status === RESPONSE_STATUS.success) {
        localStorage.removeItem(LS_KEY.auth_token);
        setIsAuthenticated(false);
        userLogout();
        storage.destroy.authToken();
        toast.success(result.message);
        //router.push("/auth");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem(LS_KEY.auth_token);
      setIsAuthenticated(false);
      userLogout();
      storage.destroy.authToken();
      toast.error("Logout failed. Your session was cleared.");
      // router.push("/auth");
    }
  };

  return { isAuthenticated, user, handleLogout };
};

export default useAuth;
